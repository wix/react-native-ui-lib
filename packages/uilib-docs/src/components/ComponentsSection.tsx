import React from 'react';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';

import styles from './ComponentsSection.module.scss';
import showcase from '@site/static/img/showcase.jpg';

export default () => {
  const {siteConfig} = useDocusaurusContext();
  const {docsMainEntry} = siteConfig.customFields;
  return (
    <div className={styles.components}>
      <div className={styles.componentsInner}>
        <h2 className="headline">Build Stunning Apps Using Over 60 Beautiful Components</h2>
        <p>
          Basic components like Button, Avatar and Card and more sophisticated ones like Hints, ColorPicker and Drawer.
        </p>
        <Link to={`docs/${docsMainEntry}`}>
          <button className={'button dark'}>View Documentation</button>
        </Link>
      </div>
      <img src={showcase} alt="showcase"/>
    </div>
  );
};
