import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Phone, Mail, MessageCircle, Bot, Clock, Users } from 'lucide-react'
import { AIChatWidget } from '@/components/AIChatWidget'

export default function Support() {
  const handleWhatsApp = () => {
    window.open('https://wa.me/5511917196150?text=Olá! Preciso de ajuda com a plataforma Lasy', '_blank')
  }

  const handleEmail = () => {
    window.location.href = 'mailto:alessandrosousa974@gmail.com?subject=Suporte Lasy'
  }

  const handleAIChat = () => {
    // O widget já está disponível no canto inferior esquerdo
    alert('O chat I.A. está disponível no botão flutuante no canto inferior esquerdo da tela! 💬')
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold text-foreground">Suporte Lasy</h1>
          <p className="text-muted-foreground mt-2">
            Estamos aqui para ajudar você 24h por dia, 7 dias por semana
          </p>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full mb-4">
            <Users className="w-8 h-8 text-primary" />
          </div>
          <h2 className="text-2xl font-bold mb-2">Como podemos ajudar?</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Oferecemos suporte completo para empresas e freelancers. Escolha o canal mais conveniente para você.
          </p>
        </div>

        {/* Support Options Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {/* WhatsApp Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                <Phone className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>WhatsApp</CardTitle>
              <CardDescription>
                Fale conosco diretamente pelo WhatsApp
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Resposta rápida durante horário comercial
              </p>
              <Button onClick={handleWhatsApp} className="w-full">
                <MessageCircle className="w-4 h-4 mr-2" />
                Abrir WhatsApp
              </Button>
              <p className="text-xs text-muted-foreground mt-2 text-center">
                (11) 91719-6150
              </p>
            </CardContent>
          </Card>

          {/* Email Card */}
          <Card className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-3">
                <Mail className="w-6 h-6 text-primary" />
              </div>
              <CardTitle>Email</CardTitle>
              <CardDescription>
                Envie sua dúvida por email
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Respondemos em até 24 horas
              </p>
              <Button onClick={handleEmail} variant="outline" className="w-full">
                <Mail className="w-4 h-4 mr-2" />
                Enviar Email
              </Button>
              <p className="text-xs text-muted-foreground mt-2 text-center break-all">
                alessandrosousa974@gmail.com
              </p>
            </CardContent>
          </Card>

          {/* AI Chat Card */}
          <Card className="hover:shadow-lg transition-shadow border-primary/50">
            <CardHeader>
              <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mb-3">
                <Bot className="w-6 h-6 text-primary-foreground" />
              </div>
              <CardTitle className="flex items-center gap-2">
                Chat I.A. 24h
                <span className="text-xs bg-primary text-primary-foreground px-2 py-1 rounded-full">
                  Novo
                </span>
              </CardTitle>
              <CardDescription>
                Assistente virtual disponível 24/7
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                Aprenda passo a passo com nossa I.A.
              </p>
              <Button onClick={handleAIChat} className="w-full">
                <Bot className="w-4 h-4 mr-2" />
                Iniciar Chat
              </Button>
              <div className="flex items-center gap-1 text-xs text-primary mt-2 justify-center">
                <Clock className="w-3 h-3" />
                Disponível 24/7
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Features Section */}
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader>
            <CardTitle>O que nosso suporte oferece</CardTitle>
            <CardDescription>
              Suporte completo para empresas e freelancers
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="flex gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <Bot className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Ensino Passo a Passo</h3>
                  <p className="text-sm text-muted-foreground">
                    Nossa I.A. te guia em cada etapa do processo
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <Users className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Suporte Especializado</h3>
                  <p className="text-sm text-muted-foreground">
                    Equipe treinada para empresas e freelancers
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Disponibilidade 24h</h3>
                  <p className="text-sm text-muted-foreground">
                    Chat I.A. sempre disponível, mesmo de madrugada
                  </p>
                </div>
              </div>

              <div className="flex gap-3">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Múltiplos Canais</h3>
                  <p className="text-sm text-muted-foreground">
                    WhatsApp, Email ou Chat - você escolhe
                  </p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* FAQ Section */}
        <div className="mt-12">
          <h2 className="text-2xl font-bold mb-6 text-center">Perguntas Frequentes</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Qual o horário de atendimento?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  O Chat I.A. está disponível 24/7. WhatsApp e Email são respondidos em horário comercial (9h-18h).
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Como funciona o ensino passo a passo?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Nossa I.A. identifica seu nível e te guia através de tutoriais personalizados, explicando cada recurso da plataforma.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">O suporte é gratuito?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Sim! Todos os nossos canais de suporte são gratuitos para todos os usuários da plataforma Lasy.
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Atendem empresas e freelancers?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  Sim! Temos suporte especializado tanto para empresas quanto para freelancers, com foco nas suas necessidades específicas.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
          <p>© 2024 Lasy. Todos os direitos reservados.</p>
        </div>
      </footer>

      {/* Widget de Chat I.A. */}
      <AIChatWidget />
    </div>
  )
}
