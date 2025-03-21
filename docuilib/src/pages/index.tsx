import React from 'react';
import Layout from '@theme/Layout';
import BrowserOnly from '@docusaurus/BrowserOnly';
// import clsx from 'clsx';
// import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
// import HomepageFeatures from '../components/HomepageFeatures';

import MainSection from '../components/MainSection';
import ComponentsSection from '../components/ComponentsSection';
import FeaturesSection from '../components/FeaturesSection';
import CodeSection from '../components/CodeSection';
import LibrariesSection from '../components/LibrariesSection';

export default function Home(): JSX.Element {
  // const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      /* title={`Hello from ${siteConfig.title}`} */ description="Description will go into a meta tag in <head />"
    >
      <main>
        {/* Note: BrowserOnly allows using `localStorage` in MainSection, otherwise docusaurus build fail */}
        <BrowserOnly>{() => <MainSection/>}</BrowserOnly>
        <ComponentsSection/>
        <FeaturesSection/>
        <CodeSection/>
        <LibrariesSection/>
      </main>
    </Layout>
  );
}
