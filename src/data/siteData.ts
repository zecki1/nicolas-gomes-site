export type MultiLangText = { ptBR: string; en: string; es: string;[key: string]: string; };
export type MediaType = 'imagem' | 'video' | 'youtube';

export type PortfolioItem = {
  id: string;
  titulo: MultiLangText;
  descricao: MultiLangText;
  categoria: string;
  tipo: MediaType;
  imagemUrl: string;
  videoUrl?: string;
  youtubeUrl?: string;
};

export type SiteData = {
  hero: {
    title: string;
    typedItems: { ptBR: string[]; en: string[]; es: string[];[key: string]: string[]; };
  };
  social: {
    instagram: string;
    whatsapp: string;
  };
  sobre: {
    titulo: MultiLangText;
    subtitulo: MultiLangText;
    texto: MultiLangText;
    imagemPerfilUrl: string;
  };
  portfolio: {
    titulo: MultiLangText;
    subtitulo: MultiLangText;
    items: PortfolioItem[];
  };
  contato: {
    titulo: MultiLangText;
    localizacao: string;
    email: string;
    telefone: string;
  };
};

const siteData: SiteData = {
  hero: {
    title: "Nicolas Gomes",
    typedItems: {
      ptBR: ["sou Tatuador.", "sou Desenhista.", "eternizo sua ideia na sua pele."],
      en: ["am a Tattoo Artist.", "am a Designer.", "eternize your idea on your skin."],
      es: ["soy Tatuador.", "soy Dibujante.", "eternizo tu idea en tu piel."],
    },
  },
  social: {
    instagram: "https://www.instagram.com/nickgomestattoo/",
    whatsapp: "https://wa.me/5511930154717",
  },
  sobre: {
    titulo: { ptBR: "Sobre", en: "About", es: "Sobre mí" },
    subtitulo: {
      ptBR: "Um pouquinho da minha História",
      en: "A little bit of my story",
      es: "Un poquito de mi historia",
    },
    texto: {
      ptBR: [
        "A minha transição de desenhista para tatuador foi muito importante pra mim. Me joguei nas artes aos 14 anos de idade como desenhista e, posteriormente, fui professor de desenho e pintura numa escola de Artes daqui de São Paulo. Uns 10 anos depois, meu interesse pela tatuagem me levou a entrar como aprendiz em um estúdio, em 2019.",
        "Minhas raizes como desenhista influenciam muito a preferir tatuagens autorais, defendendo a individualidade na sua pele. Acredito que, se você não é igual a todo mundo, suas tattoos também não precisam ser!",
        "Hoje, busco abraçar meus clientes com o mesmo acolhimento que a cena underground da tatuagem me abraçou. E, sinceramente, mal posso esperar pra fazer parte da sua história, criando sua próxima tattoo contigo! Aqui está meu convite para desafiarmos o convencional e o padrãozinho juntos! Hahah E então? Vamos lá? 😎",
      ].join("\n\n"),
      en: [
        "My transition from designer to tattoo artist was very important to me. I threw myself into the arts at 14 years old as a designer and later became a drawing and painting teacher at an art school in São Paulo. About 10 years later, my interest in tattooing led me to become an apprentice in a studio in 2019.",
        "My roots as a designer greatly influence my preference for authorial tattoos, defending individuality on your skin. I believe that if you are not like everyone else, your tattoos don't have to be either!",
        "Today, I seek to embrace my clients with the same warmth that the underground tattoo scene embraced me. And honestly, I can't wait to be part of your story, creating your next tattoo with you! Here is my invitation for us to challenge the conventional together! Hahah So, shall we? 😎",
      ].join("\n\n"),
      es: [
        "Mi transición de dibujante a tatuador fue muy importante para mí. Me lancé a las artes a los 14 años como dibujante y posteriormente fui profesor de dibujo y pintura en una escuela de arte de São Paulo. Unos 10 años después, mi interés por el tatuaje me llevó a convertirme en aprendiz en un estudio en 2019.",
        "Mis raíces como dibujante influyen mucho en mi preferencia por los tatuajes de autor, defendiendo la individualidad en tu piel. ¡Creo que si no eres como todos los demás, tus tatuajes tampoco tienen por qué serlo!",
        "Hoy busco abrazar a mis clientes con la misma calidez con la que la escena underground del tatuaje me abrazó. Y, sinceramente, ¡estoy ansioso por formar parte de tu historia, creando tu próximo tatuaje contigo! ¡Aquí está mi invitación para desafiar lo convencional juntos! Jaja ¿Entonces? ¡Vamos! 😎",
      ].join("\n\n"),
    },
    imagemPerfilUrl: "/assets/img/perfil.webp",
  },
  portfolio: {
    titulo: { ptBR: "Portfólio", en: "Portfolio", es: "Portafolio" },
    subtitulo: {
      ptBR: "Do papel para a pele.",
      en: "From paper to skin.",
      es: "Del papel a la piel.",
    },
    items: [
      {
        id: '1',
        titulo: { ptBR: 'Água Viva', en: 'Jellyfish', es: 'Medusa' },
        descricao: {
          ptBR: 'Essa água viva foi a primeira tatuagem da Nath, ex nadadora profissional. Ela colecionava muitas queimaduras de água viva na pele por causa dos incidentes que rolavam quando ela competia em águas abertas. Decidiu, justamente, tatuar uma água viva pra representar essa fase importante. 🪼',
          en: 'This jellyfish was Nath\'s first tattoo, a former professional swimmer. She collected many jellyfish burns on her skin due to incidents that happened when she competed in open waters.',
          es: 'Esta medusa fue el primer tatuaje de Nath, ex nadadora profesional. Coleccionaba muchas quemaduras de medusa en la piel debido a los incidentes que ocurrían cuando competía en aguas abiertas.'
        },
        categoria: 'tatuagens',
        tipo: 'imagem',
        imagemUrl: '/assets/img/tatuagens/agua_viva_pele.webp',
      },
      {
        id: '2',
        titulo: { ptBR: 'Chapeuzinho', en: 'Little Red Riding Hood', es: 'Caperucita Roja' },
        descricao: {
          ptBR: '(…)E o lobo lhe devorou a vovó. Essa Chapeuzinho Vermelho é baseada numa literatura brasileira, onde o véu da Chapeuzinho é branco, mas se torna vermelho por conta do sangue da vovozinha.',
          en: '(…)And the wolf devoured grandma. This Little Red Riding Hood is based on Brazilian literature, where Red\'s veil is white but becomes red due to grandma\'s blood.',
          es: '(…)Y el lobo devoró a la abuelita. Esta Caperucita Roja está basada en la literatura brasileña.'
        },
        categoria: 'tatuagens',
        tipo: 'imagem',
        imagemUrl: '/assets/img/tatuagens/alquimista_pele.webp',
      },
      {
        id: '3',
        titulo: { ptBR: 'Sleeve', en: 'Sleeve', es: 'Sleeve' },
        descricao: {
          ptBR: 'Esse sleeve (ou fechamento de braço) é um projeto autoral onde a Giovana decidiu colocar dois animais bem fora da curva, e com cores vibrantes!',
          en: 'This sleeve is an authorial project where Giovana decided to put two very unique animals with vibrant colors!',
          es: 'Este sleeve es un proyecto de autor donde Giovana decidió poner dos animales muy únicos con colores vibrantes!'
        },
        categoria: 'tatuagens',
        tipo: 'imagem',
        imagemUrl: '/assets/img/tatuagens/braço_fechado_pele.webp',
      },
      {
        id: '4',
        titulo: { ptBR: 'Horse', en: 'Horse', es: 'Caballo' },
        descricao: {
          ptBR: 'Cavalos, por si só, são animais extremamente elegantes, né? E essa raça chamada Shire tem uma imponência muito natural! O tamanho e as patas peludas são o que mais chamam atenção! ✨',
          en: 'Horses, by themselves, are extremely elegant animals, right? And this breed called Shire has a very natural impressiveness! The size and furry legs are what draw the most attention! ✨',
          es: 'Los caballos, por sí solos, son animales extremadamente elegantes, ¿verdad? ¡Y esta raza llamada Shire tiene una imponencia muy natural!'
        },
        categoria: 'tatuagens',
        tipo: 'imagem',
        imagemUrl: '/assets/img/tatuagens/cavalo_pele.webp',
      },
      {
        id: '5',
        titulo: { ptBR: 'Cigana', en: 'Gypsy', es: 'Gitana' },
        descricao: {
          ptBR: 'Essa cigana foi um trabalho diferente que eu adorei fazer. Rolou em uma sessão só de 9 horas aproximadamente! 🔮✨',
          en: 'This gypsy was a different job that I loved doing. It happened in a single session of approximately 9 hours! 🔮✨',
          es: 'Esta gitana fue un trabajo diferente que me encantó hacer. ¡Ocurrió en una sola sesión de aproximadamente 9 horas! 🔮✨'
        },
        categoria: 'tatuagens',
        tipo: 'imagem',
        imagemUrl: '/assets/img/tatuagens/cigana_pele.webp',
      },
      {
        id: '6',
        titulo: { ptBR: 'Human or Demon', en: 'Human or Demon', es: 'Humano o Demonio' },
        descricao: {
          ptBR: 'E aí? É mais perigoso revelar a verdadeira face ou confiar apenas na máscara enquanto ela não cai? 👺🔥',
          en: 'So? Is it more dangerous to reveal your true face or to trust only the mask until it falls? 👺🔥',
          es: '¿Entonces? ¿Es más peligroso revelar la verdadera cara o confiar solo en la máscara hasta que se caiga? 👺🔥'
        },
        categoria: 'tatuagens',
        tipo: 'imagem',
        imagemUrl: '/assets/img/tatuagens/demonio_pele.webp',
      },
      {
        id: '7',
        titulo: { ptBR: 'Maçã', en: 'Apple', es: 'Manzana' },
        descricao: {
          ptBR: 'Uma homenagem à Branca de Neve da Disney, animação que Vic sempre assistia com seu irmão mais velho! 🍎☠',
          en: 'A tribute to Disney\'s Snow White, an animation that Vic always watched with her older brother! 🍎☠',
          es: '¡Un homenaje a la Blancanieves de Disney, una animación que Vic siempre veía con su hermano mayor! 🍎☠'
        },
        categoria: 'tatuagens',
        tipo: 'imagem',
        imagemUrl: '/assets/img/tatuagens/maca_bruxa_pele.webp',
      },
      {
        id: '8',
        titulo: { ptBR: 'Passarinho', en: 'Little Bird', es: 'Pajarito' },
        descricao: {
          ptBR: 'Passarinho Neotrad delicado pra Victoria!',
          en: 'Delicate Neotrad little bird for Victoria!',
          es: '¡Pajarito Neotrad delicado para Victoria!'
        },
        categoria: 'tatuagens',
        tipo: 'imagem',
        imagemUrl: '/assets/img/tatuagens/passaro_pele.webp',
      },
      {
        id: '9',
        titulo: { ptBR: 'Fox', en: 'Fox', es: 'Zorro' },
        descricao: {
          ptBR: 'A prova mais viva que Raposas também combinam com propostas mais sérias e menos delicadas nas tatuagens! 🍂🦊',
          en: 'The living proof that Foxes also match more serious and less delicate proposals in tattoos! 🍂🦊',
          es: '¡La prueba viviente de que los Zorros también combinan con propuestas más serias y menos delicadas en los tatuajes! 🍂🦊'
        },
        categoria: 'tatuagens',
        tipo: 'imagem',
        imagemUrl: '/assets/img/tatuagens/raposa_pele_2.webp',
      },
      {
        id: '10',
        titulo: { ptBR: 'Água Viva (papel)', en: 'Jellyfish (paper)', es: 'Medusa (papel)' },
        descricao: {
          ptBR: 'Desenho da água viva no papel, antes de virar tatuagem.',
          en: 'Jellyfish drawing on paper, before becoming a tattoo.',
          es: 'Dibujo de la medusa en papel, antes de convertirse en tatuaje.'
        },
        categoria: 'papel',
        tipo: 'imagem',
        imagemUrl: '/assets/img/papel/agua_viva_pele.webp',
      },
      {
        id: '11',
        titulo: { ptBR: 'Chapeuzinho (papel)', en: 'Little Red (paper)', es: 'Caperucita (papel)' },
        descricao: {
          ptBR: 'Desenho da Chapeuzinho no papel.',
          en: 'Little Red Riding Hood drawing on paper.',
          es: 'Dibujo de Caperucita Roja en papel.'
        },
        categoria: 'papel',
        tipo: 'imagem',
        imagemUrl: '/assets/img/papel/alquimista_pele.webp',
      },
      {
        id: '12',
        titulo: { ptBR: 'Sleeve (papel)', en: 'Sleeve (paper)', es: 'Sleeve (papel)' },
        descricao: {
          ptBR: 'Projeto do sleeve no papel.',
          en: 'Sleeve project on paper.',
          es: 'Proyecto del sleeve en papel.'
        },
        categoria: 'papel',
        tipo: 'imagem',
        imagemUrl: '/assets/img/papel/braço_fechado_pele.webp',
      },
      {
        id: '13',
        titulo: { ptBR: 'Cigana (papel)', en: 'Gypsy (paper)', es: 'Gitana (papel)' },
        descricao: {
          ptBR: 'Desenho da cigana no papel.',
          en: 'Gypsy drawing on paper.',
          es: 'Dibujo de la gitana en papel.'
        },
        categoria: 'papel',
        tipo: 'imagem',
        imagemUrl: '/assets/img/papel/cigana_pele.webp',
      },
      {
        id: '14',
        titulo: { ptBR: 'Human or Demon (papel)', en: 'Human or Demon (paper)', es: 'Humano o Demonio (papel)' },
        descricao: {
          ptBR: 'Desenho do Human or Demon no papel.',
          en: 'Human or Demon drawing on paper.',
          es: 'Dibujo de Humano o Demonio en papel.'
        },
        categoria: 'papel',
        tipo: 'imagem',
        imagemUrl: '/assets/img/papel/demonio_pele.webp',
      },
      {
        id: '15',
        titulo: { ptBR: 'Maçã (papel)', en: 'Apple (paper)', es: 'Manzana (papel)' },
        descricao: {
          ptBR: 'Desenho da maçã no papel.',
          en: 'Apple drawing on paper.',
          es: 'Dibujo de la manzana en papel.'
        },
        categoria: 'papel',
        tipo: 'imagem',
        imagemUrl: '/assets/img/papel/maca_bruxa_pele.webp',
      },
      {
        id: '16',
        titulo: { ptBR: 'Passarinho (papel)', en: 'Little Bird (paper)', es: 'Pajarito (papel)' },
        descricao: {
          ptBR: 'Desenho do passarinho no papel.',
          en: 'Little bird drawing on paper.',
          es: 'Dibujo del pajarito en papel.'
        },
        categoria: 'papel',
        tipo: 'imagem',
        imagemUrl: '/assets/img/papel/passaro_pele.webp',
      },
      {
        id: '17',
        titulo: { ptBR: 'Fox (papel)', en: 'Fox (paper)', es: 'Zorro (papel)' },
        descricao: {
          ptBR: 'Desenho da raposa no papel.',
          en: 'Fox drawing on paper.',
          es: 'Dibujo del zorro en papel.'
        },
        categoria: 'papel',
        tipo: 'imagem',
        imagemUrl: '/assets/img/papel/raposa_pele.webp',
      },
      {
        id: '18',
        titulo: { ptBR: 'Água Viva (Vídeo)', en: 'Jellyfish (Video)', es: 'Medusa (Video)' },
        descricao: {
          ptBR: 'Vídeo do processo da tatuagem água viva.',
          en: 'Jellyfish tattoo process video.',
          es: 'Video del proceso del tatuaje de la medusa.'
        },
        categoria: 'videos',
        tipo: 'youtube',
        imagemUrl: '',
        youtubeUrl: 'https://www.youtube.com/watch?v=--FDPVWn2u4',
      },
      {
        id: '19',
        titulo: { ptBR: 'Morcego (Vídeo)', en: 'Bat (Video)', es: 'Murciélago (Video)' },
        descricao: {
          ptBR: 'Tatuagem de morcego fofo sendo feita.',
          en: 'Cute bat tattoo being made.',
          es: 'Tatuaje de murciélago lindo siendo hecho.'
        },
        categoria: 'videos',
        tipo: 'youtube',
        imagemUrl: '',
        youtubeUrl: 'https://www.youtube.com/watch?v=Nnr27gCXrWs',
      },
      {
        id: '20',
        titulo: { ptBR: 'Cavalo (Vídeo)', en: 'Horse (Video)', es: 'Caballo (Video)' },
        descricao: {
          ptBR: 'Vídeo do processo da tatuagem do cavalo guerreiro.',
          en: 'Warrior horse tattoo process video.',
          es: 'Video del proceso del tatuaje del caballo guerrero.'
        },
        categoria: 'videos',
        tipo: 'youtube',
        imagemUrl: '',
        youtubeUrl: 'https://www.youtube.com/watch?v=ecSURGh_qT8',
      },
      {
        id: '21',
        titulo: { ptBR: 'Água Viva 2 (Vídeo)', en: 'Jellyfish 2 (Video)', es: 'Medusa 2 (Video)' },
        descricao: {
          ptBR: 'Outro vídeo do processo da água viva.',
          en: 'Another jellyfish process video.',
          es: 'Otro video del proceso de la medusa.'
        },
        categoria: 'videos',
        tipo: 'youtube',
        imagemUrl: '',
        youtubeUrl: 'https://www.youtube.com/watch?v=axFBVFzyAXM',
      },
      {
        id: '22',
        titulo: { ptBR: 'Neotrad (Vídeo)', en: 'Neotrad (Video)', es: 'Neotrad (Video)' },
        descricao: {
          ptBR: 'Tatuagem neo tradicional sendo feita.',
          en: 'Neo traditional tattoo being made.',
          es: 'Tatuaje neo tradicional siendo hecho.'
        },
        categoria: 'videos',
        tipo: 'youtube',
        imagemUrl: '',
        youtubeUrl: 'https://www.youtube.com/watch?v=xEaWvtjqEWs',
      },
      {
        id: '23',
        titulo: { ptBR: 'Maga (Vídeo)', en: 'Mage (Video)', es: 'Maga (Video)' },
        descricao: {
          ptBR: 'Vídeo do processo da tatuagem da maga.',
          en: 'Mage tattoo process video.',
          es: 'Video del proceso del tatuaje de la maga.'
        },
        categoria: 'videos',
        tipo: 'youtube',
        imagemUrl: '',
        youtubeUrl: 'https://www.youtube.com/watch?v=Gm7UUzZvZZU',
      },
    ],
  },
  contato: {
    titulo: { ptBR: "Contato", en: "Contact", es: "Contacto" },
    localizacao: "São Paulo - SP",
    email: "nick.gomes@hotmail.com",
    telefone: "55+(11) 93015-4717",
  },
};

export default siteData;
