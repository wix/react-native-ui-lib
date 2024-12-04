import React from 'react';
import '../ComponentPage.module.scss';
import {LiveProvider, LivePreview} from 'react-live';
import ReactLiveScope from '../../theme/ReactLiveScope';

type ComponentItemProps = {
  componentName: string;
  props: Record<string, unknown> | Record<string, unknown>[];
};

function GenerateComponentCodeSnippet(componentName, componentProps) {
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
  const {componentName, props: componentProps} = props;
  const isComponentExists = !!ReactLiveScope[componentName];

  let code = '';
  if (!isComponentExists) {
    code = '<Text>Component Not Found</Text>';
  } else if (Array.isArray(componentProps)) {
    code = componentProps
      .map(componentPropsItem => GenerateComponentCodeSnippet(componentName, componentPropsItem))
      .join(' ');
  } else {
    code = GenerateComponentCodeSnippet(componentName, componentProps);
  }

  return (
    <LiveProvider code={`<View center gap-s1>${code} </View>`} scope={ReactLiveScope}>
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
