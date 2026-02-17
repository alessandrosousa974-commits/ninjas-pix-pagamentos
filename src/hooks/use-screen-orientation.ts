import { useState, useEffect } from 'react'

export type OrientationType = 'portrait-primary' | 'portrait-secondary' | 'landscape-primary' | 'landscape-secondary'

export interface ScreenOrientationState {
  type: OrientationType | null
  angle: number
  isSupported: boolean
}

export function useScreenOrientation() {
  const [orientation, setOrientation] = useState<ScreenOrientationState>({
    type: null,
    angle: 0,
    isSupported: false
  })

  useEffect(() => {
    if (!screen.orientation) {
      setOrientation(prev => ({ ...prev, isSupported: false }))
      return
    }

    const updateOrientation = () => {
      setOrientation({
        type: screen.orientation.type as OrientationType,
        angle: screen.orientation.angle,
        isSupported: true
      })
    }

    updateOrientation()
    screen.orientation.addEventListener('change', updateOrientation)

    return () => {
      screen.orientation.removeEventListener('change', updateOrientation)
    }
  }, [])

  const lockOrientation = async (lockType: OrientationLockType): Promise<boolean> => {
    if (!screen.orientation) return false

    try {
      await screen.orientation.lock(lockType)
      return true
    } catch {
      return false
    }
  }

  const unlockOrientation = () => {
    if (!screen.orientation) return

    try {
      screen.orientation.unlock()
    } catch {
      // Ignorar erro
    }
  }

  return {
    ...orientation,
    lockOrientation,
    unlockOrientation
  }
}
