import { useState, useEffect } from 'react'

export type PermissionType =
  | 'camera'
  | 'microphone'
  | 'geolocation'
  | 'notifications'
  | 'clipboard'

export type PermissionStatus = 'granted' | 'denied' | 'prompt' | 'unsupported'

interface PermissionState {
  status: PermissionStatus
  error?: string
}

export function usePermission(type: PermissionType) {
  const [permission, setPermission] = useState<PermissionState>({
    status: 'prompt'
  })

  useEffect(() => {
    checkPermission()
  }, [type])

  const checkPermission = async () => {
    try {
      if (!navigator.permissions) {
        setPermission({ status: 'unsupported' })
        return
      }

      const permissionName = getPermissionName(type)
      if (!permissionName) {
        setPermission({ status: 'unsupported' })
        return
      }

      const result = await navigator.permissions.query({ name: permissionName as PermissionName })
      setPermission({ status: result.state as PermissionStatus })

      result.addEventListener('change', () => {
        setPermission({ status: result.state as PermissionStatus })
      })
    } catch (error) {
      setPermission({
        status: 'unsupported',
        error: error instanceof Error ? error.message : 'Erro desconhecido'
      })
    }
  }

  const requestPermission = async (): Promise<PermissionStatus> => {
    try {
      switch (type) {
        case 'camera':
          await navigator.mediaDevices.getUserMedia({ video: true })
          setPermission({ status: 'granted' })
          return 'granted'

        case 'microphone':
          await navigator.mediaDevices.getUserMedia({ audio: true })
          setPermission({ status: 'granted' })
          return 'granted'

        case 'geolocation':
          return new Promise((resolve) => {
            navigator.geolocation.getCurrentPosition(
              () => {
                setPermission({ status: 'granted' })
                resolve('granted')
              },
              () => {
                setPermission({ status: 'denied' })
                resolve('denied')
              }
            )
          })

        case 'notifications':
          const result = await Notification.requestPermission()
          const status = result === 'default' ? 'prompt' : result as PermissionStatus
          setPermission({ status })
          return status

        case 'clipboard':
          // Clipboard não precisa de permissão explícita, testa com uma operação
          await navigator.clipboard.readText()
          setPermission({ status: 'granted' })
          return 'granted'

        default:
          setPermission({ status: 'unsupported' })
          return 'unsupported'
      }
    } catch (error) {
      setPermission({
        status: 'denied',
        error: error instanceof Error ? error.message : 'Permissão negada'
      })
      return 'denied'
    }
  }

  return {
    ...permission,
    request: requestPermission,
    refresh: checkPermission
  }
}

function getPermissionName(type: PermissionType): string | null {
  const map: Record<PermissionType, string | null> = {
    camera: 'camera',
    microphone: 'microphone',
    geolocation: 'geolocation',
    notifications: 'notifications',
    clipboard: null // Clipboard não tem query de permissão padrão
  }
  return map[type]
}
