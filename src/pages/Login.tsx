import { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FormField as Field } from '@/components/FormField'
import { Input } from '@/components/ui/input'
import { toast } from 'sonner'
import { ArrowLeft, ChefHat, Building2 } from 'lucide-react'
import { UserType } from '@/types'

export default function Login() {
  const navigate = useNavigate()
  const { type } = useParams<{ type: string }>()
  const { login } = useAuth()
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })
  const [loading, setLoading] = useState(false)

  const userType = type as UserType

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!formData.email || !formData.password) {
      toast.error('Preencha todos os campos')
      return
    }

    setLoading(true)

    try {
      await login(formData.email, formData.password, userType)
      toast.success('Login realizado com sucesso!')
      navigate('/dashboard')
    } catch (error) {
      toast.error('Email ou senha incorretos')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => navigate('/')}
          className="mb-4"
        >
          <ArrowLeft className="w-4 h-4 mr-2" />
          Voltar
        </Button>

        <Card>
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="bg-primary text-primary-foreground w-16 h-16 rounded-full flex items-center justify-center">
                {userType === 'professional' ? (
                  <ChefHat className="w-8 h-8" />
                ) : (
                  <Building2 className="w-8 h-8" />
                )}
              </div>
            </div>
            <CardTitle className="text-2xl">
              {userType === 'professional' ? 'Login Profissional' : 'Login Empresa'}
            </CardTitle>
          </CardHeader>

          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <Field label="E-mail" required>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  placeholder="seu@email.com"
                />
              </Field>

              <Field label="Senha" required>
                <Input
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData({ ...formData, password: e.target.value })
                  }
                  placeholder="••••••••"
                />
              </Field>

              <Button
                type="button"
                variant="link"
                className="p-0 h-auto text-sm"
                onClick={() => toast.info('Funcionalidade em desenvolvimento')}
              >
                Esqueci minha senha
              </Button>
            </CardContent>

            <CardFooter className="flex flex-col gap-4">
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Entrando...' : 'Entrar'}
              </Button>

              <div className="text-center text-sm text-muted-foreground">
                Não tem conta?{' '}
                <Button
                  type="button"
                  variant="link"
                  className="p-0 h-auto"
                  onClick={() => navigate(`/cadastro/${userType}`)}
                >
                  Cadastre-se
                </Button>
              </div>
            </CardFooter>
          </form>
        </Card>
      </div>
    </div>
  )
}
