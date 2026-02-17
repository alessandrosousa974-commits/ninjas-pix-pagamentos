import { useState, useCallback } from 'react'

export function useClipboard() {
  const [copiedText, setCopiedText] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isSupported] = useState(() => 'clipboard' in navigator)

  const copyToClipboard = useCallback(async (text: string): Promise<boolean> => {
    if (!isSupported) {
      setError('Clipboard não suportado')
      return false
    }

    try {
      await navigator.clipboard.writeText(text)
      setCopiedText(text)
      setError(null)
      return true
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao copiar'
      setError(errorMessage)
      return false
    }
  }, [isSupported])

  const readFromClipboard = useCallback(async (): Promise<string | null> => {
    if (!isSupported) {
      setError('Clipboard não suportado')
      return null
    }

    try {
      const text = await navigator.clipboard.readText()
      setError(null)
      return text
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao ler clipboard'
      setError(errorMessage)
      return null
    }
  }, [isSupported])

  const clearCopiedText = useCallback(() => {
    setCopiedText(null)
  }, [])

  return {
    copiedText,
    error,
    isSupported,
    copyToClipboard,
    readFromClipboard,
    clearCopiedText
  }
}
