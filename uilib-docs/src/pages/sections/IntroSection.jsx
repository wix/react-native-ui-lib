import React from 'react';
import './IntroSection.scss'
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
            <span>2.5k</span>
          </div>

          <div className="buttons">
            <button className="dark">View Docs</button>
            <button>Expo-Snack Demo</button>
          </div>
        </div>
      </div>
    </div>
  );
};