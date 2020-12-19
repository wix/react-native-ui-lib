import React from 'react';
import './LibrariesSection.scss';

import rnn from '../../images/newDesign/rnn.png';
import detox from '../../images/newDesign/detox.png';
import calendars from '../../images/newDesign/calendars.png';
import remx from '../../images/newDesign/remx.png';

export default () => {
  return (
    <div className="libraries-section">
      <div className="inner">
        <h1 className="headline">Check out more libraries made by us!</h1>

        <div className="libraries">
          <Library name="RNN" image={rnn} />
          <Library name="Detox" image={detox} />
          <Library name="Calendars" image={calendars} />
          <Library name="Remx" image={remx} />
        </div>
      </div>
    </div>
  );
};

const Library = ({image, name}) => {
  return (
    <div className="library">
      <img src={image} />
      <h3 className="name">{name}</h3>
    </div>
  );
};
