import React from 'react';
// import Link from 'gatsby-link';

import './index.scss';

import IntroSection from './sections/IntroSection';
import ComponentsSection from './sections/ComponentsSection';
import RtlAndAccessibilitySection from './sections/RtlAndAccessibilitySection.jsx';
import CodeSection from './sections/CodeSection';
import LibrariesSection from './sections/LibrariesSection';
import InfoSection from './sections/InfoSection';

const IndexPage = props => {
  return (
    <div className="main-page">
      <IntroSection />
      <ComponentsSection />
      <RtlAndAccessibilitySection />
      <CodeSection />
      <LibrariesSection />
      <InfoSection />

      {/* <div className="main-section">
        <div className="logo-box">
          <img className="logo" src={mainLogo} alt="main-logo" />

          <Link className="docs-button" to="/getting-started/setup">
            Enter Docs
          </Link>

          <p className="description">UI Toolset & Components Library for React Native</p>

          <div className="qr">
            <img
              src={
                'https://user-images.githubusercontent.com/1780255/76164023-f2171400-6153-11ea-962d-d57b64a08a80.png'
              }
            />

            <a href="https://snack.expo.io/@ethanshar/rnuilib_snack" target="_blank" rel="noopener noreferrer">
              Or try our demo on Expo-Snack
            </a>
          </div>
        </div>
      </div>
      <PlatformSection />
      <ToolsetSection />
      <NativeSection /> */}
    </div>
  );
};

export default IndexPage;
