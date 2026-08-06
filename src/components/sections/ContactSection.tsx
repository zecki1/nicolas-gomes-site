"use client"

import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";
import { SectionWrapper } from "./SectionWrapper";
import { Card, CardContent } from "@/components/ui/card";
import { MapPin, Mail, Phone } from 'lucide-react';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

type MultiLangText = { ptBR: string; en: string; es: string;[key: string]: string; };
type ContactData = { titulo: MultiLangText; localizacao: string; email: string; telefone: string; };

type FormTexts = {
    location: MultiLangText;
    email: MultiLangText;
    phone: MultiLangText;
    nameLabel: MultiLangText;
    emailLabel: MultiLangText;
    phoneLabel: MultiLangText;
    subjectLabel: MultiLangText;
    messageLabel: MultiLangText;
    buttonText: MultiLangText;
};

export function ContactSection({ data }: { data: ContactData }) {
    const { i18n } = useTranslation();
    const form = useRef<HTMLFormElement>(null);
    const [isMounted, setIsMounted] = useState(false);
    useEffect(() => setIsMounted(true), []);

    const currentLanguage = isMounted ? (i18n.language as keyof MultiLangText) : 'ptBR';
    const titulo = data.titulo[currentLanguage] || data.titulo.ptBR;

    const formTexts: FormTexts = {
        location: { ptBR: 'Localização', en: 'Location', es: 'Ubicación' },
        email: { ptBR: 'Email', en: 'Email', es: 'Correo Electrónico' },
        phone: { ptBR: 'Telefone', en: 'Phone', es: 'Teléfono' },
        nameLabel: { ptBR: 'Nome', en: 'Name', es: 'Nombre' },
        emailLabel: { ptBR: 'E-mail', en: 'Email', es: 'Email' },
        phoneLabel: { ptBR: 'Telefone', en: 'Phone', es: 'Teléfono' },
        subjectLabel: { ptBR: 'Assunto', en: 'Subject', es: 'Asunto' },
        messageLabel: { ptBR: 'Mensagem', en: 'Message', es: 'Mensaje' },
        buttonText: { ptBR: 'Enviar via WhatsApp', en: 'Send via WhatsApp', es: 'Enviar por WhatsApp' },
    };

    const contactIntro: MultiLangText = {
        ptBR: 'Hey! Se rolar aquele interesse em pedir um orçamento, manda bala no E-mail ou no WhatsApp. Respondo em aproximadamente 48h por e-mail e em 5 horas pelo WhatsApp!',
        en: 'Hey! If you are interested in getting a quote, send it via Email or WhatsApp. I reply in approximately 48h by email and in 5 hours by WhatsApp!',
        es: '¡Hey! Si tienes interés en pedir un presupuesto, mándalo por correo electrónico o WhatsApp. ¡Respondo en aproximadamente 48h por correo electrónico y en 5 horas por WhatsApp!'
    };

    const contactCTA: MultiLangText = {
        ptBR: 'E aí!! Vamos elaborar sua próxima tattoo? 🙌🏼',
        en: 'So!! Shall we design your next tattoo? 🙌🏼',
        es: '¿¡Entonces!! Vamos a diseñar tu próximo tatuaje? 🙌🏼'
    };

    const sendMessage = (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.current) return;

        const formData = new FormData(form.current);
        const name = (formData.get('name') as string) || '';
        const email = (formData.get('email') as string) || '';
        const phone = (formData.get('phone') as string) || '';
        const subject = (formData.get('subject') as string) || '';
        const message = (formData.get('message') as string) || '';

        const waNumber = data.telefone.replace(/\D/g, '');
        const text = [
            `*Nome:* ${name}`,
            `*E-mail:* ${email}`,
            `*Telefone:* ${phone || '-'}`,
            `*Assunto:* ${subject}`,
            '',
            message,
        ].join('\n');

        window.open(`https://wa.me/${waNumber}?text=${encodeURIComponent(text)}`, '_blank', 'noopener,noreferrer');
    }

    return (
        <SectionWrapper id="contact" title={titulo}>
            <div className="max-w-3xl mx-auto text-center mb-8 space-y-4">
                <p className="text-lg text-muted-foreground">{contactIntro[currentLanguage]}</p>
                <p className="text-xl font-semibold">{contactCTA[currentLanguage]}</p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-1 flex flex-col justify-center space-y-6">
                    <div className="flex items-start gap-4"><div className="bg-primary/10 text-primary p-3 rounded-full"><MapPin /></div><div><h3 className="font-semibold text-lg">{formTexts.location[currentLanguage]}</h3><p className="text-muted-foreground">{data.localizacao}</p></div></div>
                    <div className="flex items-start gap-4"><div className="bg-primary/10 text-primary p-3 rounded-full"><Mail /></div><div><h3 className="font-semibold text-lg">{formTexts.email[currentLanguage]}</h3><a href={`mailto:${data.email}`} className="text-muted-foreground hover:text-primary">{data.email}</a></div></div>
                    <div className="flex items-start gap-4"><div className="bg-primary/10 text-primary p-3 rounded-full"><Phone /></div><div><h3 className="font-semibold text-lg">{formTexts.phone[currentLanguage]}</h3><a href={`https://wa.me/${data.telefone.replace(/\D/g, '')}`} className="text-muted-foreground hover:text-primary">{data.telefone}</a></div></div>
                </div>
                <div className="lg:col-span-2">
                    <Card><CardContent className="p-6"><form ref={form} onSubmit={sendMessage} className="space-y-4">
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div><Label htmlFor="name">{formTexts.nameLabel[currentLanguage]}</Label><Input id="name" name="name" required /></div>
                            <div><Label htmlFor="email">{formTexts.emailLabel[currentLanguage]}</Label><Input id="email" name="email" type="email" required /></div>
                        </div>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div><Label htmlFor="phone">{formTexts.phoneLabel[currentLanguage]}</Label><Input id="phone" name="phone" type="tel" /></div>
                            <div><Label htmlFor="subject">{formTexts.subjectLabel[currentLanguage]}</Label><Input id="subject" name="subject" required /></div>
                        </div>
                        <div><Label htmlFor="message">{formTexts.messageLabel[currentLanguage]}</Label><Textarea id="message" name="message" required /></div>
                        <div className="text-center"><Button type="submit">
                            {formTexts.buttonText[currentLanguage]}
                        </Button></div>
                    </form></CardContent></Card>
                </div>
            </div>
        </SectionWrapper>
    );
}