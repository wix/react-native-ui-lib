import React from 'react';
import Link from 'gatsby-link';
import './IntroSection.scss';
import introCover from '../../images/newDesign/introCover.jpg';
import goldStar from '../../images/goldStar.svg';

import expoSnackLink from '../../data/expoSnackLink';

export default () => {
  return (
    <div className="intro">
      <img src={introCover} className="intro-cover" />
      <div className="intro-content">
        <p>
          <span className="lib-name">RNUI</span> is a UI Toolset & Components Library for React Native
        </p>
        <div className="git-stars">
          <img src={goldStar} />
          <span className="star-count">2.9k</span>
        </div>

        <div className="buttons">
          <Link to="/getting-started/setup">
            <button className="dark">View Docs</button>
          </Link>

          <a href={expoSnackLink} target="_blank" rel="noopener noreferrer">
            <button>Expo-Snack Demo</button>
          </a>
        </div>
      </div>
    </div>
  );
};
