import React from 'react';
import '../ComponentPage.module.scss';
import {SectionHeader} from './SectionHeader';
import {SectionContent} from './SectionContent';

export const Section = ({section, component}) => {
  const direction = section.type !== 'list' && section.layout === 'horizontal' ? 'row' : 'column';

  return (
    <div style={{display: 'flex', flexDirection: direction}}>
      <SectionHeader section={section} component={component}/>
      <SectionContent section={section} component={component}/>
    </div>
  );
};
