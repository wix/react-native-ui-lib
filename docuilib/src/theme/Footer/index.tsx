import React from 'react';
import {useThemeConfig} from '@docusaurus/theme-common';
// import useBaseUrl from '@docusaurus/useBaseUrl';

function Footer() {
  const {footer} = useThemeConfig();

  if (!footer) {
    return null;
  }

  return (
    <footer className="footer">
      <div className="footer__container">
        <div className={'footer__links'}>
          <div className="footer__section">
            <a href="/docs/getting-started/setup" target="_blank" rel="noreferrer noopener" aria-label="Go to docs">
              <img
                src="https://wixmp-1d257fba8470f1b562a0f5f2.wixmp.com/mads-docs-assets/assets/site/logo_rnui_footer.png"
                alt="rnui logo"
                width="139"
                height="38"
              />
            </a>
          </div>

          <div className="footer__section">
            <a
              href="https://github.com/wix/react-native-ui-lib"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Open gitHub"
              className="text__link"
            >
              <span>GitHub</span>
              <img
                src="https://wixmp-1d257fba8470f1b562a0f5f2.wixmp.com/mads-docs-assets/assets/site/externalSmall.png"
                alt="external link icon"
                width="17"
                height="16"
              />
            </a>
            <a
              href="https://snack.expo.io/@ethanshar/rnuilib_snack?platform=ios&supportedPlatforms=ios,android"
              target="_blank"
              rel="noreferrer noopener"
              aria-label="Open expo snack"
            >
              <span>Expo-Snack</span>
              <img
                src="https://wixmp-1d257fba8470f1b562a0f5f2.wixmp.com/mads-docs-assets/assets/site/externalSmall.png"
                alt="external link icon"
                width="17"
                height="16"
              />
            </a>
          </div>

          <div className="footer__section right__section">
            <a href="https://discord.gg/2eW4g6Z" target="_blank" rel="noreferrer noopener" aria-label="Open discord" className="icon__link">
              <img
                src="https://wixmp-1d257fba8470f1b562a0f5f2.wixmp.com/mads-docs-assets/assets/site/discord.png"
                alt="Discord icon"
                width="28"
                height="28"
              />
            </a>
            <a href="https://twitter.com/rnuilib" target="_blank" rel="noreferrer noopener" aria-label="Open x">
              <img
                src="https://wixmp-1d257fba8470f1b562a0f5f2.wixmp.com/mads-docs-assets/assets/site/xSocial.png"
                alt="x icon"
                width="28"
                height="28"
              />
            </a>
          </div>
        </div>
        <div className="footer__bottom text--center">
          <div className="footer__copyright">© 2006-{new Date().getFullYear()} Wix.com, Inc.</div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
