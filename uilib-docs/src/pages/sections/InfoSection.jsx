import React from 'react';
import './InfoSection.scss';
import qr from '../../images/newDesign/qr.png';

export default () => {
  return (
    <div class="info-section">
      <div className="flex-row">
        <div className="column">
          <h5>Try our Expo App</h5>
          <img className="qr" src={qr} />
        </div>
        <div className="column">
          <h5>Find Us</h5>
          <ul>
            <li>
              <a target="_blank" href="https://twitter.com/rnuilib">
                Twitter
              </a>
            </li>
            <li>
              <a target="_blank" href="https://discord.gg/2eW4g6Z">
                Discord
              </a>
            </li>
            <li>
              <a target="_blank" href="https://snack.expo.io/@ethanshar/rnuilib_snack">
                Expo-Snack
              </a>
            </li>
            <li>
              <a target="_blank" href="https://github.com/wix/react-native-ui-lib">
                Github
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="column">
        <h5>WIX</h5>© 2006-2020 Wix.com, Inc
      </div>
    </div>
  );
};
