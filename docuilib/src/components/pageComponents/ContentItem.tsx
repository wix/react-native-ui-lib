import React, {ComponentProps, useCallback, useMemo, useState} from 'react';
import '../ComponentPage.module.scss';
import {LiveProvider, LivePreview} from 'react-live';
import styles from './ContentItem.module.scss';
import ReactLiveScope from '../../theme/ReactLiveScope';
import CodeBlock from '../CodeBlock';
import {isComponentSupported} from '../../utils/componentUtils';
const showCodeIcon = require('../../assets/icons/code.png');

type ComponentItemProps = {
  componentName: string;
  props?: Record<string, unknown> | Record<string, unknown>[];
  snippet?: string;
  flexed?: boolean;
  showCodeButton?: boolean;
};

function generateComponentCodeSnippet(componentName: string, componentProps: Record<string, unknown>) {
  const propString = Object.keys(componentProps).reduce((acc, key) => {
    let propValue = componentProps[key];
    switch (typeof propValue) {
      case 'object':
        propValue = JSON.stringify(propValue);
        break;
      case 'string':
        propValue = `"${propValue}"`;
        break;
      default:
    }
    return `${acc}${key}={${propValue}} `;
  }, '');

  return `<${componentName} ${propString} />`;
}

const ComponentItem = (props: ComponentItemProps) => {
  const {componentName, props: componentProps, snippet, flexed, showCodeButton = false} = props;
  const [showCode, setShowCode] = useState(false);

  const code = useMemo(() => {
    if (typeof snippet === 'string') {
      return snippet;
    } else if (Array.isArray(componentProps)) {
      const snippet = componentProps
        .map(componentPropsItem => generateComponentCodeSnippet(componentName, componentPropsItem))
        .join('');
      return `<View center gap-s1>${snippet}</View>`;
    } else {
      return generateComponentCodeSnippet(componentName, componentProps);
    }
  }, [componentName, componentProps, snippet]);

  const toggleCode = useCallback(() => {
    setShowCode(prev => !prev);
  }, []);

  const componentPreview = (
    <div className={`${styles.blocker} ${flexed ? styles.flexed : ''}`}>
      <LiveProvider code={code} scope={ReactLiveScope}>
        <LivePreview style={{width: '100%'}}/>
      </LiveProvider>
    </div>
  );

  const codePreview = <CodeBlock snippet={code} title="Code Example"/>;

  const content = showCode ? codePreview : componentPreview;

  return (
    <div className={`${styles.componentItemContainer} ${!showCode ? styles.componentSpotlightStyle : ''}`}>
      {content}
      {showCodeButton && (
        <button onClick={toggleCode} className={styles.showCodeButton}>
          <img src={showCodeIcon} width={20}/>
          {/* {showCode ? 'Hide' : 'Show'} code */}
        </button>
      )}
    </div>
  );
};

type Item = {
  component?: string;
  props?: any;
  value?: any;
  snippet?: string;
  height?: number;
  flexed?: boolean;
};
type ContentItemProps = {
  item: Item;
  componentName: string;
  showCodeButton?: boolean;
  category: string;
};

export const ContentItem = ({item, componentName, showCodeButton, category}: ContentItemProps) => {
  const getFigmaEmbed = (value: string, height = 450) => {
    const modifiedValue = !value.includes('page-selector=') ? value + '&page-selector=false' : value;
    return <iframe width={'100%'} height={height} src={modifiedValue}/>;
  };

  const getImage = (value: string, style?: ComponentProps<'img'>['style']) => {
    return (
      <div className={styles.image}>
        <img src={value} style={{display: 'block', ...style}}/>
      </div>
    );
  };

  const value = item.value;

  if (item.props || item.snippet) {
    let name = item.component ?? componentName;
    if (category === 'incubator') {
      name = `Incubator.${name}`;
    }

    if (isComponentSupported(name)) {
      return (
        <ComponentItem
          componentName={name}
          props={item.props}
          snippet={item.snippet}
          showCodeButton={showCodeButton}
          flexed={item.flexed}
        />
      );
    } else if (!value) {
      return <div style={{color: 'red'}}>Component Not Supported</div>;
    }
  }

  if (value) {
    if (typeof value === 'string') {
      if (value.includes('embed.figma.com')) {
        return getFigmaEmbed(value, item.height);
      } else {
        return getImage(value);
      }
    } else if (typeof value === 'object' && value.source) {
      return getImage(value.source, value.style);
    }
  }
};
