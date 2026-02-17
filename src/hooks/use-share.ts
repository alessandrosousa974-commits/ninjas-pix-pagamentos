import { useState, useCallback } from 'react'

export interface ShareData {
  title?: string
  text?: string
  url?: string
  files?: File[]
}

export function useShare() {
  const [isSupported] = useState(() => 'share' in navigator)
  const [error, setError] = useState<string | null>(null)

  const canShare = useCallback((data?: ShareData): boolean => {
    if (!isSupported) return false
    if (!data) return true

    try {
      return navigator.canShare(data)
    } catch {
      return false
    }
  }, [isSupported])

  const share = useCallback(async (data: ShareData): Promise<boolean> => {
    if (!isSupported) {
      setError('API de compartilhamento não suportada')
      return false
    }

    if (!canShare(data)) {
      setError('Não é possível compartilhar este conteúdo')
      return false
    }

    try {
      await navigator.share(data)
      setError(null)
      return true
    } catch (err) {
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          setError('Compartilhamento cancelado')
        } else {
          setError(err.message)
        }
      } else {
        setError('Erro ao compartilhar')
      }
      return false
    }
  }, [isSupported, canShare])

  return {
    isSupported,
    error,
    canShare,
    share
  }
}
