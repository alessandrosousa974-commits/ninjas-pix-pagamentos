import { Link } from 'react-router-dom'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Camera,
  Mic,
  MapPin,
  Bell,
  Smartphone,
  Share2,
  Shield,
  ArrowRight
} from 'lucide-react'

export function PermissionsQuickAccess() {
  const features = [
    { icon: Camera, label: 'Câmera', color: 'text-blue-500' },
    { icon: Mic, label: 'Microfone', color: 'text-purple-500' },
    { icon: MapPin, label: 'GPS', color: 'text-green-500' },
    { icon: Bell, label: 'Notificações', color: 'text-orange-500' },
    { icon: Smartphone, label: 'Vibração', color: 'text-pink-500' },
    { icon: Share2, label: 'Compartilhar', color: 'text-indigo-500' }
  ]

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-primary" />
            <CardTitle>Recursos do Dispositivo</CardTitle>
          </div>
          <Badge variant="outline">12 recursos</Badge>
        </div>
        <CardDescription>
          Acesse câmera, microfone, GPS, notificações e muito mais
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-3 gap-3">
          {features.map((feature) => (
            <div
              key={feature.label}
              className="flex flex-col items-center gap-1 p-3 border rounded-lg hover:bg-muted/50 transition-colors"
            >
              <feature.icon className={`w-6 h-6 ${feature.color}`} />
              <span className="text-xs font-medium">{feature.label}</span>
            </div>
          ))}
        </div>

        <Link to="/permissions">
          <Button className="w-full">
            Ver Todos os Recursos
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}
