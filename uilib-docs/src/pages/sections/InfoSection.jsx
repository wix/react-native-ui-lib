import React from 'react';
import './InfoSection.scss';
import qr from '../../images/newDesign/qr.png';

export default () => {
  return (
    <div class="info-section">
      <div className="flex-row">
        <div className="column">
          <h5>Libraries</h5>
          <ul>
            <li>RNN</li>
            <li>Detox</li>
            <li>Calendars</li>
            <li>remX</li>
          </ul>
        </div>

        <div className="column">
          <h5>Try our Expo App</h5>
          <img className="qr" src={qr} />
        </div>
      </div>
      <div className="column">
        <h5>WIX</h5>
        Wix.com is a leading cloud-based development platform with millions of users worldwide. We make it easy for
        everyone to create a beautiful, professional web presence. Promote your business, showcase your art, set up an
        online shop or just test out new ideas. The Wix website builder has everything you need to create a fully
        personalized, high-quality free website. © 2006-2020 Wix.com, Inc
      </div>
    </div>
  );
};
