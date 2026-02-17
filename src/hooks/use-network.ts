import { useState, useEffect } from 'react'

export interface NetworkState {
  online: boolean
  effectiveType?: '4g' | '3g' | '2g' | 'slow-2g'
  downlink?: number // Mbps
  rtt?: number // Round-trip time em ms
  saveData?: boolean
  isSupported: boolean
}

export function useNetwork() {
  const [network, setNetwork] = useState<NetworkState>({
    online: navigator.onLine,
    isSupported: false
  })

  useEffect(() => {
    const updateOnlineStatus = () => {
      setNetwork(prev => ({ ...prev, online: navigator.onLine }))
    }

    window.addEventListener('online', updateOnlineStatus)
    window.addEventListener('offline', updateOnlineStatus)

    // @ts-ignore - Network Information API não tem tipos oficiais completos
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection

    if (connection) {
      const updateNetworkInfo = () => {
        setNetwork({
          online: navigator.onLine,
          effectiveType: connection.effectiveType,
          downlink: connection.downlink,
          rtt: connection.rtt,
          saveData: connection.saveData,
          isSupported: true
        })
      }

      updateNetworkInfo()
      connection.addEventListener('change', updateNetworkInfo)

      return () => {
        window.removeEventListener('online', updateOnlineStatus)
        window.removeEventListener('offline', updateOnlineStatus)
        connection.removeEventListener('change', updateNetworkInfo)
      }
    }

    return () => {
      window.removeEventListener('online', updateOnlineStatus)
      window.removeEventListener('offline', updateOnlineStatus)
    }
  }, [])

  return network
}
