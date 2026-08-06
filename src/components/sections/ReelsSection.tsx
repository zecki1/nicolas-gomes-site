"use client";

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { SectionWrapper } from './SectionWrapper';
import { Dialog, DialogContent, DialogTitle } from '@/components/ui/dialog';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { VisuallyHidden } from '@radix-ui/react-visually-hidden';
import { getYoutubeEmbedUrl, getYoutubeThumbnail } from '@/lib/youtube';
import { Youtube, X } from 'lucide-react';

type MultiLangText = { ptBR: string; en: string; es: string;[key: string]: string; };
type PortfolioItem = {
  id: string; titulo: MultiLangText; descricao: MultiLangText;
  categoria: string; tipo: string; imagemUrl: string;
  videoUrl?: string; youtubeUrl?: string;
};
type LanguageKey = 'ptBR' | 'en' | 'es';

export function ReelsSection({ items }: { items: PortfolioItem[] }) {
  const { i18n } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  useEffect(() => setIsMounted(true), []);

  const currentLanguage: LanguageKey = isMounted ? (i18n.language as LanguageKey) : 'ptBR';
  const reels = items.filter(item => item.tipo === 'youtube' && item.youtubeUrl);

  const titulo = { ptBR: 'Reels', en: 'Reels', es: 'Reels' };
  const subtitulo = {
    ptBR: 'Vídeos em destaque no YouTube',
    en: 'Featured videos on YouTube',
    es: 'Vídeos destacados en YouTube',
  };

  if (reels.length === 0) return null;

  return (
    <SectionWrapper
      id="reels"
      title={titulo[currentLanguage] || titulo.ptBR}
      subtitle={subtitulo[currentLanguage] || subtitulo.ptBR}
    >
      <Carousel
        opts={{ align: 'start', loop: true, dragFree: false }}
        className="w-full"
      >
        <CarouselContent className="-ml-3 md:-ml-4">
          {reels.map((reel, index) => {
            const title = reel.titulo[currentLanguage] || reel.titulo.ptBR;
            const description = reel.descricao[currentLanguage] || reel.descricao.ptBR;
            const thumbnail = getYoutubeThumbnail(reel.youtubeUrl!);

            return (
              <CarouselItem key={reel.id} className="pl-3 md:pl-4 basis-[75%] md:basis-[45%] lg:basis-[30%]">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="group cursor-pointer"
                  onClick={() => setSelectedIndex(index)}
                >
                  <div
                    className="relative w-full rounded-2xl overflow-hidden bg-muted"
                    style={{ aspectRatio: '9/16' }}
                  >
                    <Image
                      src={thumbnail}
                      alt=""
                      role="presentation"
                      fill
                      sizes="(max-width: 768px) 75vw, (max-width: 1024px) 45vw, 30vw"
                      className="object-cover transition-all duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" aria-hidden="true" />
                    <div className="absolute inset-0 flex items-center justify-center" aria-hidden="true">
                      <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center transition-transform duration-300 group-hover:scale-110">
                        <Youtube className="w-8 h-8 text-white ml-0.5" />
                      </div>
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-white font-bold text-base drop-shadow-lg line-clamp-2">
                        {title}
                      </h3>
                    </div>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground line-clamp-2">
                    {description}
                  </p>
                </motion.div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
        <CarouselPrevious className="hidden md:flex left-0" />
        <CarouselNext className="hidden md:flex right-0" />
      </Carousel>

      <Dialog open={selectedIndex !== null} onOpenChange={(open) => { if (!open) setSelectedIndex(null); }}>
        <DialogContent className="sm:max-w-[90vw] w-[95vw] h-[85vh] bg-black border-white/10 p-0 gap-0">
          <VisuallyHidden><DialogTitle>Visualizador de Reels</DialogTitle></VisuallyHidden>
          <div className="flex flex-col h-full">
            <div className="flex items-center justify-end px-4 py-3 border-b border-white/10">
              <span className="text-sm text-white/60 mr-auto" aria-live="polite">
                {(selectedIndex ?? 0) + 1} / {reels.length}
              </span>
              <button onClick={() => setSelectedIndex(null)} className="text-white/60 hover:text-white p-1" aria-label="Fechar">
                <X className="w-5 h-5" />
              </button>
            </div>
            {selectedIndex !== null && reels[selectedIndex] && (
              <motion.div
                key={reels[selectedIndex].id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.2 }}
                className="flex-1 flex flex-col items-center justify-center p-4"
              >
                <div className="w-full max-w-md relative" style={{ aspectRatio: '9/16' }}>
                  <iframe
                    src={getYoutubeEmbedUrl(reels[selectedIndex].youtubeUrl!)}
                    className="w-full h-full rounded-xl"
                    title={`Vídeo: ${reels[selectedIndex].titulo[currentLanguage] || reels[selectedIndex].titulo.ptBR}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
                <div className="mt-4 text-center max-w-lg">
                  <h3 className="text-white font-bold text-lg">
                    {reels[selectedIndex].titulo[currentLanguage] || reels[selectedIndex].titulo.ptBR}
                  </h3>
                  <p className="text-white/60 text-sm mt-1 line-clamp-2">
                    {reels[selectedIndex].descricao[currentLanguage] || reels[selectedIndex].descricao.ptBR}
                  </p>
                </div>
              </motion.div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </SectionWrapper>
  );
}
