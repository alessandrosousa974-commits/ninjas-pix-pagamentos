import { useState } from 'react'
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Progress } from '@/components/ui/progress'
import { useContacts } from '@/hooks/use-contacts'
import { useShare } from '@/hooks/use-share'
import { useVibration } from '@/hooks/use-vibration'
import { useBattery } from '@/hooks/use-battery'
import { useNetwork } from '@/hooks/use-network'
import { useScreenOrientation } from '@/hooks/use-screen-orientation'
import {
  Users,
  Share2,
  Smartphone,
  Battery,
  BatteryCharging,
  Wifi,
  WifiOff,
  RotateCw,
  CheckCircle,
  XCircle,
  Zap,
  Signal
} from 'lucide-react'

export function AdvancedPermissionsDemo() {
  return (
    <div className="container mx-auto p-6 space-y-6">
      <div>
        <h1 className="text-3xl font-bold mb-2">Recursos Avançados do Dispositivo</h1>
        <p className="text-muted-foreground">
          Acesso a contatos, compartilhamento, vibração, bateria, rede e orientação
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <ContactsDemo />
        <ShareDemo />
        <VibrationDemo />
        <BatteryDemo />
        <NetworkDemo />
        <OrientationDemo />
      </div>
    </div>
  )
}

function ContactsDemo() {
  const { isSupported, error, selectContacts } = useContacts()
  const [selectedContacts, setSelectedContacts] = useState<any[]>([])

  const handleSelectContacts = async () => {
    const contacts = await selectContacts(['name', 'email', 'tel'], { multiple: true })
    if (contacts) {
      setSelectedContacts(contacts)
    }
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="w-5 h-5" />
            <CardTitle>Contatos</CardTitle>
          </div>
          <Badge variant={isSupported ? 'default' : 'outline'}>
            {isSupported ? 'Suportado' : 'Não suportado'}
          </Badge>
        </div>
        <CardDescription>Acesso à lista de contatos</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <XCircle className="w-4 h-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {selectedContacts.length > 0 && (
          <div className="space-y-2">
            <p className="text-sm font-medium">Contatos selecionados:</p>
            {selectedContacts.map((contact, index) => (
              <div key={index} className="p-2 border rounded text-sm">
                <p className="font-medium">{contact.name?.[0] || 'Sem nome'}</p>
                {contact.email && <p className="text-muted-foreground">{contact.email[0]}</p>}
                {contact.tel && <p className="text-muted-foreground">{contact.tel[0]}</p>}
              </div>
            ))}
          </div>
        )}

        <Button onClick={handleSelectContacts} disabled={!isSupported} className="w-full">
          <Users className="w-4 h-4 mr-2" />
          Selecionar Contatos
        </Button>
      </CardContent>
    </Card>
  )
}

function ShareDemo() {
  const { isSupported, error, share } = useShare()
  const [shared, setShared] = useState(false)

  const handleShare = async () => {
    const success = await share({
      title: 'Lasy App',
      text: 'Confira esta aplicação incrível!',
      url: window.location.href
    })
    setShared(success)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Share2 className="w-5 h-5" />
            <CardTitle>Compartilhamento</CardTitle>
          </div>
          <Badge variant={isSupported ? 'default' : 'outline'}>
            {isSupported ? 'Suportado' : 'Não suportado'}
          </Badge>
        </div>
        <CardDescription>Compartilhar conteúdo</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="destructive">
            <XCircle className="w-4 h-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {shared && (
          <Alert>
            <CheckCircle className="w-4 h-4" />
            <AlertDescription>Conteúdo compartilhado com sucesso!</AlertDescription>
          </Alert>
        )}

        <Button onClick={handleShare} disabled={!isSupported} className="w-full">
          <Share2 className="w-4 h-4 mr-2" />
          Compartilhar App
        </Button>
      </CardContent>
    </Card>
  )
}

function VibrationDemo() {
  const { isSupported, vibratePattern } = useVibration()
  const [vibrating, setVibrating] = useState(false)

  const handleVibrate = (pattern: 'short' | 'double' | 'success' | 'error') => {
    vibratePattern(pattern)
    setVibrating(true)
    setTimeout(() => setVibrating(false), 1000)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Smartphone className="w-5 h-5" />
            <CardTitle>Vibração</CardTitle>
          </div>
          <Badge variant={isSupported ? 'default' : 'outline'}>
            {isSupported ? 'Suportado' : 'Não suportado'}
          </Badge>
        </div>
        <CardDescription>Feedback háptico</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {vibrating && (
          <Alert>
            <Zap className="w-4 h-4" />
            <AlertDescription>Vibrando...</AlertDescription>
          </Alert>
        )}

        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={() => handleVibrate('short')}
            disabled={!isSupported}
            variant="outline"
            size="sm"
          >
            Curto
          </Button>
          <Button
            onClick={() => handleVibrate('double')}
            disabled={!isSupported}
            variant="outline"
            size="sm"
          >
            Duplo
          </Button>
          <Button
            onClick={() => handleVibrate('success')}
            disabled={!isSupported}
            variant="outline"
            size="sm"
          >
            Sucesso
          </Button>
          <Button
            onClick={() => handleVibrate('error')}
            disabled={!isSupported}
            variant="outline"
            size="sm"
          >
            Erro
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function BatteryDemo() {
  const { level, charging, chargingTime, dischargingTime, isSupported } = useBattery()

  const formatTime = (seconds: number | null) => {
    if (!seconds || seconds === Infinity) return 'N/A'
    const hours = Math.floor(seconds / 3600)
    const minutes = Math.floor((seconds % 3600) / 60)
    return `${hours}h ${minutes}m`
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {charging ? (
              <BatteryCharging className="w-5 h-5 text-green-500" />
            ) : (
              <Battery className="w-5 h-5" />
            )}
            <CardTitle>Bateria</CardTitle>
          </div>
          <Badge variant={isSupported ? 'default' : 'outline'}>
            {isSupported ? 'Suportado' : 'Não suportado'}
          </Badge>
        </div>
        <CardDescription>Status da bateria</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isSupported && level !== null && (
          <>
            <div>
              <div className="flex justify-between mb-2 text-sm">
                <span>Nível</span>
                <span className="font-bold">{Math.round(level * 100)}%</span>
              </div>
              <Progress value={level * 100} />
            </div>

            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Status:</span>
                <span className={charging ? 'text-green-500' : ''}>
                  {charging ? 'Carregando' : 'Descarregando'}
                </span>
              </div>
              {charging && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tempo até carga completa:</span>
                  <span>{formatTime(chargingTime)}</span>
                </div>
              )}
              {!charging && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tempo restante:</span>
                  <span>{formatTime(dischargingTime)}</span>
                </div>
              )}
            </div>
          </>
        )}

        {!isSupported && (
          <Alert>
            <AlertDescription>API de bateria não disponível neste navegador</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}

function NetworkDemo() {
  const { online, effectiveType, downlink, rtt, saveData, isSupported } = useNetwork()

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            {online ? (
              <Wifi className="w-5 h-5 text-green-500" />
            ) : (
              <WifiOff className="w-5 h-5 text-red-500" />
            )}
            <CardTitle>Rede</CardTitle>
          </div>
          <Badge variant={online ? 'default' : 'destructive'}>
            {online ? 'Online' : 'Offline'}
          </Badge>
        </div>
        <CardDescription>Status da conexão</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isSupported && (
          <div className="space-y-2 text-sm">
            {effectiveType && (
              <div className="flex justify-between items-center">
                <span className="text-muted-foreground">Tipo de conexão:</span>
                <Badge variant="outline" className="uppercase">
                  <Signal className="w-3 h-3 mr-1" />
                  {effectiveType}
                </Badge>
              </div>
            )}
            {downlink && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Velocidade:</span>
                <span>{downlink.toFixed(2)} Mbps</span>
              </div>
            )}
            {rtt !== undefined && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Latência:</span>
                <span>{rtt} ms</span>
              </div>
            )}
            {saveData !== undefined && (
              <div className="flex justify-between">
                <span className="text-muted-foreground">Economia de dados:</span>
                <span>{saveData ? 'Ativada' : 'Desativada'}</span>
              </div>
            )}
          </div>
        )}

        {!isSupported && (
          <Alert>
            <AlertDescription>Informações detalhadas de rede não disponíveis</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}

function OrientationDemo() {
  const { type, angle, isSupported, lockOrientation, unlockOrientation } = useScreenOrientation()
  const [locked, setLocked] = useState(false)

  const handleLock = async (orientation: OrientationLockType) => {
    const success = await lockOrientation(orientation)
    setLocked(success)
  }

  const handleUnlock = () => {
    unlockOrientation()
    setLocked(false)
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <RotateCw className="w-5 h-5" />
            <CardTitle>Orientação</CardTitle>
          </div>
          <Badge variant={isSupported ? 'default' : 'outline'}>
            {isSupported ? 'Suportado' : 'Não suportado'}
          </Badge>
        </div>
        <CardDescription>Orientação da tela</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {isSupported && type && (
          <div className="space-y-2 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Orientação atual:</span>
              <span className="font-medium">{type}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Ângulo:</span>
              <span className="font-medium">{angle}°</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Bloqueio:</span>
              <span className={locked ? 'text-orange-500' : ''}>
                {locked ? 'Ativo' : 'Inativo'}
              </span>
            </div>
          </div>
        )}

        <div className="grid grid-cols-2 gap-2">
          <Button
            onClick={() => handleLock('portrait')}
            disabled={!isSupported}
            variant="outline"
            size="sm"
          >
            Retrato
          </Button>
          <Button
            onClick={() => handleLock('landscape')}
            disabled={!isSupported}
            variant="outline"
            size="sm"
          >
            Paisagem
          </Button>
          <Button
            onClick={handleUnlock}
            disabled={!isSupported || !locked}
            variant="outline"
            size="sm"
            className="col-span-2"
          >
            Desbloquear
          </Button>
        </div>

        {!isSupported && (
          <Alert>
            <AlertDescription>API de orientação não disponível</AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  )
}
