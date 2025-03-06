import React, {useCallback, useMemo, useState} from 'react';
import '../ComponentPage.module.scss';
import {LiveProvider, LivePreview} from 'react-live';
import styles from './ContentItem.module.scss';
import ReactLiveScope from '../../theme/ReactLiveScope';
import CodeBlock from '../CodeBlock';
import CodeIcon from '../../assets/icons/code';

type ComponentItemProps = {
  componentName: string;
  props: Record<string, unknown> | Record<string, unknown>[];
  showCodeButton?: boolean;
};

function generateComponentCodeSnippet(componentName, componentProps) {
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
  const {componentName, props: componentProps, showCodeButton = false} = props;
  const [show, setShow] = useState(true);

  const code = useMemo(() => {
    if (Array.isArray(componentProps)) {
      const snippet = componentProps
        .map(componentPropsItem => generateComponentCodeSnippet(componentName, componentPropsItem))
        .join('');
      return `<View center gap-s1>${snippet}</View>`;
    } else {
      return generateComponentCodeSnippet(componentName, componentProps);
    }
  }, [componentName, componentProps]);

  const toggleCode = useCallback(() => {
    setShow(prev => !prev);
  }, []);

  return (
    <div style={{position: 'relative'}}>
      {!show && (
        <LiveProvider code={code} scope={ReactLiveScope}>
          <LivePreview/>
        </LiveProvider>
      )}
      {show && <CodeBlock snippet={code} title="Code Example"/>}
      {showCodeButton && (
        <button onClick={toggleCode} className={styles.showCodeButton}>
          <CodeIcon/>
          {show ? 'Hide' : 'Show'} code
        </button>
      )}
    </div>
  );
};

type Item = {
  component?: string;
  props?: any;
  value?: any;
};
type ContentItemProps = {
  item: Item;
  componentName: string;
  showCodeButton?: boolean;
};
export const ContentItem = ({item, componentName, showCodeButton}: ContentItemProps) => {
  const getFigmaEmbed = item => {
    const value = item.value;
    const height = item.height || 450;

    return <iframe width={'100%'} height={height} src={value}/>;
  };

  const getImage = (value, style = undefined) => {
    return <img src={value} style={{display: 'block', ...style}}/>;
  };

  const value = item.value;

  if (item.props) {
    const name = item.component ?? componentName;
    const isComponentExists = !!ReactLiveScope[name];

    if (isComponentExists) {
      return <ComponentItem componentName={name} props={item.props} showCodeButton={showCodeButton}/>;
    } else if (!value) {
      return <div style={{color: 'red'}}>Component Not Supported</div>;
    }
  }

  if (value) {
    if (typeof value === 'string') {
      if (value.includes('embed.figma.com')) {
        return getFigmaEmbed(item);
      } else {
        return getImage(value);
      }
    } else if (typeof value === 'object' && value.source) {
      return getImage(value.source, value.style);
    }
  }
};
