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
import { ArrowLeft, Camera, Upload, QrCode, MapPin } from 'lucide-react'
import { ProfessionalCategory, CuisineType, CATEGORY_LABELS, CUISINE_LABELS, PRICE_RANGES } from '@/types'

export default function RegisterProfessional() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    cpf: '',
    category: '' as ProfessionalCategory,
    hourlyRate: 0,
    experience: 0,
    cuisines: [] as CuisineType[],
    location: {
      address: '',
      city: '',
      state: '',
      zipCode: '',
    },
    hasDiploma: false,
    facePhoto: null as File | null,
    cpfPhoto: null as File | null,
    rgPhoto: null as File | null,
    diplomaPhoto: null as File | null,
  })

  const handleCategoryChange = (category: ProfessionalCategory) => {
    const priceRange = PRICE_RANGES.find(p => p.category === category)
    setFormData({
      ...formData,
      category,
      hourlyRate: priceRange?.minRate || 0,
    })
  }

  const handleCuisineToggle = (cuisine: CuisineType) => {
    setFormData({
      ...formData,
      cuisines: formData.cuisines.includes(cuisine)
        ? formData.cuisines.filter(c => c !== cuisine)
        : [...formData.cuisines, cuisine],
    })
  }

  const handleSubmit = async () => {
    if (!formData.name || !formData.email || !formData.phone || !formData.cpf) {
      toast.error('Preencha todos os campos obrigatórios')
      return
    }

    if (!formData.category) {
      toast.error('Selecione sua categoria profissional')
      return
    }

    if (formData.cuisines.length === 0) {
      toast.error('Selecione pelo menos uma culinária')
      return
    }

    if (!formData.facePhoto) {
      toast.error('Foto de rosto é obrigatória para verificação biométrica')
      return
    }

    if (!formData.cpfPhoto || !formData.rgPhoto) {
      toast.error('Documentos CPF e RG são obrigatórios')
      return
    }

    const priceRange = PRICE_RANGES.find(p => p.category === formData.category)
    if (priceRange?.requiresDiploma && !formData.hasDiploma) {
      toast.error('Esta categoria exige diploma')
      return
    }

    try {
      await register(
        {
          ...formData,
          qrCode: `NINJAS-${Date.now()}`,
          documents: [
            { type: 'cpf', number: formData.cpf, verified: false },
            { type: 'rg', number: '', verified: false },
          ],
          biometric: {
            verified: false,
          },
          rating: 0,
          totalJobs: 0,
          completionRate: 100,
          feedbacks: [],
          available: true,
          banned: false,
        },
        'professional'
      )

      toast.success('Cadastro realizado com sucesso!', {
        description: 'Aguarde a verificação dos seus documentos (até 24h)',
      })

      navigate('/dashboard')
    } catch (error) {
      toast.error('Erro ao criar conta')
    }
  }

  const priceRange = formData.category
    ? PRICE_RANGES.find(p => p.category === formData.category)
    : null

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
            <h1 className="text-2xl font-bold">Cadastro de Profissional</h1>
            <p className="text-sm text-muted-foreground">
              Etapa {step} de 4
            </p>
          </div>
        </div>

        {/* Progresso */}
        <div className="flex gap-2">
          {[1, 2, 3, 4].map((s) => (
            <div
              key={s}
              className={`h-2 flex-1 rounded-full ${
                s <= step ? 'bg-primary' : 'bg-muted'
              }`}
            />
          ))}
        </div>

        {/* Etapa 1: Dados Pessoais */}
        {step === 1 && (
          <Card>
            <CardHeader>
              <CardTitle>Dados Pessoais</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Field label="Nome Completo" required>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Seu nome completo"
                />
              </Field>

              <Field label="E-mail" required>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="seu@email.com"
                />
              </Field>

              <Field label="Telefone/WhatsApp" required>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="(11) 99999-9999"
                />
              </Field>

              <Field label="CPF" required>
                <Input
                  value={formData.cpf}
                  onChange={(e) => setFormData({ ...formData, cpf: e.target.value })}
                  placeholder="000.000.000-00"
                />
              </Field>
            </CardContent>
            <CardFooter>
              <Button onClick={() => setStep(2)} className="w-full">
                Próximo
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Etapa 2: Categoria e Experiência */}
        {step === 2 && (
          <Card>
            <CardHeader>
              <CardTitle>Categoria Profissional</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Field label="Categoria" required>
                <select
                  className="w-full h-10 px-3 rounded-md border bg-background"
                  value={formData.category}
                  onChange={(e) => handleCategoryChange(e.target.value as ProfessionalCategory)}
                >
                  <option value="">Selecione uma categoria</option>
                  {Object.entries(CATEGORY_LABELS).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </Field>

              {priceRange && (
                <div className="p-4 bg-muted rounded-lg space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Faixa salarial:</span>
                    <span className="font-bold">
                      R$ {priceRange.minRate} - R$ {priceRange.maxRate}/hora
                    </span>
                  </div>
                  {priceRange.requiresDiploma && (
                    <p className="text-xs text-muted-foreground">
                      ⚠️ Esta categoria exige diploma
                    </p>
                  )}
                </div>
              )}

              <Field label="Valor por Hora (R$)" required>
                <Input
                  type="number"
                  value={formData.hourlyRate}
                  onChange={(e) =>
                    setFormData({ ...formData, hourlyRate: Number(e.target.value) })
                  }
                  min={priceRange?.minRate || 0}
                  max={priceRange?.maxRate || 200}
                />
              </Field>

              <Field label="Anos de Experiência" required>
                <Input
                  type="number"
                  value={formData.experience}
                  onChange={(e) =>
                    setFormData({ ...formData, experience: Number(e.target.value) })
                  }
                  min={0}
                />
              </Field>

              <Field label="Culinárias que domina" required>
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

              {priceRange?.requiresDiploma && (
                <label className="flex items-center gap-2 cursor-pointer p-3 border rounded-lg">
                  <Checkbox
                    checked={formData.hasDiploma}
                    onCheckedChange={(checked) =>
                      setFormData({ ...formData, hasDiploma: checked as boolean })
                    }
                  />
                  <span className="text-sm">Possuo diploma na área</span>
                </label>
              )}
            </CardContent>
            <CardFooter>
              <Button onClick={() => setStep(3)} className="w-full">
                Próximo
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Etapa 3: Localização */}
        {step === 3 && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <MapPin className="w-5 h-5" />
                Localização
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

              <Field label="Endereço" required>
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
              <Button onClick={() => setStep(4)} className="w-full">
                Próximo
              </Button>
            </CardFooter>
          </Card>
        )}

        {/* Etapa 4: Documentos e Biometria */}
        {step === 4 && (
          <Card>
            <CardHeader>
              <CardTitle>Documentos e Verificação</CardTitle>
              <p className="text-sm text-muted-foreground">
                Todos os documentos são obrigatórios para garantir a segurança da plataforma
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Foto de Rosto */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Camera className="w-4 h-4" />
                  Foto de Rosto (Biometria) *
                </Label>
                <Input
                  type="file"
                  accept="image/*"
                  capture="user"
                  onChange={(e) =>
                    setFormData({ ...formData, facePhoto: e.target.files?.[0] || null })
                  }
                />
                {formData.facePhoto && (
                  <p className="text-xs text-green-600">✓ Foto carregada</p>
                )}
              </div>

              {/* CPF */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Foto do CPF *
                </Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFormData({ ...formData, cpfPhoto: e.target.files?.[0] || null })
                  }
                />
                {formData.cpfPhoto && (
                  <p className="text-xs text-green-600">✓ CPF carregado</p>
                )}
              </div>

              {/* RG */}
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  Foto do RG *
                </Label>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setFormData({ ...formData, rgPhoto: e.target.files?.[0] || null })
                  }
                />
                {formData.rgPhoto && (
                  <p className="text-xs text-green-600">✓ RG carregado</p>
                )}
              </div>

              {/* Diploma (se necessário) */}
              {priceRange?.requiresDiploma && formData.hasDiploma && (
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Upload className="w-4 h-4" />
                    Foto do Diploma *
                  </Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) =>
                      setFormData({ ...formData, diplomaPhoto: e.target.files?.[0] || null })
                    }
                  />
                  {formData.diplomaPhoto && (
                    <p className="text-xs text-green-600">✓ Diploma carregado</p>
                  )}
                </div>
              )}

              <div className="p-4 bg-primary/10 rounded-lg space-y-2">
                <div className="flex items-center gap-2 font-medium">
                  <QrCode className="w-5 h-5 text-primary" />
                  Seu QR Code Exclusivo
                </div>
                <p className="text-sm text-muted-foreground">
                  Após a aprovação, você receberá um QR Code exclusivo para apresentar aos
                  empregadores
                </p>
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
