import { Card, CardContent } from '@/components/ui/card'
import { MapPin, Navigation } from 'lucide-react'
import { Location } from '@/types'

interface MapViewProps {
  origin: Location
  destination: Location
  distance?: number
}

export function MapView({ origin, destination, distance }: MapViewProps) {
  // Função para calcular distância aproximada (fórmula de Haversine)
  const calculateDistance = (
    lat1: number,
    lon1: number,
    lat2: number,
    lon2: number
  ): number => {
    const R = 6371 // Raio da Terra em km
    const dLat = ((lat2 - lat1) * Math.PI) / 180
    const dLon = ((lon2 - lon1) * Math.PI) / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    return R * c
  }

  const calculatedDistance =
    distance ||
    calculateDistance(origin.lat, origin.lng, destination.lat, destination.lng)

  // Tempo estimado de viagem (assumindo 30 km/h em média no trânsito urbano)
  const estimatedTime = Math.ceil((calculatedDistance / 30) * 60)

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="font-bold text-lg">Localização e Distância</h3>
          <div className="flex items-center gap-2 text-primary font-bold">
            <Navigation className="w-5 h-5" />
            {calculatedDistance.toFixed(1)} km
          </div>
        </div>

        {/* Mapa Visual Simplificado */}
        <div className="relative h-48 bg-muted rounded-lg overflow-hidden">
          {/* Linha conectando origem e destino */}
          <svg
            className="absolute inset-0 w-full h-full"
            preserveAspectRatio="none"
          >
            <line
              x1="20%"
              y1="70%"
              x2="80%"
              y2="30%"
              stroke="hsl(var(--primary))"
              strokeWidth="2"
              strokeDasharray="5,5"
            />
          </svg>

          {/* Ponto de Origem */}
          <div className="absolute left-[20%] top-[70%] -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="absolute inset-0 bg-primary/20 blur-xl rounded-full w-8 h-8"></div>
              <div className="relative bg-primary text-primary-foreground rounded-full p-2">
                <MapPin className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Ponto de Destino */}
          <div className="absolute left-[80%] top-[30%] -translate-x-1/2 -translate-y-1/2">
            <div className="relative">
              <div className="absolute inset-0 bg-destructive/20 blur-xl rounded-full w-8 h-8"></div>
              <div className="relative bg-destructive text-destructive-foreground rounded-full p-2">
                <MapPin className="w-4 h-4" />
              </div>
            </div>
          </div>

          {/* Labels */}
          <div className="absolute left-[20%] top-[70%] translate-y-6 -translate-x-1/2 text-center">
            <p className="text-xs font-medium bg-background/90 px-2 py-1 rounded whitespace-nowrap">
              Você
            </p>
          </div>
          <div className="absolute left-[80%] top-[30%] -translate-y-6 -translate-x-1/2 text-center">
            <p className="text-xs font-medium bg-background/90 px-2 py-1 rounded whitespace-nowrap">
              Destino
            </p>
          </div>
        </div>

        {/* Informações */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Origem</p>
            <p className="text-sm font-medium">
              {origin.city}, {origin.state}
            </p>
            <p className="text-xs text-muted-foreground">{origin.address}</p>
          </div>

          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Destino</p>
            <p className="text-sm font-medium">
              {destination.city}, {destination.state}
            </p>
            <p className="text-xs text-muted-foreground">
              {destination.address}
            </p>
          </div>
        </div>

        {/* Tempo Estimado */}
        <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-lg">
          <Navigation className="w-4 h-4 text-primary" />
          <div className="flex-1">
            <p className="text-sm font-medium">
              Tempo estimado: ~{estimatedTime} min
            </p>
            <p className="text-xs text-muted-foreground">
              Considerando trânsito urbano
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
