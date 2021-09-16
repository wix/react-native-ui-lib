import React, {useState} from 'react';
import Link from '@docusaurus/Link';
import classnames from 'classnames';

import {foundationSnippet, themeSnippet, modifiersSnippet} from './CodeSectionSnippets';
import styles from './CodeSection.module.scss';

const tabs = [
  {headline: `Define your app's foundation - colors, typography and spacings`, codeSnippet: foundationSnippet},
  {headline: `Set a theme for your components.`, codeSnippet: themeSnippet},
  {
    headline: `Build your app. With our auto-generated modifiers, it's a matter of minutes till you create your first beautiful screen.`,
    codeSnippet: modifiersSnippet
  }
];

export default () => {
  const [selectedTab, setSelectedTab] = useState(0);

  return (
    <div className={styles.codeSection}>
      <h2 className={styles.headline}>Effortless App Building Using Our Toolset</h2>
      <div className={styles.codeExample}>
        <TabBar onChangeIndex={setSelectedTab} selectedIndex={selectedTab}/>
        <Tab {...tabs[selectedTab]}/>
        <Link className={styles.docsButton} to="docs/getting-started/setup">
          <button className={'button dark'}>View Docs</button>
        </Link>
      </div>
    </div>
  );
};

const TabBar = ({onChangeIndex, selectedIndex}) => {
  return (
    <div className={styles.tabs}>
      {['Foundation', 'Theme', 'Modifiers'].map((title, index) => {
        const tabClassName = classnames(styles.tab, {[`${styles.tabSelected}`]: selectedIndex === index});
        return (
          <div
            key={title}
            className={tabClassName}
            onClick={() => onChangeIndex(index)}
            onKeyPress={() => onChangeIndex(index)}
            role="tab"
            tabIndex={index}
          >
            {title}
          </div>
        );
      })}
    </div>
  );
};

const Tab = ({headline, codeSnippet}) => {
  return (
    <div className={styles.tabPage}>
      <p className={styles.tabPageDescription}>{headline}</p>
      <pre>
        <code className={styles.tabPageCode}>{codeSnippet}</code>
      </pre>
    </div>
  );
};
