import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { PermissionsDemo } from '@/components/permissions-demo'
import { AdvancedPermissionsDemo } from '@/components/advanced-permissions-demo'
import { Shield, Zap } from 'lucide-react'

export default function PermissionsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto p-6">
          <h1 className="text-4xl font-bold mb-2">Permissões e Recursos</h1>
          <p className="text-muted-foreground">
            Demonstração completa de todos os recursos e permissões do dispositivo
          </p>
        </div>
      </div>

      <div className="container mx-auto p-6">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="basic" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              Básicas
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center gap-2">
              <Zap className="w-4 h-4" />
              Avançadas
            </TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="mt-6">
            <PermissionsDemo />
          </TabsContent>

          <TabsContent value="advanced" className="mt-6">
            <AdvancedPermissionsDemo />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
