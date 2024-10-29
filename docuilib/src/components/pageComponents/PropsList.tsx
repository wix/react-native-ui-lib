import _ from 'lodash';
import React from 'react';
import '../ComponentPage.module.scss';


export const PropsList = ({props}) => {
  const getTypeColor = (type?: string) => {
    switch (type) {
      case 'string':
        return '#FFEEB9';
      case 'number':
        return '#B3EBDD';
      case 'boolean':
        return '#C4DFFF';
      default:
        return '#E8ECF0';
    }
  };
  
  const getTag = (label, color) => {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          margin: '4px 12px 4px 0',
          borderRadius: '2px',
          height: 20,
          backgroundColor: color
        }}
      >
        <span style={{fontSize: '14px', fontWeight: '700', margin: '6px'}}>{label}</span>
      </div>
    );
  };

  const getDescriptionColor = type => {
    switch (type) {
      case 'item':
        return '#6E7881';
      default:
        return '#495059';
    }
  };

  const getPropsList = () => {
    const descColor = getDescriptionColor('item');
    const sorted = _.sortBy(props, p => p.name);
  
    return _.map(sorted, prop => {
      const defaultValue = prop.default ? `. Default is ${prop.default}` : '';
  
      return (
        <div className="column">
          <div className="row" style={{marginBottom: 12}}>
            <div style={{fontSize: '16px', fontWeight: '700', marginRight: 12, marginLeft: 16}}>{prop.name}</div>
            {getTag(prop.type, getTypeColor(prop.type))}
            {prop.required && getTag('Required', getTypeColor())}
            {prop.platform && getTag(prop.platform, getTypeColor())}
          </div>
          <span style={{display: 'block', marginBottom: prop.note ? 12 : 28, fontSize: '16px', fontWeight: '400', color: descColor}}>
            {prop.description}
            {defaultValue}
          </span>
          {prop.note && <span style={{display: 'block', marginBottom: 28, fontSize: '16px', fontWeight: '700'}}>{prop.note}</span>}
        </div>
      );
    });
  };

  return <div>{getPropsList()}</div>;
};
