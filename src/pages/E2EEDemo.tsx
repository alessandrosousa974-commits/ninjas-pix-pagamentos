// Página de demonstração da criptografia E2EE

import { E2EEChatExample } from '@/components/e2ee-chat-example'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Shield, Lock, Key, Eye, Server } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function E2EEDemo() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="container max-w-6xl mx-auto p-6">
          <div className="flex items-center gap-3 mb-2">
            <Shield className="h-8 w-8 text-green-600" />
            <h1 className="text-3xl font-bold">Criptografia E2EE</h1>
            <Badge variant="outline">End-to-End Encryption</Badge>
          </div>
          <p className="text-muted-foreground">
            Suas mensagens protegidas com criptografia de ponta a ponta usando Web Crypto API
          </p>
        </div>
      </div>

      <div className="container max-w-6xl mx-auto p-6 space-y-6">
        {/* Como funciona */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Key className="h-5 w-5 text-blue-600" />
                <CardTitle className="text-lg">Chaves Criptográficas</CardTitle>
              </div>
              <CardDescription>
                Cada usuário tem um par de chaves: pública e privada
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-1.5 flex-shrink-0" />
                <p>
                  <strong>Chave Pública:</strong> Compartilhada com outros usuários para que eles possam enviar mensagens criptografadas para você
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-green-600 mt-1.5 flex-shrink-0" />
                <p>
                  <strong>Chave Privada:</strong> Guardada apenas no seu dispositivo, usada para descriptografar mensagens que você recebe
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Lock className="h-5 w-5 text-purple-600" />
                <CardTitle className="text-lg">Como Funciona</CardTitle>
              </div>
              <CardDescription>
                Processo de envio de mensagem criptografada
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <span className="font-bold text-muted-foreground">1.</span>
                <p>Você escreve a mensagem no seu dispositivo</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-muted-foreground">2.</span>
                <p>A mensagem é criptografada com a chave pública do destinatário</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-muted-foreground">3.</span>
                <p>A mensagem criptografada é enviada pelo servidor</p>
              </div>
              <div className="flex items-start gap-2">
                <span className="font-bold text-muted-foreground">4.</span>
                <p>O destinatário descriptografa com sua chave privada</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Server className="h-5 w-5 text-orange-600" />
                <CardTitle className="text-lg">Servidor Não Lê</CardTitle>
              </div>
              <CardDescription>
                O servidor só transporta dados criptografados
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-600 mt-1.5 flex-shrink-0" />
                <p>
                  O servidor recebe apenas mensagens criptografadas
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-600 mt-1.5 flex-shrink-0" />
                <p>
                  Sem a chave privada do destinatário, é impossível ler o conteúdo
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-orange-600 mt-1.5 flex-shrink-0" />
                <p>
                  Nem administradores nem hackers conseguem acessar suas mensagens
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Eye className="h-5 w-5 text-red-600" />
                <CardTitle className="text-lg">Privacidade Total</CardTitle>
              </div>
              <CardDescription>
                Apenas você e o destinatário podem ler
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 flex-shrink-0" />
                <p>
                  Suas chaves privadas nunca saem do seu dispositivo
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 flex-shrink-0" />
                <p>
                  Armazenamento seguro no IndexedDB do navegador
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-red-600 mt-1.5 flex-shrink-0" />
                <p>
                  Criptografia RSA-OAEP 2048 bits + SHA-256
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Especificações Técnicas */}
        <Card>
          <CardHeader>
            <CardTitle>Especificações Técnicas</CardTitle>
            <CardDescription>Detalhes da implementação</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <strong className="text-foreground">Algoritmo:</strong>
                <p className="text-muted-foreground">RSA-OAEP (RSA com Optimal Asymmetric Encryption Padding)</p>
              </div>
              <div>
                <strong className="text-foreground">Tamanho da Chave:</strong>
                <p className="text-muted-foreground">2048 bits</p>
              </div>
              <div>
                <strong className="text-foreground">Função Hash:</strong>
                <p className="text-muted-foreground">SHA-256</p>
              </div>
              <div>
                <strong className="text-foreground">API:</strong>
                <p className="text-muted-foreground">Web Crypto API (nativa do navegador)</p>
              </div>
              <div>
                <strong className="text-foreground">Armazenamento:</strong>
                <p className="text-muted-foreground">IndexedDB (local, seguro)</p>
              </div>
              <div>
                <strong className="text-foreground">Compatibilidade:</strong>
                <p className="text-muted-foreground">Todos os navegadores modernos</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Demo do Chat */}
        <E2EEChatExample />

        {/* Notas Importantes */}
        <Card className="border-yellow-200 dark:border-yellow-800 bg-yellow-50 dark:bg-yellow-950">
          <CardHeader>
            <CardTitle className="text-yellow-900 dark:text-yellow-100">
              Notas Importantes para Produção
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-2 text-sm text-yellow-800 dark:text-yellow-200">
            <p>
              <strong>1. Troca de Chaves Públicas:</strong> Em produção, as chaves públicas devem ser armazenadas no servidor e recuperadas de forma segura (ex: via API autenticada).
            </p>
            <p>
              <strong>2. Backup de Chaves:</strong> Implemente um sistema de backup/recuperação de chaves privadas (ex: frase-semente, backup criptografado com senha).
            </p>
            <p>
              <strong>3. Verificação de Identidade:</strong> Adicione verificação de chaves públicas (ex: fingerprints, QR codes) para prevenir ataques man-in-the-middle.
            </p>
            <p>
              <strong>4. Múltiplos Dispositivos:</strong> Considere sincronização segura de chaves entre dispositivos do mesmo usuário.
            </p>
            <p>
              <strong>5. Perfect Forward Secrecy:</strong> Para segurança adicional, implemente rotação de chaves sessão a sessão.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
