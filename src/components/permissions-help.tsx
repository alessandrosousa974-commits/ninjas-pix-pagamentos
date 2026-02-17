import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { HelpCircle, Camera, Mic, MapPin, Bell, Copy, Upload, Users, Share2, Smartphone, Battery, Wifi, RotateCw } from 'lucide-react'

export function PermissionsHelp() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" size="sm">
          <HelpCircle className="w-4 h-4 mr-2" />
          Ajuda com Permissões
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Guia de Permissões</DialogTitle>
          <DialogDescription>
            Aprenda sobre os recursos e permissões disponíveis
          </DialogDescription>
        </DialogHeader>

        <Tabs defaultValue="basic">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="basic">Básicas</TabsTrigger>
            <TabsTrigger value="advanced">Avançadas</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4 mt-4">
            <PermissionCard
              icon={Camera}
              title="Câmera"
              description="Tire fotos e capture vídeos diretamente no app"
              uses={['Foto de perfil', 'Documentos', 'Verificação']}
            />
            <PermissionCard
              icon={Mic}
              title="Microfone"
              description="Grave áudio e mensagens de voz"
              uses={['Mensagens de voz', 'Chamadas', 'Notas de áudio']}
            />
            <PermissionCard
              icon={MapPin}
              title="Localização GPS"
              description="Encontre profissionais e serviços próximos"
              uses={['Buscar próximos', 'Rastreamento', 'Rotas']}
            />
            <PermissionCard
              icon={Bell}
              title="Notificações"
              description="Receba alertas importantes em tempo real"
              uses={['Mensagens', 'Agendamentos', 'Atualizações']}
            />
            <PermissionCard
              icon={Copy}
              title="Área de Transferência"
              description="Copie e cole informações facilmente"
              uses={['Copiar links', 'Colar textos', 'Compartilhar']}
            />
            <PermissionCard
              icon={Upload}
              title="Upload de Arquivos"
              description="Envie documentos e imagens"
              uses={['Documentos', 'Fotos', 'Comprovantes']}
            />
          </TabsContent>

          <TabsContent value="advanced" className="space-y-4 mt-4">
            <PermissionCard
              icon={Users}
              title="Contatos"
              description="Acesse sua lista de contatos"
              uses={['Indicar amigos', 'Compartilhar perfil', 'Convites']}
              availability="Android"
            />
            <PermissionCard
              icon={Share2}
              title="Compartilhamento"
              description="Compartilhe conteúdo com outros apps"
              uses={['Redes sociais', 'WhatsApp', 'Email']}
            />
            <PermissionCard
              icon={Smartphone}
              title="Vibração"
              description="Receba feedback tátil nas ações"
              uses={['Confirmações', 'Alertas', 'Interações']}
            />
            <PermissionCard
              icon={Battery}
              title="Status da Bateria"
              description="Otimize o app baseado na bateria"
              uses={['Modo economia', 'Otimizações', 'Alertas']}
              availability="Chrome/Edge"
            />
            <PermissionCard
              icon={Wifi}
              title="Status da Rede"
              description="Detecte conexão e qualidade"
              uses={['Modo offline', 'Sync inteligente', 'Economia de dados']}
            />
            <PermissionCard
              icon={RotateCw}
              title="Orientação da Tela"
              description="Bloqueie ou detecte rotação"
              uses={['Modo retrato/paisagem', 'Experiência otimizada']}
            />
          </TabsContent>
        </Tabs>

        <div className="mt-6 p-4 bg-muted rounded-lg">
          <h4 className="font-semibold mb-2">🔒 Sua Privacidade</h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            <li>• Você controla todas as permissões</li>
            <li>• Pode revogar permissões a qualquer momento</li>
            <li>• Dados sensíveis são protegidos</li>
            <li>• Seguimos as melhores práticas de segurança</li>
          </ul>
        </div>
      </DialogContent>
    </Dialog>
  )
}

interface PermissionCardProps {
  icon: any
  title: string
  description: string
  uses: string[]
  availability?: string
}

function PermissionCard({ icon: Icon, title, description, uses, availability }: PermissionCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-primary/10 rounded-lg">
            <Icon className="w-5 h-5 text-primary" />
          </div>
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-semibold">{title}</h4>
              {availability && (
                <Badge variant="outline" className="text-xs">
                  {availability}
                </Badge>
              )}
            </div>
            <p className="text-sm text-muted-foreground mb-2">{description}</p>
            <div className="flex flex-wrap gap-1">
              {uses.map((use) => (
                <Badge key={use} variant="secondary" className="text-xs">
                  {use}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
