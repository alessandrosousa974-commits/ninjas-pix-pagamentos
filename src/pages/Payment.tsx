import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FormField as Field } from '@/components/FormField'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { toast } from 'sonner'
import {
  CreditCard,
  QrCode,
  ArrowLeft,
  Check,
  Bitcoin,
  Wallet,
  Smartphone,
} from 'lucide-react'
import { PaymentMethod, PLATFORM_FEE } from '@/types'

export default function Payment() {
  const navigate = useNavigate()
  const [selectedMethod, setSelectedMethod] = useState<PaymentMethod | null>(null)
  const [processing, setProcessing] = useState(false)

  // Dados mock do trabalho
  const jobAmount = 800 // R$ 100/h x 8 horas
  const platformFee = jobAmount * PLATFORM_FEE
  const professionalAmount = jobAmount - platformFee
  const totalAmount = jobAmount

  const paymentMethods: Array<{
    id: PaymentMethod
    name: string
    icon: typeof CreditCard
    description: string
    available: boolean
  }> = [
    {
      id: 'pix',
      name: 'PIX',
      icon: QrCode,
      description: 'Pagamento instantâneo',
      available: true,
    },
    {
      id: 'credit-card',
      name: 'Cartão de Crédito',
      icon: CreditCard,
      description: 'Visa, Mastercard, Elo',
      available: true,
    },
    {
      id: 'debit-card',
      name: 'Cartão de Débito',
      icon: Smartphone,
      description: 'Débito instantâneo',
      available: true,
    },
    {
      id: 'bitcoin',
      name: 'Bitcoin',
      icon: Bitcoin,
      description: 'Criptomoeda',
      available: true,
    },
    {
      id: 'boleto',
      name: 'Boleto',
      icon: Wallet,
      description: 'Vencimento em 3 dias',
      available: true,
    },
  ]

  const handlePayment = async () => {
    if (!selectedMethod) {
      toast.error('Selecione uma forma de pagamento')
      return
    }

    setProcessing(true)

    // Simular processamento
    setTimeout(() => {
      setProcessing(false)
      toast.success('Pagamento processado com sucesso!', {
        description: 'O profissional foi notificado e receberá o valor em até 2 dias úteis',
      })
      navigate('/dashboard')
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-background p-4 py-8">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Pagamento</h1>
            <p className="text-sm text-muted-foreground">
              Escolha a forma de pagamento
            </p>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Formas de Pagamento */}
          <div className="lg:col-span-2 space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Selecione a forma de pagamento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {paymentMethods.map((method) => (
                  <button
                    key={method.id}
                    onClick={() => setSelectedMethod(method.id)}
                    disabled={!method.available}
                    className={`w-full p-4 rounded-lg border-2 transition-all ${
                      selectedMethod === method.id
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    } ${!method.available ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`p-3 rounded-lg ${
                          selectedMethod === method.id
                            ? 'bg-primary text-primary-foreground'
                            : 'bg-muted'
                        }`}
                      >
                        <method.icon className="w-6 h-6" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="font-medium">{method.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {method.description}
                        </p>
                      </div>
                      {selectedMethod === method.id && (
                        <Check className="w-5 h-5 text-primary" />
                      )}
                    </div>
                  </button>
                ))}
              </CardContent>
            </Card>

            {/* Formulário específico de cada método */}
            {selectedMethod === 'credit-card' && <CreditCardForm />}
            {selectedMethod === 'debit-card' && <DebitCardForm />}
            {selectedMethod === 'pix' && <PixForm />}
            {selectedMethod === 'bitcoin' && <BitcoinForm amount={totalAmount} />}
            {selectedMethod === 'boleto' && <BoletoForm />}
          </div>

          {/* Resumo */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Resumo do Pagamento</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Valor do Trabalho</span>
                    <span className="font-medium">R$ {jobAmount.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Taxa da Plataforma ({(PLATFORM_FEE * 100).toFixed(1)}%)
                    </span>
                    <span className="font-medium text-red-600">
                      - R$ {platformFee.toFixed(2)}
                    </span>
                  </div>
                  <div className="h-px bg-border"></div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      Profissional Recebe
                    </span>
                    <span className="font-medium text-green-600">
                      R$ {professionalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="p-4 bg-primary/10 rounded-lg">
                  <div className="flex items-center justify-between">
                    <span className="font-bold">Total a Pagar</span>
                    <span className="text-2xl font-bold text-primary">
                      R$ {totalAmount.toFixed(2)}
                    </span>
                  </div>
                </div>

                <div className="space-y-2 text-xs text-muted-foreground">
                  <p>✓ Pagamento 100% seguro</p>
                  <p>✓ Profissional recebe em até 2 dias úteis</p>
                  <p>✓ Garantia de reembolso</p>
                </div>
              </CardContent>
              <CardFooter>
                <Button
                  onClick={handlePayment}
                  disabled={!selectedMethod || processing}
                  className="w-full"
                  size="lg"
                >
                  {processing ? 'Processando...' : 'Confirmar Pagamento'}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

function CreditCardForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Dados do Cartão de Crédito</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Field label="Número do Cartão" required>
          <Input placeholder="0000 0000 0000 0000" maxLength={19} />
        </Field>
        <Field label="Nome no Cartão" required>
          <Input placeholder="Como está no cartão" />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Validade" required>
            <Input placeholder="MM/AA" maxLength={5} />
          </Field>
          <Field label="CVV" required>
            <Input placeholder="123" maxLength={4} type="password" />
          </Field>
        </div>
      </CardContent>
    </Card>
  )
}

function DebitCardForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Dados do Cartão de Débito</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <Field label="Número do Cartão" required>
          <Input placeholder="0000 0000 0000 0000" maxLength={19} />
        </Field>
        <Field label="Nome no Cartão" required>
          <Input placeholder="Como está no cartão" />
        </Field>
        <div className="grid grid-cols-2 gap-4">
          <Field label="Validade" required>
            <Input placeholder="MM/AA" maxLength={5} />
          </Field>
          <Field label="CVV" required>
            <Input placeholder="123" maxLength={4} type="password" />
          </Field>
        </div>
      </CardContent>
    </Card>
  )
}

function PixForm() {
  const pixCode = 'ninjasdosushi.pix.pagamento.123456789'

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Pagamento via PIX</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col items-center gap-4 p-6">
          {/* QR Code Simulado */}
          <div className="w-48 h-48 bg-muted rounded-lg flex items-center justify-center border-4 border-border">
            <div className="text-center">
              <QrCode className="w-24 h-24 mx-auto text-primary" />
              <p className="text-xs text-muted-foreground mt-2">QR Code PIX</p>
            </div>
          </div>

          <div className="w-full space-y-2">
            <Label>Código PIX Copia e Cola</Label>
            <div className="flex gap-2">
              <Input value={pixCode} readOnly className="font-mono text-xs" />
              <Button
                variant="outline"
                onClick={() => {
                  navigator.clipboard.writeText(pixCode)
                  toast.success('Código copiado!')
                }}
              >
                Copiar
              </Button>
            </div>
          </div>
        </div>

        <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
          <p className="text-sm text-blue-600 dark:text-blue-400">
            <strong>Instruções:</strong>
            <br />
            1. Abra o app do seu banco
            <br />
            2. Escolha pagar com PIX
            <br />
            3. Escaneie o QR Code ou cole o código
            <br />
            4. Confirme o pagamento
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

function BitcoinForm({ amount }: { amount: number }) {
  // Conversão simulada (1 BTC = ~300.000 BRL)
  const btcAmount = (amount / 300000).toFixed(8)
  const btcAddress = '1NinjasDoSushiBTC123456789ABCDEFGH'

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Bitcoin className="w-5 h-5" />
          Pagamento via Bitcoin
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-orange-50 dark:bg-orange-950/20 border border-orange-200 dark:border-orange-800 rounded-lg">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium">Valor em BTC:</span>
            <span className="text-lg font-bold text-orange-600">
              {btcAmount} BTC
            </span>
          </div>
          <p className="text-xs text-muted-foreground">
            Taxa de conversão: 1 BTC = R$ 300.000,00
          </p>
        </div>

        <div className="flex flex-col items-center gap-4 p-6">
          {/* QR Code Bitcoin Simulado */}
          <div className="w-48 h-48 bg-muted rounded-lg flex items-center justify-center border-4 border-orange-500">
            <div className="text-center">
              <Bitcoin className="w-24 h-24 mx-auto text-orange-500" />
              <p className="text-xs text-muted-foreground mt-2">
                Bitcoin Address
              </p>
            </div>
          </div>

          <div className="w-full space-y-2">
            <Label>Endereço Bitcoin</Label>
            <div className="flex gap-2">
              <Input
                value={btcAddress}
                readOnly
                className="font-mono text-xs"
              />
              <Button
                variant="outline"
                onClick={() => {
                  navigator.clipboard.writeText(btcAddress)
                  toast.success('Endereço copiado!')
                }}
              >
                Copiar
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-2 text-xs text-muted-foreground">
          <p>⚠️ O pagamento será confirmado após 3 confirmações na blockchain</p>
          <p>⏱️ Tempo estimado: 30-60 minutos</p>
          <p>🔒 Transação segura e irreversível</p>
        </div>
      </CardContent>
    </Card>
  )
}

function BoletoForm() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Boleto Bancário</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg space-y-2">
          <p className="text-sm font-medium">Após a confirmação:</p>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>✓ O boleto será gerado instantaneamente</li>
            <li>✓ Você receberá o boleto por e-mail</li>
            <li>✓ Vencimento em 3 dias úteis</li>
            <li>✓ Pode pagar em qualquer banco ou lotérica</li>
          </ul>
        </div>

        <Field label="CPF/CNPJ do Pagador" required>
          <Input placeholder="000.000.000-00" />
        </Field>

        <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
          <p className="text-xs text-yellow-600 dark:text-yellow-400">
            ⚠️ O trabalho só será confirmado após a compensação do boleto (até 3
            dias úteis)
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
