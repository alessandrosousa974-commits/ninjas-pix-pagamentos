import { useState, useCallback } from 'react'

export interface Contact {
  name?: string[]
  email?: string[]
  tel?: string[]
  address?: string[]
  icon?: string[]
}

export function useContacts() {
  const [isSupported] = useState(() => 'contacts' in navigator && 'ContactsManager' in window)
  const [error, setError] = useState<string | null>(null)

  const selectContacts = useCallback(async (
    properties: string[] = ['name', 'email', 'tel'],
    options?: { multiple?: boolean }
  ): Promise<Contact[] | null> => {
    if (!isSupported) {
      setError('API de Contatos não suportada neste navegador')
      return null
    }

    try {
      // @ts-ignore - Contact Picker API não tem tipos oficiais ainda
      const contacts = await navigator.contacts.select(properties, options)
      setError(null)
      return contacts as Contact[]
    } catch (err) {
      if (err instanceof Error) {
        if (err.name === 'AbortError') {
          setError('Seleção de contato cancelada')
        } else {
          setError(err.message)
        }
      } else {
        setError('Erro ao acessar contatos')
      }
      return null
    }
  }, [isSupported])

  const getProperties = useCallback(async (): Promise<string[]> => {
    if (!isSupported) return []

    try {
      // @ts-ignore
      const props = await navigator.contacts.getProperties()
      return props
    } catch {
      return []
    }
  }, [isSupported])

  return {
    isSupported,
    error,
    selectContacts,
    getProperties
  }
}
