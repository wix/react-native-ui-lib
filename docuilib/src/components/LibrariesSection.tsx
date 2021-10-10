import React from 'react';

import styles from './LibrariesSection.module.scss';
import rnn from '@site/static/img/rnn.png';
import detox from '@site/static/img/detox.png';
import calendars from '@site/static/img/calendars.png';
import remx from '@site/static/img/remx.png';

export default () => {
  return (
    <div className={styles.librariesSection}>
      <h2 className={styles.headline}>Check out more libraries made by us!</h2>

      <div className={styles.libraries}>
        <Library name="RNN" image={rnn} link="https://github.com/wix/react-native-navigation"/>
        <Library name="Detox" image={detox} link="https://github.com/wix/Detox"/>
        <Library name="Calendars" image={calendars} link="https://github.com/wix/react-native-calendars"/>
        <Library name="Remx" image={remx} link="https://github.com/wix/remx"/>
      </div>
    </div>
  );
};

const Library = ({image, name, link}) => {
  return (
    <a href={link} target="_blank" rel="noopener noreferrer">
      <div className={styles.library}>
        <img src={image} alt={name}/>
        <h5 className={styles.libraryName}>{name}</h5>
      </div>
    </a>
  );
};
