import { useState, useCallback } from 'react'

export function useVibration() {
  const [isSupported] = useState(() => 'vibrate' in navigator)

  const vibrate = useCallback((pattern: number | number[]): boolean => {
    if (!isSupported) return false

    try {
      return navigator.vibrate(pattern)
    } catch {
      return false
    }
  }, [isSupported])

  const stopVibration = useCallback((): boolean => {
    if (!isSupported) return false

    try {
      return navigator.vibrate(0)
    } catch {
      return false
    }
  }, [isSupported])

  // Padrões pré-definidos
  const patterns = {
    short: 200,
    medium: 400,
    long: 600,
    double: [200, 100, 200],
    triple: [200, 100, 200, 100, 200],
    sos: [100, 30, 100, 30, 100, 200, 200, 30, 200, 30, 200, 200, 100, 30, 100, 30, 100],
    success: [100, 50, 100],
    error: [200, 100, 200, 100, 200],
    warning: [300]
  }

  const vibratePattern = useCallback((patternName: keyof typeof patterns): boolean => {
    return vibrate(patterns[patternName])
  }, [vibrate])

  return {
    isSupported,
    vibrate,
    stopVibration,
    vibratePattern,
    patterns
  }
}
