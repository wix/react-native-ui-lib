import React from 'react';
import './LibrariesSection.scss';

import rnn from '../../images/newDesign/rnn.png';
import detox from '../../images/newDesign/detox.png';
import calendars from '../../images/newDesign/calendars.png';
import remx from '../../images/newDesign/remx.png';

export default () => {
  return (
    <div className="libraries-section">
      <h1 className="headline">Check out more libraries made by us!</h1>

      <div className="libraries">
        <Library name="RNN" image={rnn} link="https://github.com/wix/react-native-navigation" />
        <Library name="Detox" image={detox} link="https://github.com/wix/Detox" />
        <Library name="Calendars" image={calendars} link="https://github.com/wix/react-native-calendars" />
        <Library name="Remx" image={remx} link="https://github.com/wix/remx" />
      </div>
    </div>
  );
};

const Library = ({image, name, link}) => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <div className="library">
        <img src={image} />
        <h3 className="name">{name}</h3>
      </div>
    </a>
  );
};
