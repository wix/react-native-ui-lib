import React from 'react';
import '../ComponentPage.module.scss';

export const ContentItem = ({item}) => {
  const getFigmaEmbed = item => {
    const value = item.value;
    const height = item.height || 450;

    return <iframe width={'100%'} height={height} src={value}/>;
  };

  const getImage = value => {
    return <img src={value} style={{display: 'block'}}/>;
  };

  const value = item.value;

  if (value) {
    if (typeof value === 'string') {
      if (value.includes('www.figma.com')) {
        return getFigmaEmbed(item);
      } else {
        return getImage(value);
      }
    }
  }
};
