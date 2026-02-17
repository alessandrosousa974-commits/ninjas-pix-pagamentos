# ⚡ Referência Rápida - Permissões

Guia de consulta rápida para desenvolvedores.

## 📦 Importação

```typescript
// Importar hooks individuais
import { useCamera, useGeolocation, useNotifications } from '@/hooks'

// Ou importar tudo
import * as Permissions from '@/hooks'
```

---

## 🎯 Cheat Sheet

### 📷 Câmera

```typescript
const { videoRef, isActive, error, startCamera, stopCamera, takePhoto, switchCamera } = useCamera({
  facingMode: 'user', // 'user' | 'environment'
  width: 1280,
  height: 720
})

// Usar:
await startCamera()
const photo = takePhoto() // retorna base64
stopCamera()
```

---

### 🎤 Microfone

```typescript
const {
  isRecording,
  audioLevel, // 0 a 1
  error,
  startRecording,
  stopRecording,
  getAudioUrl
} = useMicrophone({
  echoCancellation: true,
  noiseSuppression: true
})

// Usar:
await startRecording()
const audioUrl = await getAudioUrl()
```

---

### 📍 GPS

```typescript
const {
  coordinates, // { latitude, longitude, accuracy, ... }
  loading,
  error,
  getCurrentPosition,
  startWatching,
  stopWatching
} = useGeolocation({
  enableHighAccuracy: true,
  watch: false
})

// Usar:
getCurrentPosition()
// ou
startWatching() // monitoramento contínuo
```

---

### 🔔 Notificações

```typescript
const { permission, requestPermission, showNotification } = useNotifications()

// Usar:
await requestPermission()
await showNotification('Título', {
  body: 'Mensagem',
  icon: '/icon.png',
  vibrate: [200, 100, 200]
})
```

---

### 📋 Clipboard

```typescript
const { copiedText, error, copyToClipboard, readFromClipboard } = useClipboard()

// Usar:
await copyToClipboard('texto')
const text = await readFromClipboard()
```

---

### 📁 Upload

```typescript
const {
  files,
  isDragging,
  openFileDialog,
  removeFile,
  getInputProps,
  getDropzoneProps
} = useFileUpload({
  accept: 'image/*',
  multiple: true,
  maxSize: 5 * 1024 * 1024
})

// Usar no JSX:
<input {...getInputProps()} />
<div {...getDropzoneProps()} onClick={openFileDialog}>
  Arraste arquivos aqui
</div>
```

---

### 👥 Contatos

```typescript
const { selectContacts } = useContacts()

// Usar:
const contacts = await selectContacts(['name', 'email', 'tel'], { multiple: true })
```

---

### 🔗 Share

```typescript
const { share, canShare } = useShare()

// Usar:
await share({
  title: 'Título',
  text: 'Texto',
  url: 'https://...'
})
```

---

### 📳 Vibração

```typescript
const { vibrate, vibratePattern, patterns } = useVibration()

// Usar:
vibrate(200) // ms
vibratePattern('success') // padrão pré-definido
vibrate([100, 50, 100, 50, 100]) // padrão customizado
```

---

### 🔋 Bateria

```typescript
const { level, charging, chargingTime, dischargingTime } = useBattery()

// Usar:
if (level && level < 0.2) {
  // Ativar modo economia
}
```

---

### 📶 Rede

```typescript
const { online, effectiveType, downlink, rtt, saveData } = useNetwork()

// Usar:
if (online && effectiveType === '4g' && !saveData) {
  // Download de recursos pesados
}
```

---

### 🔄 Orientação

```typescript
const { type, angle, lockOrientation, unlockOrientation } = useScreenOrientation()

// Usar:
await lockOrientation('portrait')
unlockOrientation()
```

---

## 🎨 Componentes Prontos

```typescript
import { PermissionsDemo } from '@/components/permissions-demo'
import { AdvancedPermissionsDemo } from '@/components/advanced-permissions-demo'
import { PermissionsQuickAccess } from '@/components/permissions-quick-access'
import { PermissionsStatusBadge } from '@/components/permissions-status-badge'
import { PermissionsHelp } from '@/components/permissions-help'
```

---

## 🔐 Tratamento de Erros

```typescript
const { error, startCamera } = useCamera()

if (error) {
  // Mostrar mensagem ao usuário
  toast.error(error)
}

// Ou usar try/catch
try {
  await startCamera()
} catch (err) {
  console.error('Erro ao acessar câmera:', err)
}
```

---

## 📊 Verificar Suporte

```typescript
const { isSupported } = useNotifications()
const { isSupported: cameraSupported } = usePermission('camera')

if (!isSupported) {
  // Mostrar fallback
}
```

---

## 🎯 Padrões Comuns

### Solicitar no Contexto

```typescript
const handleAction = async () => {
  // Explica ao usuário
  toast.info('Precisamos acessar a câmera')

  // Solicita permissão
  const stream = await startCamera()

  if (!stream) {
    toast.error('Permissão negada')
    return
  }

  // Continua a ação...
}
```

---

### Cleanup ao Desmontar

```typescript
useEffect(() => {
  startWatching()

  return () => {
    stopWatching() // Sempre fazer cleanup!
  }
}, [])
```

---

### Feedback Visual

```typescript
{loading && <Skeleton />}
{error && <Alert variant="destructive">{error}</Alert>}
{data && <DataDisplay data={data} />}
```

---

## 📱 Testes Rápidos

### Desktop
```bash
# Chrome DevTools
- F12 → Console → "Sensors" tab
- Simular GPS: Lat/Long customizados
- Testar offline: Network tab → Offline
```

### Mobile
```bash
# Android Chrome
chrome://inspect → Remote devices

# iOS Safari
Settings → Safari → Advanced → Web Inspector
```

---

## 🔗 Links Úteis

- **Página de Demo:** `/permissions`
- **Docs Completa:** `docs/PERMISSIONS.md`
- **Exemplos:** `docs/EXAMPLES.md`
- **Dicas:** `docs/INTEGRATION-TIPS.md`

---

## ⚠️ Lembrete Importante

- ✅ Sempre use HTTPS em produção
- ✅ Explique ao usuário por que precisa da permissão
- ✅ Forneça alternativas se a permissão for negada
- ✅ Faça cleanup de recursos (câmera, GPS, etc.)
- ✅ Teste em diferentes navegadores e dispositivos

---

**🚀 Pronto para usar!**

Consulte a documentação completa em `docs/README.md` para mais detalhes.
