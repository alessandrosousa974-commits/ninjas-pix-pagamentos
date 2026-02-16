import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  ChefHat,
  Building2,
  Shield,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  DollarSign,
  Calendar,
  FileText,
  Headphones
} from 'lucide-react'
import { Alert, AlertDescription } from '@/components/ui/alert'

export default function Welcome() {
  const navigate = useNavigate()
  const [selectedType, setSelectedType] = useState<'professional' | 'company' | null>(null)

  return (
    <div className="min-h-screen bg-background">
      <div className="w-full max-w-6xl mx-auto p-4 py-12 space-y-12">
        {/* Logo e Título */}
        <div className="text-center space-y-4">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-3xl rounded-full"></div>
              <div className="relative bg-primary text-primary-foreground w-24 h-24 rounded-full flex items-center justify-center">
                <ChefHat className="w-12 h-12" />
              </div>
            </div>
          </div>
          <h1 className="text-5xl font-bold tracking-tight">
            Ninjas do Sushi
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Conectando profissionais da culinária asiática com as melhores oportunidades
          </p>
        </div>

        {/* Tabelas de Ganhos */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold flex items-center justify-center gap-2">
              <TrendingUp className="w-8 h-8 text-primary" />
              Potencial de Ganhos
            </h2>
            <p className="text-muted-foreground">
              Veja quanto você pode ganhar trabalhando conosco
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Tabela Semanal */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="w-5 h-5 text-primary" />
                  Ganhos Semanais
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="text-sm font-medium">20h/semana</span>
                    <span className="text-lg font-bold text-primary">R$ 1.840 - R$ 4.000</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="text-sm font-medium">30h/semana</span>
                    <span className="text-lg font-bold text-primary">R$ 2.760 - R$ 6.000</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg border-2 border-primary">
                    <span className="text-sm font-medium">40h/semana</span>
                    <span className="text-lg font-bold text-primary">R$ 3.680 - R$ 8.000</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="text-sm font-medium">50h/semana</span>
                    <span className="text-lg font-bold text-primary">R$ 4.600 - R$ 10.000</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabela Mensal */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-primary" />
                  Ganhos Mensais
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="text-sm font-medium">80h/mês</span>
                    <span className="text-lg font-bold text-primary">R$ 7.360 - R$ 16.000</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="text-sm font-medium">120h/mês</span>
                    <span className="text-lg font-bold text-primary">R$ 11.040 - R$ 24.000</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-primary/10 rounded-lg border-2 border-primary">
                    <span className="text-sm font-medium">160h/mês</span>
                    <span className="text-lg font-bold text-primary">R$ 14.720 - R$ 32.000</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-muted rounded-lg">
                    <span className="text-sm font-medium">200h/mês</span>
                    <span className="text-lg font-bold text-primary">R$ 18.400 - R$ 40.000</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Destaque Pagamento */}
          <Alert className="bg-primary/10 border-primary">
            <Clock className="w-5 h-5 text-primary" />
            <AlertDescription className="text-base">
              <strong>Pagamento rápido:</strong> Receba em até 48 horas após a conclusão do trabalho via PIX, TED ou carteira digital.
            </AlertDescription>
          </Alert>
        </div>

        {/* Passo a Passo */}
        <div className="space-y-6">
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-bold flex items-center justify-center gap-2">
              <FileText className="w-8 h-8 text-primary" />
              Como Começar
            </h2>
            <p className="text-muted-foreground">
              Siga estes passos simples para começar a trabalhar
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-4">
            <Card className="text-center">
              <CardContent className="p-6 space-y-3">
                <div className="mx-auto bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
                  1
                </div>
                <h3 className="font-bold">Cadastre-se</h3>
                <p className="text-sm text-muted-foreground">
                  Preencha seus dados e escolha sua categoria profissional
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6 space-y-3">
                <div className="mx-auto bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
                  2
                </div>
                <h3 className="font-bold">Envie Documentos</h3>
                <p className="text-sm text-muted-foreground">
                  Faça upload de CPF, RG e foto para verificação biométrica
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6 space-y-3">
                <div className="mx-auto bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
                  3
                </div>
                <h3 className="font-bold">Aprovação</h3>
                <p className="text-sm text-muted-foreground">
                  Aguarde até 24h para verificação e receba seu QR Code
                </p>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardContent className="p-6 space-y-3">
                <div className="mx-auto bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center text-xl font-bold">
                  4
                </div>
                <h3 className="font-bold">Comece a Trabalhar</h3>
                <p className="text-sm text-muted-foreground">
                  Receba ofertas de trabalho e escolha as que mais combinam com você
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Seleção de Tipo */}
        <div className="grid md:grid-cols-2 gap-6">
          {/* Profissional */}
          <Card
            className={`cursor-pointer transition-all duration-300 hover:shadow-2xl ${
              selectedType === 'professional'
                ? 'ring-2 ring-primary shadow-xl scale-105'
                : 'hover:scale-102'
            }`}
            onClick={() => setSelectedType('professional')}
          >
            <CardContent className="p-8 space-y-6">
              <div className="flex justify-center">
                <div className="bg-primary/10 p-6 rounded-2xl">
                  <ChefHat className="w-16 h-16 text-primary" />
                </div>
              </div>
              <div className="text-center space-y-3">
                <h2 className="text-2xl font-bold">Sou Profissional</h2>
                <p className="text-muted-foreground">
                  Encontre trabalhos em restaurantes e eventos premium
                </p>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Defina seu próprio valor por hora (R$ 23 - R$ 200)</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Pagamento em até 48h após conclusão</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Eventos premium e casamentos</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Sistema de avaliações e bonificações</span>
                </li>
              </ul>
            </CardContent>
          </Card>

          {/* Empresa */}
          <Card
            className={`cursor-pointer transition-all duration-300 hover:shadow-2xl ${
              selectedType === 'company'
                ? 'ring-2 ring-primary shadow-xl scale-105'
                : 'hover:scale-102'
            }`}
            onClick={() => setSelectedType('company')}
          >
            <CardContent className="p-8 space-y-6">
              <div className="flex justify-center">
                <div className="bg-primary/10 p-6 rounded-2xl">
                  <Building2 className="w-16 h-16 text-primary" />
                </div>
              </div>
              <div className="text-center space-y-3">
                <h2 className="text-2xl font-bold">Sou Empresa</h2>
                <p className="text-muted-foreground">
                  Contrate profissionais qualificados sob demanda
                </p>
              </div>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Profissionais verificados com biometria</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Chamadas urgentes para emergências</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Geolocalização e cálculo de distância</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary" />
                  <span>Pagamento flexível (PIX, Cartão, Bitcoin)</span>
                </li>
              </ul>
            </CardContent>
          </Card>
        </div>

        {/* Botões de Ação */}
        {selectedType && (
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Button
              size="lg"
              className="w-full sm:w-auto px-8"
              onClick={() => navigate(`/cadastro/${selectedType}`)}
            >
              Criar Conta
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="w-full sm:w-auto px-8"
              onClick={() => navigate(`/login/${selectedType}`)}
            >
              Já tenho conta
            </Button>
          </div>
        )}

        {/* Disclaimer Legal */}
        <Card className="bg-muted/50">
          <CardContent className="p-6 space-y-4">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-5 h-5 text-muted-foreground mt-0.5 flex-shrink-0" />
              <div className="space-y-2 text-sm text-muted-foreground">
                <h3 className="font-bold text-foreground">Diretrizes e Informações Legais</h3>
                <p>
                  <strong>Autonomia Profissional:</strong> Os profissionais cadastrados na plataforma Ninjas do Sushi atuam de forma autônoma,
                  definindo seus próprios horários, valores e condições de trabalho. Não há vínculo empregatício entre os profissionais e a plataforma.
                </p>
                <p>
                  <strong>Responsabilidades:</strong> Cada profissional é responsável por suas próprias obrigações fiscais e tributárias.
                  A plataforma atua apenas como intermediadora, conectando profissionais e empresas.
                </p>
                <p>
                  <strong>Pagamentos:</strong> Os pagamentos são processados em até 48 horas úteis após a confirmação de conclusão do trabalho
                  por ambas as partes. Taxas de serviço podem ser aplicadas conforme os termos de uso.
                </p>
                <p>
                  <strong>Verificação:</strong> Todos os profissionais passam por verificação de documentos e biometria para garantir
                  a segurança de todas as partes envolvidas.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Segurança */}
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Shield className="w-4 h-4" />
          <span>Plataforma segura com verificação biométrica e validação de documentos</span>
        </div>

        {/* Link Suporte */}
        <div className="text-center">
          <Button
            variant="link"
            onClick={() => navigate('/suporte')}
            className="text-muted-foreground hover:text-primary"
          >
            <Headphones className="w-4 h-4 mr-2" />
            Precisa de ajuda? Acesse nosso Suporte
          </Button>
        </div>
      </div>

      {/* Botão Flutuante de Suporte */}
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          size="lg"
          onClick={() => navigate('/suporte')}
          className="rounded-full shadow-2xl hover:scale-110 transition-transform"
        >
          <Headphones className="w-5 h-5 mr-2" />
          Suporte 24h
        </Button>
      </div>
    </div>
  )
}
