import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'
import { Star } from 'lucide-react'
import { toast } from 'sonner'

interface FeedbackModalProps {
  open: boolean
  onClose: () => void
  professionalName?: string
  companyName?: string
  onSubmit: (rating: number, comment: string) => void
}

export function FeedbackModal({
  open,
  onClose,
  professionalName,
  companyName,
  onSubmit,
}: FeedbackModalProps) {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [comment, setComment] = useState('')

  const handleSubmit = () => {
    if (rating === 0) {
      toast.error('Selecione uma avaliação de 1 a 5 estrelas')
      return
    }

    if (comment.trim().length < 10) {
      toast.error('Escreva um comentário com pelo menos 10 caracteres')
      return
    }

    onSubmit(rating, comment)
    toast.success('Avaliação enviada com sucesso!')
    setRating(0)
    setComment('')
    onClose()
  }

  const targetName = professionalName || companyName || 'este trabalho'

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Avaliar {targetName}</DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Estrelas */}
          <div className="space-y-2">
            <Label>Como foi sua experiência?</Label>
            <div className="flex items-center gap-2 justify-center py-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-10 h-10 ${
                      star <= (hoveredRating || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-muted-foreground'
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-center text-sm text-muted-foreground">
                {rating === 1 && 'Muito ruim'}
                {rating === 2 && 'Ruim'}
                {rating === 3 && 'Regular'}
                {rating === 4 && 'Bom'}
                {rating === 5 && 'Excelente'}
              </p>
            )}
          </div>

          {/* Comentário */}
          <div className="space-y-2">
            <Label htmlFor="comment">Conte mais sobre sua experiência</Label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="O que você achou? Como foi o atendimento? Recomendaria?"
              className="w-full min-h-[120px] px-3 py-2 rounded-md border bg-background resize-none"
              maxLength={500}
            />
            <p className="text-xs text-muted-foreground text-right">
              {comment.length}/500 caracteres
            </p>
          </div>

          {/* Critérios Específicos */}
          {rating > 0 && (
            <div className="p-4 bg-muted rounded-lg space-y-2">
              <p className="text-sm font-medium">Sua avaliação ajuda outros usuários!</p>
              <ul className="text-xs text-muted-foreground space-y-1">
                <li>✓ Pontualidade e comprometimento</li>
                <li>✓ Qualidade do trabalho</li>
                <li>✓ Comunicação e profissionalismo</li>
                <li>✓ Recomendaria novamente?</li>
              </ul>
            </div>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button variant="outline" onClick={onClose}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit} disabled={rating === 0 || comment.length < 10}>
            Enviar Avaliação
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
