import { useState, useCallback, useEffect } from 'react'

export interface NotificationOptions {
  body?: string
  icon?: string
  badge?: string
  image?: string
  vibrate?: number | number[]
  sound?: string
  tag?: string
  requireInteraction?: boolean
  silent?: boolean
  data?: any
}

export type NotificationPermission = 'default' | 'granted' | 'denied'

export function useNotifications() {
  const [permission, setPermission] = useState<NotificationPermission>('default')
  const [isSupported, setIsSupported] = useState(false)

  useEffect(() => {
    setIsSupported('Notification' in window)
    if ('Notification' in window) {
      setPermission(Notification.permission)
    }
  }, [])

  const requestPermission = useCallback(async (): Promise<NotificationPermission> => {
    if (!isSupported) {
      return 'denied'
    }

    const result = await Notification.requestPermission()
    setPermission(result)
    return result
  }, [isSupported])

  const showNotification = useCallback(
    async (title: string, options?: NotificationOptions): Promise<Notification | null> => {
      if (!isSupported) {
        console.warn('Notificações não são suportadas neste navegador')
        return null
      }

      if (permission !== 'granted') {
        const newPermission = await requestPermission()
        if (newPermission !== 'granted') {
          console.warn('Permissão de notificação negada')
          return null
        }
      }

      try {
        const notification = new Notification(title, options)
        return notification
      } catch (error) {
        console.error('Erro ao criar notificação:', error)
        return null
      }
    },
    [isSupported, permission, requestPermission]
  )

  return {
    permission,
    isSupported,
    requestPermission,
    showNotification
  }
}
