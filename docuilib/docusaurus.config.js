const {themes} = require('prism-react-renderer');
const lightCodeTheme = themes.github;
const darkCodeTheme = themes.dracula;

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(
  module.exports = {
    title: 'RNUILib',
    tagline: 'React Native UI Lib',
    url: 'https://wix.github.io',
    baseUrl: '/react-native-ui-lib/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',
    organizationName: 'wix', // Usually your GitHub org/user name.
    projectName: 'react-native-ui-lib', // Usually your repo name.
    trailingSlash: false,
    customFields: {
      docsMainEntry: 'getting-started/setup',
      docsDevelopmentVersion: 'next',
      expoSnackLink: 'https://snack.expo.io/@ethanshar/rnuilib_snack',
      stars: '4.7'
    },
    plugins: ['docusaurus-plugin-sass', '@docusaurus/theme-live-codeblock', './plugins/uilib.js'],
    presets: [
      [
        '@docusaurus/preset-classic',
        /** @type {import('@docusaurus/preset-classic').Options} */
        ({
          docs: {
            sidebarPath: require.resolve('./sidebars.js'),
            path: '../docs',
            // Please change this to your repo.
            editUrl: 'https://github.com/facebook/docusaurus/edit/main/website/',
            docRootComponent: '@site/src/components/CustomLayout'
          },
          blog: {
            showReadingTime: true,
            // Please change this to your repo.
            editUrl: 'https://github.com/facebook/docusaurus/edit/main/website/blog/'
          },
          theme: {
            customCss: [
              require.resolve('./src/css/custom.css'),
              require.resolve('./src/css/presets.css'),
              require.resolve('./src/css/components.css')
            ]
          }
        })
      ]
    ],

    themeConfig:
      /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
      ({
        metadata: [
          {name: 'title', content: 'React Native UI Lib'},

          {
            name: 'keywords',
            content: 'design system, react native, react, mobile, web, ui library, components library'
          },
          {
            name: 'description',
            content:
              'A comprehensive design system for react native with rich components library, supports dark mode, RTL and accessibility features.'
          },
          {name: 'robots', content: 'index, follow'}
        ],
        algolia: {
          // If Algolia did not provide you any appId, use 'BH4D9OD16A'
          appId: 'BWQFOHCCF3',
          // Public API key: it is safe to commit it
          apiKey: '96b00d78d5ec180ae266abefc79efc5d',
          indexName: 'react-native-ui-lib',
          // Optional: see doc section below
          contextualSearch: true
          // Optional: Specify domains where the navigation should occur through window.location instead on history.push. Useful when our Algolia config crawls multiple documentation sites and we want to navigate with window.location.href to them.
          // externalUrlRegex: 'external\\.com|domain\\.com',
          // Optional: Algolia search parameters
          // searchParameters: {}
          //... other Algolia params
        },
        navbar: {
          title: 'RNUILib',
          hideOnScroll: true,
          logo: {
            alt: 'RNUILib Logo',
            src: 'img/logo.png'
          },
          items: [
            {
              type: 'doc',
              docId: 'getting-started/setup',
              position: 'left',
              label: 'Guides'
            },
            {
              type: 'doc',
              docId: 'components/basic/View',
              position: 'left',
              label: 'Components'
            },
            // {to: '/blog', label: 'Blog', position: 'left'},
            {
              href: 'https://github.com/wix/react-native-ui-lib',
              label: 'GitHub',
              position: 'right'
            }
          ]
        },
        footer: {
          style: 'dark',
          links: [
            {
              title: 'Links',
              items: [
                {
                  label: 'Docs',
                  to: '/docs/getting-started/setup'
                },
                {
                  label: 'GitHub',
                  href: 'https://github.com/wix/react-native-ui-lib'
                },
                {
                  label: 'Expo-Snack',
                  href: 'https://snack.expo.io/@ethanshar/rnuilib_snack?platform=ios&supportedPlatforms=ios,android'
                }
              ]
            },

            {
              title: 'Community',
              items: [
                {
                  label: 'Discord',
                  href: 'https://discord.gg/2eW4g6Z'
                },
                {
                  label: 'Twitter',
                  href: 'https://twitter.com/rnuilib'
                }
              ]
            }
          ],
          copyright: `© 2006-${new Date().getFullYear()} Wix.com, Inc.`
        },
        prism: {
          theme: lightCodeTheme,
          darkTheme: darkCodeTheme
        },
        colorMode: {
          disableSwitch: true
        }
      })
  }
);
