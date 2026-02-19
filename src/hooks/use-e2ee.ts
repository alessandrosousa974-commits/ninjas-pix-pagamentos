// Hook React para gerenciar criptografia E2EE

import { useState, useEffect, useCallback } from 'react'
import {
  encryptMessage,
  decryptMessage,
  importPublicKey,
  exportPublicKey,
  type KeyPair,
} from '@/lib/crypto'
import {
  loadKeys,
  saveKeys,
  initializeKeys,
  hasKeys,
  deleteKeys,
} from '@/lib/keystore'

export interface UseE2EEResult {
  isReady: boolean
  isInitializing: boolean
  encrypt: (message: string, recipientPublicKey: string) => Promise<string>
  decrypt: (encryptedMessage: string) => Promise<string>
  getPublicKey: () => Promise<string | null>
  initializeUser: (userId: string) => Promise<void>
  clearKeys: (userId: string) => Promise<void>
  error: string | null
}

export function useE2EE(userId: string | null): UseE2EEResult {
  const [keyPair, setKeyPair] = useState<KeyPair | null>(null)
  const [isInitializing, setIsInitializing] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Carrega ou cria chaves quando o userId muda
  useEffect(() => {
    if (!userId) {
      setKeyPair(null)
      return
    }

    async function setupKeys() {
      try {
        setIsInitializing(true)
        setError(null)

        // Verifica se já existem chaves
        const existingKeys = await loadKeys(userId)

        if (existingKeys) {
          setKeyPair(existingKeys)
        } else {
          // Cria novas chaves se não existirem
          const newKeys = await initializeKeys(userId)
          setKeyPair(newKeys)
        }
      } catch (err) {
        setError('Erro ao configurar criptografia')
        console.error('E2EE setup error:', err)
      } finally {
        setIsInitializing(false)
      }
    }

    setupKeys()
  }, [userId])

  // Criptografa uma mensagem com a chave pública do destinatário
  const encrypt = useCallback(
    async (message: string, recipientPublicKey: string): Promise<string> => {
      try {
        const publicKey = await importPublicKey(recipientPublicKey)
        return await encryptMessage(message, publicKey)
      } catch (err) {
        setError('Erro ao criptografar mensagem')
        console.error('Encryption error:', err)
        throw err
      }
    },
    []
  )

  // Descriptografa uma mensagem com a chave privada do usuário
  const decrypt = useCallback(
    async (encryptedMessage: string): Promise<string> => {
      if (!keyPair) {
        throw new Error('Chaves não inicializadas')
      }

      try {
        return await decryptMessage(encryptedMessage, keyPair.privateKey)
      } catch (err) {
        setError('Erro ao descriptografar mensagem')
        console.error('Decryption error:', err)
        throw err
      }
    },
    [keyPair]
  )

  // Retorna a chave pública do usuário em formato string
  const getPublicKey = useCallback(async (): Promise<string | null> => {
    if (!keyPair) return null
    try {
      return await exportPublicKey(keyPair.publicKey)
    } catch (err) {
      setError('Erro ao exportar chave pública')
      console.error('Export public key error:', err)
      return null
    }
  }, [keyPair])

  // Inicializa chaves manualmente (útil para forçar regeneração)
  const initializeUser = useCallback(async (userId: string): Promise<void> => {
    try {
      setIsInitializing(true)
      setError(null)
      const newKeys = await initializeKeys(userId)
      setKeyPair(newKeys)
    } catch (err) {
      setError('Erro ao inicializar chaves')
      console.error('Initialize keys error:', err)
      throw err
    } finally {
      setIsInitializing(false)
    }
  }, [])

  // Remove as chaves do usuário (logout)
  const clearKeys = useCallback(async (userId: string): Promise<void> => {
    try {
      await deleteKeys(userId)
      setKeyPair(null)
    } catch (err) {
      setError('Erro ao remover chaves')
      console.error('Clear keys error:', err)
      throw err
    }
  }, [])

  return {
    isReady: keyPair !== null && !isInitializing,
    isInitializing,
    encrypt,
    decrypt,
    getPublicKey,
    initializeUser,
    clearKeys,
    error,
  }
}
