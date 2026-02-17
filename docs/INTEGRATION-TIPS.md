# 💡 Dicas de Integração - Sistema de Permissões

Este documento contém dicas práticas para integrar o sistema de permissões nos seus componentes existentes.

## 🎯 Onde Usar Cada Permissão

### 📷 Câmera

**Onde usar:**
- Foto de perfil de usuários
- Upload de documentos
- Verificação de identidade
- Foto de serviços realizados
- Antes e depois de trabalhos

**Exemplo de integração:**

```typescript
// src/pages/Profile.tsx
import { useCamera } from '@/hooks'
import { Avatar } from '@/components/ui/avatar'
import { Button } from '@/components/ui/button'

export default function Profile() {
  const { videoRef, isActive, startCamera, takePhoto } = useCamera()
  const [profilePhoto, setProfilePhoto] = useState<string | null>(null)

  const handleCapturePhoto = () => {
    const photo = takePhoto()
    if (photo) {
      setProfilePhoto(photo)
      // Enviar para servidor
      uploadProfilePhoto(photo)
    }
  }

  return (
    <div>
      <Avatar src={profilePhoto || '/default-avatar.png'} />
      <Button onClick={startCamera}>Alterar Foto</Button>
      {isActive && (
        <div>
          <video ref={videoRef} autoPlay />
          <Button onClick={handleCapturePhoto}>Capturar</Button>
        </div>
      )}
    </div>
  )
}
```

---

### 📍 GPS / Geolocalização

**Onde usar:**
- Buscar profissionais próximos
- Calcular distância
- Rastreamento de entrega
- Filtrar por localização
- Mapa de serviços

**Exemplo de integração:**

```typescript
// src/pages/Dashboard.tsx
import { useGeolocation } from '@/hooks'
import { useEffect, useState } from 'react'

export default function Dashboard() {
  const { coordinates, getCurrentPosition } = useGeolocation()
  const [nearbyProfessionals, setNearbyProfessionals] = useState([])

  useEffect(() => {
    if (coordinates) {
      // Buscar profissionais próximos
      fetchNearbyProfessionals(coordinates.latitude, coordinates.longitude)
        .then(setNearbyProfessionals)
    }
  }, [coordinates])

  return (
    <div>
      <Button onClick={getCurrentPosition}>
        Encontrar Profissionais Próximos
      </Button>
      {nearbyProfessionals.map(prof => (
        <ProfessionalCard key={prof.id} professional={prof} />
      ))}
    </div>
  )
}
```

---

### 🔔 Notificações

**Onde usar:**
- Lembrete de agendamentos
- Mensagens recebidas
- Atualizações de status
- Confirmações importantes
- Alertas de segurança

**Exemplo de integração:**

```typescript
// src/contexts/NotificationContext.tsx
import { createContext, useContext, useEffect } from 'react'
import { useNotifications } from '@/hooks'

const NotificationContext = createContext(null)

export function NotificationProvider({ children }) {
  const { permission, requestPermission, showNotification } = useNotifications()

  useEffect(() => {
    // Solicitar permissão no primeiro acesso
    if (permission === 'default') {
      requestPermission()
    }
  }, [])

  const notifyNewMessage = (from: string, message: string) => {
    showNotification(`Nova mensagem de ${from}`, {
      body: message,
      icon: '/message-icon.png',
      vibrate: [200, 100, 200],
      tag: 'message'
    })
  }

  return (
    <NotificationContext.Provider value={{ notifyNewMessage }}>
      {children}
    </NotificationContext.Provider>
  )
}
```

---

### 📋 Clipboard

**Onde usar:**
- Copiar link de compartilhamento
- Copiar código de referência
- Copiar detalhes de pagamento
- Copiar endereço
- Compartilhar informações

**Exemplo de integração:**

```typescript
// src/components/ShareButton.tsx
import { useClipboard } from '@/hooks'
import { Button } from '@/components/ui/button'
import { toast } from 'sonner'
import { Copy } from 'lucide-react'

export function ShareButton({ url }: { url: string }) {
  const { copyToClipboard } = useClipboard()

  const handleCopy = async () => {
    const success = await copyToClipboard(url)
    if (success) {
      toast.success('Link copiado!')
    }
  }

  return (
    <Button onClick={handleCopy} variant="outline" size="sm">
      <Copy className="w-4 h-4 mr-2" />
      Copiar Link
    </Button>
  )
}
```

---

### 📁 Upload de Arquivos

**Onde usar:**
- Upload de documentos
- Envio de comprovantes
- Galeria de fotos
- Anexos de mensagens
- Portfolio de trabalhos

**Exemplo de integração:**

```typescript
// src/components/DocumentUpload.tsx
import { useFileUpload } from '@/hooks'
import { Button } from '@/components/ui/button'
import { Upload } from 'lucide-react'

export function DocumentUpload() {
  const { files, openFileDialog, getInputProps, getDropzoneProps } = useFileUpload({
    accept: '.pdf,.doc,.docx,image/*',
    maxSize: 10 * 1024 * 1024
  })

  const handleUpload = async () => {
    for (const file of files) {
      await uploadToServer(file.file)
    }
  }

  return (
    <div>
      <input {...getInputProps()} />
      <div {...getDropzoneProps()} onClick={openFileDialog}>
        <Upload className="w-8 h-8" />
        <p>Clique ou arraste arquivos aqui</p>
      </div>
      {files.length > 0 && (
        <Button onClick={handleUpload}>Enviar {files.length} arquivo(s)</Button>
      )}
    </div>
  )
}
```

---

### 📳 Vibração

**Onde usar:**
- Feedback de ações importantes
- Confirmação de pagamento
- Alerta de emergência
- Notificações críticas
- Interações de jogo/quiz

**Exemplo de integração:**

```typescript
// src/utils/feedback.ts
import { useVibration } from '@/hooks'

export function useFeedback() {
  const { vibratePattern } = useVibration()

  const success = () => {
    vibratePattern('success')
    toast.success('Operação realizada!')
  }

  const error = () => {
    vibratePattern('error')
    toast.error('Ocorreu um erro')
  }

  const warning = () => {
    vibratePattern('warning')
    toast.warning('Atenção!')
  }

  return { success, error, warning }
}
```

---

### 🔗 Compartilhamento

**Onde usar:**
- Compartilhar perfil de profissional
- Compartilhar serviço
- Indicar app para amigos
- Compartilhar avaliações
- Divulgar promoções

**Exemplo de integração:**

```typescript
// src/components/ProfessionalCard.tsx
import { useShare } from '@/hooks'
import { Button } from '@/components/ui/button'
import { Share2 } from 'lucide-react'

export function ProfessionalCard({ professional }) {
  const { share, canShare } = useShare()

  const handleShare = async () => {
    await share({
      title: `Confira ${professional.name}`,
      text: `${professional.name} - ${professional.category}`,
      url: `https://app.com/professional/${professional.id}`
    })
  }

  if (!canShare()) return null

  return (
    <div>
      {/* Card content */}
      <Button onClick={handleShare} variant="outline" size="sm">
        <Share2 className="w-4 h-4 mr-2" />
        Compartilhar
      </Button>
    </div>
  )
}
```

---

### 🔋 Bateria

**Onde usar:**
- Modo economia de energia
- Otimizações automáticas
- Alertas de bateria baixa
- Ajustar qualidade de mídia
- Reduzir animações

**Exemplo de integração:**

```typescript
// src/hooks/use-power-mode.ts
import { useBattery } from '@/hooks'
import { useEffect, useState } from 'react'

export function usePowerMode() {
  const { level, charging } = useBattery()
  const [powerSavingMode, setPowerSavingMode] = useState(false)

  useEffect(() => {
    // Ativar modo economia quando bateria < 20%
    if (level !== null && level < 0.2 && !charging) {
      setPowerSavingMode(true)
    } else {
      setPowerSavingMode(false)
    }
  }, [level, charging])

  return { powerSavingMode, batteryLevel: level }
}

// Uso em componente:
function App() {
  const { powerSavingMode } = usePowerMode()

  return (
    <div className={powerSavingMode ? 'reduced-animations' : ''}>
      {powerSavingMode && <Alert>Modo economia ativo</Alert>}
      {/* App content */}
    </div>
  )
}
```

---

### 📶 Rede

**Onde usar:**
- Modo offline
- Sync inteligente
- Ajustar qualidade de mídia
- Cache de dados
- Alertas de conexão

**Exemplo de integração:**

```typescript
// src/hooks/use-sync.ts
import { useNetwork } from '@/hooks'
import { useEffect } from 'react'

export function useSmartSync() {
  const { online, effectiveType, saveData } = useNetwork()

  useEffect(() => {
    if (online && !saveData) {
      // Sincronizar dados pendentes
      syncPendingData()

      if (effectiveType === '4g') {
        // Fazer download de recursos pesados
        downloadHeavyAssets()
      }
    }
  }, [online, effectiveType, saveData])

  return { canSync: online && !saveData }
}
```

---

## 🎯 Padrões Recomendados

### 1. Solicitar Permissão no Contexto

**❌ Ruim:**
```typescript
// Solicitar todas as permissões ao iniciar o app
useEffect(() => {
  requestCamera()
  requestMicrophone()
  requestGeolocation()
  requestNotifications()
}, [])
```

**✅ Bom:**
```typescript
// Solicitar apenas quando o usuário for usar
const handleTakePhoto = async () => {
  // Explica ao usuário antes de solicitar
  toast.info('Precisamos acessar sua câmera para a foto de perfil')

  const camera = await startCamera()
  if (!camera) {
    toast.error('Permissão de câmera negada')
  }
}
```

---

### 2. Fornecer Alternativas

```typescript
function LocationSearch() {
  const { coordinates, error } = useGeolocation()

  if (error) {
    // Permitir busca manual por CEP/endereço
    return <ManualAddressSearch />
  }

  return <NearbyResults coordinates={coordinates} />
}
```

---

### 3. Feedback Visual Claro

```typescript
function CameraCapture() {
  const { isActive, error, startCamera } = useCamera()

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="w-4 h-4" />
        <AlertDescription>
          Não foi possível acessar a câmera. Verifique as permissões.
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <div>
      {!isActive && (
        <Button onClick={startCamera}>
          <Camera className="w-4 h-4 mr-2" />
          Abrir Câmera
        </Button>
      )}
    </div>
  )
}
```

---

### 4. Cleanup Adequado

```typescript
function LiveTracking() {
  const { startWatching, stopWatching } = useGeolocation({ watch: true })

  useEffect(() => {
    startWatching()

    // Sempre parar o monitoramento ao desmontar
    return () => {
      stopWatching()
    }
  }, [])

  return <Map />
}
```

---

## 🔐 Checklist de Segurança

Ao integrar permissões, sempre:

- [ ] Explicar ao usuário POR QUE você precisa da permissão
- [ ] Solicitar permissão apenas quando necessário (não ao iniciar o app)
- [ ] Fornecer alternativas se a permissão for negada
- [ ] Tratar erros adequadamente
- [ ] Fazer cleanup de recursos (parar câmera, parar GPS, etc.)
- [ ] Respeitar o modo economia de dados
- [ ] Não armazenar dados sensíveis sem consentimento
- [ ] Usar HTTPS em produção
- [ ] Testar em diferentes navegadores e dispositivos

---

## 📱 Testes Recomendados

### Desktop
1. Chrome - Todas as funcionalidades
2. Firefox - Permissões básicas
3. Safari - Permissões básicas
4. Edge - Todas as funcionalidades

### Mobile
1. iOS Safari - Câmera, GPS, Notificações
2. Android Chrome - Todos os recursos
3. Modo offline - Verificar fallbacks

---

## 🎓 Exemplos de Projetos Reais

### App de Delivery
- GPS para rastreamento
- Notificações de status
- Compartilhamento de pedido
- Modo offline para cache

### App de Serviços
- Câmera para fotos de trabalhos
- GPS para profissionais próximos
- Notificações de agendamentos
- Upload de documentos

### App de Chat
- Câmera para fotos
- Microfone para áudio
- Notificações de mensagens
- Compartilhamento de mídia

---

**💡 Dica final:** Sempre teste as permissões em dispositivos reais, não apenas no navegador desktop!
