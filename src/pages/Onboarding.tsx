import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Progress } from '@/components/ui/progress'
import {
  Building2,
  User,
  Target,
  TrendingUp,
  Shield,
  Clock,
  CheckCircle2,
  ArrowRight,
  X,
  Rocket,
  UserCircle,
  Sparkles
} from 'lucide-react'

interface OnboardingStep {
  id: number
  title: string
  description: string
  image: string
  benefit: string
  forCompany: string
  forFreelancer: string
}

const steps: OnboardingStep[] = [
  {
    id: 1,
    title: 'Bem-vindo à nossa plataforma!',
    description: 'Vamos guiá-lo em uma jornada rápida para você aproveitar ao máximo nossos recursos.',
    image: 'rocket',
    benefit: 'Apenas 3 minutos para configurar tudo',
    forCompany: 'Empresas que completam o onboarding aumentam em 73% a chance de encontrar o profissional ideal',
    forFreelancer: 'Profissionais com perfil completo recebem 5x mais propostas de trabalho'
  },
  {
    id: 2,
    title: 'Configure seu perfil',
    description: 'Um perfil completo é sua vitrine. Mostre suas habilidades e experiências.',
    image: 'user-circle',
    benefit: 'Perfis completos têm 10x mais visibilidade',
    forCompany: 'Empresas com perfil verificado são vistas como 89% mais confiáveis pelos profissionais',
    forFreelancer: 'Freelancers com portfólio completo ganham até 40% a mais por projeto'
  },
  {
    id: 3,
    title: 'Defina seus objetivos',
    description: 'Conte-nos o que você busca para personalizarmos suas recomendações.',
    image: 'target',
    benefit: 'Recomendações personalizadas para você',
    forCompany: 'Empresas que definem critérios claros encontram candidatos 3x mais rápido',
    forFreelancer: 'Profissionais com objetivos definidos recebem apenas propostas relevantes'
  },
  {
    id: 4,
    title: 'Conecte-se e cresça',
    description: 'Explore oportunidades, faça conexões valiosas e alcance seus objetivos.',
    image: 'sparkles',
    benefit: 'Tudo pronto! Vamos começar',
    forCompany: 'Empresas ativas na plataforma reduzem em 60% o tempo de contratação',
    forFreelancer: 'Freelancers engajados aumentam sua receita em até 200% no primeiro ano'
  }
]

export default function Onboarding() {
  const navigate = useNavigate()
  const location = useLocation()
  const userType = location.state?.userType || 'freelancer' // 'company' ou 'freelancer'

  const [currentStep, setCurrentStep] = useState(0)
  const progress = ((currentStep + 1) / steps.length) * 100

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    } else {
      handleComplete()
    }
  }

  const handleSkip = () => {
    navigate('/dashboard')
  }

  const handleLater = () => {
    // Salva no localStorage que o usuário quer fazer depois
    localStorage.setItem('onboarding_postponed', 'true')
    navigate('/dashboard')
  }

  const handleComplete = () => {
    localStorage.setItem('onboarding_completed', 'true')
    navigate('/dashboard')
  }

  const currentStepData = steps[currentStep]
  const isCompany = userType === 'company'

  // Mapear ícones
  const getStepIcon = (iconName: string) => {
    const iconMap: Record<string, React.ReactNode> = {
      rocket: <Rocket className="w-12 h-12 text-primary" />,
      'user-circle': <UserCircle className="w-12 h-12 text-primary" />,
      target: <Target className="w-12 h-12 text-primary" />,
      sparkles: <Sparkles className="w-12 h-12 text-primary" />
    }
    return iconMap[iconName] || <Rocket className="w-12 h-12 text-primary" />
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      {/* Botão de fechar no canto superior direito */}
      <button
        onClick={handleSkip}
        className="fixed top-4 right-4 p-2 rounded-lg hover:bg-accent transition-colors"
        aria-label="Fechar onboarding"
      >
        <X className="w-5 h-5 text-muted-foreground" />
      </button>

      <div className="w-full max-w-4xl">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">
              Etapa {currentStep + 1} de {steps.length}
            </span>
            <span className="text-sm font-medium text-primary">
              {Math.round(progress)}% completo
            </span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Card Principal */}
        <Card className="p-8 md:p-12">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Lado Esquerdo - Conteúdo */}
            <div className="space-y-6">
              {/* Ícone Grande */}
              <div className="w-20 h-20 rounded-2xl bg-primary/10 flex items-center justify-center">
                {getStepIcon(currentStepData.image)}
              </div>

              {/* Título */}
              <div>
                <h1 className="text-3xl font-bold mb-3">
                  {currentStepData.title}
                </h1>
                <p className="text-muted-foreground text-lg">
                  {currentStepData.description}
                </p>
              </div>

              {/* Benefício Principal */}
              <div className="flex items-start gap-3 p-4 rounded-lg bg-primary/5">
                <CheckCircle2 className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                <p className="text-sm font-medium">
                  {currentStepData.benefit}
                </p>
              </div>

              {/* Mensagem Personalizada (Psicologia) */}
              <div className="p-4 rounded-lg border border-border bg-card">
                <div className="flex items-center gap-2 mb-2">
                  {isCompany ? (
                    <Building2 className="w-4 h-4 text-primary" />
                  ) : (
                    <User className="w-4 h-4 text-primary" />
                  )}
                  <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                    {isCompany ? 'Para Empresas' : 'Para Freelancers'}
                  </span>
                </div>
                <p className="text-sm text-foreground">
                  {isCompany ? currentStepData.forCompany : currentStepData.forFreelancer}
                </p>
              </div>

              {/* Botões de Ação */}
              <div className="space-y-3 pt-4">
                <Button
                  onClick={handleNext}
                  className="w-full"
                  size="lg"
                >
                  {currentStep < steps.length - 1 ? (
                    <>
                      Continuar
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  ) : (
                    'Começar agora'
                  )}
                </Button>

                <div className="flex gap-2">
                  <Button
                    onClick={handleLater}
                    variant="outline"
                    className="flex-1"
                    size="lg"
                  >
                    <Clock className="w-4 h-4 mr-2" />
                    Deixar para depois
                  </Button>

                  <Button
                    onClick={handleSkip}
                    variant="ghost"
                    className="flex-1"
                    size="lg"
                  >
                    Pular
                  </Button>
                </div>
              </div>
            </div>

            {/* Lado Direito - Ilustração/Informações Extras */}
            <div className="hidden md:block">
              <div className="space-y-4">
                {/* Cards de Benefícios */}
                <div className="p-5 rounded-xl bg-accent/50 border border-border">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Target className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold">Resultados garantidos</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {isCompany
                      ? 'Encontre os melhores profissionais em tempo recorde'
                      : 'Receba propostas de projetos reais e bem remunerados'
                    }
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-accent/50 border border-border">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <Shield className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold">Segurança total</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {isCompany
                      ? 'Profissionais verificados e avaliados pela comunidade'
                      : 'Pagamentos garantidos e proteção contra fraudes'
                    }
                  </p>
                </div>

                <div className="p-5 rounded-xl bg-accent/50 border border-border">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-primary" />
                    </div>
                    <h3 className="font-semibold">Crescimento rápido</h3>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {isCompany
                      ? 'Escale sua equipe conforme sua demanda cresce'
                      : 'Aumente sua renda trabalhando com grandes empresas'
                    }
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Indicadores de Etapa (dots) */}
          <div className="flex justify-center gap-2 mt-8 pt-8 border-t border-border">
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => setCurrentStep(index)}
                className={`h-2 rounded-full transition-all ${
                  index === currentStep
                    ? 'w-8 bg-primary'
                    : index < currentStep
                    ? 'w-2 bg-primary/50'
                    : 'w-2 bg-border'
                }`}
                aria-label={`Ir para etapa ${index + 1}`}
              />
            ))}
          </div>
        </Card>

        {/* Rodapé - Prova Social */}
        <div className="mt-6 text-center">
          <p className="text-sm text-muted-foreground">
            {isCompany ? (
              <>
                Mais de <span className="font-semibold text-foreground">10.000 empresas</span> já contrataram profissionais pela nossa plataforma
              </>
            ) : (
              <>
                Mais de <span className="font-semibold text-foreground">50.000 freelancers</span> já encontraram trabalho aqui
              </>
            )}
          </p>
        </div>
      </div>
    </div>
  )
}
