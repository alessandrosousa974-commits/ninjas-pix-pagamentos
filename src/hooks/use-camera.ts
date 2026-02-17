import { useState, useRef, useCallback } from 'react'

export interface UseCameraOptions {
  facingMode?: 'user' | 'environment'
  width?: number
  height?: number
}

export function useCamera(options: UseCameraOptions = {}) {
  const [stream, setStream] = useState<MediaStream | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isActive, setIsActive] = useState(false)
  const videoRef = useRef<HTMLVideoElement | null>(null)

  const startCamera = useCallback(async () => {
    try {
      const constraints: MediaStreamConstraints = {
        video: {
          facingMode: options.facingMode || 'user',
          width: options.width || { ideal: 1280 },
          height: options.height || { ideal: 720 }
        }
      }

      const mediaStream = await navigator.mediaDevices.getUserMedia(constraints)
      setStream(mediaStream)
      setIsActive(true)
      setError(null)

      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream
      }

      return mediaStream
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro ao acessar câmera'
      setError(errorMessage)
      setIsActive(false)
      return null
    }
  }, [options.facingMode, options.width, options.height])

  const stopCamera = useCallback(() => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop())
      setStream(null)
      setIsActive(false)

      if (videoRef.current) {
        videoRef.current.srcObject = null
      }
    }
  }, [stream])

  const takePhoto = useCallback((): string | null => {
    if (!videoRef.current || !isActive) return null

    const canvas = document.createElement('canvas')
    canvas.width = videoRef.current.videoWidth
    canvas.height = videoRef.current.videoHeight

    const ctx = canvas.getContext('2d')
    if (!ctx) return null

    ctx.drawImage(videoRef.current, 0, 0)
    return canvas.toDataURL('image/jpeg')
  }, [isActive])

  const switchCamera = useCallback(async () => {
    stopCamera()
    const newFacingMode = options.facingMode === 'user' ? 'environment' : 'user'
    return startCamera()
  }, [options.facingMode, startCamera, stopCamera])

  return {
    videoRef,
    stream,
    error,
    isActive,
    startCamera,
    stopCamera,
    takePhoto,
    switchCamera
  }
}
