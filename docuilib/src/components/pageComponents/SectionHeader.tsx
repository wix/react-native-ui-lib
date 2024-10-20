import React from 'react';
import '../ComponentPage.module.scss';

export const SectionHeader = ({section, component}) => {
  const {title, description, type} = section;

  const getTitleSize = type => {
    switch (type) {
      case 'hero':
        return '48px';
      case 'item':
        return '16px';
      default:
        return '32px';
    }
  };

  const getTitleWeight = type => {
    switch (type) {
      case 'item':
        return '400';
      default:
        return '700';
    }
  };

  const getDescriptionColor = type => {
    switch (type) {
      case 'item':
        return '#6E7881';
      default:
        return '#495059';
    }
  };

  const getCodeExampleLink = () => {
    return (
      <a
        href={component.example}
        target="_blank"
        rel="noreferrer"
        style={{fontSize: '16px', fontWeight: '700', lineHeight: '18px', borderBottom: '1px solid'}}
      >
        Code Example
      </a>
    );
  };

  const getTitle = (type, title) => {
    const size = getTitleSize(type);
    const weight = getTitleWeight(type);
    return <span style={{fontSize: size, fontWeight: weight}}>{title}</span>;
  };

  const desColor = getDescriptionColor(type);

  if (!title && !description) {
    return;
  }

  switch (type) {
    case 'usage':
      return (
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginBottom: 12
          }}
        >
          {getTitle(type, title)}
          {getCodeExampleLink()}
        </div>
      );
    default:
      return (
        <div
          style={{display: 'flex', flexDirection: 'column', flex: 2, alignContent: 'start', margin: '0 40px 40px 0'}}
        >
          {title && getTitle(type, title)}
          {description && <span style={{fontSize: '16px', fontWeight: '400', color: desColor}}>{description}</span>}
        </div>
      );
  }
};
