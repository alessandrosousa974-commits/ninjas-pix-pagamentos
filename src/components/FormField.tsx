import { Field, FieldLabel } from '@/components/ui/field'

interface FormFieldProps {
  label: string
  required?: boolean
  children: React.ReactNode
  className?: string
}

export function FormField({ label, required, children, className }: FormFieldProps) {
  return (
    <Field className={className}>
      <FieldLabel>
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </FieldLabel>
      {children}
    </Field>
  )
}
