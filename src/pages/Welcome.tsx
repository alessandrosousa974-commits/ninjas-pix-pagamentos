import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ChefHat, Building2, Shield } from 'lucide-react'

export default function Welcome() {
  const navigate = useNavigate()
  const [selectedType, setSelectedType] = useState<'professional' | 'company' | null>(null)

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-4xl space-y-8">
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
          <p className="text-xl text-muted-foreground">
            Conectando profissionais da culinária asiática com as melhores oportunidades
          </p>
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
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span>Defina seu próprio valor por hora (R$ 23 - R$ 200)</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span>Trabalhos urgentes com pagamento imediato</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span>Eventos premium e casamentos</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
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
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span>Profissionais verificados com biometria</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span>Chamadas urgentes para emergências</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                  <span>Geolocalização e cálculo de distância</span>
                </li>
                <li className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
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

        {/* Segurança */}
        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <Shield className="w-4 h-4" />
          <span>Plataforma segura com verificação biométrica e validação de documentos</span>
        </div>
      </div>
    </div>
  )
}
