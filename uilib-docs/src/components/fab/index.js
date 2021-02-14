import React from 'react';

import menuIcon from '../../images/newDesign/menu.svg';
import './index.scss';

export default ({onClick}) => {
  return (
    <button className="fab" onClick={onClick}>
      <img src={menuIcon} />
    </button>
  );
};
