// Gerenciamento de chaves no IndexedDB (armazenamento local seguro)

import {
  generateKeyPair,
  exportPublicKey,
  exportPrivateKey,
  importPublicKey,
  importPrivateKey,
  type KeyPair,
  type SerializedKeyPair,
} from './crypto'

const DB_NAME = 'e2ee_keystore'
const DB_VERSION = 1
const STORE_NAME = 'keys'

// Inicializa o banco de dados IndexedDB
function openDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve(request.result)

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME)
      }
    }
  })
}

// Salva as chaves do usuário no IndexedDB
export async function saveKeys(userId: string, keyPair: KeyPair): Promise<void> {
  const db = await openDB()
  const serialized: SerializedKeyPair = {
    publicKey: await exportPublicKey(keyPair.publicKey),
    privateKey: await exportPrivateKey(keyPair.privateKey),
  }

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite')
    const store = transaction.objectStore(STORE_NAME)
    const request = store.put(serialized, userId)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve()
  })
}

// Carrega as chaves do usuário do IndexedDB
export async function loadKeys(userId: string): Promise<KeyPair | null> {
  const db = await openDB()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readonly')
    const store = transaction.objectStore(STORE_NAME)
    const request = store.get(userId)

    request.onerror = () => reject(request.error)
    request.onsuccess = async () => {
      const serialized = request.result as SerializedKeyPair | undefined

      if (!serialized) {
        resolve(null)
        return
      }

      try {
        const publicKey = await importPublicKey(serialized.publicKey)
        const privateKey = await importPrivateKey(serialized.privateKey)
        resolve({ publicKey, privateKey })
      } catch (error) {
        reject(error)
      }
    }
  })
}

// Verifica se o usuário já tem chaves armazenadas
export async function hasKeys(userId: string): Promise<boolean> {
  const keys = await loadKeys(userId)
  return keys !== null
}

// Gera e salva novas chaves para o usuário
export async function initializeKeys(userId: string): Promise<KeyPair> {
  const keyPair = await generateKeyPair()
  await saveKeys(userId, keyPair)
  return keyPair
}

// Remove as chaves do usuário (logout ou reset)
export async function deleteKeys(userId: string): Promise<void> {
  const db = await openDB()

  return new Promise((resolve, reject) => {
    const transaction = db.transaction(STORE_NAME, 'readwrite')
    const store = transaction.objectStore(STORE_NAME)
    const request = store.delete(userId)

    request.onerror = () => reject(request.error)
    request.onsuccess = () => resolve()
  })
}

// Exporta a chave pública do usuário (para compartilhar com outros usuários)
export async function getPublicKeyString(userId: string): Promise<string | null> {
  const keys = await loadKeys(userId)
  if (!keys) return null
  return await exportPublicKey(keys.publicKey)
}
