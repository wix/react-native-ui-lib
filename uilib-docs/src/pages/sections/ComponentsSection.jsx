import React from 'react';
import './ComponentsSection.scss';
import showcase from '../../images/newDesign/showcase.jpg';

export default () => {
  return (
    <div className="components">
      <div className="components-inner">
        <h1>Build Stunning Apps Using Over 60  Beautiful Components </h1>
        <p>
          Basic components like Button, Avatar and Card and more sophisticated ones like Hints, ColorPicker and Drawer.
        </p>
        <button className="dark">View Docs</button>
      </div>
      <img src={showcase} />
    </div>
  );
};
