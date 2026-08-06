// src/lib/i18n.ts

import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n
    // Passa a instância do i18n para a react-i18next
    .use(initReactI18next)
    // Inicializa o i18next
    .init({
        // Idioma fixo no servidor e no cliente para evitar erro de hidratação
        lng: 'ptBR',
        // Idioma padrão caso o idioma definido falhe
        fallbackLng: 'ptBR',
        // Idiomas disponíveis
        supportedLngs: ['ptBR', 'en', 'es'],
        // Desativa logs de debug no console
        debug: false,
        interpolation: {
            escapeValue: false, // O React já faz o escape de XSS
        },
    });

export default i18n;