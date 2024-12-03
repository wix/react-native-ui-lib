import React from 'react';
import '../ComponentPage.module.scss';
import {LiveProvider, LivePreview} from 'react-live';
import ReactLiveScope from '../../theme/ReactLiveScope';

type ComponentItemProps = {
  componentName: string;
  props: Record<string, unknown>;
}
const ComponentItem = (props: ComponentItemProps) => {
  const {componentName, props: componentProps} = props;
  const isComponentExists = !!ReactLiveScope[componentName];
  const propString = Object.keys(componentProps).reduce((acc, key) => {
    const propValue = componentProps[key];
    if (typeof propValue === 'object') {
      return `${acc}${key}={${JSON.stringify(propValue)}} `;
    }
    const value = typeof propValue === 'string' ? `"${propValue}"` : propValue;
    return `${acc}${key}={${value}} `;
  }, '');

  const code = isComponentExists ? `<${componentName} ${propString} />` : '<Text>Component Not Found</Text>';

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
}
type ContentItemProps = {
  item: Item;
  componentName: string;
}
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
  } else if (item.props) {
    return <ComponentItem componentName={item.component ?? componentName} props={item.props}/>;
  }
};
