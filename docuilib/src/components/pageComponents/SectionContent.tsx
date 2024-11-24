import _ from 'lodash';
import React from 'react';
import '../ComponentPage.module.scss';
import {ContentItem} from './ContentItem';
import {Usage} from './Usage';
import {PropsList} from './PropsList';
import {TableSection} from './TableSection';

export const SectionContent = ({section, component}) => {
  const getSectionContent = content => {
    return (
      <div className="column" style={{flex: 3}}>
        {_.map(content, (item, index: number) => {
          const isLast = index === content.length - 1;

          return <div style={{marginBottom: isLast ? 0 : 40, border: '1px solid #F8F9FA'}}><ContentItem item={item} componentName={component.name}/></div>;
        })}
      </div>
    );
  };

  switch (section.type) {
    case 'usage':
      // return getUsage();
      return <Usage component={component}/>;
    case 'props':
      // return getPropsList();
      if (component.props) {
        return <PropsList props={component.props}/>;
      }
      return;
    case 'table':
      // return getTable(section);
      return <TableSection section={section} component={component}/>;
    // case 'list':
    //   return getList(section);
    case 'hero':
    case 'item':
    case 'section':
      return getSectionContent(section.content);
    default:
      return;
  }
};
