import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { useToast } from '@/hooks/use-toast';

interface User {
  email: string;
  username: string;
  energy: number;
  isAdmin: boolean;
}

export default function Index() {
  const { toast } = useToast();
  const [isAuth, setIsAuth] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [showBuilderModal, setShowBuilderModal] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  
  const [user, setUser] = useState<User | null>(null);
  const [sitePrompt, setSitePrompt] = useState('');
  const [generatedSites, setGeneratedSites] = useState<string[]>([]);

  const [authForm, setAuthForm] = useState({
    email: '',
    username: '',
    password: ''
  });

  const handleAuth = () => {
    if (authMode === 'register') {
      if (authForm.email === 'den.nazarenko.02@internet.ru') {
        setUser({
          email: authForm.email,
          username: 'Yehali',
          energy: Infinity,
          isAdmin: true
        });
      } else {
        setUser({
          email: authForm.email,
          username: authForm.username,
          energy: 100,
          isAdmin: false
        });
      }
      toast({
        title: '🎉 Регистрация успешна!',
        description: 'Вам начислено 100 единиц энергии'
      });
    } else {
      if (authForm.username === 'Yehali' && authForm.password === 'woy228228') {
        setUser({
          email: 'den.nazarenko.02@internet.ru',
          username: 'Yehali',
          energy: Infinity,
          isAdmin: true
        });
      } else {
        setUser({
          email: 'user@example.com',
          username: authForm.username,
          energy: 100,
          isAdmin: false
        });
      }
      toast({
        title: '✅ Вход выполнен',
        description: `Добро пожаловать, ${authForm.username}!`
      });
    }
    setIsAuth(true);
    setShowAuthModal(false);
    setAuthForm({ email: '', username: '', password: '' });
  };

  const handleGenerateSite = () => {
    if (!user) {
      toast({
        title: '❌ Требуется авторизация',
        description: 'Войдите в аккаунт для создания сайтов',
        variant: 'destructive'
      });
      return;
    }

    if (user.energy < 10 && user.energy !== Infinity) {
      toast({
        title: '⚠️ Недостаточно энергии',
        description: 'Для создания сайта требуется 10 единиц энергии',
        variant: 'destructive'
      });
      return;
    }

    if (!sitePrompt.trim()) {
      toast({
        title: '❌ Пустой запрос',
        description: 'Опишите, какой сайт вы хотите создать',
        variant: 'destructive'
      });
      return;
    }

    if (user.energy !== Infinity) {
      setUser({ ...user, energy: user.energy - 10 });
    }

    setGeneratedSites([...generatedSites, sitePrompt]);
    
    toast({
      title: '🚀 Сайт создается!',
      description: `Осталось энергии: ${user.energy === Infinity ? '∞' : user.energy - 10}`
    });

    setSitePrompt('');
  };

  const handleLogout = () => {
    setUser(null);
    setIsAuth(false);
    toast({
      title: '👋 До встречи!',
      description: 'Вы вышли из аккаунта'
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <nav className="fixed top-0 w-full bg-background/80 backdrop-blur-lg border-b z-50">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Icon name="Rocket" size={32} className="text-primary" />
            <span className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
              Уехали
            </span>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <a href="#services" className="text-foreground/80 hover:text-primary transition">Услуги</a>
            <a href="#portfolio" className="text-foreground/80 hover:text-primary transition">Портфолио</a>
            <a href="#team" className="text-foreground/80 hover:text-primary transition">О команде</a>
            <a href="#blog" className="text-foreground/80 hover:text-primary transition">Блог</a>
            <a href="#contacts" className="text-foreground/80 hover:text-primary transition">Контакты</a>
          </div>

          <div className="flex items-center gap-3">
            {isAuth && user ? (
              <>
                <Badge variant="outline" className="px-3 py-1 gap-2">
                  <Icon name="Zap" size={16} className="text-primary" />
                  <span>{user.energy === Infinity ? '∞' : user.energy}</span>
                </Badge>
                
                <Button onClick={() => setShowBuilderModal(true)} className="gap-2">
                  <Icon name="Sparkles" size={16} />
                  Создать сайт
                </Button>

                {user.isAdmin && (
                  <Button onClick={() => setShowAdminPanel(!showAdminPanel)} variant="outline" className="gap-2">
                    <Icon name="ShieldCheck" size={16} />
                    Админ
                  </Button>
                )}

                <Button onClick={handleLogout} variant="ghost" size="icon">
                  <Icon name="LogOut" size={20} />
                </Button>
              </>
            ) : (
              <Button onClick={() => { setShowAuthModal(true); setAuthMode('login'); }}>
                Войти
              </Button>
            )}
          </div>
        </div>
      </nav>

      <section className="pt-32 pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center space-y-6 animate-fade-in">
            <h1 className="text-6xl md:text-7xl font-bold leading-tight">
              Создавайте сайты{' '}
              <span className="bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                силой мысли
              </span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              ИИ-платформа для мгновенного создания сайтов. Просто опишите идею — остальное сделаем мы
            </p>
            <div className="flex gap-4 justify-center pt-4">
              <Button 
                size="lg" 
                className="gap-2 text-lg px-8"
                onClick={() => isAuth ? setShowBuilderModal(true) : setShowAuthModal(true)}
              >
                <Icon name="Sparkles" size={20} />
                Начать создание
              </Button>
              <Button size="lg" variant="outline" className="text-lg px-8" asChild>
                <a href="https://inferno-client-clone--preview.poehali.dev/" target="_blank" rel="noopener noreferrer">
                  Посмотреть пример
                </a>
              </Button>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mt-20">
            {[
              { icon: 'Zap', title: 'Мгновенно', desc: 'Сайт готов за минуты, не часы' },
              { icon: 'Wand2', title: 'ИИ-генерация', desc: 'Умный ассистент создаст дизайн' },
              { icon: 'Shield', title: 'Безопасно', desc: 'Защита данных и стабильность' }
            ].map((item, i) => (
              <Card key={i} className="border-2 hover:border-primary transition-all hover:shadow-lg animate-scale-in">
                <CardContent className="pt-6 text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mx-auto">
                    <Icon name={item.icon as any} size={24} className="text-primary" />
                  </div>
                  <h3 className="font-semibold text-lg">{item.title}</h3>
                  <p className="text-sm text-muted-foreground">{item.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="services" className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12">Наши услуги</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: 'Layout', title: 'Лендинги', desc: 'Продающие одностраничники' },
              { icon: 'ShoppingCart', title: 'Интернет-магазины', desc: 'E-commerce решения' },
              { icon: 'Briefcase', title: 'Корпоративные', desc: 'Сайты для бизнеса' },
              { icon: 'Newspaper', title: 'Блоги', desc: 'Платформы для контента' }
            ].map((service, i) => (
              <Card key={i} className="hover:shadow-lg transition-all">
                <CardContent className="pt-6 space-y-3">
                  <Icon name={service.icon as any} size={32} className="text-primary" />
                  <h3 className="font-semibold text-lg">{service.title}</h3>
                  <p className="text-sm text-muted-foreground">{service.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="portfolio" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12">Портфолио</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <Card key={item} className="overflow-hidden group cursor-pointer">
                <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 relative">
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <Button variant="secondary" size="sm" asChild>
                      <a href="https://inferno-client-clone--preview.poehali.dev/" target="_blank" rel="noopener noreferrer">
                        Посмотреть
                      </a>
                    </Button>
                  </div>
                </div>
                <CardContent className="pt-4">
                  <h3 className="font-semibold">Проект #{item}</h3>
                  <p className="text-sm text-muted-foreground">Современный дизайн</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="team" className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12">Наша команда</h2>
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { name: 'Александр', role: 'СEO & Founder', icon: 'User' },
              { name: 'Мария', role: 'Lead Designer', icon: 'User' },
              { name: 'Дмитрий', role: 'Tech Lead', icon: 'User' },
              { name: 'Анна', role: 'Product Manager', icon: 'User' }
            ].map((member, i) => (
              <Card key={i} className="text-center">
                <CardContent className="pt-6 space-y-3">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-secondary mx-auto flex items-center justify-center">
                    <Icon name="User" size={32} className="text-white" />
                  </div>
                  <h3 className="font-semibold">{member.name}</h3>
                  <p className="text-sm text-muted-foreground">{member.role}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="blog" className="py-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-4xl font-bold text-center mb-12">Блог</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              { title: 'Как создать сайт за 5 минут', date: '10 декабря 2024', category: 'Туториал' },
              { title: 'Тренды веб-дизайна 2025', date: '8 декабря 2024', category: 'Дизайн' },
              { title: 'ИИ в веб-разработке', date: '5 декабря 2024', category: 'Технологии' }
            ].map((post, i) => (
              <Card key={i} className="hover:shadow-lg transition-all cursor-pointer">
                <div className="aspect-video bg-gradient-to-br from-accent/20 to-primary/20" />
                <CardContent className="pt-4 space-y-2">
                  <Badge variant="secondary">{post.category}</Badge>
                  <h3 className="font-semibold text-lg">{post.title}</h3>
                  <p className="text-sm text-muted-foreground">{post.date}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      <section id="contacts" className="py-20 px-6 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-4xl font-bold text-center mb-12">Контакты</h2>
          
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card>
              <CardContent className="pt-6 space-y-4">
                <h3 className="font-semibold text-lg mb-4">Свяжитесь с нами</h3>
                {[
                  { icon: 'Send', label: 'Telegram-канал', link: 'https://t.me/FreeWebCreator' },
                  { icon: 'Lock', label: 'Секретный чат', link: 'https://t.me/+pJ_2ss_PeTplYzgy' },
                  { icon: 'AtSign', label: 'Связь', link: 'https://t.me/InfernoClient' }
                ].map((contact, i) => (
                  <a 
                    key={i} 
                    href={contact.link} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                  >
                    <Icon name={contact.icon as any} size={20} />
                    <span>{contact.label}</span>
                  </a>
                ))}
              </CardContent>
            </Card>

            <Card>
              <CardContent className="pt-6">
                <h3 className="font-semibold text-lg mb-4">Форма обратной связи</h3>
                <form className="space-y-3" onSubmit={(e) => {
                  e.preventDefault();
                  toast({ title: '✅ Сообщение отправлено!', description: 'Мы свяжемся с вами в ближайшее время' });
                }}>
                  <Input placeholder="Ваше имя" />
                  <Input placeholder="Email" type="email" />
                  <Textarea placeholder="Сообщение" rows={4} />
                  <Button type="submit" className="w-full">Отправить</Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <footer className="py-8 px-6 border-t">
        <div className="container mx-auto text-center text-muted-foreground">
          <p>© 2024 Уехали. Все права защищены.</p>
        </div>
      </footer>

      {showAuthModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <Card className="w-full max-w-md mx-4 animate-scale-in">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">
                  {authMode === 'login' ? 'Вход' : 'Регистрация'}
                </h2>
                <Button variant="ghost" size="icon" onClick={() => setShowAuthModal(false)}>
                  <Icon name="X" size={20} />
                </Button>
              </div>

              <div className="space-y-4">
                {authMode === 'register' && (
                  <Input 
                    placeholder="Email" 
                    type="email"
                    value={authForm.email}
                    onChange={(e) => setAuthForm({ ...authForm, email: e.target.value })}
                  />
                )}
                <Input 
                  placeholder="Логин" 
                  value={authForm.username}
                  onChange={(e) => setAuthForm({ ...authForm, username: e.target.value })}
                />
                <Input 
                  placeholder="Пароль" 
                  type="password"
                  value={authForm.password}
                  onChange={(e) => setAuthForm({ ...authForm, password: e.target.value })}
                />

                <Button onClick={handleAuth} className="w-full">
                  {authMode === 'login' ? 'Войти' : 'Зарегистрироваться'}
                </Button>

                <button 
                  onClick={() => setAuthMode(authMode === 'login' ? 'register' : 'login')}
                  className="w-full text-sm text-muted-foreground hover:text-primary transition"
                >
                  {authMode === 'login' ? 'Нет аккаунта? Регистрация' : 'Уже есть аккаунт? Войти'}
                </button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {showBuilderModal && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <Card className="w-full max-w-2xl mx-4 animate-scale-in">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Icon name="Sparkles" size={28} className="text-primary" />
                  Создание сайта с ИИ
                </h2>
                <Button variant="ghost" size="icon" onClick={() => setShowBuilderModal(false)}>
                  <Icon name="X" size={20} />
                </Button>
              </div>

              <div className="space-y-4">
                <div className="p-4 bg-muted rounded-lg">
                  <p className="text-sm text-muted-foreground">
                    💡 Опишите, какой сайт вы хотите создать. Например: "Лендинг для кофейни с меню и контактами"
                  </p>
                </div>

                <Textarea 
                  placeholder="Опишите ваш сайт..." 
                  rows={6}
                  value={sitePrompt}
                  onChange={(e) => setSitePrompt(e.target.value)}
                  className="resize-none"
                />

                <div className="flex justify-between items-center">
                  <Badge variant="outline" className="gap-2">
                    <Icon name="Zap" size={16} className="text-primary" />
                    Стоимость: 10 энергии
                  </Badge>
                  
                  <Button onClick={handleGenerateSite} className="gap-2">
                    <Icon name="Rocket" size={16} />
                    Создать сайт
                  </Button>
                </div>

                {generatedSites.length > 0 && (
                  <div className="mt-6 space-y-2">
                    <h3 className="font-semibold">Созданные сайты:</h3>
                    {generatedSites.map((site, i) => (
                      <div key={i} className="p-3 bg-muted rounded-lg text-sm">
                        <div className="flex items-center justify-between">
                          <span className="text-muted-foreground">Сайт #{i + 1}:</span>
                          <Badge variant="secondary">Готов</Badge>
                        </div>
                        <p className="mt-1 font-medium">{site}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {showAdminPanel && user?.isAdmin && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
          <Card className="w-full max-w-4xl mx-4 animate-scale-in max-h-[80vh] overflow-auto">
            <CardContent className="pt-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold flex items-center gap-2">
                  <Icon name="ShieldCheck" size={28} className="text-primary" />
                  Админ-панель
                </h2>
                <Button variant="ghost" size="icon" onClick={() => setShowAdminPanel(false)}>
                  <Icon name="X" size={20} />
                </Button>
              </div>

              <div className="space-y-6">
                <Card className="bg-muted/50">
                  <CardContent className="pt-4">
                    <h3 className="font-semibold mb-4">Статистика платформы</h3>
                    <div className="grid grid-cols-3 gap-4">
                      <div className="text-center">
                        <div className="text-3xl font-bold text-primary">1,247</div>
                        <div className="text-sm text-muted-foreground">Пользователей</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-secondary">3,892</div>
                        <div className="text-sm text-muted-foreground">Созданных сайтов</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl font-bold text-accent">127k</div>
                        <div className="text-sm text-muted-foreground">Единиц энергии</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <div>
                  <h3 className="font-semibold mb-4">Управление пользователями</h3>
                  <div className="space-y-2">
                    {[
                      { name: 'Yehali', email: 'den.nazarenko.02@internet.ru', energy: '∞', admin: true },
                      { name: 'user_1', email: 'user1@example.com', energy: '85', admin: false },
                      { name: 'user_2', email: 'user2@example.com', energy: '120', admin: false }
                    ].map((u, i) => (
                      <div key={i} className="flex items-center justify-between p-3 bg-muted rounded-lg">
                        <div>
                          <div className="font-medium">{u.name}</div>
                          <div className="text-sm text-muted-foreground">{u.email}</div>
                        </div>
                        <div className="flex items-center gap-3">
                          <Badge variant={u.admin ? 'default' : 'secondary'}>
                            {u.admin ? 'Админ' : 'Пользователь'}
                          </Badge>
                          <Badge variant="outline" className="gap-1">
                            <Icon name="Zap" size={14} />
                            {u.energy}
                          </Badge>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              <Icon name="Plus" size={14} />
                            </Button>
                            <Button size="sm" variant="outline">
                              <Icon name="Minus" size={14} />
                            </Button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}