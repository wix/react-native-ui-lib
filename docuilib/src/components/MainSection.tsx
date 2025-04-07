import React, {useEffect, useState} from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import styles from './MainSection.module.scss';
import mainCover from '@site/static/img/mainCover.jpg';
import GoldStarSvg from '@site/static/img/goldStar.svg';
import useLandingPageOptions from '../hooks/useLandingPageOptions';

const STARS_COUNT_KEY = 'starsCount';

export default () => {
  const {siteConfig} = useDocusaurusContext();
  const {expoSnackLink, docsMainEntry, docsDevelopmentVersion} = siteConfig.customFields;
  const {showExpoButton, mainSectionTitle, showStars, stars} = useLandingPageOptions();
  const [starsCount, setStarsCount] = useState(localStorage.getItem(STARS_COUNT_KEY) ?? stars);

  useEffect(() => {
    fetchStarsCount();
  }, []);

  const fetchStarsCount = async () => {
    const response = await fetch('https://api.github.com/repos/wix/react-native-ui-lib');
    const data = await response.json();
    const _starsCount = data.stargazers_count ? (data.stargazers_count / 1000).toFixed(1) : starsCount;

    localStorage.setItem(STARS_COUNT_KEY, _starsCount.toString());
    setStarsCount(_starsCount);
  };

  return (
    <div className={styles.main}>
      <img src={mainCover} alt="showcase" className={styles.mainCover}/>
      <div className={styles.mainContent}>
        <p>
          {mainSectionTitle}
          {/* <span className={styles.libName}>RNUI</span> is a UI Toolset & Components Library for React Native */}
        </p>
        {showStars && (
          <div className={styles.gitStars}>
            <GoldStarSvg width={16} height={16} style={{margin: 4}}/>
            <span>{starsCount}k</span>
          </div>
        )}

        <div className={styles.buttons}>
          <Link
            to={`/docs/${
              location.hostname === 'localhost' && docsDevelopmentVersion ? `${docsDevelopmentVersion}/` : ''
            }${docsMainEntry}`}
          >
            <button className={'button dark'}>View Documentation</button>
          </Link>

          {showExpoButton && (
            <a href={expoSnackLink} target="_blank" rel="noopener noreferrer">
              <button className={'button'}>Expo-Snack Demo</button>
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
