import React from 'react';
import Layout from '@theme/Layout';
// import clsx from 'clsx';
// import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
// import HomepageFeatures from '../components/HomepageFeatures';

import StandWithUkraine from '../components/StandWithUkraine';
import MainSection from '../components/MainSection';
import ComponentsSection from '../components/ComponentsSection';
import FeaturesSection from '../components/FeaturesSection';
import CodeSection from '../components/CodeSection';
import LibrariesSection from '../components/LibrariesSection';

export default function Home(): JSX.Element {
  // const {siteConfig} = useDocusaurusContext();
  return (
    <>
      <StandWithUkraine />
      <Layout
        /* title={`Hello from ${siteConfig.title}`} */ description="Description will go into a meta tag in <head />"
      >
        <main>
          <MainSection />
          <ComponentsSection />
          <FeaturesSection />
          <CodeSection />
          <LibrariesSection />
        </main>
      </Layout>
    </>
  );
}
