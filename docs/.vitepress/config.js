export default {
    lang: 'es-ES',
    lastUpdated: true,
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
            copyright: 'Copyright © 2022-present Gerson Umanzor'
        },
        docFooter: {
            prev: 'Pagina anterior',
            next: 'Pagina siguiente'
        },

        sidebar: [
            {
                text: '',
                collapsible: true,
                items: [
                    { text: 'Bienvenida', link: '/' },
                    { text: 'Flujo de trabajo con Git Flow', link: '/git-flow' },
                ]
            }
        ]
    }
}
