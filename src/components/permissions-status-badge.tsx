import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Badge } from '@/components/ui/badge'
import { Shield, CheckCircle, AlertCircle } from 'lucide-react'

export function PermissionsStatusBadge() {
  const [permissionsCount, setPermissionsCount] = useState({ granted: 0, total: 4 })

  useEffect(() => {
    const checkPermissions = async () => {
      let granted = 0

      // Verifica permissões disponíveis
      if (navigator.permissions) {
        const permissions = ['camera', 'microphone', 'geolocation', 'notifications']

        for (const perm of permissions) {
          try {
            // @ts-ignore - algumas permissões podem não ter tipos
            const result = await navigator.permissions.query({ name: perm })
            if (result.state === 'granted') granted++
          } catch {
            // Ignora erros de permissões não suportadas
          }
        }
      }

      setPermissionsCount({ granted, total: 4 })
    }

    checkPermissions()
  }, [])

  const allGranted = permissionsCount.granted === permissionsCount.total
  const someGranted = permissionsCount.granted > 0 && permissionsCount.granted < permissionsCount.total

  return (
    <Link to="/permissions">
      <Badge
        variant={allGranted ? 'default' : someGranted ? 'outline' : 'destructive'}
        className="cursor-pointer hover:opacity-80 transition-opacity"
      >
        {allGranted ? (
          <CheckCircle className="w-3 h-3 mr-1" />
        ) : (
          <AlertCircle className="w-3 h-3 mr-1" />
        )}
        <Shield className="w-3 h-3 mr-1" />
        Permissões: {permissionsCount.granted}/{permissionsCount.total}
      </Badge>
    </Link>
  )
}
