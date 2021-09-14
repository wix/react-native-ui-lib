import React from 'react';
import crossPlatform from '@site/static/img/crossPlatform.png';
import accessibility from '@site/static/img/accessibility.png';
import rtl from '@site/static/img/RTL.png';

import styles from './FeatureSection.module.scss';

export default () => {
  return (
    <div className={styles.featuresSection}>
      <h2>Full, out-of-the-box support to RTL and Accessibility</h2>
      <div className={styles.cards}>
        <Card image={crossPlatform} title="Cross Platform" description="We got you covered on both platforms"/>
        <Card image={accessibility} title="Accessibility" description="Out-of-the-box Accessibility support"/>
        <Card image={rtl} title="RTL" description="Everything should be aligned right"/>
      </div>
    </div>
  );
};

const Card = ({image, title, description}) => {
  return (
    <div className={styles.card}>
      <img src={image} alt={title}/>
      <h3 className={styles.cardTitle}>{title}</h3>
      <p>{description}</p>
    </div>
  );
};
