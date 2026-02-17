# Guia de Permissões e Recursos do Dispositivo

Este documento descreve todas as permissões e recursos do dispositivo disponíveis no aplicativo.

## 📋 Índice

- [Permissões Básicas](#permissões-básicas)
- [Recursos Avançados](#recursos-avançados)
- [Como Usar](#como-usar)
- [Compatibilidade](#compatibilidade)

---

## Permissões Básicas

### 📷 Câmera (`use-camera.ts`)

Acesso à câmera do dispositivo para captura de fotos e vídeos.

**Funcionalidades:**
- Iniciar/parar câmera
- Alternar entre câmera frontal e traseira
- Capturar fotos
- Configurar resolução e qualidade

**Exemplo:**
```typescript
import { useCamera } from '@/hooks/use-camera'

const { videoRef, isActive, startCamera, stopCamera, takePhoto } = useCamera({
  facingMode: 'user', // 'user' ou 'environment'
  width: 1280,
  height: 720
})
```

---

### 🎤 Microfone (`use-microphone.ts`)

Acesso ao microfone para gravação de áudio.

**Funcionalidades:**
- Iniciar/parar microfone
- Gravar áudio
- Monitorar nível de áudio em tempo real
- Cancelamento de eco e supressão de ruído

**Exemplo:**
```typescript
import { useMicrophone } from '@/hooks/use-microphone'

const { isRecording, audioLevel, startRecording, stopRecording, getAudioUrl } = useMicrophone({
  echoCancellation: true,
  noiseSuppression: true,
  autoGainControl: true
})
```

---

### 📍 Geolocalização (`use-geolocation.ts`)

Acesso à localização GPS do dispositivo.

**Funcionalidades:**
- Obter localização atual
- Monitorar localização em tempo real
- Alta precisão de localização
- Latitude, longitude, altitude, velocidade e direção

**Exemplo:**
```typescript
import { useGeolocation } from '@/hooks/use-geolocation'

const { coordinates, loading, getCurrentPosition, startWatching, stopWatching } = useGeolocation({
  enableHighAccuracy: true,
  timeout: 10000,
  watch: true // Monitoramento contínuo
})
```

---

### 🔔 Notificações (`use-notifications.ts`)

Enviar notificações push para o usuário.

**Funcionalidades:**
- Solicitar permissão de notificações
- Enviar notificações com título, corpo, ícone e imagem
- Vibração personalizada
- Notificações persistentes

**Exemplo:**
```typescript
import { useNotifications } from '@/hooks/use-notifications'

const { permission, requestPermission, showNotification } = useNotifications()

await showNotification('Título', {
  body: 'Mensagem da notificação',
  icon: '/icon.png',
  vibrate: [200, 100, 200],
  requireInteraction: true
})
```

---

### 📋 Área de Transferência (`use-clipboard.ts`)

Copiar e colar textos da área de transferência.

**Funcionalidades:**
- Copiar texto
- Ler texto do clipboard
- Feedback de sucesso/erro

**Exemplo:**
```typescript
import { useClipboard } from '@/hooks/use-clipboard'

const { copiedText, copyToClipboard, readFromClipboard } = useClipboard()

await copyToClipboard('Texto para copiar')
const texto = await readFromClipboard()
```

---

### 📁 Upload de Arquivos (`use-file-upload.ts`)

Selecionar e fazer upload de arquivos com drag & drop.

**Funcionalidades:**
- Seleção de arquivos (single ou multiple)
- Drag & drop
- Preview de imagens
- Validação de tipo e tamanho
- Progresso de upload

**Exemplo:**
```typescript
import { useFileUpload } from '@/hooks/use-file-upload'

const { files, isDragging, openFileDialog, getInputProps, getDropzoneProps } = useFileUpload({
  accept: 'image/*',
  multiple: true,
  maxSize: 5 * 1024 * 1024, // 5MB
  generatePreview: true
})
```

---

## Recursos Avançados

### 👥 Contatos (`use-contacts.ts`)

Acesso à lista de contatos do dispositivo.

**Funcionalidades:**
- Selecionar um ou múltiplos contatos
- Obter nome, email, telefone e endereço
- Verificar propriedades disponíveis

**Exemplo:**
```typescript
import { useContacts } from '@/hooks/use-contacts'

const { selectContacts } = useContacts()

const contacts = await selectContacts(['name', 'email', 'tel'], { multiple: true })
```

**⚠️ Compatibilidade:** Disponível apenas em Android (Chrome/Edge)

---

### 🔗 Compartilhamento (`use-share.ts`)

Compartilhar conteúdo usando o sistema nativo de compartilhamento.

**Funcionalidades:**
- Compartilhar texto, URLs e arquivos
- Integração com apps nativos
- Verificar se pode compartilhar

**Exemplo:**
```typescript
import { useShare } from '@/hooks/use-share'

const { share, canShare } = useShare()

await share({
  title: 'Título',
  text: 'Texto para compartilhar',
  url: 'https://example.com'
})
```

---

### 📳 Vibração (`use-vibration.ts`)

Feedback háptico através de vibração.

**Funcionalidades:**
- Vibração simples
- Padrões de vibração personalizados
- Padrões pré-definidos (sucesso, erro, alerta, SOS)

**Exemplo:**
```typescript
import { useVibration } from '@/hooks/use-vibration'

const { vibrate, vibratePattern } = useVibration()

vibrate(200) // Vibra por 200ms
vibratePattern('success') // Padrão de sucesso
vibrate([100, 50, 100, 50, 100]) // Padrão personalizado
```

---

### 🔋 Bateria (`use-battery.ts`)

Monitorar status da bateria do dispositivo.

**Funcionalidades:**
- Nível de bateria (0-100%)
- Status de carregamento
- Tempo até carga completa
- Tempo restante de bateria

**Exemplo:**
```typescript
import { useBattery } from '@/hooks/use-battery'

const { level, charging, chargingTime, dischargingTime } = useBattery()

console.log(`Bateria: ${Math.round(level * 100)}%`)
console.log(`Carregando: ${charging}`)
```

---

### 📶 Rede (`use-network.ts`)

Monitorar status e qualidade da conexão de rede.

**Funcionalidades:**
- Status online/offline
- Tipo de conexão (4G, 3G, 2G, etc.)
- Velocidade de download (Mbps)
- Latência (RTT em ms)
- Modo economia de dados

**Exemplo:**
```typescript
import { useNetwork } from '@/hooks/use-network'

const { online, effectiveType, downlink, rtt, saveData } = useNetwork()

console.log(`Conexão: ${effectiveType}`)
console.log(`Velocidade: ${downlink} Mbps`)
```

---

### 🔄 Orientação da Tela (`use-screen-orientation.ts`)

Detectar e controlar orientação da tela.

**Funcionalidades:**
- Detectar orientação atual (portrait/landscape)
- Ângulo de rotação
- Bloquear orientação
- Desbloquear orientação

**Exemplo:**
```typescript
import { useScreenOrientation } from '@/hooks/use-screen-orientation'

const { type, angle, lockOrientation, unlockOrientation } = useScreenOrientation()

await lockOrientation('portrait') // Bloqueia em modo retrato
unlockOrientation() // Libera rotação
```

---

## Como Usar

### 1. Configuração no HTML

O arquivo `index.html` já está configurado com as meta tags necessárias:

```html
<!-- Permissions Policy -->
<meta http-equiv="Permissions-Policy" content="
  camera=*,
  microphone=*,
  geolocation=*,
  ...
" />
```

### 2. Manifest PWA

O arquivo `public/manifest.json` declara as permissões necessárias:

```json
{
  "permissions": [
    "camera",
    "microphone",
    "geolocation",
    "notifications",
    "clipboard-read",
    "clipboard-write"
  ]
}
```

### 3. Usar os Hooks

Importe e use os hooks nos seus componentes:

```typescript
import { useCamera } from '@/hooks/use-camera'
import { useGeolocation } from '@/hooks/use-geolocation'
import { useNotifications } from '@/hooks/use-notifications'

function MeuComponente() {
  const camera = useCamera()
  const geo = useGeolocation()
  const notifications = useNotifications()

  // Use as funcionalidades...
}
```

### 4. Página de Demonstração

Acesse `/permissions` para ver todos os recursos em ação:

```typescript
import PermissionsPage from '@/pages/PermissionsPage'
```

---

## Compatibilidade

| Recurso | Chrome | Firefox | Safari | Edge | Mobile |
|---------|--------|---------|--------|------|--------|
| Câmera | ✅ | ✅ | ✅ | ✅ | ✅ |
| Microfone | ✅ | ✅ | ✅ | ✅ | ✅ |
| Geolocalização | ✅ | ✅ | ✅ | ✅ | ✅ |
| Notificações | ✅ | ✅ | ✅ | ✅ | ✅ |
| Clipboard | ✅ | ✅ | ⚠️ | ✅ | ✅ |
| Upload | ✅ | ✅ | ✅ | ✅ | ✅ |
| Contatos | ✅ | ❌ | ❌ | ✅ | Android |
| Share | ✅ | ❌ | ✅ | ✅ | ✅ |
| Vibração | ✅ | ✅ | ❌ | ✅ | ✅ |
| Bateria | ✅ | ❌ | ❌ | ✅ | Android |
| Rede | ✅ | ❌ | ❌ | ✅ | ✅ |
| Orientação | ✅ | ✅ | ✅ | ✅ | ✅ |

**Legenda:**
- ✅ Suportado
- ⚠️ Suporte parcial
- ❌ Não suportado

---

## Segurança e Privacidade

### Boas Práticas

1. **Solicite permissões apenas quando necessário**
   - Não solicite todas as permissões de uma vez
   - Explique ao usuário por que você precisa de cada permissão

2. **Trate negação de permissões**
   - Sempre verifique o status da permissão
   - Forneça funcionalidade alternativa quando possível

3. **Use HTTPS**
   - A maioria das APIs só funciona em contexto seguro (HTTPS)

4. **Respeite a privacidade**
   - Não armazene dados sensíveis sem consentimento
   - Implemente opt-out quando apropriado

### Exemplo de Solicitação Adequada

```typescript
// ❌ MAU: Solicitar tudo de uma vez
const requestAllPermissions = async () => {
  await camera.request()
  await mic.request()
  await geo.request()
  await notifications.request()
}

// ✅ BOM: Solicitar no contexto de uso
const handleTakePhoto = async () => {
  // Explica ao usuário
  if (camera.status === 'prompt') {
    toast('Precisamos acessar sua câmera para tirar a foto')
  }

  // Solicita apenas quando necessário
  await camera.startCamera()
}
```

---

## Recursos Adicionais

- [MDN Web Docs - Permissions API](https://developer.mozilla.org/en-US/docs/Web/API/Permissions_API)
- [MDN Web Docs - Media Devices](https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices)
- [MDN Web Docs - Geolocation API](https://developer.mozilla.org/en-US/docs/Web/API/Geolocation_API)
- [Web.dev - Permissions](https://web.dev/permissions/)

---

**Última atualização:** 2026-02-17
