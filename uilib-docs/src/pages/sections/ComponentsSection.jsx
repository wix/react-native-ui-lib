import React from 'react';
import Link from 'gatsby-link';
import './ComponentsSection.scss';
import showcase from '../../images/newDesign/showcase.jpg';

export default () => {
  return (
    <div className="components">
      <div className="components-inner">
        <h2 className="headline">Build Stunning Apps Using Over 60  Beautiful Components </h2>
        <p>
          Basic components like Button, Avatar and Card and more sophisticated ones like Hints, ColorPicker and Drawer.
        </p>
        <Link to="/getting-started/setup">
          <button className="dark">View Docs</button>
        </Link>
      </div>
      <img src={showcase} alt="showcase" />
    </div>
  );
};
