import { useState } from 'react'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar } from '@/components/ui/avatar'
import {
  Search,
  MapPin,
  Star,
  Zap,
  Clock,
  DollarSign,
  Filter,
  ChefHat,
  Bell,
  Settings,
  LogOut,
  TrendingUp,
  Users,
  Calendar
} from 'lucide-react'
import { Professional, Job, CATEGORY_LABELS } from '@/types'

export default function Dashboard() {
  const { user, userType } = useAuth()
  // Estados para filtros (serão implementados futuramente)
  // const [searchTerm, setSearchTerm] = useState('')
  // const [selectedCategory, setSelectedCategory] = useState<string>('')
  // const [urgentOnly, setUrgentOnly] = useState(false)

  // Mock data - em produção viria do backend
  const mockProfessionals: Professional[] = [
    {
      id: '1',
      name: 'Takeshi Yamamoto',
      email: 'takeshi@email.com',
      phone: '(11) 98888-1111',
      category: 'sushiman-chefe',
      hourlyRate: 180,
      experience: 12,
      documents: [],
      biometric: { verified: true, verifiedAt: new Date() },
      cuisines: ['japonesa', 'contemporanea'],
      location: {
        lat: -23.5505,
        lng: -46.6333,
        address: 'Av. Paulista, 1000',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01310-100',
      },
      qrCode: 'NINJAS-001',
      rating: 4.9,
      totalJobs: 347,
      completionRate: 99,
      feedbacks: [],
      available: true,
      banned: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      name: 'Maria Santos',
      email: 'maria@email.com',
      phone: '(11) 98888-2222',
      category: 'sushiman',
      hourlyRate: 95,
      experience: 6,
      documents: [],
      biometric: { verified: true, verifiedAt: new Date() },
      cuisines: ['japonesa', 'coreana'],
      location: {
        lat: -23.5489,
        lng: -46.6388,
        address: 'Rua Augusta, 500',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01305-000',
      },
      qrCode: 'NINJAS-002',
      rating: 4.7,
      totalJobs: 156,
      completionRate: 97,
      feedbacks: [],
      available: true,
      banned: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '3',
      name: 'Carlos Tanaka',
      email: 'carlos@email.com',
      phone: '(11) 98888-3333',
      category: 'bartender',
      hourlyRate: 65,
      experience: 4,
      documents: [],
      biometric: { verified: true, verifiedAt: new Date() },
      cuisines: ['japonesa', 'fusion'],
      location: {
        lat: -23.5520,
        lng: -46.6350,
        address: 'Rua Oscar Freire, 300',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01426-000',
      },
      qrCode: 'NINJAS-003',
      rating: 4.8,
      totalJobs: 89,
      completionRate: 98,
      feedbacks: [],
      available: true,
      banned: false,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]

  const mockJobs: Job[] = [
    {
      id: '1',
      companyId: '1',
      category: 'sushiman-chefe',
      eventType: 'casamento',
      isUrgent: false,
      isPremium: true,
      requiresDiploma: true,
      hourlyRate: 200,
      estimatedHours: 8,
      date: new Date('2026-03-15'),
      startTime: '18:00',
      endTime: '02:00',
      location: {
        lat: -23.5489,
        lng: -46.6388,
        address: 'Espaço Premium Events - Jardins',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '01310-100',
      },
      distance: 2.3,
      description: 'Casamento premium para 200 convidados. Necessário experiência com eventos de alto padrão.',
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: '2',
      companyId: '2',
      category: 'sushiman',
      eventType: 'urgente',
      isUrgent: true,
      isPremium: false,
      requiresDiploma: false,
      hourlyRate: 120,
      estimatedHours: 6,
      date: new Date(),
      startTime: '19:00',
      endTime: '01:00',
      location: {
        lat: -23.5505,
        lng: -46.6333,
        address: 'Restaurante Sakura - Vila Madalena',
        city: 'São Paulo',
        state: 'SP',
        zipCode: '05428-000',
      },
      distance: 1.5,
      description: 'URGENTE! Substituição de sushiman que faltou. Início imediato.',
      status: 'pending',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ]

  if (userType === 'professional') {
    return <DashboardProfessional user={user as Professional} jobs={mockJobs} />
  }

  if (userType === 'company') {
    return <DashboardCompany professionals={mockProfessionals} />
  }

  return null
}

function DashboardProfessional({ user, jobs }: { user: Professional; jobs: Job[] }) {
  const { logout } = useAuth()

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center">
                <ChefHat className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Ninjas do Sushi</h1>
                <p className="text-sm text-muted-foreground">{user.name}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={logout}>
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Avaliação</p>
                  <p className="text-2xl font-bold flex items-center gap-1">
                    {user.rating}
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  </p>
                </div>
                <Star className="w-8 h-8 text-yellow-400" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Trabalhos</p>
                  <p className="text-2xl font-bold">{user.totalJobs}</p>
                </div>
                <TrendingUp className="w-8 h-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Taxa de Conclusão</p>
                  <p className="text-2xl font-bold">{user.completionRate}%</p>
                </div>
                <Clock className="w-8 h-8 text-green-500" />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">Por Hora</p>
                  <p className="text-2xl font-bold">R$ {user.hourlyRate}</p>
                </div>
                <DollarSign className="w-8 h-8 text-green-600" />
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Trabalhos Disponíveis */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Trabalhos Disponíveis</h2>
            <Button variant="outline" size="sm">
              <Filter className="w-4 h-4 mr-2" />
              Filtros
            </Button>
          </div>

          {jobs.map((job) => (
            <Card key={job.id} className={job.isUrgent ? 'border-red-500 border-2' : ''}>
              <CardContent className="p-6">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 space-y-3">
                    <div className="flex items-center gap-2 flex-wrap">
                      <h3 className="text-xl font-bold">
                        {CATEGORY_LABELS[job.category]}
                      </h3>
                      {job.isUrgent && (
                        <Badge variant="destructive" className="flex items-center gap-1">
                          <Zap className="w-3 h-3" />
                          URGENTE
                        </Badge>
                      )}
                      {job.isPremium && (
                        <Badge className="bg-yellow-500 text-yellow-950">
                          PREMIUM
                        </Badge>
                      )}
                      {job.requiresDiploma && (
                        <Badge variant="outline">
                          Requer Diploma
                        </Badge>
                      )}
                    </div>

                    <p className="text-muted-foreground">{job.description}</p>

                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-muted-foreground" />
                        <span>
                          {new Date(job.date).toLocaleDateString('pt-BR')}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-muted-foreground" />
                        <span>
                          {job.startTime} - {job.endTime}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-muted-foreground" />
                        <span>{job.distance} km</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <DollarSign className="w-4 h-4 text-muted-foreground" />
                        <span className="font-bold">R$ {job.hourlyRate}/h</span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <MapPin className="w-4 h-4" />
                      {job.location.address}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button className="whitespace-nowrap">
                      Aceitar Trabalho
                    </Button>
                    <Button variant="outline" size="sm">
                      Ver Mapa
                    </Button>
                  </div>
                </div>

                {job.isUrgent && (
                  <div className="mt-4 p-3 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
                    <p className="text-sm text-red-600 dark:text-red-400 font-medium">
                      ⚡ Trabalho urgente! Aceite agora para ganhar bônus de 20% no pagamento.
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}

function DashboardCompany({ professionals }: { professionals: Professional[] }) {
  const { logout } = useAuth()
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState<string>('')

  const filteredProfessionals = professionals.filter((prof) => {
    const matchesSearch = prof.name.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesCategory = !selectedCategory || prof.category === selectedCategory
    return matchesSearch && matchesCategory && prof.available
  })

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-card">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-primary text-primary-foreground w-12 h-12 rounded-full flex items-center justify-center">
                <ChefHat className="w-6 h-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold">Ninjas do Sushi</h1>
                <p className="text-sm text-muted-foreground">Painel de Contratação</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="destructive" className="flex items-center gap-2">
                <Zap className="w-4 h-4" />
                Chamada Urgente
              </Button>
              <Button variant="ghost" size="icon">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="icon" onClick={logout}>
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Busca e Filtros */}
        <Card>
          <CardContent className="p-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1 relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                <Input
                  placeholder="Buscar profissionais por nome..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
              <select
                className="h-10 px-3 rounded-md border bg-background min-w-[200px]"
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="">Todas as categorias</option>
                {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
          </CardContent>
        </Card>

        {/* Lista de Profissionais */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {filteredProfessionals.map((prof) => (
            <Card key={prof.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="w-16 h-16 bg-primary/10 flex items-center justify-center text-2xl">
                    {prof.name.charAt(0)}
                  </Avatar>

                  <div className="flex-1 space-y-3">
                    <div>
                      <h3 className="text-lg font-bold">{prof.name}</h3>
                      <p className="text-sm text-muted-foreground">
                        {CATEGORY_LABELS[prof.category]}
                      </p>
                    </div>

                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-bold">{prof.rating}</span>
                        <span className="text-muted-foreground">
                          ({prof.totalJobs} trabalhos)
                        </span>
                      </div>
                      <Badge variant="outline" className="text-xs">
                        {prof.experience} anos
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 text-sm">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        {prof.location.city}, {prof.location.state}
                      </span>
                      <span className="text-primary font-medium">• 2.3 km</span>
                    </div>

                    <div className="flex items-center gap-2">
                      {prof.cuisines.slice(0, 3).map((cuisine) => (
                        <Badge key={cuisine} variant="secondary" className="text-xs">
                          {cuisine}
                        </Badge>
                      ))}
                    </div>

                    <div className="flex items-center justify-between pt-2">
                      <div>
                        <p className="text-2xl font-bold text-primary">
                          R$ {prof.hourlyRate}
                          <span className="text-sm font-normal text-muted-foreground">/hora</span>
                        </p>
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Ver Perfil
                        </Button>
                        <Button size="sm">
                          Contratar
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {filteredProfessionals.length === 0 && (
          <Card>
            <CardContent className="p-12 text-center">
              <Users className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
              <h3 className="text-lg font-bold mb-2">Nenhum profissional encontrado</h3>
              <p className="text-muted-foreground">
                Tente ajustar os filtros de busca
              </p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
