"use client";

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useIsMobile } from '@/lib/hooks/use-mobile';
import { SectionWrapper } from './SectionWrapper';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import { Drawer, DrawerContent, DrawerTitle } from '@/components/ui/drawer';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious, type CarouselApi } from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { Play, Youtube, X } from 'lucide-react';
import { getYoutubeEmbedUrl, getYoutubeThumbnail } from '@/lib/youtube';

type MultiLangText = { ptBR: string; en: string; es: string;[key: string]: string; };
type MediaType = 'imagem' | 'video' | 'youtube';
type PortfolioItem = {
  id: string; titulo: MultiLangText; descricao: MultiLangText;
  categoria: string; tipo: MediaType; imagemUrl: string;
  videoUrl?: string; youtubeUrl?: string;
};
type PortfolioData = { titulo: MultiLangText; subtitulo: MultiLangText; items: PortfolioItem[]; };
type LanguageKey = 'ptBR' | 'en' | 'es';

const categoryMap: Record<string, MultiLangText> = {
  all: { ptBR: 'Todos', en: 'All', es: 'Todos' },
  tatuagens: { ptBR: 'Tatuagens', en: 'Tattoos', es: 'Tatuajes' },
  papel: { ptBR: 'Papel', en: 'Paper', es: 'Papel' },
};

const uiTexts = {
  videoBadge: { ptBR: 'Vídeo', en: 'Video', es: 'Video' },
  reelBadge: { ptBR: 'Reel', en: 'Reel', es: 'Reel' },
  videoSuffix: { ptBR: 'vídeo', en: 'video', es: 'video' },
  youtubeVideoAria: { ptBR: 'Vídeo do YouTube', en: 'YouTube video', es: 'Vídeo de YouTube' },
  videoAria: { ptBR: 'Vídeo', en: 'Video', es: 'Video' },
  emptyCategory: {
    ptBR: 'Nenhum trabalho encontrado nesta categoria.',
    en: 'No works found in this category.',
    es: 'No se encontraron trabajos en esta categoría.',
  },
  viewerTitle: { ptBR: 'Visualizador do Portfólio', en: 'Portfolio Viewer', es: 'Visor del Portafolio' },
  filterAria: { ptBR: 'Filtrar por categoria', en: 'Filter by category', es: 'Filtrar por categoría' },
  galleryAria: { ptBR: 'Galeria do portfólio', en: 'Portfolio gallery', es: 'Galería del portafolio' },
  thumbsAria: { ptBR: 'Miniaturas do portfólio', en: 'Portfolio thumbnails', es: 'Miniaturas del portafolio' },
  closeViewerAria: { ptBR: 'Fechar visualizador', en: 'Close viewer', es: 'Cerrar visor' },
  current: { ptBR: 'atual', en: 'current', es: 'actual' },
  selected: { ptBR: 'selecionado', en: 'selected', es: 'seleccionado' },
};

const tr = (text: MultiLangText, lang: LanguageKey): string => text[lang] || text.ptBR;

function MediaCard({ item, onClick, currentLanguage, index }: {
  item: PortfolioItem; onClick: () => void; currentLanguage: LanguageKey; index: number;
}) {
  const title = item.titulo[currentLanguage] || item.titulo.ptBR;
  const isVideo = item.tipo !== 'imagem';
  const imgSrc = item.tipo === 'youtube' && !item.imagemUrl
    ? getYoutubeThumbnail(item.youtubeUrl || '')
    : item.imagemUrl;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      className="break-inside-avoid mb-4"
    >
      <button
        onClick={onClick}
        aria-label={`${title}${isVideo ? ` (${tr(uiTexts.videoSuffix, currentLanguage)})` : ''}`}
        className="group relative w-full overflow-hidden rounded-xl bg-muted focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      >
        <div className="relative w-full" style={{ aspectRatio: isVideo ? '9/16' : '4/5' }}>
          <Image
            src={imgSrc}
            alt=""
            role="presentation"
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover transition-all duration-500 group-hover:scale-110"
            loading={index < 4 ? undefined : 'lazy'}
            onContextMenu={(e) => e.preventDefault()}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" aria-hidden="true" />
          {isVideo && (
            <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
              <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                {item.tipo === 'youtube' ? (
                  <Youtube className="w-8 h-8 text-white ml-0.5" />
                ) : (
                  <Play className="w-8 h-8 text-white fill-white ml-0.5" />
                )}
              </div>
            </div>
          )}
          <div className="absolute top-3 right-3 flex gap-1.5">
            {isVideo && (
              <span className="bg-black/60 backdrop-blur-sm text-white text-[10px] font-medium px-2 py-1 rounded-full flex items-center gap-1" aria-label={`${item.tipo === 'youtube' ? tr(uiTexts.youtubeVideoAria, currentLanguage) : tr(uiTexts.videoAria, currentLanguage)}: ${title}`}>
                {item.tipo === 'youtube' ? <Youtube className="w-3 h-3" aria-hidden="true" /> : <Play className="w-3 h-3 fill-white" aria-hidden="true" />}
                {item.tipo === 'youtube' ? tr(uiTexts.reelBadge, currentLanguage) : tr(uiTexts.videoBadge, currentLanguage)}
              </span>
            )}
          </div>
          <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300" aria-hidden="true">
            <h3 className="text-white font-bold text-sm text-left drop-shadow-lg">{title}</h3>
          </div>
        </div>
      </button>
    </motion.div>
  );
}

function MediaViewer({ item, currentLanguage }: { item: PortfolioItem; currentLanguage: LanguageKey }) {
  const title = item.titulo[currentLanguage] || item.titulo.ptBR;

  if (item.tipo === 'youtube' && item.youtubeUrl) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black/40">
        <iframe
          src={getYoutubeEmbedUrl(item.youtubeUrl)}
          className="w-full h-full"
          title={`${tr(uiTexts.youtubeVideoAria, currentLanguage)}: ${title}`}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        />
      </div>
    );
  }
  if (item.tipo === 'video' && item.videoUrl) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-black/40">
        <video
          src={item.videoUrl}
          controls
          className="max-h-full max-w-full"
          playsInline
          aria-label={`${tr(uiTexts.videoAria, currentLanguage)}: ${title}`}
        />
      </div>
    );
  }
  return (
    <div className="w-full h-full relative">
      <Image
        src={item.imagemUrl}
        alt={title}
        fill
        className="object-contain"
        onContextMenu={(e) => e.preventDefault()}
      />
    </div>
  );
}

function ThumbnailStrip({ items, currentIndex, onSelect, currentLanguage }: {
  items: PortfolioItem[]; currentIndex: number; onSelect: (i: number) => void; currentLanguage: LanguageKey;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!scrollRef.current) return;
    const el = scrollRef.current.children[currentIndex] as HTMLElement;
    if (el) el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [currentIndex]);

  return (
    <div ref={scrollRef} className="flex gap-2 overflow-x-auto px-4 py-3 scrollbar-thin" role="tablist" aria-label={tr(uiTexts.thumbsAria, currentLanguage)}>
      {items.map((item, i) => {
        const title = item.titulo[currentLanguage] || item.titulo.ptBR;
        const imgSrc = item.tipo === 'youtube' && !item.imagemUrl
          ? getYoutubeThumbnail(item.youtubeUrl || '')
          : item.imagemUrl;
        return (
          <button
            key={item.id}
            onClick={() => onSelect(i)}
            role="tab"
            aria-selected={i === currentIndex}
            aria-label={`${title}${i === currentIndex ? ` (${tr(uiTexts.current, currentLanguage)})` : ''}`}
            className={`relative flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden transition-all duration-200 ${
              i === currentIndex ? 'ring-2 ring-primary ring-offset-2 ring-offset-black scale-110' : 'opacity-50 hover:opacity-80'
            }`}
          >
            <Image src={imgSrc} alt="" role="presentation" fill className="object-cover" />
            {item.tipo !== 'imagem' && (
              <div className="absolute inset-0 bg-black/40 flex items-center justify-center" aria-hidden="true">
                {item.tipo === 'youtube' ? (
                  <Youtube className="w-4 h-4 text-white" />
                ) : (
                  <Play className="w-4 h-4 text-white fill-white" />
                )}
              </div>
            )}
          </button>
        );
      })}
    </div>
  );
}

function LightboxContent({ items, startIndex, onClose, currentLanguage, isMobile }: {
  items: PortfolioItem[]; startIndex: number; onClose: () => void; currentLanguage: LanguageKey; isMobile: boolean;
}) {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(startIndex + 1);

  useEffect(() => {
    if (!api) return;
    setCurrent(api.selectedScrollSnap() + 1);
    api.on("select", () => setCurrent(api.selectedScrollSnap() + 1));
  }, [api]);

  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
        <span className="text-sm text-white/60" aria-live="polite">
          {current} / {items.length}
        </span>
        <Button variant="ghost" size="icon" onClick={onClose} aria-label={tr(uiTexts.closeViewerAria, currentLanguage)} className="text-white/60 hover:text-white rounded-full">
          <X className="w-5 h-5" aria-hidden="true" />
        </Button>
      </div>
      <div className="flex-1 min-h-0 relative">
        <Carousel
          setApi={setApi}
          opts={{ loop: true, startIndex }}
          plugins={[Autoplay({ delay: 5000, stopOnInteraction: true })]}
          className="h-full"
        >
          <CarouselContent className="h-full">
            {items.map((item) => (
              <CarouselItem key={item.id} className="h-full">
                <div className="h-full flex flex-col">
                  <div className="flex-1 min-h-0 p-4">
                    <MediaViewer item={item} currentLanguage={currentLanguage} />
                  </div>
                  <div className="px-6 pb-4 text-center">
                    <h3 className="text-white font-bold text-lg">
                      {item.titulo[currentLanguage] || item.titulo.ptBR}
                    </h3>
                    <p className="text-white/60 text-sm mt-1 max-w-lg mx-auto line-clamp-2">
                      {item.descricao[currentLanguage] || item.descricao.ptBR}
                    </p>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          {!isMobile && (
            <>
              <CarouselPrevious className="absolute left-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 border-0" />
              <CarouselNext className="absolute right-4 top-1/2 -translate-y-1/2 text-white bg-white/10 hover:bg-white/20 border-0" />
            </>
          )}
        </Carousel>
      </div>
      <ThumbnailStrip
        items={items}
        currentIndex={current - 1}
        onSelect={(i) => api?.scrollTo(i)}
        currentLanguage={currentLanguage}
      />
    </div>
  );
}

export function PortfolioSection({ data }: { data: PortfolioData }) {
  const { i18n } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [startIndex, setStartIndex] = useState(0);
  const isMobile = useIsMobile();

  useEffect(() => setIsMounted(true), []);

  const currentLanguage: LanguageKey = isMounted ? (i18n.language as LanguageKey) : 'ptBR';
  const titulo = data.titulo[currentLanguage] || data.titulo.ptBR;
  const subtitulo = data.subtitulo[currentLanguage] || data.subtitulo.ptBR;

  const imageItems = data.items.filter(item => item.tipo === 'imagem');

  const [filter, setFilter] = useState('*');
  const categories = ['*', ...Array.from(new Set(imageItems.map(item => item.categoria)))];
  const filteredItems = filter === '*' ? imageItems : imageItems.filter(item => item.categoria === filter);

  const handleCardClick = (index: number) => {
    setStartIndex(index);
    setOpen(true);
  };

  return (
    <SectionWrapper id="portfolio" title={titulo} subtitle={subtitulo}>
      <div className="mb-10 flex flex-wrap justify-center gap-2" role="tablist" aria-label={tr(uiTexts.filterAria, currentLanguage)}>
        {categories.map(cat => {
          const label = cat === '*' ? categoryMap.all[currentLanguage] : (categoryMap[cat]?.[currentLanguage] || cat);
          return (
            <motion.button
              key={cat}
              onClick={() => setFilter(cat)}
              role="tab"
              aria-selected={filter === cat}
              aria-label={`${label}${filter === cat ? ` (${tr(uiTexts.selected, currentLanguage)})` : ''}`}
              className={`relative px-5 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                filter === cat
                  ? 'text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground bg-muted/50 hover:bg-muted'
              }`}
              whileTap={{ scale: 0.95 }}
            >
              {filter === cat && (
                <motion.div
                  layoutId="activeFilter"
                  className="absolute inset-0 bg-primary rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
              <span className="relative z-10">{label}</span>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence mode="popLayout">
        <div className="columns-2 md:columns-3 gap-4 space-y-0" role="list" aria-label={tr(uiTexts.galleryAria, currentLanguage)}>
          {filteredItems.map((item, index) => (
            <MediaCard
              key={item.id}
              item={item}
              index={index}
              onClick={() => handleCardClick(index)}
              currentLanguage={currentLanguage}
            />
          ))}
        </div>
      </AnimatePresence>

      {filteredItems.length === 0 && (
        <div className="text-center py-20 text-muted-foreground" role="status">
          <p className="text-lg">{tr(uiTexts.emptyCategory, currentLanguage)}</p>
        </div>
      )}

      {isMobile ? (
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerContent className="h-[95dvh] bg-black border-t border-white/10">
            <VisuallyHidden><DrawerTitle>{tr(uiTexts.viewerTitle, currentLanguage)}</DrawerTitle></VisuallyHidden>
            <LightboxContent
              items={filteredItems}
              startIndex={startIndex}
              onClose={() => setOpen(false)}
              currentLanguage={currentLanguage}
              isMobile={true}
            />
          </DrawerContent>
        </Drawer>
      ) : (
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-[95vw] w-[95vw] h-[90vh] bg-black border-white/10 p-0 gap-0">
            <VisuallyHidden><DialogTitle>{tr(uiTexts.viewerTitle, currentLanguage)}</DialogTitle></VisuallyHidden>
            <LightboxContent
              items={filteredItems}
              startIndex={startIndex}
              onClose={() => setOpen(false)}
              currentLanguage={currentLanguage}
              isMobile={false}
            />
          </DialogContent>
        </Dialog>
      )}
    </SectionWrapper>
  );
}
