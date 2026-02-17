import { useState, useEffect } from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { Switch } from '@/components/ui/switch'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import {
  CreditCard,
  Bitcoin,
  QrCode,
  FileText,
  Shield,
  Clock,
  CheckCircle2,
  XCircle,
  ArrowLeft,
  Wallet,
  History,
  Plus,
  Trash2,
  Lock,
  AlertCircle,
  Copy,
  Download,
  Eye,
  EyeOff
} from 'lucide-react'
import { toast } from 'sonner'
import { useNavigate } from 'react-router-dom'

interface Transaction {
  id: string
  date: string
  amount: number
  method: 'pix' | 'card' | 'bitcoin' | 'boleto'
  status: 'completed' | 'pending' | 'failed'
  description: string
}

interface SavedCard {
  id: string
  brand: string
  lastFour: string
  expiry: string
  isDefault: boolean
}

interface TwoFactorSettings {
  enabled: boolean
  method: 'sms' | 'email' | 'app'
  phone?: string
  email?: string
}

export default function Payments() {
  const navigate = useNavigate()
  const [amount, setAmount] = useState('')
  const [selectedMethod, setSelectedMethod] = useState<'pix' | 'card' | 'bitcoin' | 'boleto'>('pix')
  const [processing, setProcessing] = useState(false)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [twoFactorCode, setTwoFactorCode] = useState('')
  const [showTwoFactor, setShowTwoFactor] = useState(false)
  const [pixCode, setPixCode] = useState('')
  const [bitcoinAddress, setBitcoinAddress] = useState('')
  const [boletoCode, setBoletoCode] = useState('')

  // Card form
  const [cardNumber, setCardNumber] = useState('')
  const [cardName, setCardName] = useState('')
  const [cardExpiry, setCardExpiry] = useState('')
  const [cardCVV, setCardCVV] = useState('')
  const [showCVV, setShowCVV] = useState(false)
  const [saveCard, setSaveCard] = useState(false)

  // Saved cards
  const [savedCards, setSavedCards] = useState<SavedCard[]>([
    { id: '1', brand: 'Visa', lastFour: '4242', expiry: '12/25', isDefault: true },
    { id: '2', brand: 'Mastercard', lastFour: '5555', expiry: '09/26', isDefault: false }
  ])
  const [selectedCard, setSelectedCard] = useState<string>('')

  // Transaction history
  const [transactions, setTransactions] = useState<Transaction[]>([
    { id: '1', date: '2026-02-15', amount: 150.00, method: 'pix', status: 'completed', description: 'Recarga de créditos' },
    { id: '2', date: '2026-02-10', amount: 300.00, method: 'card', status: 'completed', description: 'Plano Premium' },
    { id: '3', date: '2026-02-05', amount: 75.50, method: 'bitcoin', status: 'pending', description: 'Compra de tokens' },
    { id: '4', date: '2026-01-28', amount: 200.00, method: 'boleto', status: 'completed', description: 'Assinatura anual' }
  ])

  // Two Factor Authentication
  const [twoFactorSettings, setTwoFactorSettings] = useState<TwoFactorSettings>({
    enabled: false,
    method: 'app',
    email: 'usuario@exemplo.com'
  })

  useEffect(() => {
    // Load saved settings from localStorage
    const saved = localStorage.getItem('twoFactorSettings')
    if (saved) {
      setTwoFactorSettings(JSON.parse(saved))
    }
  }, [])

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const formatCardNumber = (value: string) => {
    const cleaned = value.replace(/\s/g, '')
    const groups = cleaned.match(/.{1,4}/g)
    return groups ? groups.join(' ') : cleaned
  }

  const formatExpiry = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    if (cleaned.length >= 2) {
      return cleaned.slice(0, 2) + '/' + cleaned.slice(2, 4)
    }
    return cleaned
  }

  const generatePixCode = () => {
    const code = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    setPixCode(code.toUpperCase())
    return code
  }

  const generateBitcoinAddress = () => {
    const address = 'bc1q' + Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
    setBitcoinAddress(address)
    return address
  }

  const generateBoletoCode = () => {
    const code = Array.from({ length: 47 }, () => Math.floor(Math.random() * 10)).join('')
    setBoletoCode(code)
    return code
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    toast.success(`${label} copiado para a área de transferência`)
  }

  const handleAmountChange = (value: string) => {
    const cleaned = value.replace(/\D/g, '')
    const numValue = parseFloat(cleaned) / 100
    setAmount(numValue.toFixed(2))
  }

  const initiatePayment = () => {
    if (!amount || parseFloat(amount) <= 0) {
      toast.error('Insira um valor válido')
      return
    }

    if (selectedMethod === 'card' && !selectedCard) {
      if (!cardNumber || !cardName || !cardExpiry || !cardCVV) {
        toast.error('Preencha todos os dados do cartão')
        return
      }
    }

    setShowConfirmation(true)
  }

  const confirmPayment = () => {
    setShowConfirmation(false)

    // Check if 2FA is enabled
    if (twoFactorSettings.enabled) {
      setShowTwoFactor(true)
      toast.info('Código de verificação enviado para ' + twoFactorSettings.method)
    } else {
      processPayment()
    }
  }

  const verifyTwoFactor = () => {
    if (twoFactorCode.length !== 6) {
      toast.error('Código inválido')
      return
    }

    // Simulate verification
    setShowTwoFactor(false)
    setTwoFactorCode('')
    processPayment()
  }

  const processPayment = () => {
    setProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      const amountValue = parseFloat(amount)

      if (selectedMethod === 'pix') {
        const code = generatePixCode()
        toast.success('QR Code Pix gerado com sucesso!')
      } else if (selectedMethod === 'bitcoin') {
        const address = generateBitcoinAddress()
        toast.success('Endereço Bitcoin gerado!')
      } else if (selectedMethod === 'boleto') {
        const code = generateBoletoCode()
        toast.success('Boleto gerado com sucesso!')
      } else if (selectedMethod === 'card') {
        // Save card if requested
        if (saveCard && cardNumber && !selectedCard) {
          const newCard: SavedCard = {
            id: Date.now().toString(),
            brand: cardNumber.startsWith('4') ? 'Visa' : 'Mastercard',
            lastFour: cardNumber.slice(-4),
            expiry: cardExpiry,
            isDefault: savedCards.length === 0
          }
          setSavedCards([...savedCards, newCard])
          toast.success('Cartão salvo com sucesso!')
        }
        toast.success('Pagamento processado com sucesso!')
      }

      // Add to transaction history
      const newTransaction: Transaction = {
        id: Date.now().toString(),
        date: new Date().toISOString().split('T')[0],
        amount: amountValue,
        method: selectedMethod,
        status: selectedMethod === 'boleto' || selectedMethod === 'bitcoin' ? 'pending' : 'completed',
        description: 'Recarga de créditos'
      }

      setTransactions([newTransaction, ...transactions])

      setProcessing(false)

      // Reset form
      if (selectedMethod === 'card' && !selectedCard) {
        setCardNumber('')
        setCardName('')
        setCardExpiry('')
        setCardCVV('')
        setSaveCard(false)
      }
    }, 2000)
  }

  const removeCard = (cardId: string) => {
    setSavedCards(savedCards.filter(c => c.id !== cardId))
    toast.success('Cartão removido')
  }

  const setDefaultCard = (cardId: string) => {
    setSavedCards(savedCards.map(c => ({
      ...c,
      isDefault: c.id === cardId
    })))
    toast.success('Cartão padrão atualizado')
  }

  const toggleTwoFactor = (enabled: boolean) => {
    const newSettings = { ...twoFactorSettings, enabled }
    setTwoFactorSettings(newSettings)
    localStorage.setItem('twoFactorSettings', JSON.stringify(newSettings))
    toast.success(enabled ? 'Autenticação de dois fatores ativada' : 'Autenticação de dois fatores desativada')
  }

  const updateTwoFactorMethod = (method: 'sms' | 'email' | 'app') => {
    const newSettings = { ...twoFactorSettings, method }
    setTwoFactorSettings(newSettings)
    localStorage.setItem('twoFactorSettings', JSON.stringify(newSettings))
    toast.success('Método de autenticação atualizado')
  }

  const getStatusBadge = (status: Transaction['status']) => {
    const config = {
      completed: { label: 'Concluído', className: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400' },
      pending: { label: 'Pendente', className: 'bg-amber-500/10 text-amber-600 dark:text-amber-400' },
      failed: { label: 'Falhou', className: 'bg-destructive/10 text-destructive' }
    }
    const { label, className } = config[status]
    return <Badge className={className}>{label}</Badge>
  }

  const getMethodIcon = (method: Transaction['method']) => {
    const icons = {
      pix: <QrCode className="h-4 w-4" />,
      card: <CreditCard className="h-4 w-4" />,
      bitcoin: <Bitcoin className="h-4 w-4" />,
      boleto: <FileText className="h-4 w-4" />
    }
    return icons[method]
  }

  const getMethodLabel = (method: Transaction['method']) => {
    const labels = {
      pix: 'Pix',
      card: 'Cartão',
      bitcoin: 'Bitcoin',
      boleto: 'Boleto'
    }
    return labels[method]
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto p-4 md:p-6 max-w-7xl">
        {/* Header */}
        <div className="flex items-center gap-4 mb-6">
          <Button variant="outline" size="icon" onClick={() => navigate('/dashboard')}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Pagamentos</h1>
            <p className="text-muted-foreground">Gerencie seus pagamentos e métodos de recebimento</p>
          </div>
        </div>

        <Tabs defaultValue="pay" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="pay" className="flex items-center gap-2">
              <Wallet className="h-4 w-4" />
              Pagar
            </TabsTrigger>
            <TabsTrigger value="receive" className="flex items-center gap-2">
              <CreditCard className="h-4 w-4" />
              Receber
            </TabsTrigger>
            <TabsTrigger value="history" className="flex items-center gap-2">
              <History className="h-4 w-4" />
              Histórico
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              Segurança
            </TabsTrigger>
          </TabsList>

          {/* Pay Tab */}
          <TabsContent value="pay" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              {/* Payment Form */}
              <Card>
                <CardHeader>
                  <CardTitle>Novo Pagamento</CardTitle>
                  <CardDescription>Escolha o método e valor do pagamento</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="amount">Valor</Label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">R$</span>
                      <Input
                        id="amount"
                        type="text"
                        placeholder="0,00"
                        value={amount}
                        onChange={(e) => handleAmountChange(e.target.value)}
                        className="pl-12 text-lg font-semibold"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label>Método de Pagamento</Label>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant={selectedMethod === 'pix' ? 'default' : 'outline'}
                        className="flex items-center gap-2"
                        onClick={() => setSelectedMethod('pix')}
                      >
                        <QrCode className="h-4 w-4" />
                        Pix
                      </Button>
                      <Button
                        variant={selectedMethod === 'card' ? 'default' : 'outline'}
                        className="flex items-center gap-2"
                        onClick={() => setSelectedMethod('card')}
                      >
                        <CreditCard className="h-4 w-4" />
                        Cartão
                      </Button>
                      <Button
                        variant={selectedMethod === 'bitcoin' ? 'default' : 'outline'}
                        className="flex items-center gap-2"
                        onClick={() => setSelectedMethod('bitcoin')}
                      >
                        <Bitcoin className="h-4 w-4" />
                        Bitcoin
                      </Button>
                      <Button
                        variant={selectedMethod === 'boleto' ? 'default' : 'outline'}
                        className="flex items-center gap-2"
                        onClick={() => setSelectedMethod('boleto')}
                      >
                        <FileText className="h-4 w-4" />
                        Boleto
                      </Button>
                    </div>
                  </div>

                  {/* Card Payment Details */}
                  {selectedMethod === 'card' && (
                    <div className="space-y-4 pt-4 border-t">
                      {savedCards.length > 0 && (
                        <div className="space-y-2">
                          <Label>Cartões Salvos</Label>
                          <Select value={selectedCard} onValueChange={setSelectedCard}>
                            <SelectTrigger>
                              <SelectValue placeholder="Novo cartão" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="">Novo cartão</SelectItem>
                              {savedCards.map(card => (
                                <SelectItem key={card.id} value={card.id}>
                                  {card.brand} •••• {card.lastFour} {card.isDefault && '(Padrão)'}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                      )}

                      {!selectedCard && (
                        <>
                          <div className="space-y-2">
                            <Label htmlFor="cardNumber">Número do Cartão</Label>
                            <Input
                              id="cardNumber"
                              type="text"
                              placeholder="1234 5678 9012 3456"
                              value={formatCardNumber(cardNumber)}
                              onChange={(e) => setCardNumber(e.target.value.replace(/\s/g, '').slice(0, 16))}
                              maxLength={19}
                            />
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="cardName">Nome no Cartão</Label>
                            <Input
                              id="cardName"
                              type="text"
                              placeholder="NOME COMPLETO"
                              value={cardName}
                              onChange={(e) => setCardName(e.target.value.toUpperCase())}
                            />
                          </div>

                          <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                              <Label htmlFor="cardExpiry">Validade</Label>
                              <Input
                                id="cardExpiry"
                                type="text"
                                placeholder="MM/AA"
                                value={formatExpiry(cardExpiry)}
                                onChange={(e) => setCardExpiry(e.target.value.replace(/\D/g, '').slice(0, 4))}
                                maxLength={5}
                              />
                            </div>

                            <div className="space-y-2">
                              <Label htmlFor="cardCVV">CVV</Label>
                              <div className="relative">
                                <Input
                                  id="cardCVV"
                                  type={showCVV ? 'text' : 'password'}
                                  placeholder="123"
                                  value={cardCVV}
                                  onChange={(e) => setCardCVV(e.target.value.replace(/\D/g, '').slice(0, 4))}
                                  maxLength={4}
                                  className="pr-10"
                                />
                                <Button
                                  type="button"
                                  variant="ghost"
                                  size="icon"
                                  className="absolute right-0 top-0 h-full"
                                  onClick={() => setShowCVV(!showCVV)}
                                >
                                  {showCVV ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                </Button>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <Switch
                              id="saveCard"
                              checked={saveCard}
                              onCheckedChange={setSaveCard}
                            />
                            <Label htmlFor="saveCard" className="text-sm font-normal cursor-pointer">
                              Salvar cartão para próximos pagamentos
                            </Label>
                          </div>
                        </>
                      )}
                    </div>
                  )}

                  <Button
                    className="w-full"
                    size="lg"
                    onClick={initiatePayment}
                    disabled={processing}
                  >
                    {processing ? 'Processando...' : `Pagar ${amount ? formatCurrency(parseFloat(amount)) : ''}`}
                  </Button>
                </CardContent>
              </Card>

              {/* Payment Info */}
              <div className="space-y-4">
                {selectedMethod === 'pix' && pixCode && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <QrCode className="h-5 w-5" />
                        Código Pix
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-muted p-8 rounded-lg flex items-center justify-center">
                        <QrCode className="h-32 w-32 text-muted-foreground" />
                      </div>

                      <div className="space-y-2">
                        <Label>Código Pix Copia e Cola</Label>
                        <div className="flex gap-2">
                          <Input value={pixCode} readOnly className="font-mono text-sm" />
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => copyToClipboard(pixCode, 'Código Pix')}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <Alert>
                        <Clock className="h-4 w-4" />
                        <AlertDescription>
                          Este código Pix expira em 30 minutos. Após o pagamento, a confirmação é imediata.
                        </AlertDescription>
                      </Alert>
                    </CardContent>
                  </Card>
                )}

                {selectedMethod === 'bitcoin' && bitcoinAddress && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Bitcoin className="h-5 w-5" />
                        Endereço Bitcoin
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-muted p-8 rounded-lg flex items-center justify-center">
                        <QrCode className="h-32 w-32 text-muted-foreground" />
                      </div>

                      <div className="space-y-2">
                        <Label>Endereço da Carteira</Label>
                        <div className="flex gap-2">
                          <Input value={bitcoinAddress} readOnly className="font-mono text-sm" />
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => copyToClipboard(bitcoinAddress, 'Endereço Bitcoin')}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <Label>Valor em BTC (aproximado)</Label>
                        <Input
                          value={amount ? (parseFloat(amount) / 50000).toFixed(8) : '0.00000000'}
                          readOnly
                          className="font-mono"
                        />
                      </div>

                      <Alert>
                        <Clock className="h-4 w-4" />
                        <AlertDescription>
                          Envie o valor exato para o endereço acima. A confirmação pode levar até 30 minutos.
                        </AlertDescription>
                      </Alert>
                    </CardContent>
                  </Card>
                )}

                {selectedMethod === 'boleto' && boletoCode && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5" />
                        Boleto Bancário
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Código de Barras</Label>
                        <div className="flex gap-2">
                          <Input value={boletoCode} readOnly className="font-mono text-sm" />
                          <Button
                            variant="outline"
                            size="icon"
                            onClick={() => copyToClipboard(boletoCode, 'Código do boleto')}
                          >
                            <Copy className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button className="flex-1" variant="outline">
                          <Download className="h-4 w-4 mr-2" />
                          Baixar PDF
                        </Button>
                        <Button className="flex-1" variant="outline">
                          <Copy className="h-4 w-4 mr-2" />
                          Copiar Código
                        </Button>
                      </div>

                      <Alert>
                        <Clock className="h-4 w-4" />
                        <AlertDescription>
                          O boleto vence em 3 dias úteis. A confirmação pode levar até 2 dias úteis após o pagamento.
                        </AlertDescription>
                      </Alert>
                    </CardContent>
                  </Card>
                )}

                {selectedMethod === 'card' && (
                  <Card>
                    <CardHeader>
                      <CardTitle className="flex items-center gap-2">
                        <Shield className="h-5 w-5" />
                        Pagamento Seguro
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-3">
                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5" />
                          <div>
                            <p className="font-medium">Criptografia SSL</p>
                            <p className="text-sm text-muted-foreground">Seus dados são protegidos com criptografia de ponta</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5" />
                          <div>
                            <p className="font-medium">PCI Compliance</p>
                            <p className="text-sm text-muted-foreground">Certificação de segurança internacional</p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3">
                          <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5" />
                          <div>
                            <p className="font-medium">Autenticação 3D Secure</p>
                            <p className="text-sm text-muted-foreground">Verificação adicional para sua proteção</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>

            {/* Saved Cards Management */}
            {savedCards.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Cartões Salvos</CardTitle>
                  <CardDescription>Gerencie seus métodos de pagamento</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {savedCards.map(card => (
                      <div key={card.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-primary/10 rounded">
                            <CreditCard className="h-5 w-5 text-primary" />
                          </div>
                          <div>
                            <p className="font-medium">{card.brand} •••• {card.lastFour}</p>
                            <p className="text-sm text-muted-foreground">Expira em {card.expiry}</p>
                          </div>
                          {card.isDefault && (
                            <Badge variant="secondary">Padrão</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {!card.isDefault && (
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setDefaultCard(card.id)}
                            >
                              Tornar Padrão
                            </Button>
                          )}
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => removeCard(card.id)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          {/* Receive Tab */}
          <TabsContent value="receive" className="space-y-6">
            <div className="grid gap-6 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <QrCode className="h-5 w-5" />
                    Receber via Pix
                  </CardTitle>
                  <CardDescription>Configure sua chave Pix para receber pagamentos</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="pixKey">Chave Pix</Label>
                    <Input
                      id="pixKey"
                      type="text"
                      placeholder="email@exemplo.com ou CPF/CNPJ"
                    />
                  </div>
                  <Button className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Chave
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Bitcoin className="h-5 w-5" />
                    Receber via Bitcoin
                  </CardTitle>
                  <CardDescription>Configure sua carteira Bitcoin</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="btcAddress">Endereço da Carteira</Label>
                    <Input
                      id="btcAddress"
                      type="text"
                      placeholder="bc1q..."
                      className="font-mono text-sm"
                    />
                  </div>
                  <Button className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Adicionar Carteira
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CreditCard className="h-5 w-5" />
                    Receber via Cartão
                  </CardTitle>
                  <CardDescription>Configure conta para receber pagamentos com cartão</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Para receber pagamentos via cartão, você precisa de uma conta de pagamento aprovada.
                    </AlertDescription>
                  </Alert>
                  <Button className="w-full" variant="outline">
                    Solicitar Aprovação
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="h-5 w-5" />
                    Gerar Cobrança
                  </CardTitle>
                  <CardDescription>Crie links de pagamento personalizados</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="chargeAmount">Valor da Cobrança</Label>
                    <Input
                      id="chargeAmount"
                      type="text"
                      placeholder="R$ 0,00"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="chargeDesc">Descrição</Label>
                    <Input
                      id="chargeDesc"
                      type="text"
                      placeholder="Descrição do pagamento"
                    />
                  </div>
                  <Button className="w-full">
                    Gerar Link de Pagamento
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* History Tab */}
          <TabsContent value="history" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Histórico de Transações</CardTitle>
                <CardDescription>Visualize todas as suas transações</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {transactions.map(transaction => (
                    <div key={transaction.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="p-2 bg-primary/10 rounded">
                          {getMethodIcon(transaction.method)}
                        </div>
                        <div>
                          <p className="font-medium">{transaction.description}</p>
                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>{new Date(transaction.date).toLocaleDateString('pt-BR')}</span>
                            <span>•</span>
                            <span>{getMethodLabel(transaction.method)}</span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <p className="font-semibold">{formatCurrency(transaction.amount)}</p>
                          {getStatusBadge(transaction.status)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Autenticação de Dois Fatores (2FA)
                </CardTitle>
                <CardDescription>
                  Adicione uma camada extra de segurança aos seus pagamentos
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded ${twoFactorSettings.enabled ? 'bg-emerald-500/10' : 'bg-muted'}`}>
                      <Lock className={`h-5 w-5 ${twoFactorSettings.enabled ? 'text-emerald-600' : 'text-muted-foreground'}`} />
                    </div>
                    <div>
                      <p className="font-medium">Autenticação de Dois Fatores</p>
                      <p className="text-sm text-muted-foreground">
                        {twoFactorSettings.enabled ? 'Ativado' : 'Desativado'}
                      </p>
                    </div>
                  </div>
                  <Switch
                    checked={twoFactorSettings.enabled}
                    onCheckedChange={toggleTwoFactor}
                  />
                </div>

                {twoFactorSettings.enabled && (
                  <div className="space-y-4 pt-4 border-t">
                    <div className="space-y-2">
                      <Label>Método de Verificação</Label>
                      <Select value={twoFactorSettings.method} onValueChange={updateTwoFactorMethod}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="app">Aplicativo Autenticador</SelectItem>
                          <SelectItem value="sms">SMS</SelectItem>
                          <SelectItem value="email">Email</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    {twoFactorSettings.method === 'app' && (
                      <Alert>
                        <AlertCircle className="h-4 w-4" />
                        <AlertDescription>
                          Use um aplicativo como Google Authenticator ou Authy para gerar códigos de verificação.
                        </AlertDescription>
                      </Alert>
                    )}

                    {twoFactorSettings.method === 'sms' && (
                      <div className="space-y-2">
                        <Label htmlFor="phone">Número de Telefone</Label>
                        <Input
                          id="phone"
                          type="tel"
                          placeholder="(11) 99999-9999"
                          value={twoFactorSettings.phone || ''}
                          onChange={(e) => setTwoFactorSettings({ ...twoFactorSettings, phone: e.target.value })}
                        />
                      </div>
                    )}

                    {twoFactorSettings.method === 'email' && (
                      <div className="space-y-2">
                        <Label htmlFor="email">Email de Verificação</Label>
                        <Input
                          id="email"
                          type="email"
                          placeholder="email@exemplo.com"
                          value={twoFactorSettings.email || ''}
                          onChange={(e) => setTwoFactorSettings({ ...twoFactorSettings, email: e.target.value })}
                        />
                      </div>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Configurações de Segurança</CardTitle>
                <CardDescription>Personalize suas preferências de segurança</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Confirmar pagamentos acima de R$ 1.000</p>
                    <p className="text-sm text-muted-foreground">Solicitar confirmação para valores altos</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Notificações de pagamento</p>
                    <p className="text-sm text-muted-foreground">Receber alertas para cada transação</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Bloquear dispositivos desconhecidos</p>
                    <p className="text-sm text-muted-foreground">Exigir aprovação para novos dispositivos</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar Pagamento</DialogTitle>
            <DialogDescription>
              Revise os detalhes antes de confirmar
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Valor:</span>
              <span className="text-2xl font-bold">{formatCurrency(parseFloat(amount || '0'))}</span>
            </div>
            <Separator />
            <div className="flex justify-between items-center">
              <span className="text-muted-foreground">Método:</span>
              <span className="font-medium">{getMethodLabel(selectedMethod)}</span>
            </div>
            <Separator />
            {twoFactorSettings.enabled && (
              <Alert>
                <Shield className="h-4 w-4" />
                <AlertDescription>
                  Um código de verificação será enviado para {twoFactorSettings.method}
                </AlertDescription>
              </Alert>
            )}
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowConfirmation(false)}>
              Cancelar
            </Button>
            <Button onClick={confirmPayment}>
              Confirmar Pagamento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Two Factor Dialog */}
      <Dialog open={showTwoFactor} onOpenChange={setShowTwoFactor}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5" />
              Verificação de Segurança
            </DialogTitle>
            <DialogDescription>
              Digite o código de 6 dígitos enviado para {twoFactorSettings.method}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="2faCode">Código de Verificação</Label>
              <Input
                id="2faCode"
                type="text"
                placeholder="000000"
                value={twoFactorCode}
                onChange={(e) => setTwoFactorCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                maxLength={6}
                className="text-center text-2xl tracking-widest font-mono"
              />
            </div>
            <Alert>
              <Clock className="h-4 w-4" />
              <AlertDescription>
                O código expira em 5 minutos
              </AlertDescription>
            </Alert>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTwoFactor(false)}>
              Cancelar
            </Button>
            <Button onClick={verifyTwoFactor} disabled={twoFactorCode.length !== 6}>
              Verificar
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
