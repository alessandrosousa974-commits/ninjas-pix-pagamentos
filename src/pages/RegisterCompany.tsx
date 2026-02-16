import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FormField as Field } from '@/components/FormField'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { toast } from 'sonner'
import { ArrowLeft, Building2, Upload, MapPin } from 'lucide-react'
import { CuisineType, CUISINE_LABELS } from '@/types'

export default function RegisterCompany() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cnpj: '',
    type: 'restaurante' as 'restaurante' | 'evento' | 'catering',
    cuisines: [] as CuisineType[],
    location: {
      address: '',
      city: '',
      state: '',
      zipCode: '',
    },
    cnpjPhoto: null as File | null,
    contratoSocialPhoto: null as File | null,
  })

  const handleCuisineToggle = (cuisine: CuisineType) => {
    setFormData({
      ...formData,
      cuisines: formData.cuisines.includes(cuisine)
        ? formData.cuisines.filter(c => c !== cuisine)
        : [...formData.cuisines, cuisine],
    })
  }

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.cnpj) {
      toast.error('Preencha todos os campos obrigatórios')
      return
    }

    if (formData.cuisines.length === 0) {
      toast.error('Selecione pelo menos uma culinária')
      return
    }

    if (!formData.cnpjPhoto) {
      toast.error('Cartão CNPJ é obrigatório')
      return
    }

    try {
      await register(
        {
          ...formData,
          cnpjVerified: false,
          rating: 0,
          totalHires: 0,
          feedbacks: [],
        },
        'company'
      )

      toast.success('Cadastro realizado com sucesso!', {
        description: 'Aguarde a verificação do CNPJ (até 24h)',
      })

      navigate('/dashboard')
    } catch (error) {
      toast.error('Erro ao criar conta')
    }
  }

  return (
    <div className="min-h-screen bg-background p-4 py-8">
      <div className="max-w-2xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => step === 1 ? navigate('/') : setStep(step - 1)}
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Cadastro de Empresa</h1>
            <p className="text-sm text-muted-foreground">
              Etapa {step} de 3
            </p>
          </div>
        </div>

        {/* Progresso */}
        <div className="flex gap-2">
          {[1, 2, 3].map((s) => (
            <div
              key={s}
              className={`h-2 flex-1 rounded-full ${
                s <= step ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>

        {/* Etapa 1: Dados da Empresa */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Building2 className="w-5 h-5" />
                Dados da Empresa
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Field label="Razão Social / Nome Fantasia" required>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Nome da empresa"
                />
              </Field>

              <Field label="E-mail Corporativo" required>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="contato@empresa.com"
                />
              </Field>

              <Field label="Telefone Comercial" required>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(11) 3333-3333"
                />
              </Field>

              <Field label="CNPJ" required>
                <Input
                  value={formData.cnpj}
                  onChange={(e) => setFormData({ ...formData, cnpj: e.target.value })}
                  placeholder="00.000.000/0001-00"
                />
              </Field>

              <Field label="Tipo de Estabelecimento" required>
                <select
                  className="w-full h-10 px-3 rounded-md border bg-background"
                  value={formData.type}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      type: e.target.value as 'restaurante' | 'evento' | 'catering',
                    })
                  }
                >
                  <option value="restaurante">Restaurante</option>
                  <option value="evento">Eventos (Casamentos, Festas)</option>
                  <option value="catering">Catering / Buffet</option>
                </select>
              </Field>

              <Field label="Culinárias do estabelecimento" required>
                <div className="grid grid-cols-2 gap-3">
                  {Object.entries(CUISINE_LABELS).map(([key, label]) => (
                    <label
                      key={key}
                      className="flex items-center gap-2 cursor-pointer p-2 rounded hover:bg-muted"
                    >
                      <Checkbox
                        checked={formData.cuisines.includes(key as CuisineType)}
                        onCheckedChange={() => handleCuisineToggle(key as CuisineType)}
                      />
                      <span className="text-sm">{label}</span>
                    </label>
                  ))}
                </div>
              </Field>
            </CardContent>
            <CardFooter>
              <Button onClick={() => setStep(2)} className="w-full">
                Próximo
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Etapa 2: Localização */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Localização do Estabelecimento
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Field label="CEP" required>
                <Input
                  value={formData.location.zipCode}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      location: { ...formData.location, zipCode: e.target.value },
                    })
                  }
                  placeholder="00000-000"
                />
              </Field>

              <Field label="Endereço Completo" required>
                <Input
                  value={formData.location.address}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      location: { ...formData.location, address: e.target.value },
                    })
                  }
                  placeholder="Rua, número, complemento"
                />
              </Field>

              <div className="grid grid-cols-2 gap-4">
                <Field label="Cidade" required>
                  <Input
                    value={formData.location.city}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        location: { ...formData.location, city: e.target.value },
                      })
                    }
                  />
                </Field>

                <Field label="Estado" required>
                  <Input
                    value={formData.location.state}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        location: { ...formData.location, state: e.target.value },
                      })
                    }
                    placeholder="SP"
                    maxLength={2}
                  />
                </Field>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={() => setStep(3)} className="w-full">
                Próximo
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Etapa 3: Documentos */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle>Documentação</CardTitle>
              <p className="text-sm text-muted-foreground">
                Envie os documentos da empresa para verificação
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Cartão CNPJ *
                </Label>
                <Input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={(e) =>
                    setFormData({ ...formData, cnpjPhoto: e.target.files?.[0] || null })
                  }
                />
                {formData.cnpjPhoto && (
                  <p className="text-xs text-green-600">✓ CNPJ carregado</p>
                )}
                <p className="text-xs text-muted-foreground">
                  Aceito: PDF ou imagem (JPG, PNG)
                </p>
              </div>

              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Contrato Social (opcional)
                </Label>
                <Input
                  type="file"
                  accept="image/*,application/pdf"
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contratoSocialPhoto: e.target.files?.[0] || null,
                    })
                  }
                />
                {formData.contratoSocialPhoto && (
                  <p className="text-xs text-green-600">✓ Contrato Social carregado</p>
                )}
              </div>

              <div className="p-4 bg-primary/10 rounded-lg space-y-2">
                <h4 className="font-medium">Benefícios da plataforma:</h4>
                <ul className="space-y-1 text-sm text-muted-foreground">
                  <li>✓ Profissionais verificados com biometria facial</li>
                  <li>✓ Sistema de avaliações transparente</li>
                  <li>✓ Chamadas urgentes para emergências</li>
                  <li>✓ Geolocalização e cálculo automático de distância</li>
                  <li>✓ Pagamento seguro com múltiplas opções</li>
                  <li>✓ Taxa de serviço: 28,6% sobre o valor da contratação</li>
                </ul>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={handleSubmit} className="w-full">
                Finalizar Cadastro
              </Button>
            </CardFooter>
          </Card>
        )}
      </div>
    </div>
  )
}
