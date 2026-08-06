"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { TypeAnimation } from "react-type-animation";
import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { Instagram, MessageSquare } from 'lucide-react';

type MultiLangArray = { ptBR: string[]; en: string[]; es: string[];[key: string]: string[]; };
type MultiLangText = { ptBR: string; en: string; es: string;[key: string]: string; };

type HeroData = { title: string; typedItems: MultiLangArray };
type SocialData = { instagram: string; whatsapp: string };

export function HeroSection({ hero, social }: { hero: HeroData, social: SocialData }) {
  const { i18n } = useTranslation();
  const [isMounted, setIsMounted] = useState(false);
  useEffect(() => setIsMounted(true), []);

  const currentLanguage = isMounted ? (i18n.language as keyof MultiLangText) : 'ptBR';
  const itemsToDisplay = hero.typedItems[currentLanguage] || hero.typedItems.ptBR;

  const heroTexts: { iAm: MultiLangText } = {
    iAm: { ptBR: 'Eu', en: 'I', es: 'Yo' }
  }

  return (
    <section id="hero" className="relative flex h-screen w-full flex-col items-center justify-center text-center text-white">
      <div className="absolute inset-0 z-0">
        <Image src="/assets/img/background.webp" alt="" fill priority sizes="100vw" className="hidden object-cover md:block" />
        <Image src="/assets/img/background-mobile.webp" alt="" fill priority sizes="100vw" className="object-cover md:hidden" />
      </div>
      <div className="absolute inset-0 bg-black/50 z-[1]" aria-hidden="true" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60 z-[1]" aria-hidden="true" />
      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="container relative z-20">
        <h1 className="text-6xl font-bold tracking-tight md:text-8xl mb-4 drop-shadow-lg">{hero.title}</h1>
        <div className="mt-6 text-xl md:text-3xl text-white/80">
          <span>{isMounted ? heroTexts.iAm[currentLanguage] : heroTexts.iAm.ptBR} </span>
          {isMounted && (
            <TypeAnimation sequence={itemsToDisplay.flatMap(item => [item, 2000])} wrapper="span" speed={50} className="font-semibold text-sky-400" repeat={Infinity} />
          )}
        </div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }} className="mt-10 flex justify-center gap-4">
          <a href={social.instagram} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-all duration-300 hover:scale-110" aria-label="Instagram"><Instagram size={32} /></a>
          <a href={social.whatsapp} target="_blank" rel="noopener noreferrer" className="text-white/80 hover:text-white transition-all duration-300 hover:scale-110" aria-label="WhatsApp"><MessageSquare size={32} /></a>
        </motion.div>
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.2 }} className="absolute bottom-8 left-1/2 -translate-x-1/2">
          <div className="animate-bounce">
            <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
