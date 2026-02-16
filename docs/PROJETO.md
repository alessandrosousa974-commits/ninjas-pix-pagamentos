# Ninjas do Sushi - Plataforma de Freelance Culinário

## Visão Geral

O **Ninjas do Sushi** é uma plataforma inovadora que conecta profissionais da culinária asiática com restaurantes, eventos e estabelecimentos que precisam de mão de obra qualificada sob demanda. Combinamos o modelo de freelance do Staff com a praticidade do Uber, criando um ecossistema completo e seguro para contratações no setor gastronômico.

## Funcionalidades Principais

### Para Profissionais

#### 1. Cadastro Completo com Segurança
- **Verificação Biométrica**: Reconhecimento facial obrigatório
- **Validação de Documentos**: Upload de CPF, RG e diplomas
- **QR Code Exclusivo**: Identificação única para apresentar aos empregadores
- **Múltiplas Categorias**: 12 categorias profissionais disponíveis

#### 2. Categorias Profissionais e Precificação

| Categoria | Faixa Salarial | Diploma Necessário | Experiência Mínima |
|-----------|----------------|--------------------|--------------------|
| Limpeza | R$ 23 - R$ 35/h | Não | 0 anos |
| Auxiliar de Cozinha | R$ 25 - R$ 45/h | Não | 0 anos |
| Garçom | R$ 30 - R$ 60/h | Não | 1 ano |
| Hostess | R$ 30 - R$ 55/h | Não | 0 anos |
| Bartender | R$ 40 - R$ 80/h | Não | 2 anos |
| Cozinheiro | R$ 45 - R$ 90/h | Não | 2 anos |
| Sushiman | R$ 60 - R$ 120/h | Não | 3 anos |
| Subgerente | R$ 65 - R$ 110/h | Não | 3 anos |
| Sushiman Subchefe | R$ 80 - R$ 150/h | **Sim** | 5 anos |
| Gerente | R$ 85 - R$ 140/h | Não | 5 anos |
| Sushiman Chefe | R$ 120 - R$ 200/h | **Sim** | 7 anos |
| Chef Executivo | R$ 130 - R$ 200/h | **Sim** | 8 anos |

#### 3. Tipos de Trabalho
- **Restaurantes**: Contratações para estabelecimentos fixos
- **Eventos Premium**: Casamentos, aniversários, eventos corporativos
- **Chamadas Urgentes**: Substituições imediatas com bônus de 20%

#### 4. Culinárias Suportadas
- Japonesa
- Chinesa
- Tailandesa
- Coreana
- Vietnamita
- Contemporânea
- Nordestina
- Brasileira
- Fusion

### Para Empresas

#### 1. Cadastro Empresarial
- **Validação de CNPJ**: Verificação automática da documentação
- **Tipos de Estabelecimento**: Restaurante, Eventos, Catering/Buffet
- **Geolocalização**: Sistema de mapa para cálculo de distância

#### 2. Busca de Profissionais
- **Filtros Avançados**: Por categoria, culinária, avaliação, distância
- **Visualização de Perfil**: Histórico completo, avaliações, experiência
- **Cálculo de Distância**: Mapa interativo mostrando a distância até o profissional

#### 3. Sistema de Chamadas
- **Chamadas Normais**: Agendamento com antecedência
- **Chamadas Urgentes**: Para emergências (profissional faltou, pico de movimento)
- **Eventos Premium**: Requisitos especiais para eventos de alto padrão

## Sistema de Pagamentos

### Métodos Disponíveis
1. **PIX**: Pagamento instantâneo com QR Code
2. **Cartão de Crédito**: Visa, Mastercard, Elo
3. **Cartão de Débito**: Débito instantâneo
4. **Bitcoin**: Criptomoeda (confirmação em até 60min)
5. **Boleto Bancário**: Vencimento em 3 dias úteis

### Estrutura de Taxas
- **Taxa da Plataforma**: 28,6% sobre o valor total
- **Exemplo**: Trabalho de R$ 800,00
  - Taxa: R$ 228,80
  - Profissional recebe: R$ 571,20

### Segurança
- Pagamento processado através da plataforma
- Profissional recebe em até 2 dias úteis
- Garantia de reembolso em caso de problemas

## Geolocalização e Mapas

### Funcionalidades
- **Cálculo de Distância**: Fórmula de Haversine para precisão
- **Tempo Estimado**: Baseado em velocidade média urbana (30 km/h)
- **Mapa Visual**: Interface intuitiva mostrando origem e destino
- **Filtro por Proximidade**: Encontre profissionais próximos

## Sistema de Avaliações

### Para Profissionais
- Avaliação de 1 a 5 estrelas
- Comentários detalhados das empresas
- Critérios avaliados:
  - Pontualidade
  - Qualidade do trabalho
  - Comunicação
  - Profissionalismo

### Para Empresas
- Profissionais também avaliam as empresas
- Ambiente de trabalho
- Cumprimento de acordos
- Pagamento em dia

### Sistema de Reputação
- **Taxa de Conclusão**: % de trabalhos completados
- **Média de Avaliações**: Calculada automaticamente
- **Histórico Transparente**: Todas as avaliações visíveis

## Regras e Penalidades

### Para Profissionais

#### Penalidades por Não Comparecimento
1. **Primeira Falta**: Advertência + suspensão de 7 dias
2. **Segunda Falta**: Suspensão de 30 dias
3. **Terceira Falta**: **Exclusão permanente da plataforma**

#### Regras de Comportamento
- Apresentar-se no horário acordado
- Manter uniformes limpos e adequados
- Tratar clientes e colegas com respeito
- Não consumir bebidas alcoólicas durante o expediente
- Seguir as normas de higiene e segurança alimentar

### Para Empresas

#### Penalidades
- Cancelamento de última hora: Taxa de 50%
- Avaliações falsas: Advertência + suspensão
- Ambiente inadequado: Denúncia e investigação

## Arquitetura Técnica

### Stack Tecnológico
- **Frontend**: React 19 + TypeScript
- **Build**: Vite 7
- **Estilização**: Tailwind CSS 4
- **Componentes UI**: shadcn/ui + Radix UI
- **Roteamento**: React Router DOM
- **Notificações**: Sonner (toasts)
- **Ícones**: Lucide React

### Estrutura de Dados

#### Profissional
```typescript
{
  id: string
  name: string
  email: string
  phone: string
  category: ProfessionalCategory
  hourlyRate: number
  experience: number
  documents: Document[]
  biometric: BiometricData
  cuisines: CuisineType[]
  location: Location
  qrCode: string
  rating: number
  totalJobs: number
  completionRate: number
  available: boolean
  banned: boolean
}
```

#### Trabalho (Job)
```typescript
{
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
  distance?: number
  description: string
  status: JobStatus
  payment?: Payment
  feedback?: Feedback
}
```

## Diferenciais Competitivos

### 1. Segurança Total
- Verificação biométrica facial
- Validação de documentos
- QR Code exclusivo para identificação
- Sistema de avaliações transparente

### 2. Flexibilidade de Pagamento
- 5 métodos diferentes (incluindo Bitcoin)
- Taxa competitiva de 28,6%
- Pagamento rápido aos profissionais

### 3. Geolocalização Inteligente
- Cálculo preciso de distância
- Tempo estimado de deslocamento
- Filtro por proximidade

### 4. Categorização Especializada
- 12 categorias profissionais
- Faixas salariais claras
- Requisitos de diploma para cargos superiores

### 5. Chamadas Urgentes
- Bônus de 20% para urgências
- Notificações em tempo real
- Sistema de priorização

## Roadmap Futuro

### Fase 1 - MVP (Atual)
- [x] Cadastro de profissionais e empresas
- [x] Sistema de busca e filtros
- [x] Geolocalização básica
- [x] Pagamentos (5 métodos)
- [x] Sistema de avaliações

### Fase 2 - Expansão
- [ ] Integração com Supabase (banco de dados)
- [ ] Chat em tempo real
- [ ] Push notifications
- [ ] Integração com APIs de pagamento reais
- [ ] Dashboard administrativo completo

### Fase 3 - Inteligência
- [ ] IA para matching profissional-empresa
- [ ] Previsão de demanda
- [ ] Sistema de recomendações
- [ ] Análise preditiva de performance

### Fase 4 - Escala
- [ ] Expansão para outras culinárias (italiana, francesa, etc)
- [ ] Sistema de fidelidade e recompensas
- [ ] Programa de indicações
- [ ] App mobile nativo (iOS/Android)

## Licença

Este projeto é proprietário. Todos os direitos reservados.

---

**Ninjas do Sushi** - Conectando talentos culinários com oportunidades premium 🍣
