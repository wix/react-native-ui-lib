import React from 'react';
import '../ComponentPage.module.scss';
import {LiveProvider, LivePreview} from 'react-live';
import ReactLiveScope from '../../theme/ReactLiveScope';

type ComponentItemProps = {
  componentName: string;
  props: Record<string, unknown>;
  isSupported: boolean;
};

const ComponentItem = (props: ComponentItemProps) => {
  const {componentName, isSupported, props: componentProps} = props;
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

  const code = isSupported ? `<${componentName} ${propString}/>` : '<Text red30>Component Not Found</Text>';

  return (
    <LiveProvider code={code} scope={ReactLiveScope}>
      <LivePreview/>
    </LiveProvider>
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
};
export const ContentItem = ({item, componentName}: ContentItemProps) => {
  const getFigmaEmbed = item => {
    const value = item.value;
    const height = item.height || 450;

    return <iframe width={'100%'} height={height} src={value}/>;
  };

  const getImage = (value, style = undefined) => {
    return <img src={value} style={{display: 'block', ...style}}/>;
  };

  const value = item.value;
  const name = item.component ?? componentName;
  const isComponentSupported = !!ReactLiveScope[name];

  if (item.props) {
    if (isComponentSupported || !value) {
      return <ComponentItem componentName={name} props={item.props} isSupported={isComponentSupported}/>;
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
