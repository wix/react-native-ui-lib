import React, {useState} from 'react';
import '../ComponentPage.module.scss';
import {LiveProvider, LivePreview} from 'react-live';
import ReactLiveScope from '../../theme/ReactLiveScope';

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

function getCode(props) {
  const {componentName, props: componentProps} = props;

  let code = '';
  if (Array.isArray(componentProps)) {
    code = componentProps
      .map(componentPropsItem => generateComponentCodeSnippet(componentName, componentPropsItem))
      .join(' ');
  } else {
    code = generateComponentCodeSnippet(componentName, componentProps);
  }
  return code;
}

const ComponentItem = (props: ComponentItemProps) => {
  return (
    <LiveProvider code={`<div center gap-s1>${getCode(props)}</div>`} scope={ReactLiveScope}>
      <LivePreview/>
    </LiveProvider>
  );
};

const copy = () => {
  let copyText = document.getElementById('component_code').innerHTML;
  copyText = copyText.replace('&lt;', '<');
  copyText = copyText.replace(' /&gt;', '/>');
  navigator.clipboard.writeText(copyText);
};

const copyIcon = 'https://github.com/wix/react-native-ui-lib/blob/master/docuilib/src/assets/icons/copy.png?raw=true';

const Tooltip = (props: ComponentItemProps) => {
  const code = getCode(props);
  return (
    <div style={{position: 'relative', display: 'inline-block', cursor: 'pointer'}} onClick={copy}>
      <span 
        style={{
          display: 'flex',
          flexDirection: 'row',
          width: '250px',
          backgroundColor: '#555',
          color: '#fff',
          textAlign: 'start',
          padding: '12px',
          borderRadius: '6px',
          position: 'absolute',
          zIndex: 1,
          bottom: '125%',
          left: '50%',
          marginLeft: '-60px'
        }}
      >
        <div id={'component_code'}>{code}</div>
        <img src={copyIcon} style={{width: 24, height: 24, alignSelf: 'flex-start', filter: 'invert(70%)'}}/>
      </span>
      <div 
        style={{
          position: 'absolute', 
          top: '100%',
          left: '50%',
          marginLeft: '-5px',
          borderWidth: '5px',
          borderStyle: 'solid',
          borderColor: '#555 transparent transparent transparent'
        }}
      />
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
  const [show, setShow] = useState(false);

  const onHover = () => {
    setShow(true);
  };

  const onLeave = () => {
    setShow(false);
  };

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
      return (
        <div onMouseOver={onHover} onMouseLeave={onLeave} style={{position: 'relative'}}>
          {show && <Tooltip componentName={name} props={item.props}/>}
          <ComponentItem componentName={name} props={item.props}/>
        </div>
      );
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
