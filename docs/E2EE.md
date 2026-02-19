# Criptografia E2EE (End-to-End Encryption)

## 📖 Visão Geral

Esta aplicação implementa **criptografia de ponta a ponta (E2EE)** usando a **Web Crypto API** nativa do navegador. Isso garante que apenas o remetente e o destinatário possam ler as mensagens, mesmo que o servidor seja comprometido.

## 🔐 Como Funciona

### 1. Geração de Chaves

Cada usuário possui um **par de chaves criptográficas**:

- **Chave Pública**: Compartilhada com outros usuários e armazenada no servidor
- **Chave Privada**: Mantida apenas no dispositivo do usuário (IndexedDB)

```typescript
// Gera par de chaves RSA-OAEP de 2048 bits
const keyPair = await generateKeyPair()

// Exporta para compartilhar com servidor
const publicKeyString = await exportPublicKey(keyPair.publicKey)
```

### 2. Envio de Mensagem

```
┌─────────────┐     ┌────────────┐     ┌──────────────┐
│  Remetente  │────▶│  Servidor  │────▶│ Destinatário │
└─────────────┘     └────────────┘     └──────────────┘
      │                   │                    │
      │ 1. Criptografa   │                    │
      │    com chave      │ 2. Transporta     │
      │    pública do     │    texto          │
      │    destinatário   │    criptografado  │ 3. Descriptografa
      │                   │                    │    com chave
      │                   │                    │    privada
      ▼                   ▼                    ▼
  Texto claro      Texto criptografado   Texto claro
  "Olá mundo"      "xk9#@mL..."          "Olá mundo"
```

**Processo:**
1. Alice escreve mensagem: `"Oi Bob!"`
2. Alice busca chave pública de Bob no servidor
3. Alice criptografa com chave pública de Bob: `encryptMessage("Oi Bob!", bobPublicKey)`
4. Servidor recebe texto criptografado: `"a7f3x9k..."`
5. Bob recebe mensagem criptografada
6. Bob descriptografa com sua chave privada: `decryptMessage("a7f3x9k...", bobPrivateKey)`
7. Bob lê: `"Oi Bob!"`

**Importante:** O servidor NUNCA tem acesso à chave privada de Bob, então não consegue descriptografar.

### 3. Recepção de Mensagem

```typescript
// Destinatário descriptografa com sua chave privada
const decryptedMessage = await decryptMessage(
  encryptedMessage,
  myPrivateKey
)
```

## 🗂️ Estrutura de Arquivos

```
src/
├── lib/
│   ├── crypto.ts          # Funções de criptografia (Web Crypto API)
│   └── keystore.ts        # Gerenciamento de chaves (IndexedDB)
├── hooks/
│   └── use-e2ee.ts        # Hook React para E2EE
├── components/
│   ├── e2ee-status.tsx    # Badge de status da criptografia
│   └── e2ee-chat-example.tsx  # Exemplo de chat com E2EE
└── pages/
    └── E2EEDemo.tsx       # Página de demonstração
```

## 🛠️ API Disponível

### Hook `useE2EE`

Hook principal para usar E2EE em componentes React:

```typescript
import { useE2EE } from '@/hooks/use-e2ee'

function MyComponent() {
  const e2ee = useE2EE(currentUserId)

  // Propriedades
  e2ee.isReady          // boolean - Chaves prontas para uso
  e2ee.isInitializing   // boolean - Carregando chaves
  e2ee.error            // string | null - Erro se houver

  // Métodos
  const encrypted = await e2ee.encrypt(message, recipientPublicKey)
  const decrypted = await e2ee.decrypt(encryptedMessage)
  const publicKey = await e2ee.getPublicKey()
  await e2ee.initializeUser(userId)
  await e2ee.clearKeys(userId)
}
```

### Funções de Criptografia (`src/lib/crypto.ts`)

```typescript
// Gera par de chaves
const keyPair = await generateKeyPair()

// Exporta/Importa chaves (base64)
const publicKeyStr = await exportPublicKey(keyPair.publicKey)
const privateKeyStr = await exportPrivateKey(keyPair.privateKey)
const publicKey = await importPublicKey(publicKeyStr)
const privateKey = await importPrivateKey(privateKeyStr)

// Criptografa/Descriptografa
const encrypted = await encryptMessage('mensagem', publicKey)
const decrypted = await decryptMessage(encrypted, privateKey)

// Hash SHA-256 (verificação de integridade)
const hash = await hashMessage('mensagem')
```

### Gerenciamento de Chaves (`src/lib/keystore.ts`)

```typescript
// Salva chaves no IndexedDB
await saveKeys(userId, keyPair)

// Carrega chaves do IndexedDB
const keyPair = await loadKeys(userId)

// Verifica se usuário tem chaves
const hasKeys = await hasKeys(userId)

// Cria novas chaves
const keyPair = await initializeKeys(userId)

// Remove chaves (logout)
await deleteKeys(userId)

// Obtém apenas chave pública
const publicKeyStr = await getPublicKeyString(userId)
```

## 🎨 Componentes UI

### `E2EEStatus`

Badge visual mostrando o status da criptografia:

```typescript
import { E2EEStatus } from '@/components/e2ee-status'

<E2EEStatus
  isReady={e2ee.isReady}
  isInitializing={e2ee.isInitializing}
  error={e2ee.error}
/>
```

**Estados:**
- 🔒 **Criptografado** (verde) - Tudo funcionando
- ⏳ **Inicializando...** (cinza) - Gerando/carregando chaves
- ⚠️ **Erro na Criptografia** (vermelho) - Problema detectado
- 🛡️ **Não Criptografado** (outline) - E2EE não ativo

## 💡 Exemplo Completo de Uso

### 1. Chat Simples com E2EE

```typescript
import { useState } from 'react'
import { useE2EE } from '@/hooks/use-e2ee'
import { E2EEStatus } from '@/components/e2ee-status'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'

function SecureChat() {
  const currentUserId = 'user-123'
  const recipientUserId = 'user-456'

  const e2ee = useE2EE(currentUserId)
  const [message, setMessage] = useState('')

  const sendEncryptedMessage = async () => {
    // 1. Busca chave pública do destinatário no servidor
    const response = await fetch(`/api/users/${recipientUserId}/public-key`)
    const { publicKey: recipientPublicKey } = await response.json()

    // 2. Criptografa mensagem
    const encryptedMessage = await e2ee.encrypt(message, recipientPublicKey)

    // 3. Envia ao servidor
    await fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: recipientUserId,
        content: encryptedMessage, // Servidor recebe texto criptografado
      }),
    })

    setMessage('')
  }

  return (
    <div>
      <E2EEStatus {...e2ee} />

      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Digite sua mensagem..."
        disabled={!e2ee.isReady}
      />

      <Button
        onClick={sendEncryptedMessage}
        disabled={!e2ee.isReady || !message}
      >
        Enviar Criptografado
      </Button>
    </div>
  )
}
```

### 2. Receber e Descriptografar Mensagem

```typescript
import { useE2EE } from '@/hooks/use-e2ee'
import { useEffect, useState } from 'react'

function MessageList() {
  const currentUserId = 'user-123'
  const e2ee = useE2EE(currentUserId)
  const [messages, setMessages] = useState([])

  useEffect(() => {
    // Busca mensagens do servidor
    async function fetchMessages() {
      const response = await fetch('/api/messages')
      const encryptedMessages = await response.json()

      // Descriptografa cada mensagem
      const decrypted = await Promise.all(
        encryptedMessages.map(async (msg) => ({
          ...msg,
          content: await e2ee.decrypt(msg.content),
        }))
      )

      setMessages(decrypted)
    }

    if (e2ee.isReady) {
      fetchMessages()
    }
  }, [e2ee.isReady])

  return (
    <div>
      {messages.map((msg) => (
        <div key={msg.id}>{msg.content}</div>
      ))}
    </div>
  )
}
```

## 🔧 Especificações Técnicas

### Algoritmo de Criptografia

| Propriedade        | Valor                        |
|--------------------|------------------------------|
| Algoritmo          | RSA-OAEP                     |
| Tamanho da Chave   | 2048 bits                    |
| Função Hash        | SHA-256                      |
| API                | Web Crypto API (SubtleCrypto)|
| Armazenamento      | IndexedDB                    |

### Por que RSA-OAEP?

- **Assimétrico**: Permite criptografia com chave pública e descriptografia com chave privada
- **OAEP Padding**: Proteção contra ataques de texto cifrado escolhido
- **Padrão da indústria**: Usado por Signal, WhatsApp, Telegram
- **Suporte nativo**: Implementado nativamente em todos os navegadores modernos

### Segurança

- ✅ **Chaves privadas nunca saem do dispositivo**
- ✅ **Servidor não pode ler mensagens**
- ✅ **Proteção contra MITM** (se verificar chaves públicas)
- ✅ **Resistente a ataques de replay**
- ⚠️ **Backup de chaves é responsabilidade do usuário**

## 🚀 Implementação em Produção

### 1. Backend: Armazenar Chaves Públicas

Quando um usuário cria sua conta, envie a chave pública para o servidor:

```typescript
// Frontend - Após gerar chaves
const e2ee = useE2EE(userId)
const publicKey = await e2ee.getPublicKey()

await fetch('/api/users/me/public-key', {
  method: 'POST',
  body: JSON.stringify({ publicKey }),
})
```

```typescript
// Backend - API para salvar chave pública
app.post('/api/users/:userId/public-key', async (req, res) => {
  const { userId } = req.params
  const { publicKey } = req.body

  await db.users.update(userId, { publicKey })

  res.json({ success: true })
})
```

### 2. Backend: Endpoint para Buscar Chaves Públicas

```typescript
// Backend - API para buscar chave pública de outro usuário
app.get('/api/users/:userId/public-key', async (req, res) => {
  const { userId } = req.params

  const user = await db.users.findById(userId)

  if (!user || !user.publicKey) {
    return res.status(404).json({ error: 'Chave pública não encontrada' })
  }

  res.json({ publicKey: user.publicKey })
})
```

### 3. Backend: Armazenar Mensagens Criptografadas

```typescript
// Backend - API para enviar mensagem
app.post('/api/messages', async (req, res) => {
  const { from, to, content } = req.body // content já vem criptografado

  await db.messages.create({
    fromUserId: from,
    toUserId: to,
    encryptedContent: content, // Armazena criptografado
    createdAt: new Date(),
  })

  // Notifica destinatário via WebSocket, push notification, etc.
  notifyUser(to, { newMessage: true })

  res.json({ success: true })
})
```

### 4. Sincronização Multi-Dispositivo

Para usar em múltiplos dispositivos, você precisa:

**Opção A: Backup Criptografado com Senha**
```typescript
// Exporta chaves e criptografa com senha do usuário
const privateKey = await exportPrivateKey(keyPair.privateKey)
const encrypted = await encryptWithPassword(privateKey, userPassword)

// Envia backup para servidor
await fetch('/api/users/me/key-backup', {
  method: 'POST',
  body: JSON.stringify({ encryptedBackup: encrypted }),
})
```

**Opção B: QR Code entre Dispositivos**
```typescript
// Dispositivo A: Gera QR code com chave privada
const privateKey = await exportPrivateKey(keyPair.privateKey)
showQRCode(privateKey)

// Dispositivo B: Escaneia QR code e importa chave
const scannedKey = await scanQRCode()
const privateKey = await importPrivateKey(scannedKey)
await saveKeys(userId, { publicKey, privateKey })
```

## ⚠️ Limitações e Considerações

### Limitações do RSA-OAEP

- ❌ **Tamanho de mensagem limitado**: RSA só criptografa mensagens menores que o tamanho da chave (2048 bits = 256 bytes, com OAEP padding ~190 bytes úteis)
- ✅ **Solução**: Para mensagens grandes, use **criptografia híbrida**:
  1. Gere chave AES aleatória (256 bits)
  2. Criptografe a mensagem com AES (rápido, sem limite de tamanho)
  3. Criptografe a chave AES com RSA (pequena)
  4. Envie ambos (mensagem AES + chave AES criptografada)

### Implementação de Criptografia Híbrida (AES + RSA)

```typescript
// Criptografia híbrida para mensagens grandes
export async function encryptLargeMessage(
  message: string,
  recipientPublicKey: CryptoKey
): Promise<{ encryptedMessage: string; encryptedKey: string }> {
  // 1. Gera chave AES aleatória
  const aesKey = await window.crypto.subtle.generateKey(
    { name: 'AES-GCM', length: 256 },
    true,
    ['encrypt', 'decrypt']
  )

  // 2. Criptografa mensagem com AES
  const encoder = new TextEncoder()
  const iv = window.crypto.getRandomValues(new Uint8Array(12))
  const encryptedData = await window.crypto.subtle.encrypt(
    { name: 'AES-GCM', iv },
    aesKey,
    encoder.encode(message)
  )

  // 3. Exporta chave AES
  const exportedAesKey = await window.crypto.subtle.exportKey('raw', aesKey)

  // 4. Criptografa chave AES com RSA
  const encryptedAesKey = await window.crypto.subtle.encrypt(
    { name: 'RSA-OAEP' },
    recipientPublicKey,
    exportedAesKey
  )

  return {
    encryptedMessage: arrayBufferToBase64(encryptedData) + ':' + arrayBufferToBase64(iv),
    encryptedKey: arrayBufferToBase64(encryptedAesKey),
  }
}
```

### Outras Considerações

1. **Backup de Chaves**: Sem backup, perder o dispositivo = perder acesso às mensagens antigas
2. **Verificação de Identidade**: Implemente verificação de fingerprint de chaves públicas para evitar MITM
3. **Perfect Forward Secrecy**: Considere rotação de chaves para evitar que comprometimento de uma chave comprometa mensagens antigas
4. **Metadata**: E2EE protege CONTEÚDO, mas não metadata (quem falou com quem, quando, tamanho da mensagem)

## 📚 Recursos Adicionais

### Documentação Oficial

- [Web Crypto API - MDN](https://developer.mozilla.org/en-US/docs/Web/API/Web_Crypto_API)
- [SubtleCrypto - MDN](https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto)
- [IndexedDB - MDN](https://developer.mozilla.org/en-US/docs/Web/API/IndexedDB_API)

### Compatibilidade de Navegadores

| Navegador        | Versão Mínima |
|------------------|---------------|
| Chrome           | 37+           |
| Firefox          | 34+           |
| Safari           | 11+           |
| Edge             | 79+           |
| Opera            | 24+           |
| Chrome Android   | 37+           |
| Safari iOS       | 11+           |

**Nota:** Web Crypto API requer HTTPS (exceto localhost).

## 🧪 Como Testar

### 1. Acesse a Demo

Navegue até `/e2ee` na aplicação para ver a demonstração completa.

### 2. Verifique as Chaves

Abra o console do navegador:

```javascript
// Ver chaves armazenadas no IndexedDB
const keys = await loadKeys('user-123')
console.log('Chaves:', keys)

// Ver chave pública exportada
const publicKey = await exportPublicKey(keys.publicKey)
console.log('Chave pública:', publicKey)
```

### 3. Teste de Criptografia/Descriptografia

```javascript
// Teste básico
const message = 'Mensagem secreta!'
const encrypted = await encryptMessage(message, keys.publicKey)
console.log('Criptografado:', encrypted)

const decrypted = await decryptMessage(encrypted, keys.privateKey)
console.log('Descriptografado:', decrypted)
console.log('Igual ao original?', message === decrypted)
```

## 🎯 Próximos Passos

- [ ] Implementar criptografia híbrida (AES + RSA) para mensagens grandes
- [ ] Adicionar verificação de fingerprint de chaves públicas
- [ ] Implementar sistema de backup/recuperação de chaves
- [ ] Adicionar Perfect Forward Secrecy (rotação de chaves)
- [ ] Suporte para múltiplos dispositivos
- [ ] Notificações de mudança de chave pública (prevenção de MITM)
- [ ] Criptografia de arquivos anexados

---

**Desenvolvido com Web Crypto API nativa do navegador** 🔒
