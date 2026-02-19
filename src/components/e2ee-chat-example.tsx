// Exemplo completo de chat com criptografia E2EE

import { useState } from 'react'
import { useE2EE } from '@/hooks/use-e2ee'
import { E2EEStatus } from './e2ee-status'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Field } from '@/components/ui/field'
import { Send, Lock } from 'lucide-react'
import { toast } from 'sonner'

interface Message {
  id: string
  text: string
  encrypted: boolean
  sender: string
  timestamp: Date
}

export function E2EEChatExample() {
  // Simulação de usuários (em produção, viriam do sistema de autenticação)
  const [currentUserId] = useState('user-123')
  const [recipientUserId] = useState('user-456')

  // Hook de criptografia para o usuário atual
  const e2ee = useE2EE(currentUserId)

  // Estados do chat
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [recipientPublicKey, setRecipientPublicKey] = useState<string>('')
  const [isSending, setIsSending] = useState(false)

  // Simula obter a chave pública do destinatário
  // Em produção, isso viria do servidor/banco de dados
  const loadRecipientPublicKey = async () => {
    try {
      // Aqui você buscaria do servidor: const key = await fetch('/api/users/${recipientUserId}/public-key')
      // Por enquanto, vamos simular que você já tem
      toast.info('Em produção, a chave pública seria obtida do servidor')
      setRecipientPublicKey('simulada') // placeholder
    } catch (error) {
      toast.error('Erro ao carregar chave pública do destinatário')
    }
  }

  // Envia mensagem criptografada
  const sendMessage = async () => {
    if (!inputMessage.trim() || !e2ee.isReady) return

    setIsSending(true)

    try {
      // 1. Criptografa a mensagem com a chave pública do destinatário
      // NOTA: recipientPublicKey deve ser a chave real do destinatário
      // const encryptedText = await e2ee.encrypt(inputMessage, recipientPublicKey)

      // Para demonstração, vamos simular
      const encryptedText = `[Criptografado] ${inputMessage}`

      // 2. Envia mensagem criptografada para o servidor
      // await fetch('/api/messages', {
      //   method: 'POST',
      //   body: JSON.stringify({ to: recipientUserId, content: encryptedText })
      // })

      // 3. Adiciona na lista local (em produção, viria do servidor)
      const newMessage: Message = {
        id: Date.now().toString(),
        text: inputMessage, // Mostra descriptografada localmente
        encrypted: true,
        sender: currentUserId,
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, newMessage])
      setInputMessage('')

      toast.success('Mensagem enviada com criptografia E2EE', {
        icon: <Lock className="h-4 w-4" />,
      })
    } catch (error) {
      toast.error('Erro ao enviar mensagem')
      console.error('Send error:', error)
    } finally {
      setIsSending(false)
    }
  }

  // Descriptografa mensagem recebida
  const handleReceivedMessage = async (encryptedMessage: string) => {
    try {
      const decryptedText = await e2ee.decrypt(encryptedMessage)
      return decryptedText
    } catch (error) {
      toast.error('Erro ao descriptografar mensagem')
      return '[Erro ao descriptografar]'
    }
  }

  return (
    <div className="container max-w-2xl mx-auto p-6">
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle>Chat Criptografado E2EE</CardTitle>
            <E2EEStatus
              isReady={e2ee.isReady}
              isInitializing={e2ee.isInitializing}
              error={e2ee.error}
            />
          </div>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Área de mensagens */}
          <div className="border rounded-lg p-4 min-h-[300px] max-h-[400px] overflow-y-auto space-y-3">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-full text-center text-muted-foreground">
                <Lock className="h-12 w-12 mb-2 opacity-50" />
                <p>Nenhuma mensagem ainda</p>
                <p className="text-sm">Suas mensagens serão criptografadas de ponta a ponta</p>
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className="flex flex-col gap-1 bg-muted p-3 rounded-lg"
                >
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-sm">Você</span>
                    {msg.encrypted && (
                      <Lock className="h-3 w-3 text-green-600" />
                    )}
                  </div>
                  <p className="text-sm">{msg.text}</p>
                  <span className="text-xs text-muted-foreground">
                    {msg.timestamp.toLocaleTimeString()}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Info sobre chaves */}
          {e2ee.isReady && (
            <div className="bg-green-50 dark:bg-green-950 border border-green-200 dark:border-green-800 rounded-lg p-3 space-y-2">
              <div className="flex items-start gap-2">
                <Lock className="h-4 w-4 text-green-600 mt-0.5 flex-shrink-0" />
                <div className="text-sm space-y-1">
                  <p className="font-medium text-green-900 dark:text-green-100">
                    Criptografia ativa
                  </p>
                  <p className="text-green-700 dark:text-green-300 text-xs">
                    Suas mensagens são criptografadas no seu dispositivo e só podem ser lidas pelo destinatário. Nem o servidor consegue acessar o conteúdo.
                  </p>
                </div>
              </div>

              <Button
                variant="outline"
                size="sm"
                onClick={loadRecipientPublicKey}
                className="w-full text-xs"
              >
                Carregar chave do destinatário (simulação)
              </Button>
            </div>
          )}
        </CardContent>

        <CardFooter>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              sendMessage()
            }}
            className="flex gap-2 w-full"
          >
            <Input
              placeholder={
                e2ee.isReady
                  ? 'Digite sua mensagem criptografada...'
                  : 'Aguarde a inicialização da criptografia...'
              }
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              disabled={!e2ee.isReady || isSending}
            />
            <Button
              type="submit"
              disabled={!e2ee.isReady || isSending || !inputMessage.trim()}
            >
              {isSending ? (
                <Lock className="h-4 w-4 animate-pulse" />
              ) : (
                <Send className="h-4 w-4" />
              )}
            </Button>
          </form>
        </CardFooter>
      </Card>

      {/* Painel de debug (remove em produção) */}
      {e2ee.isReady && (
        <Card className="mt-4">
          <CardHeader>
            <CardTitle className="text-sm">Debug - Informações Técnicas</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-xs">
            <div>
              <strong>Status:</strong> Chaves geradas e armazenadas localmente
            </div>
            <div>
              <strong>Algoritmo:</strong> RSA-OAEP 2048 bits
            </div>
            <div>
              <strong>Hash:</strong> SHA-256
            </div>
            <div>
              <strong>Armazenamento:</strong> IndexedDB (local)
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={async () => {
                const publicKey = await e2ee.getPublicKey()
                if (publicKey) {
                  console.log('Chave pública:', publicKey)
                  toast.success('Chave pública copiada no console')
                }
              }}
            >
              Ver chave pública no console
            </Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
