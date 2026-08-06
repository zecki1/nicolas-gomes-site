# Nicolas Gomes — Site do Cliente (nicolasgomestattoo.com.br)

Site público de alto desempenho do tatuador **Nicolas Gomes**, gerado com **Next.js (SSG + ISR)** e alimentado por um **CMS multi-site** centralizado em `zecki1.com.br`.

## Como funciona

- O site lê todo o conteúdo de um documento no **Firebase Firestore** (projeto `zecki-site`, coleção `clientes`).
- O documento é identificado pelo UID do usuário "Nicolas" (`NEXT_PUBLIC_CLIENT_ID`).
- Quando o Nicolas salva alterações no painel (`zecki1.com.br/admin/dashboard`), o painel chama a API `/api/revalidate` deste site, que limpa o cache e re-gera a página estática com os dados atualizados.
- Suporte a **imagens, vídeos e reels do YouTube** no portfólio (categorias: `tatuagens`, `papel`, `videos`).

## Setup local

1. **Instale as dependências:**
   ```bash
   npm install
   ```
2. **Configure as variáveis de ambiente:** copie `.env.example` para `.env.local` e preencha as chaves do Firebase (projeto `zecki-site`).
3. **Descubra o UID do Nicolas** (resolvido automaticamente pelo e-mail da conta):
   ```bash
   npm run seed -- <email-do-nicolas>
   ```
   Esse comando também **semeia o banco** com o conteúdo do site. Após rodar, copie o `CLIENT_ID` exibido para o `.env.local` (`NEXT_PUBLIC_CLIENT_ID`).
   > Alternativa: se já tiver o UID, defina `NEXT_PUBLIC_CLIENT_ID` no `.env.local` e rode `npm run seed`.
4. **Rode o projeto:**
   ```bash
   npm run dev
   ```

## Variáveis de ambiente (`.env.local`)

```env
NEXT_PUBLIC_FIREBASE_API_KEY=
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=
NEXT_PUBLIC_FIREBASE_PROJECT_ID=
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
NEXT_PUBLIC_FIREBASE_APP_ID=
NEXT_PUBLIC_CLIENT_ID=
REVALIDATE_TOKEN=
NEXT_PUBLIC_EMAILJS_SERVICE_ID=
NEXT_PUBLIC_EMAILJS_TEMPLATE_ID=
NEXT_PUBLIC_EMAILJS_PUBLIC_KEY=
```

- `NEXT_PUBLIC_CLIENT_ID`: UID do usuário "Nicolas" no Firebase Authentication.
- `REVALIDATE_TOKEN`: token secreto que deve ser **o mesmo** configurado no painel (para o `zecki1.com.br`, o token do Nicolas é armazenado no próprio documento do Firestore).

## Deploy na Vercel

1. Suba o projeto para um repositório Git (ex.: GitHub).
2. No painel da Vercel, clique em **New Project** e importe o repositório.
3. Adicione as variáveis de ambiente acima (o `NEXT_PUBLIC_*` precisa de prefixo público; `REVALIDATE_TOKEN` pode ser privado).
4. Framework preset: **Next.js** (automático).
5. **Deploy.** O domínio será gerado (`*.vercel.app`) — configure o domínio customizado `nicolasgomestattoo.com.br` em **Settings → Domains**.

### Comandos úteis

```bash
npm run build   # build de produção
npm run seed -- <email>  # semeia o Firestore (resolvendo o UID pelo e-mail)
npm run compress # otimiza imagens para WebP (qualidade 80)
```

## Observações

- As imagens do portfólio ficam em `public/assets/img/` (pasta `tatuagens/` e `papel/`). Novos uploads feitos pelo painel do Nicolas são enviados para o Cloudinary (pasta `nicolas_portfolio`).
- Para adicionar vídeos do YouTube no portfólio, basta criar um item com **tipo "YouTube"** no painel e colar a URL do vídeo.
