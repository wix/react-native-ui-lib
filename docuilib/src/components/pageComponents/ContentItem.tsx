import React, { useCallback } from 'react';
import '../ComponentPage.module.scss';
import {LiveProvider, LivePreview} from 'react-live';
import ReactLiveScope from '../../theme/ReactLiveScope';
import CodeBlock from '../CodeBlock';
import CodeIcon from '../../assets/icons/code';

type ComponentItemProps = {
  componentName: string;
  props: Record<string, unknown> | Record<string, unknown>[];
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
  const {componentName, props: componentProps} = props;
  const [show, setShow] = React.useState(false);

  let code = '';
  if (Array.isArray(componentProps)) {
    code = componentProps
      .map(componentPropsItem => generateComponentCodeSnippet(componentName, componentPropsItem))
      .join('');
    code = `<View center gap-s1>${code}</View>`;
  } else {
    code = generateComponentCodeSnippet(componentName, componentProps);
  }

  const toggleCode = useCallback(() => {
    setShow(prev => !prev);
  }, []);

  return (
    <div>
      <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: 20}}>
        <LiveProvider code={code} scope={ReactLiveScope}>
          <LivePreview/>
        </LiveProvider>
        <button
          onClick={toggleCode}
          style={{
            border: 0,
            background: 'none',
            color: 'rgb(56, 153, 236)',
            cursor: 'pointer',
            justifyContent: 'center',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          <CodeIcon/>
          {show ? 'Hide' : 'Show'} code
        </button>
      </div>
      {show && <CodeBlock snippet={code} title="Code Example"/>}
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

  if (item.props) {
    const name = item.component ?? componentName;
    const isComponentExists = !!ReactLiveScope[name];

    if (isComponentExists) {
      return <ComponentItem componentName={name} props={item.props}/>;
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
