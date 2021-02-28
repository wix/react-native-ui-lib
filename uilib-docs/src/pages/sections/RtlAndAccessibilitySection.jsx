import React from 'react';
import './RtlAndAccessibilitySection.scss';
import crossPlatform from '../../images/newDesign/crossPlatform.svg';
import accessibility from '../../images/newDesign/accessibility.png';
import rtl from '../../images/newDesign/rtl.png';

export default () => {
  return (
    <div className="rtl-accessibility-section">
      <h2>Full, out-of-the-box support to RTL and Accessibility</h2>
      <div className="cards">
        <Card image={crossPlatform} title="Cross Platform" description="We got you covered on both platforms" />
        <Card image={accessibility} title="Accessibility" description="Out-of-the-box Accessibility support" />
        <Card image={rtl} title="RTL" description="Everything should be aligned right" />
      </div>
    </div>
  );
};

const Card = ({image, title, description}) => {
  return (
    <div className="card">
      <img src={image} alt={title} />
      <h3 className="title">{title}</h3>
      <p>{description}</p>
    </div>
  );
};
