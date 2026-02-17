# 📚 Exemplos Práticos - Sistema de Permissões

Este documento contém exemplos práticos e casos de uso reais para cada hook de permissão.

## 📷 Câmera - Tirar Foto de Perfil

```typescript
import { useState } from 'react'
import { useCamera } from '@/hooks/use-camera'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'

function ProfilePhoto() {
  const { videoRef, isActive, error, startCamera, stopCamera, takePhoto } = useCamera({
    facingMode: 'user' // Câmera frontal
  })
  const [photo, setPhoto] = useState<string | null>(null)

  const handleCapture = () => {
    const photoData = takePhoto()
    if (photoData) {
      setPhoto(photoData)
      stopCamera() // Para a câmera após capturar
    }
  }

  const handleRetake = () => {
    setPhoto(null)
    startCamera()
  }

  if (photo) {
    return (
      <Card className="p-4">
        <img src={photo} alt="Profile" className="rounded-full w-32 h-32 mx-auto" />
        <div className="flex gap-2 mt-4">
          <Button onClick={handleRetake} variant="outline">Tirar Nova Foto</Button>
          <Button onClick={() => {/* Upload photo */}}>Salvar</Button>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-4">
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <video ref={videoRef} autoPlay className="rounded-lg w-full" />
      <div className="flex gap-2 mt-4">
        {!isActive ? (
          <Button onClick={startCamera}>Abrir Câmera</Button>
        ) : (
          <Button onClick={handleCapture}>Capturar Foto</Button>
        )}
      </div>
    </Card>
  )
}
```

---

## 📍 Geolocalização - Buscar Profissionais Próximos

```typescript
import { useEffect, useState } from 'react'
import { useGeolocation } from '@/hooks/use-geolocation'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

interface Professional {
  id: string
  name: string
  lat: number
  lng: number
}

function NearbyProfessionals() {
  const { coordinates, loading, error } = useGeolocation({ enableHighAccuracy: true })
  const [professionals, setProfessionals] = useState<Professional[]>([])

  useEffect(() => {
    if (coordinates) {
      // Buscar profissionais próximos
      fetchNearbyProfessionals(coordinates.latitude, coordinates.longitude)
        .then(setProfessionals)
    }
  }, [coordinates])

  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number) => {
    // Fórmula de Haversine simplificada
    const R = 6371 // Raio da Terra em km
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLng = (lng2 - lng1) * Math.PI / 180
    const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLng/2) * Math.sin(dLng/2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
    return R * c
  }

  if (loading) return <p>Obtendo sua localização...</p>
  if (error) return <p className="text-red-500">{error}</p>

  return (
    <div className="space-y-4">
      {coordinates && (
        <p className="text-sm text-muted-foreground">
          Sua localização: {coordinates.latitude.toFixed(4)}, {coordinates.longitude.toFixed(4)}
        </p>
      )}

      {professionals.map(prof => {
        const distance = coordinates
          ? calculateDistance(coordinates.latitude, coordinates.longitude, prof.lat, prof.lng)
          : 0

        return (
          <Card key={prof.id} className="p-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">{prof.name}</h3>
              <Badge>{distance.toFixed(1)} km</Badge>
            </div>
          </Card>
        )
      })}
    </div>
  )
}

async function fetchNearbyProfessionals(lat: number, lng: number): Promise<Professional[]> {
  // Implementar chamada à API
  return []
}
```

---

## 🔔 Notificações - Lembrete de Agendamento

```typescript
import { useEffect } from 'react'
import { useNotifications } from '@/hooks/use-notifications'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

function AppointmentReminder({ appointmentDate }: { appointmentDate: Date }) {
  const { permission, requestPermission, showNotification } = useNotifications()

  useEffect(() => {
    // Verificar se está próximo do horário
    const checkAppointment = setInterval(() => {
      const now = new Date()
      const diff = appointmentDate.getTime() - now.getTime()
      const minutesUntil = Math.floor(diff / 1000 / 60)

      // 30 minutos antes
      if (minutesUntil === 30 && permission === 'granted') {
        showNotification('Lembrete de Agendamento', {
          body: 'Seu agendamento começa em 30 minutos!',
          icon: '/icon.png',
          vibrate: [200, 100, 200],
          requireInteraction: true,
          data: { appointmentId: '123' }
        })
      }
    }, 60000) // Verificar a cada 1 minuto

    return () => clearInterval(checkAppointment)
  }, [appointmentDate, permission, showNotification])

  const handleEnableNotifications = async () => {
    const result = await requestPermission()
    if (result === 'granted') {
      toast.success('Notificações ativadas com sucesso!')
    } else {
      toast.error('Você precisa permitir notificações para receber lembretes')
    }
  }

  if (permission !== 'granted') {
    return (
      <div className="p-4 border rounded-lg bg-muted">
        <p className="mb-2">Ative as notificações para receber lembretes</p>
        <Button onClick={handleEnableNotifications}>Ativar Notificações</Button>
      </div>
    )
  }

  return (
    <div className="p-4 border rounded-lg bg-green-50">
      <p className="text-green-700">✓ Você receberá lembretes do agendamento</p>
    </div>
  )
}
```

---

## 📋 Clipboard - Copiar Link de Compartilhamento

```typescript
import { useClipboard } from '@/hooks/use-clipboard'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { Copy, Check } from 'lucide-react'

function ShareLink({ professionalId }: { professionalId: string }) {
  const { copyToClipboard, copiedText } = useClipboard()

  const shareUrl = `https://meuapp.com/professional/${professionalId}`
  const hasCopied = copiedText === shareUrl

  const handleCopy = async () => {
    const success = await copyToClipboard(shareUrl)
    if (success) {
      toast.success('Link copiado para a área de transferência!')
    } else {
      toast.error('Não foi possível copiar o link')
    }
  }

  return (
    <div className="flex gap-2">
      <Input value={shareUrl} readOnly />
      <Button onClick={handleCopy} variant={hasCopied ? 'default' : 'outline'}>
        {hasCopied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
      </Button>
    </div>
  )
}
```

---

## 📁 Upload - Anexar Documentos

```typescript
import { useFileUpload } from '@/hooks/use-file-upload'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Upload, X, FileText } from 'lucide-react'
import { toast } from 'sonner'

function DocumentUpload() {
  const {
    files,
    isDragging,
    addFiles,
    removeFile,
    clearFiles,
    openFileDialog,
    getInputProps,
    getDropzoneProps
  } = useFileUpload({
    accept: '.pdf,.doc,.docx,image/*',
    multiple: true,
    maxSize: 10 * 1024 * 1024, // 10MB
    maxFiles: 5
  })

  const handleUpload = async () => {
    // Upload dos arquivos para o servidor
    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      try {
        // Simular upload
        await uploadFile(file.file)
        toast.success(`${file.file.name} enviado com sucesso!`)
      } catch (error) {
        toast.error(`Erro ao enviar ${file.file.name}`)
      }
    }
  }

  return (
    <div className="space-y-4">
      <input {...getInputProps()} />

      <div
        {...getDropzoneProps()}
        onClick={openFileDialog}
        className={`
          border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
          transition-colors
          ${isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'}
        `}
      >
        <Upload className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
        <p className="text-sm mb-2">
          Clique para selecionar ou arraste arquivos aqui
        </p>
        <p className="text-xs text-muted-foreground">
          PDF, DOC, DOCX ou imagens (máx. 10MB cada)
        </p>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <p className="text-sm font-medium">Arquivos selecionados ({files.length})</p>
            <Button onClick={clearFiles} variant="ghost" size="sm">
              Limpar Todos
            </Button>
          </div>

          {files.map((file, index) => (
            <div key={index} className="flex items-center gap-2 p-3 border rounded">
              <FileText className="w-5 h-5 text-muted-foreground" />
              <div className="flex-1 min-w-0">
                <p className="text-sm truncate">{file.file.name}</p>
                <p className="text-xs text-muted-foreground">
                  {(file.file.size / 1024).toFixed(2)} KB
                </p>
                {file.error && (
                  <p className="text-xs text-red-500">{file.error}</p>
                )}
              </div>
              {file.preview && (
                <img src={file.preview} alt="" className="w-12 h-12 object-cover rounded" />
              )}
              <Button
                onClick={() => removeFile(index)}
                variant="ghost"
                size="sm"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ))}

          <Button onClick={handleUpload} className="w-full">
            Enviar {files.length} arquivo{files.length > 1 ? 's' : ''}
          </Button>
        </div>
      )}
    </div>
  )
}

async function uploadFile(file: File): Promise<void> {
  // Implementar upload real
  return new Promise((resolve) => setTimeout(resolve, 1000))
}
```

---

## 📳 Vibração - Feedback de Ações

```typescript
import { useVibration } from '@/hooks/use-vibration'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'

function ActionButtons() {
  const { vibratePattern, isSupported } = useVibration()

  const handleSuccess = () => {
    vibratePattern('success') // Vibração de sucesso
    toast.success('Ação realizada com sucesso!')
  }

  const handleError = () => {
    vibratePattern('error') // Vibração de erro
    toast.error('Ocorreu um erro')
  }

  const handleWarning = () => {
    vibratePattern('warning') // Vibração de aviso
    toast.warning('Atenção!')
  }

  if (!isSupported) {
    return <p>Vibração não suportada neste dispositivo</p>
  }

  return (
    <div className="flex gap-2">
      <Button onClick={handleSuccess} variant="default">
        Sucesso
      </Button>
      <Button onClick={handleError} variant="destructive">
        Erro
      </Button>
      <Button onClick={handleWarning} variant="outline">
        Aviso
      </Button>
    </div>
  )
}
```

---

## 🔗 Compartilhamento - Compartilhar Perfil

```typescript
import { useShare } from '@/hooks/use-share'
import { Button } from '@/components/ui/button'
import { Share2 } from 'lucide-react'
import { toast } from 'sonner'

function ShareProfile({ professional }: { professional: any }) {
  const { share, isSupported } = useShare()

  const handleShare = async () => {
    const success = await share({
      title: `Confira o perfil de ${professional.name}`,
      text: `${professional.name} - ${professional.category}`,
      url: `https://meuapp.com/professional/${professional.id}`
    })

    if (success) {
      toast.success('Perfil compartilhado!')
    }
  }

  if (!isSupported) {
    // Fallback: copiar link
    return (
      <Button variant="outline">
        Copiar Link
      </Button>
    )
  }

  return (
    <Button onClick={handleShare} variant="outline">
      <Share2 className="w-4 h-4 mr-2" />
      Compartilhar Perfil
    </Button>
  )
}
```

---

## 🔋 Bateria - Modo Economia de Energia

```typescript
import { useEffect, useState } from 'react'
import { useBattery } from '@/hooks/use-battery'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Battery, BatteryLow } from 'lucide-react'

function PowerSavingMode() {
  const { level, charging } = useBattery()
  const [powerSaving, setPowerSaving] = useState(false)

  useEffect(() => {
    // Ativar modo economia quando bateria < 20% e não estiver carregando
    if (level !== null && level < 0.2 && !charging) {
      setPowerSaving(true)
      // Reduzir animações, desabilitar recursos pesados, etc.
    } else if (level !== null && (level >= 0.3 || charging)) {
      setPowerSaving(false)
    }
  }, [level, charging])

  if (!powerSaving) return null

  return (
    <Alert variant="destructive">
      <BatteryLow className="w-4 h-4" />
      <AlertDescription>
        Modo economia de energia ativado. Bateria: {level && Math.round(level * 100)}%
      </AlertDescription>
    </Alert>
  )
}
```

---

## 📶 Rede - Modo Offline

```typescript
import { useNetwork } from '@/hooks/use-network'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { WifiOff } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

function NetworkStatus() {
  const { online, effectiveType, saveData } = useNetwork()

  if (!online) {
    return (
      <Alert variant="destructive">
        <WifiOff className="w-4 h-4" />
        <AlertDescription>
          Você está offline. Algumas funcionalidades podem não estar disponíveis.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="flex gap-2 items-center">
      <Badge variant="outline">Online</Badge>
      {effectiveType && (
        <Badge variant="outline" className="uppercase">
          {effectiveType}
        </Badge>
      )}
      {saveData && (
        <Badge variant="outline">Economia de dados ativa</Badge>
      )}
    </div>
  )
}
```

---

## 🔄 Orientação - Bloquear em Portrait para Formulário

```typescript
import { useEffect } from 'react'
import { useScreenOrientation } from '@/hooks/use-screen-orientation'

function ImportantForm() {
  const { lockOrientation, unlockOrientation } = useScreenOrientation()

  useEffect(() => {
    // Bloquear em modo retrato durante o formulário
    lockOrientation('portrait')

    // Desbloquear ao sair
    return () => {
      unlockOrientation()
    }
  }, [lockOrientation, unlockOrientation])

  return (
    <form className="p-4">
      <p className="text-sm text-muted-foreground mb-4">
        Tela bloqueada em modo retrato para melhor experiência
      </p>
      {/* Campos do formulário */}
    </form>
  )
}
```

---

## 🎯 Combinando Múltiplas Permissões

### Exemplo: App de Entrega com Localização em Tempo Real

```typescript
import { useGeolocation } from '@/hooks/use-geolocation'
import { useNotifications } from '@/hooks/use-notifications'
import { useVibration } from '@/hooks/use-vibration'
import { useNetwork } from '@/hooks/use-network'
import { useEffect } from 'react'

function DeliveryTracking({ orderId }: { orderId: string }) {
  const { coordinates, startWatching, stopWatching } = useGeolocation({ watch: true })
  const { showNotification } = useNotifications()
  const { vibratePattern } = useVibration()
  const { online } = useNetwork()

  useEffect(() => {
    startWatching() // Iniciar monitoramento de localização

    return () => stopWatching()
  }, [])

  useEffect(() => {
    if (coordinates && online) {
      // Enviar localização para o servidor
      updateDeliveryLocation(orderId, coordinates.latitude, coordinates.longitude)
    }
  }, [coordinates, online, orderId])

  const notifyArrival = () => {
    // Notificar chegada
    showNotification('Entrega Chegando!', {
      body: 'O entregador está chegando em 5 minutos',
      vibrate: [200, 100, 200, 100, 200]
    })
    vibratePattern('success')
  }

  return (
    <div>
      {/* UI de tracking */}
    </div>
  )
}

async function updateDeliveryLocation(orderId: string, lat: number, lng: number) {
  // Implementar
}
```

---

Estes exemplos demonstram casos de uso reais e práticos para cada hook de permissão!
