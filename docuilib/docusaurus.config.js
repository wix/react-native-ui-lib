const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

// With JSDoc @type annotations, IDEs can provide config autocompletion
/** @type {import('@docusaurus/types').DocusaurusConfig} */
(
  module.exports = {
    title: 'My Site',
    tagline: 'Dinosaurs are cool',
    url: 'https://your-docusaurus-test-site.com',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',
    organizationName: 'facebook', // Usually your GitHub org/user name.
    projectName: 'docusaurus', // Usually your repo name.

    presets: [
      [
        '@docusaurus/preset-classic',
        /** @type {import('@docusaurus/preset-classic').Options} */
        ({
          docs: {
            sidebarPath: require.resolve('./sidebars.js'),
            path: '../docs',
            // Please change this to your repo.
            editUrl: 'https://github.com/facebook/docusaurus/edit/main/website/'
          },
          blog: {
            showReadingTime: true,
            // Please change this to your repo.
            editUrl: 'https://github.com/facebook/docusaurus/edit/main/website/blog/'
          },
          theme: {
            customCss: require.resolve('./src/css/custom.css')
          }
        })
      ]
    ],

    themeConfig:
      /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
      ({
        navbar: {
          title: 'RNUILib',
          logo: {
            alt: 'RNUILib Logo',
            src: 'img/logo.png'
          },
          items: [
            {
              type: 'doc',
              docId: 'getting-started/setup',
              position: 'right',
              label: 'Docs'
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
        }
      })
  }
);
