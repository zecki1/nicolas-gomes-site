import admin from 'firebase-admin';
import { readFileSync } from 'fs';
import { resolve } from 'path';

const serviceAccountPath = resolve(process.cwd(), 'serviceAccountKey.json');
const serviceAccount = JSON.parse(readFileSync(serviceAccountPath, 'utf8'));

const EMAIL = process.argv[2] || process.env.NICOLAS_EMAIL || 'nick.gomes@hotmail.com';
const PASSWORD = process.env.NICOLAS_PASSWORD || '';
const SITE_URL = process.env.NICOLAS_SITE_URL || 'https://nicolasgomestattoo.com.br';
const HARDCODED_CLIENT_ID = process.env.NEXT_PUBLIC_CLIENT_ID || '';

let CLIENT_ID = HARDCODED_CLIENT_ID;

const siteData = {
  hero: {
    title: "Nicolas Gomes",
    backgroundImage: "",
    typedItems: {
      ptBR: ["sou Tatuador.", "sou Desenhista.", "eternizo sua ideia na sua pele."],
      en: ["am a Tattoo Artist.", "am a Designer.", "eternize your idea on your skin."],
      es: ["soy Tatuador.", "soy Dibujante.", "eternizo tu idea en tu piel."],
    },
  },
  social: {
    instagram: "https://www.instagram.com/nickgomestattoo/",
    whatsapp: "https://wa.me/5511930154717",
    behance: "",
    linkedin: "",
  },
  sobre: {
    titulo: { ptBR: "Sobre", en: "About", es: "Sobre mí" },
    subtitulo: { ptBR: "Um pouquinho da minha História", en: "A little bit of my story", es: "Un poquito de mi historia" },
    texto: {
      ptBR: "A minha transição de desenhista para tatuador foi muito importante pra mim. Me joguei nas artes aos 14 anos de idade como desenhista e, posteriormente, fui professor de desenho e pintura numa escola de Artes daqui de São Paulo. Uns 10 anos depois, meu interesse pela tatuagem me levou a entrar como aprendiz em um estúdio, em 2019.\n\nMinhas raizes como desenhista influenciam muito a preferir tatuagens autorais, defendendo a individualidade na sua pele. Acredito que, se você não é igual a todo mundo, suas tattoos também não precisam ser!\n\nHoje, busco abraçar meus clientes com o mesmo acolhimento que a cena underground da tatuagem me abraçou. E, sinceramente, mal posso esperar pra fazer parte da sua história, criando sua próxima tattoo contigo! Aqui está meu convite para desafiarmos o convencional e o padrãozinho juntos! Hahah E então? Vamos lá? 😎",
      en: "My transition from designer to tattoo artist was very important to me. I threw myself into the arts at 14 years old as a designer and later became a drawing and painting teacher at an art school in São Paulo. About 10 years later, my interest in tattooing led me to become an apprentice in a studio in 2019.\n\nMy roots as a designer greatly influence my preference for authorial tattoos, defending individuality on your skin. I believe that if you are not like everyone else, your tattoos don't have to be either!\n\nToday, I seek to embrace my clients with the same warmth that the underground tattoo scene embraced me. And honestly, I can't wait to be part of your story, creating your next tattoo with you! Here is my invitation for us to challenge the conventional together! Hahah So, shall we? 😎",
      es: "Mi transición de dibujante a tatuador fue muy importante para mí. Me lancé a las artes a los 14 años como dibujante y posteriormente fui profesor de dibujo y pintura en una escuela de arte de São Paulo. Unos 10 años después, mi interés por el tatuaje me llevó a convertirme en aprendiz en un estudio en 2019.\n\nMis raíces como dibujante influyen mucho en mi preferencia por los tatuajes de autor, defendiendo la individualidad en tu piel. ¡Creo que si no eres como todos los demás, tus tatuajes tampoco tienen por qué serlo!\n\nHoy busco abrazar a mis clientes con la misma calidez con la que la escena underground del tatuaje me abrazó. Y, sinceramente, ¡estoy ansioso por formar parte de tu historia, creando tu próximo tatuaje contigo! ¡Aquí está mi invitación para desafiar lo convencional juntos! Jaja ¿Entonces? ¡Vamos! 😎",
    },
    imagemPerfilUrl: "/assets/img/perfil.webp",
  },
  portfolio: {
    titulo: { ptBR: "Portfólio", en: "Portfolio", es: "Portafolio" },
    subtitulo: { ptBR: "Do papel para a pele.", en: "From paper to skin.", es: "Del papel a la piel." },
    items: [
      { id: '1', titulo: { ptBR: 'Água Viva', en: 'Jellyfish', es: 'Medusa' }, descricao: { ptBR: 'Essa água viva foi a primeira tatuagem da Nath, ex nadadora profissional.', en: 'This jellyfish was the first tattoo of Nath, a former professional swimmer.', es: 'Esta medusa fue el primer tatuaje de Nath, ex nadadora profesional.' }, categoria: 'tatuagens', tipo: 'imagem', imagemUrl: '/assets/img/tatuagens/agua_viva_pele.webp' },
      { id: '2', titulo: { ptBR: 'Chapeuzinho', en: 'Little Red', es: 'Caperucita' }, descricao: { ptBR: 'Essa Chapeuzinho Vermelho é baseada numa literatura brasileira.', en: 'This Little Red Riding Hood is based on Brazilian literature.', es: 'Esta Caperucita Roja está basada en literatura brasileña.' }, categoria: 'tatuagens', tipo: 'imagem', imagemUrl: '/assets/img/tatuagens/alquimista_pele.webp' },
      { id: '3', titulo: { ptBR: 'Sleeve', en: 'Sleeve', es: 'Sleeve' }, descricao: { ptBR: 'Sleeve autoral com animais vibrantes!', en: 'Authorial sleeve with vibrant animals!', es: '¡Sleeve de autor con animales vibrantes!' }, categoria: 'tatuagens', tipo: 'imagem', imagemUrl: '/assets/img/tatuagens/braço_fechado_pele.webp' },
      { id: '4', titulo: { ptBR: 'Horse', en: 'Horse', es: 'Caballo' }, descricao: { ptBR: 'Cavalo da raça Shire - elegante e imponente! ✨', en: 'Shire horse - elegant and imposing! ✨', es: 'Caballo Shire - elegante e imponente! ✨' }, categoria: 'tatuagens', tipo: 'imagem', imagemUrl: '/assets/img/tatuagens/cavalo_pele.webp' },
      { id: '5', titulo: { ptBR: 'Cigana', en: 'Gypsy', es: 'Gitana' }, descricao: { ptBR: 'Uma sessão de 9 horas! 🔮✨', en: 'A 9-hour session! 🔮✨', es: '¡Una sesión de 9 horas! 🔮✨' }, categoria: 'tatuagens', tipo: 'imagem', imagemUrl: '/assets/img/tatuagens/cigana_pele.webp' },
      { id: '6', titulo: { ptBR: 'Human or Demon', en: 'Human or Demon', es: 'Humano o Demonio' }, descricao: { ptBR: 'É mais perigoso revelar a verdadeira face ou confiar na máscara? 👺🔥', en: 'Is it more dangerous to reveal your true face or trust the mask? 👺🔥', es: '¿Es más peligroso revelar la cara verdadera o confiar en la máscara? 👺🔥' }, categoria: 'tatuagens', tipo: 'imagem', imagemUrl: '/assets/img/tatuagens/demonio_pele.webp' },
      { id: '7', titulo: { ptBR: 'Maçã', en: 'Apple', es: 'Manzana' }, descricao: { ptBR: 'Homenagem à Branca de Neve da Disney! 🍎☠', en: 'Tribute to Disney\'s Snow White! 🍎☠', es: '¡Homenaje a Blancanieves de Disney! 🍎☠' }, categoria: 'tatuagens', tipo: 'imagem', imagemUrl: '/assets/img/tatuagens/maca_bruxa_pele.webp' },
      { id: '8', titulo: { ptBR: 'Passarinho', en: 'Little Bird', es: 'Pajarito' }, descricao: { ptBR: 'Passarinho Neotrad delicado!', en: 'Delicate Neotrad little bird!', es: '¡Pajarito Neotrad delicado!' }, categoria: 'tatuagens', tipo: 'imagem', imagemUrl: '/assets/img/tatuagens/passaro_pele.webp' },
      { id: '9', titulo: { ptBR: 'Fox', en: 'Fox', es: 'Zorro' }, descricao: { ptBR: 'Raposa com proposta mais séria! 🍂🦊', en: 'Fox with a more serious proposal! 🍂🦊', es: '¡Zorro con una propuesta más seria! 🍂🦊' }, categoria: 'tatuagens', tipo: 'imagem', imagemUrl: '/assets/img/tatuagens/raposa_pele_2.webp' },
      { id: '10', titulo: { ptBR: 'Água Viva (papel)', en: 'Jellyfish (paper)', es: 'Medusa (papel)' }, descricao: { ptBR: 'Desenho da água viva no papel.', en: 'Jellyfish drawing on paper.', es: 'Dibujo de medusa en papel.' }, categoria: 'papel', tipo: 'imagem', imagemUrl: '/assets/img/papel/agua_viva_pele.webp' },
      { id: '11', titulo: { ptBR: 'Chapeuzinho (papel)', en: 'Little Red (paper)', es: 'Caperucita (papel)' }, descricao: { ptBR: 'Desenho da Chapeuzinho no papel.', en: 'Little Red drawing on paper.', es: 'Dibujo de Caperucita en papel.' }, categoria: 'papel', tipo: 'imagem', imagemUrl: '/assets/img/papel/alquimista_pele.webp' },
      { id: '12', titulo: { ptBR: 'Sleeve (papel)', en: 'Sleeve (paper)', es: 'Sleeve (papel)' }, descricao: { ptBR: 'Projeto do sleeve no papel.', en: 'Sleeve project on paper.', es: 'Proyecto del sleeve en papel.' }, categoria: 'papel', tipo: 'imagem', imagemUrl: '/assets/img/papel/braço_fechado_pele.webp' },
      { id: '13', titulo: { ptBR: 'Cigana (papel)', en: 'Gypsy (paper)', es: 'Gitana (papel)' }, descricao: { ptBR: 'Desenho da cigana no papel.', en: 'Gypsy drawing on paper.', es: 'Dibujo de gitana en papel.' }, categoria: 'papel', tipo: 'imagem', imagemUrl: '/assets/img/papel/cigana_pele.webp' },
      { id: '14', titulo: { ptBR: 'Human or Demon (papel)', en: 'Human or Demon (paper)', es: 'Humano o Demonio (papel)' }, descricao: { ptBR: 'Desenho no papel.', en: 'Drawing on paper.', es: 'Dibujo en papel.' }, categoria: 'papel', tipo: 'imagem', imagemUrl: '/assets/img/papel/demonio_pele.webp' },
      { id: '15', titulo: { ptBR: 'Maçã (papel)', en: 'Apple (paper)', es: 'Manzana (papel)' }, descricao: { ptBR: 'Desenho da maçã no papel.', en: 'Apple drawing on paper.', es: 'Dibujo de manzana en papel.' }, categoria: 'papel', tipo: 'imagem', imagemUrl: '/assets/img/papel/maca_bruxa_pele.webp' },
      { id: '16', titulo: { ptBR: 'Passarinho (papel)', en: 'Little Bird (paper)', es: 'Pajarito (papel)' }, descricao: { ptBR: 'Desenho do passarinho no papel.', en: 'Little bird drawing on paper.', es: 'Dibujo de pajarito en papel.' }, categoria: 'papel', tipo: 'imagem', imagemUrl: '/assets/img/papel/passaro_pele.webp' },
      { id: '17', titulo: { ptBR: 'Fox (papel)', en: 'Fox (paper)', es: 'Zorro (papel)' }, descricao: { ptBR: 'Desenho da raposa no papel.', en: 'Fox drawing on paper.', es: 'Dibujo de zorro en papel.' }, categoria: 'papel', tipo: 'imagem', imagemUrl: '/assets/img/papel/raposa_pele.webp' },
      { id: '18', titulo: { ptBR: 'Água Viva (Vídeo)', en: 'Jellyfish (Video)', es: 'Medusa (Video)' }, descricao: { ptBR: 'Processo da tatuagem.', en: 'Tattoo process.', es: 'Proceso del tatuaje.' }, categoria: 'videos', tipo: 'youtube', imagemUrl: '', youtubeUrl: 'https://www.youtube.com/watch?v=--FDPVWn2u4' },
      { id: '19', titulo: { ptBR: 'Morcego (Vídeo)', en: 'Bat (Video)', es: 'Murciélago (Video)' }, descricao: { ptBR: 'Morcego fofo sendo tatuado.', en: 'Cute bat being tattooed.', es: 'Murciélago lindo siendo tatuado.' }, categoria: 'videos', tipo: 'youtube', imagemUrl: '', youtubeUrl: 'https://www.youtube.com/watch?v=Nnr27gCXrWs' },
      { id: '20', titulo: { ptBR: 'Cavalo (Vídeo)', en: 'Horse (Video)', es: 'Caballo (Video)' }, descricao: { ptBR: 'Processo do cavalo guerreiro.', en: 'Warrior horse process.', es: 'Proceso del caballo guerrero.' }, categoria: 'videos', tipo: 'youtube', imagemUrl: '', youtubeUrl: 'https://www.youtube.com/watch?v=ecSURGh_qT8' },
      { id: '21', titulo: { ptBR: 'Água Viva 2 (Vídeo)', en: 'Jellyfish 2 (Video)', es: 'Medusa 2 (Video)' }, descricao: { ptBR: 'Outro vídeo do processo.', en: 'Another process video.', es: 'Otro video del proceso.' }, categoria: 'videos', tipo: 'youtube', imagemUrl: '', youtubeUrl: 'https://www.youtube.com/watch?v=axFBVFzyAXM' },
      { id: '22', titulo: { ptBR: 'Neotrad (Vídeo)', en: 'Neotrad (Video)', es: 'Neotrad (Video)' }, descricao: { ptBR: 'Tatuagem neo tradicional.', en: 'Neo traditional tattoo.', es: 'Tatuaje neo tradicional.' }, categoria: 'videos', tipo: 'youtube', imagemUrl: '', youtubeUrl: 'https://www.youtube.com/watch?v=xEaWvtjqEWs' },
      { id: '23', titulo: { ptBR: 'Maga (Vídeo)', en: 'Mage (Video)', es: 'Maga (Video)' }, descricao: { ptBR: 'Processo da tatuagem da maga.', en: 'Mage tattoo process.', es: 'Proceso de la maga.' }, categoria: 'videos', tipo: 'youtube', imagemUrl: '', youtubeUrl: 'https://www.youtube.com/watch?v=Gm7UUzZvZZU' },
    ],
  },
  contato: {
    titulo: { ptBR: "Contato", en: "Contact", es: "Contacto" },
    localizacao: "São Paulo - SP",
    email: "nick.gomes@hotmail.com",
    telefone: "55+(11) 93015-4717",
  },
};

async function seedDatabase() {
  console.log('Iniciando script de seeding...');
  if (!serviceAccount.project_id) {
    console.error('ERRO: O arquivo serviceAccountKey.json parece inválido ou não foi encontrado.');
    return;
  }
  if (admin.apps.length === 0) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  }
  const db = admin.firestore();

  if (!CLIENT_ID) {
    try {
      const user = await admin.auth().getUserByEmail(EMAIL);
      CLIENT_ID = user.uid;
      console.log(`🔑 Usuário já existente para "${EMAIL}". UID: ${CLIENT_ID}`);
    } catch {
      if (PASSWORD.length < 6) {
        console.error(
          `❌ Nenhum usuário encontrado para "${EMAIL}" e nenhuma senha válida (NICOLAS_PASSWORD) foi informada para criar a conta.`
        );
        return;
      }
      try {
        const created = await admin.auth().createUser({
          email: EMAIL,
          password: PASSWORD,
          displayName: 'Nicolas Gomes',
        });
        CLIENT_ID = created.uid;
        console.log(`🆕 Conta criada para "${EMAIL}". UID: ${CLIENT_ID}`);
        console.log(`🔒 Senha temporária: ${PASSWORD}`);
        console.log(`   (O Nicolas pode redefinir em zecki1.com.br/login → "Esqueci minha senha")`);
      } catch (createError) {
        console.error('❌ ERRO: Falha ao criar o usuário no Firebase Auth.', createError);
        return;
      }
    }
  }

  const clientRef = db.collection('clientes').doc(CLIENT_ID);
  try {
    await clientRef.set({
      siteData,
      settings: { siteUrl: SITE_URL },
    });
    console.log(`✅ SUCESSO! Dados de Nicolas Gomes gravados em clientes/${CLIENT_ID}`);
    console.log(`   Site público: ${SITE_URL}`);
    console.log(`   Use este UID como NEXT_PUBLIC_CLIENT_ID no site do Nicolas.`);
  } catch (error) {
    console.error('❌ ERRO: Falha ao semear o banco de dados.', error);
  }
}
seedDatabase();
