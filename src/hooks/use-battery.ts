import { useState, useEffect } from 'react'

export interface BatteryState {
  level: number | null // 0 a 1
  charging: boolean
  chargingTime: number | null // segundos até carregar completo (Infinity se não carregando)
  dischargingTime: number | null // segundos até descarregar completo (Infinity se carregando)
  isSupported: boolean
}

export function useBattery() {
  const [battery, setBattery] = useState<BatteryState>({
    level: null,
    charging: false,
    chargingTime: null,
    dischargingTime: null,
    isSupported: false
  })

  useEffect(() => {
    // @ts-ignore - Battery API não tem tipos oficiais em todas as versões
    if (!navigator.getBattery) {
      setBattery(prev => ({ ...prev, isSupported: false }))
      return
    }

    let batteryManager: any

    // @ts-ignore
    navigator.getBattery().then((bm: any) => {
      batteryManager = bm

      const updateBatteryState = () => {
        setBattery({
          level: bm.level,
          charging: bm.charging,
          chargingTime: bm.chargingTime,
          dischargingTime: bm.dischargingTime,
          isSupported: true
        })
      }

      updateBatteryState()

      bm.addEventListener('levelchange', updateBatteryState)
      bm.addEventListener('chargingchange', updateBatteryState)
      bm.addEventListener('chargingtimechange', updateBatteryState)
      bm.addEventListener('dischargingtimechange', updateBatteryState)
    })

    return () => {
      if (batteryManager) {
        const updateBatteryState = () => {}
        batteryManager.removeEventListener('levelchange', updateBatteryState)
        batteryManager.removeEventListener('chargingchange', updateBatteryState)
        batteryManager.removeEventListener('chargingtimechange', updateBatteryState)
        batteryManager.removeEventListener('dischargingtimechange', updateBatteryState)
      }
    }
  }, [])

  return battery
}
