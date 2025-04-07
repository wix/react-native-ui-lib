import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

export interface LandingPageOptions {
  sections: string[];
  mainSectionTitle: string;
  showStars: boolean;
  stars: number;
  showExpoButton: boolean;
}

export const useLandingPageOptions = () => {
  const {siteConfig} = useDocusaurusContext();
  const landingPage = siteConfig.customFields.landingPage as LandingPageOptions;

  return landingPage;
};

export default useLandingPageOptions;
