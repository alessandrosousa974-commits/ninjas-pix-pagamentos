import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { usePermission } from '@/hooks/use-permissions'
import { useCamera } from '@/hooks/use-camera'
import { useGeolocation } from '@/hooks/use-geolocation'
import { useMicrophone } from '@/hooks/use-microphone'
import { useNotifications } from '@/hooks/use-notifications'
import { useClipboard } from '@/hooks/use-clipboard'
import { useFileUpload } from '@/hooks/use-file-upload'
import {
  Camera,
  Mic,
  MapPin,
  Bell,
  Copy,
  Upload,
  Check,
  X,
  AlertCircle,
  Play,
  Square,
  Trash2
} from 'lucide-react'

export function PermissionsDemo() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Demonstração de Permissões</h1>
        <p className="text-muted-foreground">
          Exemplos de uso das permissões: câmera, microfone, localização, notificações e mais
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <CameraDemo />
        <MicrophoneDemo />
        <GeolocationDemo />
        <NotificationsDemo />
        <ClipboardDemo />
        <FileUploadDemo />
      </div>
    </div>
  )
}

function CameraDemo() {
  const cameraPermission = usePermission('camera')
  const { videoRef, isActive, error, startCamera, stopCamera, takePhoto } = useCamera()
  const [photo, setPhoto] = useState<string | null>(null)

  const handleTakePhoto = () => {
    const photoData = takePhoto()
    if (photoData) setPhoto(photoData)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Camera className="w-5 h-5" />
            <CardTitle>Câmera</CardTitle>
          </div>
          <PermissionBadge status={cameraPermission.status} />
        </div>
        <CardDescription>Acesso à câmera do dispositivo</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="w-4 h-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            className="w-full rounded-lg bg-muted"
            style={{ display: isActive ? 'block' : 'none' }}
          />

          {photo && (
            <div>
              <p className="text-sm font-medium mb-2">Foto capturada:</p>
              <img src={photo} alt="Captured" className="w-full rounded-lg" />
            </div>
          )}
        </div>

        <div className="flex gap-2">
          {!isActive ? (
            <Button onClick={startCamera} className="flex-1">
              <Play className="w-4 h-4 mr-2" />
              Iniciar Câmera
            </Button>
          ) : (
            <>
              <Button onClick={handleTakePhoto} variant="outline">
                <Camera className="w-4 h-4 mr-2" />
                Tirar Foto
              </Button>
              <Button onClick={stopCamera} variant="destructive">
                <Square className="w-4 h-4 mr-2" />
                Parar
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function MicrophoneDemo() {
  const micPermission = usePermission('microphone')
  const { isRecording, error, audioLevel, startRecording, stopRecording, getAudioUrl } = useMicrophone()
  const [audioUrl, setAudioUrl] = useState<string | null>(null)

  const handleStopRecording = async () => {
    const url = await getAudioUrl()
    if (url) setAudioUrl(url)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Mic className="w-5 h-5" />
            <CardTitle>Microfone</CardTitle>
          </div>
          <PermissionBadge status={micPermission.status} />
        </div>
        <CardDescription>Gravação de áudio</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="w-4 h-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {isRecording && (
          <div>
            <p className="text-sm mb-2">Nível de áudio:</p>
            <div className="w-full bg-muted rounded-full h-4 overflow-hidden">
              <div
                className="bg-primary h-full transition-all duration-100"
                style={{ width: `${audioLevel * 100}%` }}
              />
            </div>
          </div>
        )}

        {audioUrl && (
          <div>
            <p className="text-sm font-medium mb-2">Áudio gravado:</p>
            <audio src={audioUrl} controls className="w-full" />
          </div>
        )}

        <div className="flex gap-2">
          {!isRecording ? (
            <Button onClick={startRecording} className="flex-1">
              <Mic className="w-4 h-4 mr-2" />
              Gravar
            </Button>
          ) : (
            <Button onClick={handleStopRecording} variant="destructive" className="flex-1">
              <Square className="w-4 h-4 mr-2" />
              Parar Gravação
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  )
}

function GeolocationDemo() {
  const geoPermission = usePermission('geolocation')
  const { coordinates, error, loading, getCurrentPosition } = useGeolocation()

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            <CardTitle>Localização</CardTitle>
          </div>
          <PermissionBadge status={geoPermission.status} />
        </div>
        <CardDescription>Acesso à localização GPS</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <AlertCircle className="w-4 h-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {coordinates && (
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Latitude:</span>
              <span className="font-mono">{coordinates.latitude.toFixed(6)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Longitude:</span>
              <span className="font-mono">{coordinates.longitude.toFixed(6)}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Precisão:</span>
              <span className="font-mono">{coordinates.accuracy.toFixed(0)}m</span>
            </div>
          </div>
        )}

        <Button onClick={getCurrentPosition} disabled={loading} className="w-full">
          <MapPin className="w-4 h-4 mr-2" />
          {loading ? 'Obtendo localização...' : 'Obter Localização'}
        </Button>
      </CardContent>
    </Card>
  )
}

function NotificationsDemo() {
  const { permission, requestPermission, showNotification } = useNotifications()

  const handleShowNotification = async () => {
    await showNotification('Notificação de Teste', {
      body: 'Esta é uma notificação de demonstração!',
      icon: '/favicon.ico',
      vibrate: [200, 100, 200]
    })
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bell className="w-5 h-5" />
            <CardTitle>Notificações</CardTitle>
          </div>
          <PermissionBadge status={permission === 'default' ? 'prompt' : permission as any} />
        </div>
        <CardDescription>Enviar notificações push</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {permission === 'granted' ? (
          <Button onClick={handleShowNotification} className="w-full">
            <Bell className="w-4 h-4 mr-2" />
            Enviar Notificação
          </Button>
        ) : (
          <Button onClick={requestPermission} className="w-full">
            Solicitar Permissão
          </Button>
        )}
      </CardContent>
    </Card>
  )
}

function ClipboardDemo() {
  const { copiedText, copyToClipboard, readFromClipboard } = useClipboard()
  const [clipboardContent, setClipboardContent] = useState<string | null>(null)

  const handleRead = async () => {
    const content = await readFromClipboard()
    setClipboardContent(content)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Copy className="w-5 h-5" />
          <CardTitle>Área de Transferência</CardTitle>
        </div>
        <CardDescription>Copiar e colar textos</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Button onClick={() => copyToClipboard('Texto copiado!')} variant="outline">
            <Copy className="w-4 h-4 mr-2" />
            Copiar Texto
          </Button>
          <Button onClick={handleRead} variant="outline">
            Ler Clipboard
          </Button>
        </div>

        {copiedText && (
          <Alert>
            <Check className="w-4 h-4" />
            <AlertDescription>Texto copiado: {copiedText}</AlertDescription>
          </Alert>
        )}

        {clipboardContent && (
          <div>
            <p className="text-sm font-medium mb-2">Conteúdo do clipboard:</p>
            <p className="text-sm p-2 bg-muted rounded">{clipboardContent}</p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function FileUploadDemo() {
  const { files, isDragging, removeFile, openFileDialog, getInputProps, getDropzoneProps } = useFileUpload({
    accept: 'image/*',
    multiple: true,
    maxSize: 5 * 1024 * 1024, // 5MB
    generatePreview: true
  })

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Upload className="w-5 h-5" />
          <CardTitle>Upload de Arquivos</CardTitle>
        </div>
        <CardDescription>Selecione ou arraste arquivos</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <input {...getInputProps()} />

        <div
          {...getDropzoneProps()}
          onClick={openFileDialog}
          className={`
            border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors
            ${isDragging ? 'border-primary bg-primary/5' : 'border-muted-foreground/25'}
          `}
        >
          <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            Clique ou arraste imagens aqui
          </p>
        </div>

        {files.length > 0 && (
          <div className="space-y-2">
            {files.map((uploadedFile, index) => (
              <div key={index} className="flex items-center gap-2 p-2 border rounded">
                {uploadedFile.preview && (
                  <img src={uploadedFile.preview} alt="" className="w-12 h-12 object-cover rounded" />
                )}
                <div className="flex-1 min-w-0">
                  <p className="text-sm truncate">{uploadedFile.file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(uploadedFile.file.size / 1024).toFixed(2)} KB
                  </p>
                </div>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => removeFile(index)}
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function PermissionBadge({ status }: { status: string }) {
  const variants: Record<string, { variant: 'default' | 'destructive' | 'outline', icon: any }> = {
    granted: { variant: 'default', icon: Check },
    denied: { variant: 'destructive', icon: X },
    prompt: { variant: 'outline', icon: AlertCircle },
    unsupported: { variant: 'outline', icon: X }
  }

  const config = variants[status] || variants.prompt
  const Icon = config.icon

  return (
    <Badge variant={config.variant}>
      <Icon className="w-3 h-3 mr-1" />
      {status === 'granted' ? 'Permitido' :
       status === 'denied' ? 'Negado' :
       status === 'unsupported' ? 'Não suportado' :
       'Pendente'}
    </Badge>
  )
}
