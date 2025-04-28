import _ from 'lodash';
import React from 'react';
import '../ComponentPage.module.scss';
import {SectionHeader} from './SectionHeader';
import {Section} from './Section';

export const ListSection = ({section, component}) => {
  const getListItem = (item, isLast, layout) => {
    const section = {
      ...item,
      type: 'item',
      layout
    };

    return (
      <div className="column" style={{marginBottom: isLast ? 0 : 20}}>
        <Section section={section} component={component}/>
      </div>
    );
  };

  const getList = () => {
    const items = section.items;

    return _.map(items, (item, index: number) => {
      const isLast = index === items.length - 1;
      return getListItem(item, isLast, section.layout);
    });
  };

  // return <div>{getList()}</div>;
  return (
    <div className="column">
      <SectionHeader section={section} component={component} isListHeader/>
      {getList()}
    </div>
  );
};
