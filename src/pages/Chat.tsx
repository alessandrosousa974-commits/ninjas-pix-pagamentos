import { useState, useRef, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Badge } from '@/components/ui/badge'
import { Home, Users, MessageSquare, Send, Flag, ArrowLeft, Shield } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

interface Message {
  id: number
  authorName: string
  authorAvatar: string
  authorBadge?: string
  message: string
  timestamp: string
}

export default function Chat() {
  const navigate = useNavigate()
  const scrollRef = useRef<HTMLDivElement>(null)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      authorName: 'Maria Silva',
      authorAvatar: '',
      authorBadge: 'Chef',
      message: 'Olá pessoal! Alguém tem uma boa receita de pão caseiro?',
      timestamp: '10:30'
    },
    {
      id: 2,
      authorName: 'João Pedro',
      authorAvatar: '',
      message: 'Eu uso a receita da minha avó! Posso compartilhar aqui',
      timestamp: '10:32'
    },
    {
      id: 3,
      authorName: 'Ana Costa',
      authorAvatar: '',
      authorBadge: 'Pro',
      message: 'Também quero essa receita! 🍞',
      timestamp: '10:33'
    },
    {
      id: 4,
      authorName: 'Carlos Mendes',
      authorAvatar: '',
      message: 'Qual tipo de farinha vocês recomendam?',
      timestamp: '10:35'
    },
    {
      id: 5,
      authorName: 'Fernanda Lima',
      authorAvatar: '',
      message: 'Farinha de trigo comum funciona bem, mas a integral fica mais saudável',
      timestamp: '10:37'
    },
    {
      id: 6,
      authorName: 'Roberto Santos',
      authorAvatar: '',
      authorBadge: 'Chef',
      message: 'Para pão italiano, uso farinha tipo 00. Faz muita diferença!',
      timestamp: '10:40'
    },
    {
      id: 7,
      authorName: 'Maria Silva',
      authorAvatar: '',
      authorBadge: 'Chef',
      message: 'Obrigada pelas dicas pessoal! Vou testar hoje mesmo 😊',
      timestamp: '10:42'
    }
  ])

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages])

  const handleSendMessage = () => {
    if (!message.trim()) return

    // Verificar palavras inapropriadas (filtro básico)
    const bannedWords = ['idiota', 'estúpido', 'imbecil', 'burro']
    const hasInappropriateWords = bannedWords.some(word =>
      message.toLowerCase().includes(word)
    )

    if (hasInappropriateWords) {
      toast.error('Mensagem bloqueada', {
        description: 'Por favor, mantenha o respeito na comunidade.'
      })
      return
    }

    const newMessage: Message = {
      id: messages.length + 1,
      authorName: 'Você',
      authorAvatar: '',
      message: message.trim(),
      timestamp: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })
    }

    setMessages([...messages, newMessage])
    setMessage('')
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const handleReport = (messageId: number) => {
    toast.success('Mensagem reportada', {
      description: 'Nossa equipe irá revisar este conteúdo.'
    })
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <header className="bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/dashboard')}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <div>
                <h1 className="text-2xl font-bold text-foreground">Chat da Comunidade</h1>
                <p className="text-sm text-muted-foreground">247 membros online</p>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Community Guidelines Banner */}
      <div className="container mx-auto px-4 py-4">
        <Card className="bg-accent border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Shield className="w-5 h-5 text-primary mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">
                  Diretrizes da Comunidade
                </h3>
                <p className="text-sm text-muted-foreground">
                  • Seja respeitoso com todos os membros
                  <br />
                  • Não toleramos discriminação de qualquer tipo
                  <br />
                  • Mantenha conversas relacionadas à culinária
                  <br />
                  • Reporte mensagens inapropriadas
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Messages Area */}
      <div className="flex-1 container mx-auto px-4 pb-4">
        <Card className="h-[calc(100vh-380px)]">
          <ScrollArea className="h-full p-4" ref={scrollRef}>
            <div className="space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex gap-3 ${msg.authorName === 'Você' ? 'flex-row-reverse' : ''}`}
                >
                  <Avatar className="w-10 h-10 shrink-0">
                    <AvatarImage src={msg.authorAvatar} />
                    <AvatarFallback>{msg.authorName[0]}</AvatarFallback>
                  </Avatar>

                  <div className={`flex-1 ${msg.authorName === 'Você' ? 'text-right' : ''}`}>
                    <div className={`flex items-center gap-2 mb-1 ${msg.authorName === 'Você' ? 'justify-end' : ''}`}>
                      <span className="text-sm font-medium">{msg.authorName}</span>
                      {msg.authorBadge && (
                        <Badge variant="secondary" className="text-xs">
                          {msg.authorBadge}
                        </Badge>
                      )}
                      <span className="text-xs text-muted-foreground">{msg.timestamp}</span>
                    </div>

                    <div className={`flex items-start gap-2 ${msg.authorName === 'Você' ? 'justify-end' : ''}`}>
                      <div
                        className={`inline-block rounded-lg px-4 py-2 max-w-md ${
                          msg.authorName === 'Você'
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted text-foreground'
                        }`}
                      >
                        <p className="text-sm break-words">{msg.message}</p>
                      </div>

                      {msg.authorName !== 'Você' && (
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 shrink-0 opacity-0 hover:opacity-100 transition-opacity"
                          onClick={() => handleReport(msg.id)}
                        >
                          <Flag className="w-3 h-3" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>
      </div>

      {/* Message Input */}
      <div className="container mx-auto px-4 pb-24">
        <Card>
          <CardContent className="p-4">
            <div className="flex gap-2">
              <Input
                placeholder="Digite sua mensagem..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                className="flex-1"
              />
              <Button onClick={handleSendMessage} disabled={!message.trim()}>
                <Send className="w-4 h-4" />
              </Button>
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Pressione Enter para enviar
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-around py-4">
            <Button
              variant="ghost"
              size="sm"
              className="flex-col gap-1 h-auto"
              onClick={() => navigate('/dashboard')}
            >
              <Home className="w-5 h-5" />
              <span className="text-xs">Início</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex-col gap-1 h-auto"
              onClick={() => navigate('/community')}
            >
              <Users className="w-5 h-5" />
              <span className="text-xs">Comunidade</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex-col gap-1 h-auto text-primary"
            >
              <MessageSquare className="w-5 h-5" />
              <span className="text-xs font-semibold">Chat</span>
            </Button>
          </div>
        </div>
      </nav>
    </div>
  )
}
