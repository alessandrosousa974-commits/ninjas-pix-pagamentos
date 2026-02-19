# E2EE - Guia Rápido 🚀

## Como Usar em 3 Passos

### 1️⃣ Use o Hook

```typescript
import { useE2EE } from '@/hooks/use-e2ee'

function MeuComponente() {
  const e2ee = useE2EE('meu-user-id')

  // Aguarde ficar pronto
  if (!e2ee.isReady) {
    return <div>Configurando criptografia...</div>
  }

  // Use normalmente!
}
```

### 2️⃣ Criptografe Mensagens

```typescript
// Busca chave pública do destinatário
const response = await fetch(`/api/users/${destinatarioId}/public-key`)
const { publicKey } = await response.json()

// Criptografa
const mensagemCriptografada = await e2ee.encrypt(
  'Mensagem secreta!',
  publicKey
)

// Envia para o servidor (servidor não consegue ler)
await fetch('/api/messages', {
  method: 'POST',
  body: JSON.stringify({
    to: destinatarioId,
    content: mensagemCriptografada
  })
})
```

### 3️⃣ Descriptografe Mensagens

```typescript
// Recebe mensagem criptografada do servidor
const { content } = await fetch('/api/messages/123').then(r => r.json())

// Descriptografa com sua chave privada
const mensagemClara = await e2ee.decrypt(content)

console.log(mensagemClara) // "Mensagem secreta!"
```

## Componentes Prontos

### Badge de Status

```typescript
import { E2EEStatus } from '@/components/e2ee-status'

<E2EEStatus
  isReady={e2ee.isReady}
  isInitializing={e2ee.isInitializing}
  error={e2ee.error}
/>
```

### Exemplo Completo de Chat

```typescript
import { E2EEChatExample } from '@/components/e2ee-chat-example'

<E2EEChatExample />
```

## Acesse a Demo

Navegue até `/e2ee` para ver tudo funcionando!

## O que o Servidor Guarda?

```javascript
// No servidor (público, seguro compartilhar)
{
  userId: "user-123",
  publicKey: "MIIBIjANBgkqhkiG9w0BAQEFAA..." // ✅ Pode ser público
}

// No cliente (privado, NUNCA envie ao servidor)
{
  privateKey: "MIIEvQIBADANBgkqhki..." // 🔒 NUNCA sai do dispositivo
}

// Mensagem no servidor (criptografada)
{
  from: "user-123",
  to: "user-456",
  content: "xK9mL2pQ..." // ❌ Servidor não consegue ler
}
```

## Segurança Garantida

✅ **Chave privada nunca sai do seu dispositivo**
✅ **Servidor não consegue ler suas mensagens**
✅ **Mesmo que o servidor seja hackeado, mensagens permanecem seguras**
✅ **Algoritmo RSA-OAEP 2048 bits + SHA-256**

## Próximos Passos

Leia a documentação completa em `docs/E2EE.md` para:
- Backend: Como armazenar chaves públicas
- Mensagens grandes: Criptografia híbrida (AES + RSA)
- Multi-dispositivo: Sincronização de chaves
- Backup: Recuperação de chaves perdidas
- Verificação: Prevenir ataques man-in-the-middle

---

**Suas mensagens, completamente privadas** 🔒
