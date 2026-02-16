// Tipos principais do Ninjas do Sushi

export type UserType = 'professional' | 'company' | 'admin'

export type ProfessionalCategory =
  | 'sushiman'
  | 'sushiman-chefe'
  | 'sushiman-subchefe'
  | 'cozinheiro'
  | 'auxiliar-cozinha'
  | 'garcom'
  | 'bartender'
  | 'hostess'
  | 'limpeza'
  | 'gerente'
  | 'subgerente'
  | 'chef-executivo'

export type CuisineType =
  | 'japonesa'
  | 'chinesa'
  | 'tailandesa'
  | 'coreana'
  | 'vietnamita'
  | 'contemporanea'
  | 'nordestina'
  | 'brasileira'
  | 'fusion'

export type EventType =
  | 'casamento'
  | 'aniversario'
  | 'corporativo'
  | 'premium'
  | 'restaurante'
  | 'urgente'

export type PaymentMethod =
  | 'pix'
  | 'credit-card'
  | 'debit-card'
  | 'bitcoin'
  | 'boleto'

export interface Location {
  lat: number
  lng: number
  address: string
  city: string
  state: string
  zipCode: string
}

export interface Document {
  type: 'cpf' | 'rg' | 'cnpj' | 'diploma' | 'certificate'
  number: string
  file?: string // URL do arquivo
  verified: boolean
  verifiedAt?: Date
}

export interface BiometricData {
  faceData?: string // Base64 ou URL
  verified: boolean
  verifiedAt?: Date
}

export interface Professional {
  id: string
  name: string
  email: string
  phone: string
  category: ProfessionalCategory
  hourlyRate: number // R$ por hora
  experience: number // anos
  documents: Document[]
  biometric: BiometricData
  cuisines: CuisineType[]
  location: Location
  qrCode: string // QR Code exclusivo
  rating: number // 0-5
  totalJobs: number
  completionRate: number // 0-100
  feedbacks: Feedback[]
  available: boolean
  banned: boolean
  createdAt: Date
  updatedAt: Date
}

export interface Company {
  id: string
  name: string
  email: string
  phone: string
  cnpj: string
  cnpjVerified: boolean
  type: 'restaurante' | 'evento' | 'catering'
  cuisines: CuisineType[]
  location: Location
  rating: number
  totalHires: number
  feedbacks: Feedback[]
  createdAt: Date
  updatedAt: Date
}

export interface Job {
  id: string
  companyId: string
  professionalId?: string
  category: ProfessionalCategory
  eventType: EventType
  isUrgent: boolean
  isPremium: boolean
  requiresDiploma: boolean
  hourlyRate: number
  estimatedHours: number
  date: Date
  startTime: string
  endTime: string
  location: Location
  distance?: number // km
  description: string
  status: 'pending' | 'accepted' | 'in-progress' | 'completed' | 'cancelled' | 'no-show'
  payment?: Payment
  feedback?: Feedback
  createdAt: Date
  updatedAt: Date
}

export interface Payment {
  id: string
  jobId: string
  amount: number
  platformFee: number // 28.6%
  professionalAmount: number
  method: PaymentMethod
  status: 'pending' | 'processing' | 'completed' | 'failed' | 'refunded'
  transactionId?: string
  bitcoinAddress?: string
  paidAt?: Date
  createdAt: Date
}

export interface Feedback {
  id: string
  jobId: string
  fromId: string // ID de quem avaliou
  toId: string // ID de quem foi avaliado
  rating: number // 1-5
  comment: string
  professional: boolean // true se avaliação do profissional
  createdAt: Date
}

export interface Notification {
  id: string
  userId: string
  type: 'job-offer' | 'job-accepted' | 'job-cancelled' | 'payment' | 'feedback' | 'warning' | 'ban'
  title: string
  message: string
  read: boolean
  data?: any
  createdAt: Date
}

export interface PriceRange {
  category: ProfessionalCategory
  minRate: number
  maxRate: number
  requiresDiploma: boolean
  experienceRequired: number
}

// Configurações de preços por categoria
export const PRICE_RANGES: PriceRange[] = [
  { category: 'limpeza', minRate: 23, maxRate: 35, requiresDiploma: false, experienceRequired: 0 },
  { category: 'auxiliar-cozinha', minRate: 25, maxRate: 45, requiresDiploma: false, experienceRequired: 0 },
  { category: 'garcom', minRate: 30, maxRate: 60, requiresDiploma: false, experienceRequired: 1 },
  { category: 'hostess', minRate: 30, maxRate: 55, requiresDiploma: false, experienceRequired: 0 },
  { category: 'bartender', minRate: 40, maxRate: 80, requiresDiploma: false, experienceRequired: 2 },
  { category: 'cozinheiro', minRate: 45, maxRate: 90, requiresDiploma: false, experienceRequired: 2 },
  { category: 'sushiman', minRate: 60, maxRate: 120, requiresDiploma: false, experienceRequired: 3 },
  { category: 'subgerente', minRate: 65, maxRate: 110, requiresDiploma: false, experienceRequired: 3 },
  { category: 'sushiman-subchefe', minRate: 80, maxRate: 150, requiresDiploma: true, experienceRequired: 5 },
  { category: 'gerente', minRate: 85, maxRate: 140, requiresDiploma: false, experienceRequired: 5 },
  { category: 'sushiman-chefe', minRate: 120, maxRate: 200, requiresDiploma: true, experienceRequired: 7 },
  { category: 'chef-executivo', minRate: 130, maxRate: 200, requiresDiploma: true, experienceRequired: 8 },
]

export const PLATFORM_FEE = 0.286 // 28.6%

export const CUISINE_LABELS: Record<CuisineType, string> = {
  japonesa: 'Japonesa',
  chinesa: 'Chinesa',
  tailandesa: 'Tailandesa',
  coreana: 'Coreana',
  vietnamita: 'Vietnamita',
  contemporanea: 'Contemporânea',
  nordestina: 'Nordestina',
  brasileira: 'Brasileira',
  fusion: 'Fusion',
}

export const CATEGORY_LABELS: Record<ProfessionalCategory, string> = {
  'sushiman': 'Sushiman',
  'sushiman-chefe': 'Sushiman Chefe',
  'sushiman-subchefe': 'Sushiman Subchefe',
  'cozinheiro': 'Cozinheiro',
  'auxiliar-cozinha': 'Auxiliar de Cozinha',
  'garcom': 'Garçom',
  'bartender': 'Bartender',
  'hostess': 'Hostess',
  'limpeza': 'Limpeza',
  'gerente': 'Gerente',
  'subgerente': 'Subgerente',
  'chef-executivo': 'Chef Executivo',
}
