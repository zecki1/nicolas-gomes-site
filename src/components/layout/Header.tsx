"use client"

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";
import { useTranslation } from "react-i18next";
import { motion, AnimatePresence } from "framer-motion";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Sun, Moon, Menu, Home, User, Book, Mail, Play } from "lucide-react";

const languages = [
  { code: 'ptBR', label: 'BR' },
  { code: 'en', label: 'EN' },
  { code: 'es', label: 'ES' },
];

const navLinks = [
  { id: 'hero', icon: Home, label: { ptBR: 'Início', en: 'Home', es: 'Inicio' } },
  { id: 'reels', icon: Play, label: { ptBR: 'Reels', en: 'Reels', es: 'Reels' } },
  { id: 'sobre', icon: User, label: { ptBR: 'Sobre', en: 'About', es: 'Sobre' } },
  { id: 'portfolio', icon: Book, label: { ptBR: 'Portfólio', en: 'Portfolio', es: 'Portafolio' } },
  { id: 'contact', icon: Mail, label: { ptBR: 'Contato', en: 'Contact', es: 'Contacto' } },
];

function NavLink({ id, children, onClick, isActive, className }: {
  id: string; children: React.ReactNode; onClick?: () => void; isActive?: boolean; className?: string;
}) {
  const scrollTo = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
    onClick?.();
  };

  return (
    <a
      href={`#${id}`}
      onClick={scrollTo}
      className={className}
      aria-current={isActive ? 'true' : undefined}
    >
      {children}
    </a>
  );
}

function SkipLink() {
  return (
    <a
      href="#main-content"
      className="fixed top-0 left-0 z-[100] -translate-y-full focus:translate-y-0 bg-primary text-primary-foreground px-4 py-2 text-sm font-medium transition-transform focus:outline-none focus:ring-2 focus:ring-ring"
    >
      Ir para o conteúdo principal
    </a>
  );
}

export function Header() {
  const { theme, setTheme } = useTheme();
  const { i18n } = useTranslation();
  const [isSheetOpen, setIsSheetOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 120;
      for (let i = navLinks.length - 1; i >= 0; i--) {
        const el = document.getElementById(navLinks[i].id);
        if (el && el.offsetTop <= scrollPos) {
          setActiveSection(navLinks[i].id);
          break;
        }
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const currentLangCode = i18n.language || 'ptBR';
  const currentLangLabel = languages.find(l => l.code === currentLangCode)?.label || 'BR';

  const cycleLanguage = () => {
    const idx = languages.findIndex(l => l.code === i18n.language);
    i18n.changeLanguage(languages[(idx + 1) % languages.length].code);
  };

  const toggleTheme = () => setTheme(theme === 'light' ? 'dark' : 'light');

  return (
    <>
      <SkipLink />
      <header
        className="fixed top-0 left-0 right-0 z-50 bg-background/70 backdrop-blur-md border-b border-border/50"
        role="banner"
      >
        <nav className="container mx-auto px-4 h-16 flex items-center justify-between" aria-label="Navegação principal">
          <NavLink id="hero" className="text-lg font-bold tracking-tight text-foreground hover:text-primary transition-colors shrink-0">
            Nicolas Gomes
          </NavLink>

          <div className="hidden md:flex items-center gap-1" role="menubar">
            {navLinks.map(link => {
              const Icon = link.icon;
              const label = link.label[currentLangCode as keyof typeof link.label] || link.label.ptBR;
              return (
                <NavLink
                  key={link.id}
                  id={link.id}
                  isActive={activeSection === link.id}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeSection === link.id
                      ? 'bg-primary text-primary-foreground'
                      : 'text-muted-foreground hover:text-foreground hover:bg-muted/50'
                  }`}
                >
                  <Icon className="w-4 h-4" aria-hidden="true" />
                  <span>{label}</span>
                </NavLink>
              );
            })}
          </div>

          <div className="flex items-center gap-1 shrink-0">
            <button
              onClick={cycleLanguage}
              className="w-9 h-9 rounded-full text-xs font-semibold text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
              aria-label={`Idioma atual: ${currentLangLabel}. Clique para alternar.`}
            >
              {currentLangLabel}
            </button>

            <button
              onClick={toggleTheme}
              className="w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200"
              aria-label={theme === 'dark' ? 'Ativar modo claro' : 'Ativar modo escuro'}
            >
              <AnimatePresence initial={false} mode="wait">
                <motion.div
                  key={theme === 'dark' ? 'moon' : 'sun'}
                  initial={{ y: -16, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={{ y: 16, opacity: 0 }}
                  transition={{ duration: 0.15 }}
                >
                  {theme === 'dark' ? (
                    <Sun className="w-4 h-4" aria-hidden="true" />
                  ) : (
                    <Moon className="w-4 h-4" aria-hidden="true" />
                  )}
                </motion.div>
              </AnimatePresence>
            </button>

            <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
              <SheetTrigger asChild>
                <button
                  className="md:hidden w-9 h-9 rounded-full flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-all duration-200 ml-1"
                  aria-label="Abrir menu de navegação"
                >
                  <Menu className="w-5 h-5" aria-hidden="true" />
                </button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72">
                <nav className="flex flex-col gap-2 mt-12" aria-label="Navegação mobile">
                  {navLinks.map(link => {
                    const Icon = link.icon;
                    const label = link.label[currentLangCode as keyof typeof link.label] || link.label.ptBR;
                    return (
                      <NavLink
                        key={link.id}
                        id={link.id}
                        onClick={() => setIsSheetOpen(false)}
                        isActive={activeSection === link.id}
                        className={`flex items-center gap-3 px-4 py-3 rounded-lg text-base font-medium transition-all ${
                          activeSection === link.id
                            ? 'bg-primary/10 text-primary'
                            : 'text-muted-foreground hover:text-foreground hover:bg-muted'
                        }`}
                      >
                        <Icon className="w-5 h-5" aria-hidden="true" />
                        {label}
                      </NavLink>
                    );
                  })}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </nav>
      </header>
      <div id="main-content" />
    </>
  );
}
