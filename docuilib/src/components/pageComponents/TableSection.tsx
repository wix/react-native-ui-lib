import _ from 'lodash';
import React from 'react';
import '../ComponentPage.module.scss';
import {ContentItem} from './ContentItem';

export const TableSection = ({section, component}) => {
  const getTableHeaders = columns => {
    const numberOfColumns = columns.length;
    const cellWidth = 100 / numberOfColumns;

    return _.map(columns, column => {
      return (
        <th style={{backgroundColor: '#F8F9FA', width: `${cellWidth}%`}}>
          <span style={{fontSize: '16px', fontWeight: '700', margin: '8px'}}>{column}</span>
        </th>
      );
    });
  };

  const getTableRowsContent = (content, numberOfColumns) => {
    return _.map(content, (item, index: number) => {
      if (index < numberOfColumns - 1) {
        return (
          <td style={{backgroundColor: item?.background || 'white', padding: 0, height: '100px'}}>
            {item && (
              <ContentItem item={item} componentName={component.name} showCodeButton category={component.category}/>
            )}
          </td>
        );
      }
    });
  };

  const getTableRows = (rows, numberOfColumns) => {
    return _.map(rows, row => {
      return (
        <tr>
          <td style={{backgroundColor: 'white', margin: '20px 12px 20px 12px', alignContent: 'start'}}>
            <span style={{fontSize: '16px', fontWeight: '500'}}>{row.title}</span>
            <br/>
            <span style={{fontSize: '16px', fontWeight: '400', color: '#6E7881'}}>{row.description}</span>
          </td>
          {getTableRowsContent(row.content, numberOfColumns)}
        </tr>
      );
    });
  };

  const columns = section.columns;
  const rows = section.items;
  const numberOfColumns = columns.length;

  return (
    <div>
      {section.name && <div style={{fontSize: '20px', fontWeight: '700', marginBottom: 16}}>{section.name}</div>}
      <table style={{display: 'table', width: '100%'}}>
        <tr>{getTableHeaders(columns)}</tr>
        {getTableRows(rows, numberOfColumns)}
      </table>
    </div>
  );
};
