# 🔐 Sistema de Permissões e Recursos do Dispositivo

Este projeto possui um sistema completo de gerenciamento de permissões e acesso a recursos do dispositivo.

## 🚀 Acesso Rápido

**Página de demonstração:** [/permissions](/permissions)

## 📦 Hooks Disponíveis

### Permissões Básicas
- `use-camera.ts` - Acesso à câmera
- `use-microphone.ts` - Gravação de áudio
- `use-geolocation.ts` - Localização GPS
- `use-notifications.ts` - Notificações push
- `use-clipboard.ts` - Área de transferência
- `use-file-upload.ts` - Upload de arquivos com drag & drop
- `use-permissions.ts` - Gerenciamento geral de permissões

### Recursos Avançados
- `use-contacts.ts` - Lista de contatos
- `use-share.ts` - Compartilhamento nativo
- `use-vibration.ts` - Feedback háptico
- `use-battery.ts` - Status da bateria
- `use-network.ts` - Status da rede
- `use-screen-orientation.ts` - Orientação da tela

## 📖 Documentação Completa

Consulte [docs/PERMISSIONS.md](docs/PERMISSIONS.md) para:
- Guia detalhado de cada hook
- Exemplos de código
- Tabela de compatibilidade
- Boas práticas de segurança

## 🎯 Exemplo Rápido

```typescript
import { useCamera } from '@/hooks/use-camera'

function MeuComponente() {
  const { videoRef, isActive, startCamera, takePhoto } = useCamera()

  return (
    <div>
      <video ref={videoRef} autoPlay />
      <button onClick={startCamera}>Iniciar Câmera</button>
      <button onClick={takePhoto}>Tirar Foto</button>
    </div>
  )
}
```

## ⚙️ Configuração

As permissões já estão configuradas em:
- `index.html` - Meta tags de permissões
- `public/manifest.json` - Manifest PWA
- `vite.config.ts` - Configuração do Vite

Não é necessária configuração adicional!

## 🔒 Segurança

Todas as APIs seguem as melhores práticas de segurança:
- Requerem HTTPS (exceto localhost)
- Solicitação explícita de permissões
- Tratamento de erros e negação
- Feedback visual ao usuário

## 📱 Mobile First

Todos os hooks foram projetados para funcionar perfeitamente em:
- iOS Safari
- Android Chrome
- Navegadores desktop modernos

## 🛠️ Tecnologias

- React 19
- TypeScript
- Web APIs nativas
- Zero dependências externas (exceto React)
