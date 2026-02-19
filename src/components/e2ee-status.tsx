// Componente visual para mostrar o status da criptografia E2EE

import { Shield, ShieldCheck, ShieldAlert, Loader2 } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { cn } from '@/lib/utils'

interface E2EEStatusProps {
  isReady: boolean
  isInitializing: boolean
  error?: string | null
  className?: string
}

export function E2EEStatus({
  isReady,
  isInitializing,
  error,
  className,
}: E2EEStatusProps) {
  const getStatusConfig = () => {
    if (error) {
      return {
        icon: ShieldAlert,
        label: 'Erro na Criptografia',
        variant: 'destructive' as const,
        tooltip: error,
      }
    }

    if (isInitializing) {
      return {
        icon: Loader2,
        label: 'Inicializando...',
        variant: 'secondary' as const,
        tooltip: 'Configurando criptografia de ponta a ponta',
      }
    }

    if (isReady) {
      return {
        icon: ShieldCheck,
        label: 'Criptografado',
        variant: 'default' as const,
        tooltip:
          'Suas mensagens estão protegidas com criptografia de ponta a ponta. Apenas você e o destinatário podem lê-las.',
      }
    }

    return {
      icon: Shield,
      label: 'Não Criptografado',
      variant: 'outline' as const,
      tooltip: 'Criptografia não está ativa',
    }
  }

  const config = getStatusConfig()
  const Icon = config.icon

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Badge variant={config.variant} className={cn('gap-1.5', className)}>
            <Icon
              className={cn(
                'h-3.5 w-3.5',
                isInitializing && 'animate-spin'
              )}
            />
            {config.label}
          </Badge>
        </TooltipTrigger>
        <TooltipContent>
          <p className="max-w-xs text-sm">{config.tooltip}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
