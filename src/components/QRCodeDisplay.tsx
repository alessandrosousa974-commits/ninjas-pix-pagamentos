import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { QrCode, Download, Share2, CheckCircle } from 'lucide-react'
import { Professional, CATEGORY_LABELS } from '@/types'
import { toast } from 'sonner'

interface QRCodeDisplayProps {
  professional: Professional
}

export function QRCodeDisplay({ professional }: QRCodeDisplayProps) {
  const handleDownload = () => {
    toast.success('QR Code salvo na galeria!')
  }

  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title: `${professional.name} - Ninjas do Sushi`,
          text: `QR Code: ${professional.qrCode}`,
        })
        .catch(() => {})
    } else {
      navigator.clipboard.writeText(professional.qrCode)
      toast.success('Código copiado para a área de transferência!')
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <QrCode className="w-5 h-5" />
            Meu QR Code
          </span>
          {professional.biometric.verified && (
            <Badge className="bg-green-600">
              <CheckCircle className="w-3 h-3 mr-1" />
              Verificado
            </Badge>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* QR Code Simulado */}
        <div className="flex flex-col items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full"></div>
            <div className="relative w-64 h-64 bg-white dark:bg-muted rounded-2xl p-4 border-4 border-primary shadow-2xl">
              <div className="w-full h-full bg-muted dark:bg-background rounded-lg flex items-center justify-center">
                <div className="text-center space-y-2">
                  <QrCode className="w-32 h-32 mx-auto text-primary" />
                  <p className="text-xs font-mono text-muted-foreground">
                    {professional.qrCode}
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center space-y-1">
            <p className="font-bold text-lg">{professional.name}</p>
            <p className="text-sm text-muted-foreground">
              {CATEGORY_LABELS[professional.category]}
            </p>
          </div>
        </div>

        {/* Informações */}
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Avaliação</p>
            <p className="text-lg font-bold">{professional.rating} ⭐</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Trabalhos</p>
            <p className="text-lg font-bold">{professional.totalJobs}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Experiência</p>
            <p className="text-lg font-bold">{professional.experience} anos</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Valor/hora</p>
            <p className="text-lg font-bold text-primary">
              R$ {professional.hourlyRate}
            </p>
          </div>
        </div>

        {/* Ações */}
        <div className="flex gap-2">
          <Button onClick={handleDownload} className="flex-1" variant="outline">
            <Download className="w-4 h-4 mr-2" />
            Baixar
          </Button>
          <Button onClick={handleShare} className="flex-1">
            <Share2 className="w-4 h-4 mr-2" />
            Compartilhar
          </Button>
        </div>

        {/* Instruções */}
        <div className="p-4 bg-primary/10 rounded-lg space-y-2 text-sm">
          <p className="font-medium">Como usar:</p>
          <ol className="space-y-1 text-muted-foreground list-decimal list-inside">
            <li>Mostre este QR Code ao empregador</li>
            <li>Ele escaneará para validar sua identidade</li>
            <li>Seus dados e histórico aparecerão instantaneamente</li>
            <li>Profissional verificado ✓</li>
          </ol>
        </div>

        {!professional.biometric.verified && (
          <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
            <p className="text-sm text-yellow-600 dark:text-yellow-400">
              ⚠️ Seus documentos ainda estão em análise. O QR Code será ativado após
              a verificação (até 24h).
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
