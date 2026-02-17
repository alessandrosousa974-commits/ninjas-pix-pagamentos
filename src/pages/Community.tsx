import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Home, Users, MessageSquare, Plus, Heart, MessageCircle, Search, Flag, ArrowLeft } from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'sonner'

interface Post {
  id: number
  authorName: string
  authorAvatar: string
  authorBadge?: string
  image: string
  dishName: string
  description: string
  likes: number
  comments: number
  liked: boolean
}

export default function Community() {
  const navigate = useNavigate()
  const [searchQuery, setSearchQuery] = useState('')
  const [isNewPostOpen, setIsNewPostOpen] = useState(false)
  const [newPost, setNewPost] = useState({
    dishName: '',
    description: '',
    image: ''
  })

  const [posts, setPosts] = useState<Post[]>([
    {
      id: 1,
      authorName: 'Maria Silva',
      authorAvatar: '',
      authorBadge: 'Chef',
      image: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=500&h=500&fit=crop',
      dishName: 'Lasanha à Bolonhesa',
      description: 'Minha primeira lasanha! Ficou incrível 😍',
      likes: 42,
      comments: 8,
      liked: false
    },
    {
      id: 2,
      authorName: 'João Pedro',
      authorAvatar: '',
      image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=500&h=500&fit=crop',
      dishName: 'Pizza Margherita',
      description: 'Primeira vez fazendo a massa em casa!',
      likes: 38,
      comments: 12,
      liked: false
    },
    {
      id: 3,
      authorName: 'Ana Costa',
      authorAvatar: '',
      authorBadge: 'Pro',
      image: 'https://images.unsplash.com/photo-1563379926898-05f4575a45d8?w=500&h=500&fit=crop',
      dishName: 'Bolo de Chocolate',
      description: 'Receita da vovó sempre funciona! 🍰',
      likes: 56,
      comments: 15,
      liked: false
    },
    {
      id: 4,
      authorName: 'Carlos Mendes',
      authorAvatar: '',
      image: 'https://images.unsplash.com/photo-1567620905732-2d1ec7ab7445?w=500&h=500&fit=crop',
      dishName: 'Panquecas Americanas',
      description: 'Café da manhã especial para a família',
      likes: 29,
      comments: 6,
      liked: false
    },
    {
      id: 5,
      authorName: 'Fernanda Lima',
      authorAvatar: '',
      image: 'https://images.unsplash.com/photo-1547496502-affa22d38842?w=500&h=500&fit=crop',
      dishName: 'Sushi Caseiro',
      description: 'Meu primeiro sushi! Levei tempo mas valeu a pena',
      likes: 64,
      comments: 20,
      liked: false
    },
    {
      id: 6,
      authorName: 'Roberto Santos',
      authorAvatar: '',
      authorBadge: 'Chef',
      image: 'https://images.unsplash.com/photo-1476224203421-9ac39bcb3327?w=500&h=500&fit=crop',
      dishName: 'Hambúrguer Artesanal',
      description: 'Blend especial da casa com queijo cheddar',
      likes: 45,
      comments: 11,
      liked: false
    }
  ])

  const handleLike = (postId: number) => {
    setPosts(posts.map(post => {
      if (post.id === postId) {
        return {
          ...post,
          liked: !post.liked,
          likes: post.liked ? post.likes - 1 : post.likes + 1
        }
      }
      return post
    }))
  }

  const handleReport = (postId: number) => {
    toast.success('Obrigado por reportar', {
      description: 'Nossa equipe irá revisar este conteúdo.'
    })
  }

  const handleNewPost = () => {
    if (!newPost.dishName || !newPost.description || !newPost.image) {
      toast.error('Preencha todos os campos', {
        description: 'Nome do prato, descrição e foto são obrigatórios.'
      })
      return
    }

    const post: Post = {
      id: posts.length + 1,
      authorName: 'Você',
      authorAvatar: '',
      image: newPost.image,
      dishName: newPost.dishName,
      description: newPost.description,
      likes: 0,
      comments: 0,
      liked: false
    }

    setPosts([post, ...posts])
    setNewPost({ dishName: '', description: '', image: '' })
    setIsNewPostOpen(false)
    toast.success('Foto postada!', {
      description: 'Sua criação foi compartilhada com a comunidade.'
    })
  }

  const filteredPosts = posts.filter(post =>
    post.dishName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    post.authorName.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card border-b border-border">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/dashboard')}
              >
                <ArrowLeft className="w-5 h-5" />
              </Button>
              <h1 className="text-2xl font-bold text-foreground">Comunidade</h1>
            </div>

            <Dialog open={isNewPostOpen} onOpenChange={setIsNewPostOpen}>
              <DialogTrigger asChild>
                <Button className="gap-2">
                  <Plus className="w-4 h-4" />
                  Nova Foto
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Compartilhar Criação</DialogTitle>
                  <DialogDescription>
                    Mostre sua criação culinária para a comunidade
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Nome do Prato</label>
                    <Input
                      placeholder="Ex: Bolo de Chocolate"
                      value={newPost.dishName}
                      onChange={(e) => setNewPost({ ...newPost, dishName: e.target.value })}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Descrição</label>
                    <Textarea
                      placeholder="Conte como foi fazer esse prato..."
                      value={newPost.description}
                      onChange={(e) => setNewPost({ ...newPost, description: e.target.value })}
                      rows={3}
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">URL da Foto</label>
                    <Input
                      placeholder="Cole o link da imagem"
                      value={newPost.image}
                      onChange={(e) => setNewPost({ ...newPost, image: e.target.value })}
                    />
                    {newPost.image && (
                      <div className="mt-2">
                        <img
                          src={newPost.image}
                          alt="Preview"
                          className="w-full h-48 object-cover rounded-lg"
                          onError={() => toast.error('URL da imagem inválida')}
                        />
                      </div>
                    )}
                  </div>
                </div>
                <div className="flex justify-end gap-2">
                  <Button variant="outline" onClick={() => setIsNewPostOpen(false)}>
                    Cancelar
                  </Button>
                  <Button onClick={handleNewPost}>
                    Publicar
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Search */}
          <div className="mt-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Buscar pratos, pessoas..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Community Guidelines Banner */}
      <div className="container mx-auto px-4 py-4">
        <Card className="bg-accent border-primary/20">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <Users className="w-5 h-5 text-primary mt-0.5" />
              <div className="flex-1">
                <h3 className="font-semibold text-foreground mb-1">
                  Nossa Comunidade é para Todos
                </h3>
                <p className="text-sm text-muted-foreground">
                  Respeitamos todas as pessoas, independente de cor, raça, etnia, gênero ou orientação sexual.
                  Compartilhe suas receitas com respeito e gentileza.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Posts Grid */}
      <div className="container mx-auto px-4 pb-24">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPosts.map(post => (
            <Card key={post.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              {/* Author Info */}
              <div className="p-3 flex items-center gap-2 border-b border-border">
                <Avatar className="w-8 h-8">
                  <AvatarImage src={post.authorAvatar} />
                  <AvatarFallback>{post.authorName[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium">{post.authorName}</span>
                    {post.authorBadge && (
                      <Badge variant="secondary" className="text-xs">
                        {post.authorBadge}
                      </Badge>
                    )}
                  </div>
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleReport(post.id)}
                >
                  <Flag className="w-4 h-4" />
                </Button>
              </div>

              {/* Image */}
              <div className="aspect-square overflow-hidden bg-muted">
                <img
                  src={post.image}
                  alt={post.dishName}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                />
              </div>

              {/* Actions */}
              <div className="p-3 space-y-2">
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="gap-2"
                    onClick={() => handleLike(post.id)}
                  >
                    <Heart
                      className={`w-4 h-4 ${post.liked ? 'fill-destructive text-destructive' : ''}`}
                    />
                    <span>{post.likes}</span>
                  </Button>
                  <Button variant="ghost" size="sm" className="gap-2">
                    <MessageCircle className="w-4 h-4" />
                    <span>{post.comments}</span>
                  </Button>
                </div>

                <div>
                  <h3 className="font-semibold text-foreground">{post.dishName}</h3>
                  <p className="text-sm text-muted-foreground">{post.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Nenhum resultado encontrado</p>
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-card border-t border-border">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-around py-4">
            <Button
              variant="ghost"
              size="sm"
              className="flex-col gap-1 h-auto"
              onClick={() => navigate('/dashboard')}
            >
              <Home className="w-5 h-5" />
              <span className="text-xs">Início</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex-col gap-1 h-auto text-primary"
            >
              <Users className="w-5 h-5" />
              <span className="text-xs font-semibold">Comunidade</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              className="flex-col gap-1 h-auto"
              onClick={() => navigate('/chat')}
            >
              <MessageSquare className="w-5 h-5" />
              <span className="text-xs">Chat</span>
            </Button>
          </div>
        </div>
      </nav>
    </div>
  )
}
