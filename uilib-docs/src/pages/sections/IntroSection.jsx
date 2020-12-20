import React from 'react';
import Link from 'gatsby-link';
import './IntroSection.scss';
import introCover from '../../images/newDesign/introCover.jpg';

export default () => {
  return (
    <div className="intro">
      <img src={introCover} />
      <div className="intro-inner">
        <div className="intro-content">
          <p>
            <span className="lib-name">RNUI</span> is a UI Toolset & Components Library for React Native
          </p>
          <div className="git-stars">
            <span>
              <img />
              Star
            </span>
            <span>2.7k</span>
          </div>

          <div className="buttons">
            <Link to="/getting-started/setup">
              <button className="dark">View Docs</button>
            </Link>

            <a href="https://snack.expo.io/@ethanshar/rnuilib_snack" target="_blank" rel="noopener noreferrer">
              <button>Expo-Snack Demo</button>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
