export default {
  lang: 'es-ES',
  title: 'gbumanzor.dev',
  description: 'Vue-powered Static Site Generator',
  themeConfig: {
    nav: [
      { text: 'Inicio', link: '/' },
      { text: 'Portafolio', link: 'https://gbumanzor.dev' },
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/gbumanzordev' },
      { icon: 'twitter', link: 'https://twitter.com/gbumanzordev' },
      { icon: 'instagram', link: 'https://instagram.com/gbumanzordev' },
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2022-present Gerson Umanzor',
    },
    sidebar: [
      {
        text: '',
        collapsible: false,
        items: [
          { text: 'Inicio', link: '/' },
        ],
      },
      {
        text: 'Ultimos articulos',
        collapsible: true,
        items: [
          { text: 'Flujo de trabajo con Git Flow', link: '/git-flow' },
          { text: 'Discriminated Unions & Exhaustiveness Checking', link: '/discriminated-unions' },
          { text: 'Configurar Angular Apps', link: '/configurar-angular-apps' },
        ],
      },
      {
        text: 'Front-End',
        collapsible: true,
        items: [
          { text: 'Discriminated Unions & Exhaustiveness Checking', link: '/discriminated-unions' },
          { text: 'Configurar Angular Apps', link: '/configurar-angular-apps' },
        ],
      },
      {
        text: 'Software Engineering',
        collapsible: true,
        items: [
          { text: 'SOLID con Dibujos', link: '/solid-dibujos' },
          { text: 'OOP en JavaScript', link: '/oop-en-js' },
        ],
      },
    ],
  },
};
