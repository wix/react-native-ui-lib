import _ from 'lodash';
import React from 'react';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import '../ComponentPage.module.scss';

export const Banner = ({section, component}) => {
  const {siteConfig} = useDocusaurusContext();

  const getColor = type => {
    switch (type) {
      case 'tip':
        return '#E3F7F2';
      case 'info':
        return '#E9F3FF';
      default:
        return '#E8ECF0';
    }
  };

  const getIcon = type => {
    switch (type) {
      case 'tip':
        return 'https://github.com/wix/react-native-ui-lib/blob/2155a91386f884db816c4d45d97e47bed6024d98/docuilib/src/assets/icons/insights.png?raw=true';
      default:
        return 'https://github.com/wix/react-native-ui-lib/blob/2155a91386f884db816c4d45d97e47bed6024d98/docuilib/src/assets/icons/infoOutline.png?raw=true';
    }
  };

  const getTitle = type => {
    switch (type) {
      case 'tip':
        return 'TIP';
      case 'info':
        return 'INFO';
      default:
        return 'NOTE';
    }
  };

  const getExtendsLinks = () => {
    const components = component.extends;
    const links = component.extendsLink;

    return _.map(components, (component, index: number) => {
      const isLast = index === components.length - 1;
      const comma = isLast ? '' : ', ';
      return (
        <a
          href={links?.[index] ?? `${siteConfig?.baseUrl}docs/components/${component}`}
          rel="noreferrer"
          style={{fontSize: '16px', fontWeight: '700', lineHeight: '18px', borderBottom: '1px solid'}}
        >
          {component}
          {comma}
        </a>
      );
    });
  };

  const getExtends = () => {
    if (component.extends) {
      const links = getExtendsLinks();
      const text = <span style={{fontWeight: 'bold'}}>{links}</span>;
      return <div>This component extends the {text} props.</div>;
    }
  };

  const getModifiers = () => {
    if (component.modifiers) {
      const text = <span style={{fontWeight: 'bold'}}>{component.modifiers?.join(', ')}</span>;
      return <div>This component support {text} modifiers.</div>;
    }
  };

  const getDescription = type => {
    switch (type) {
      case 'tip':
        return getExtends();
      case 'info':
        return getModifiers();
      default:
        return;
    }
  };

  const {title, description, color, icon, type} = section;
  const _color = color || getColor(type);
  const _icon = icon || getIcon(type);
  const _title = title || getTitle(type);
  const _description = description || getDescription(type);

  if (!_description) {
    return null;
  }
  
  return (
    <div
      className="row"
      style={{backgroundColor: _color, marginBottom: 20, padding: '16px 20px 16px 22px', alignItems: 'center'}}
    >
      <img src={_icon} width={20} height={20} style={{marginRight: 14}}/>
      <div className="column">
        <div style={{fontSize: '16px', fontWeight: '700'}}>{_title}</div>
        {_description}
      </div>
    </div>
  );
};
