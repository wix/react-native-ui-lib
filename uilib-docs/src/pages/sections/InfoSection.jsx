import React from 'react';
import './InfoSection.scss';
import qr from '../../images/newDesign/qr.png';
import expoSnackLink from '../../data/expoSnackLink';

export default () => {
  return (
    <div className="info-section">
      <div className="flex-row">
        <div className="column">
          <h6 className="title">Try our Expo App</h6>
          <img className="qr" src={qr} alt="QR code" />
        </div>
        <div className="column">
          <h6 className="title">Find Us</h6>
          <ul>
            <li>
              <a target="_blank" rel="noreferrer" href="https://twitter.com/rnuilib">
                Twitter
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="https://discord.gg/2eW4g6Z">
                Discord
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href={expoSnackLink}>
                Expo-Snack
              </a>
            </li>
            <li>
              <a target="_blank" rel="noreferrer" href="https://github.com/wix/react-native-ui-lib">
                Github
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="column">
        <h6 className="title">WIX</h6>
        <small>© 2006-2020 Wix.com, Inc</small>
      </div>
    </div>
  );
};
