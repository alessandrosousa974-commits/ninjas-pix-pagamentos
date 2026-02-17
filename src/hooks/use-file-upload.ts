import { useState, useCallback, useRef } from 'react'

export interface UploadedFile {
  file: File
  preview?: string
  progress: number
  error?: string
}

export interface UseFileUploadOptions {
  accept?: string
  multiple?: boolean
  maxSize?: number // em bytes
  maxFiles?: number
  autoUpload?: boolean
  generatePreview?: boolean
}

export function useFileUpload(options: UseFileUploadOptions = {}) {
  const [files, setFiles] = useState<UploadedFile[]>([])
  const [isDragging, setIsDragging] = useState(false)
  const inputRef = useRef<HTMLInputElement>(null)

  const validateFile = useCallback((file: File): string | null => {
    if (options.maxSize && file.size > options.maxSize) {
      return `Arquivo muito grande. Máximo: ${(options.maxSize / 1024 / 1024).toFixed(2)}MB`
    }

    if (options.accept) {
      const acceptedTypes = options.accept.split(',').map(t => t.trim())
      const fileType = file.type
      const fileExtension = '.' + file.name.split('.').pop()

      const isAccepted = acceptedTypes.some(type => {
        if (type.startsWith('.')) {
          return fileExtension === type
        }
        if (type.endsWith('/*')) {
          return fileType.startsWith(type.replace('/*', ''))
        }
        return fileType === type
      })

      if (!isAccepted) {
        return `Tipo de arquivo não aceito. Aceitos: ${options.accept}`
      }
    }

    return null
  }, [options.accept, options.maxSize])

  const generatePreview = useCallback(async (file: File): Promise<string | undefined> => {
    if (!options.generatePreview) return undefined

    if (file.type.startsWith('image/')) {
      return new Promise((resolve) => {
        const reader = new FileReader()
        reader.onloadend = () => resolve(reader.result as string)
        reader.readAsDataURL(file)
      })
    }

    return undefined
  }, [options.generatePreview])

  const addFiles = useCallback(async (newFiles: FileList | File[]) => {
    const filesArray = Array.from(newFiles)

    if (options.maxFiles && files.length + filesArray.length > options.maxFiles) {
      console.warn(`Máximo de ${options.maxFiles} arquivos permitidos`)
      return
    }

    const uploadedFiles: UploadedFile[] = []

    for (const file of filesArray) {
      const error = validateFile(file)
      const preview = await generatePreview(file)

      uploadedFiles.push({
        file,
        preview,
        progress: 0,
        error: error || undefined
      })
    }

    setFiles(prev => options.multiple ? [...prev, ...uploadedFiles] : uploadedFiles)
  }, [files.length, options.multiple, options.maxFiles, validateFile, generatePreview])

  const removeFile = useCallback((index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index))
  }, [])

  const clearFiles = useCallback(() => {
    setFiles([])
  }, [])

  const openFileDialog = useCallback(() => {
    inputRef.current?.click()
  }, [])

  const handleFileInput = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = event.target.files
    if (selectedFiles) {
      addFiles(selectedFiles)
    }
    // Reset input para permitir selecionar o mesmo arquivo novamente
    event.target.value = ''
  }, [addFiles])

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    setIsDragging(true)
  }, [])

  const handleDragLeave = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    setIsDragging(false)
  }, [])

  const handleDrop = useCallback((event: React.DragEvent) => {
    event.preventDefault()
    setIsDragging(false)

    const droppedFiles = event.dataTransfer.files
    if (droppedFiles) {
      addFiles(droppedFiles)
    }
  }, [addFiles])

  const updateProgress = useCallback((index: number, progress: number) => {
    setFiles(prev => prev.map((f, i) => i === index ? { ...f, progress } : f))
  }, [])

  const getInputProps = useCallback(() => ({
    ref: inputRef,
    type: 'file' as const,
    accept: options.accept,
    multiple: options.multiple,
    onChange: handleFileInput,
    style: { display: 'none' }
  }), [options.accept, options.multiple, handleFileInput])

  const getDropzoneProps = useCallback(() => ({
    onDragOver: handleDragOver,
    onDragLeave: handleDragLeave,
    onDrop: handleDrop
  }), [handleDragOver, handleDragLeave, handleDrop])

  return {
    files,
    isDragging,
    addFiles,
    removeFile,
    clearFiles,
    openFileDialog,
    updateProgress,
    getInputProps,
    getDropzoneProps
  }
}
