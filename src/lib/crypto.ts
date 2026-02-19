// Biblioteca de criptografia E2EE usando Web Crypto API

export interface KeyPair {
  publicKey: CryptoKey
  privateKey: CryptoKey
}

export interface SerializedKeyPair {
  publicKey: string
  privateKey: string
}

// Gera um par de chaves RSA-OAEP para criptografia
export async function generateKeyPair(): Promise<KeyPair> {
  const keyPair = await window.crypto.subtle.generateKey(
    {
      name: 'RSA-OAEP',
      modulusLength: 2048,
      publicExponent: new Uint8Array([1, 0, 1]),
      hash: 'SHA-256',
    },
    true, // extractable
    ['encrypt', 'decrypt']
  )

  return keyPair as KeyPair
}

// Exporta chave pública para formato base64
export async function exportPublicKey(publicKey: CryptoKey): Promise<string> {
  const exported = await window.crypto.subtle.exportKey('spki', publicKey)
  return arrayBufferToBase64(exported)
}

// Exporta chave privada para formato base64
export async function exportPrivateKey(privateKey: CryptoKey): Promise<string> {
  const exported = await window.crypto.subtle.exportKey('pkcs8', privateKey)
  return arrayBufferToBase64(exported)
}

// Importa chave pública de base64
export async function importPublicKey(base64Key: string): Promise<CryptoKey> {
  const buffer = base64ToArrayBuffer(base64Key)
  return await window.crypto.subtle.importKey(
    'spki',
    buffer,
    {
      name: 'RSA-OAEP',
      hash: 'SHA-256',
    },
    true,
    ['encrypt']
  )
}

// Importa chave privada de base64
export async function importPrivateKey(base64Key: string): Promise<CryptoKey> {
  const buffer = base64ToArrayBuffer(base64Key)
  return await window.crypto.subtle.importKey(
    'pkcs8',
    buffer,
    {
      name: 'RSA-OAEP',
      hash: 'SHA-256',
    },
    true,
    ['decrypt']
  )
}

// Criptografa uma mensagem com a chave pública do destinatário
export async function encryptMessage(
  message: string,
  publicKey: CryptoKey
): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(message)

  const encrypted = await window.crypto.subtle.encrypt(
    {
      name: 'RSA-OAEP',
    },
    publicKey,
    data
  )

  return arrayBufferToBase64(encrypted)
}

// Descriptografa uma mensagem com a chave privada do usuário
export async function decryptMessage(
  encryptedMessage: string,
  privateKey: CryptoKey
): Promise<string> {
  const buffer = base64ToArrayBuffer(encryptedMessage)

  const decrypted = await window.crypto.subtle.decrypt(
    {
      name: 'RSA-OAEP',
    },
    privateKey,
    buffer
  )

  const decoder = new TextDecoder()
  return decoder.decode(decrypted)
}

// Utilitários de conversão
function arrayBufferToBase64(buffer: ArrayBuffer): string {
  const bytes = new Uint8Array(buffer)
  let binary = ''
  for (let i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i])
  }
  return window.btoa(binary)
}

function base64ToArrayBuffer(base64: string): ArrayBuffer {
  const binary = window.atob(base64)
  const bytes = new Uint8Array(binary.length)
  for (let i = 0; i < binary.length; i++) {
    bytes[i] = binary.charCodeAt(i)
  }
  return bytes.buffer
}

// Gera um hash SHA-256 de uma string (útil para verificar integridade)
export async function hashMessage(message: string): Promise<string> {
  const encoder = new TextEncoder()
  const data = encoder.encode(message)
  const hashBuffer = await window.crypto.subtle.digest('SHA-256', data)
  return arrayBufferToBase64(hashBuffer)
}
