import React, {useState} from 'react';
import Link from 'gatsby-link';
import classnames from 'classnames';

import {foundationSnippet, themeSnippet, modifiersSnippet} from '../../data/CodeSectionSnippets';
import './CodeSection.scss';

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
    <div className="code-section">
      <h2 className="headline">Effortless App Building Using Our Toolset</h2>
      <div className="code-example">
        <TabBar onChangeIndex={setSelectedTab} selectedIndex={selectedTab} />
        <Tab {...tabs[selectedTab]} />
        <Link className="view-docs-button" to="/getting-started/setup">
          <button className="dark">View Docs</button>
        </Link>
      </div>
    </div>
  );
};

const TabBar = ({onChangeIndex, selectedIndex}) => {
  return (
    <div className="tabs">
      {['Foundation', 'Theme', 'Modifiers'].map((title, index) => {
        const tabClassName = classnames('tab', {selected: selectedIndex === index});
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
    <div className="tab-page">
      <p>{headline}</p>
      <pre>
        <code className="language-javascript">{codeSnippet}</code>
      </pre>
    </div>
  );
};
