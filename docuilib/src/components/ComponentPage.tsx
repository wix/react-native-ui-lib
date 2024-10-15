import _ from 'lodash';
import React from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


export default function ComponentPage({component, text}) {

  const getTitleSize = (type) => {
    switch (type) {
      case 'hero':
        return 48;
      case 'item':
        return 16;
      default:
        return 32;
    }
  };
  
  const getTitleWeight = (type) => {
    switch (type) {
      case 'item':
        return '400';
      default:
        return '700';
    }
  };
  
  const getDescriptionColor = (type) => {
    switch (type) {
      case 'item':
        return '#6E7881';
      default:
        return '#495059';
    }
  };

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
  
  const getCodeExample = () => {
    return <a style={{fontSize: '16px', fontWeight: '700', textDecoration: 'underline'}}>[Code Example](${component.example})</a>;
  };
  
  const getTitle = (type, title) => {
    const size = getTitleSize(type);
    const weight = getTitleWeight(type);

    return <span style={{lineHeight: size, fontSize: size, fontWeight: weight, margin: '0 0 16px 0'}}>${title}</span>;
  };
  
  const getHeader = (title, description, type) => {   
    const desColor = getDescriptionColor(type);
 
    switch (type) {
      case 'usage':
        return (
          <div style={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', margin: '0 0 12px 0'}}>
            {getTitle(type, title)}
            {getCodeExample()}
          </div>
        );
      default:
        return (
          <div style={{alignContent: 'start', width: '100%'}}>
            {title && getTitle(type, title)}
            {description && <span style={{display: 'block', margin: '0 40px 40px 0', fontSize: '16px', fontWeight: '400', color: desColor}}>${description}</span>}
          </div>
        );
    }
  };
  
  const getListItem = (item, isLast, layout) => {
    const data = {
      ...item,
      type: 'item',
      layout
    };

    return (
      <div>
        {getBasicLayout(data)}
        {!isLast && <div style={{height: 40}}/>}
      </div>
    );
  };
  
  const getTag = (label, color) => {
    return (
      <div style={{display: 'flex', flexDirection: 'row', backgroundColor: color, margin: '4px 12px 4px 0', height: 20, borderRadius: '2px', alignItems: 'center'}}>
        <span style={{fontSize: 14, fontWeight: 'bold', margin: '6px'}}>${label}</span>
      </div>
    );
  };
  
  const getPropsList = () => {
    const props = component.props;

    if (props) {
      const descColor = getDescriptionColor('item');
  
      _.sortBy(props, p => p.name)?.forEach(prop => {
        const defaultValue = prop.default ? `. Default is ${prop.default}` : '';
        const descMargin = prop.note ? '0 0 12px 0' : '0 0 28px 0';
  
        return (
          <div style={{display: 'flex', flexDirection: 'row', height: 28, margin: '0 0 12px 0'}}>
            <a style={{fontSize: 16, fontWeight: '500', margin: '0 12px 0 0'}}>{prop.name}</a>
            {getTag(prop.type, getTypeColor(prop.type))}
            {prop.required && getTag('Required', getTypeColor())}
            {prop.platform && getTag(prop.platform, getTypeColor())}
            <span style={{display: 'block', margin: descMargin, fontSize: '16px', fontWeight: '400', color: descColor}}>${prop.description}${defaultValue}</span>
            <span style={{display: 'block', margin: '0 0 28px 0', fontSize: '16px', fontWeight: '700'}}>${prop.note}</span>
          </div>
        );
      });
    }
  };

  const getTableHeaders = (columns) => {
    const numberOfColumns = columns.length;
    const cellWidth = 100 / numberOfColumns;

    return columns.forEach(column => {
      <th style={{backgroundColor: '#F8F9FA', width: cellWidth}}>
        <span style={{fontSize: 16, fontWeight: 'bold', margin: '8px'}}>${column}</span>
      </th>;
    }); 
  };

  const getTableRowsContent = (content, numberOfColumns) => { // content += getContentItem(value); // TODO: content types: Image, Figma, Video etc.
    return (
      content.forEach((item, index) => { 
        const value = item.value;
        
        if (index < numberOfColumns - 1) {
          <td style={{backgroundColor: 'white', padding: '8px 12px 8px 12px'}}>
            <img src={value} style={{display: 'block'}}/> 
          </td>;
        }
      })
    );
  };

  const getTableRows = (rows, numberOfColumns) => {
    return (
      rows.forEach(row => {
        <tr>
          <td style={{backgroundColor: 'white', margin: '20px 12px 20px 12px', alignContent: 'start'}}>
            <span style={{fontSize: 16, fontWeight: '500'}}>${row.title}</span>
            <br/>
            <span style={{fontSize: 16, fontWeight: '400', color: '#6E7881'}}>${row.description}</span>
          </td>
          {getTableRowsContent(row.content, numberOfColumns)}
        </tr>;
      })
    );
  };
  
  const getTable = (section) => {
    const columns = section.columns;
    const rows = section.content;
    const numberOfColumns = columns.length;
  
    return (
      <div>
        <span style={{fontSize: 20, fontWeight: '700', display: 'block'}}>${section.name}</span>
        <table>
          <tr>
            {getTableHeaders(columns)} 
          </tr>
          {getTableRows(rows, numberOfColumns)}
        </table>
      </div>
    );
  };
  
  const getSnippet = () => {
    if (component.snippet) {
      let content = '';
      content += '``` jsx live\n';
      content += component.snippet?.map(item => _.replace(item, new RegExp(/\$[1-9]/, 'g'), '')).join('\n');
      content += '\n```\n';
      return content;
    }
  };

  const generateExtendsLink = (extendsLink) => {
    const extendedComponentName = _.last(_.split(extendsLink, '/')); // Incubator/TextField -> TextField
    const extendsText = `[${extendedComponentName}](/docs/components/${extendsLink})`;
    return extendsText;
  };
  
  const getInfo = () => {
    if (component.extends) {
      let extendsText = component.extends?.join(', ');
      
      if (component.extendsLink) {
        extendsText = `[${extendsText}](${component.extendsLink})`;
      } else {
        extendsText = _.map(component.extends, generateExtendsLink).join(', ');
      }
  
      let content = '';
      content += ':::info\n';
      content += `This component extends **${extendsText}** props.\n`;
      content += ':::\n';
      return content;
    }
  };
  
  const getTip = () => {
    if (component.modifiers) {
      let content = '';
      content += ':::tip\n';
      content += `This component support **${component.modifiers?.join(', ')}** modifiers.\n`;
      content += ':::\n';
      return content;
    }
  };
  
  // const getCaution = () => {
  //   if (component.caution) {
  //     let content = '';
  //     content += ':::caution\n';
  //     content += `${component.caution}\n`;
  //     content += ':::\n';
  //     return content;
  //   }
  // };
  
  // const getNote = () => {
  //   if (component.note) {
  //     let content = '';
  //     content += ':::note\n';
  //     content += `${component.note}\n`;
  //     content += ':::\n';
  //     return content;
  //   }
  // };
  
  const getFigmaEmbed = (item) => {
    const value = item.value;
    const height = item.height || 450;
  
    return <iframe width={'100%'} height={height} src={value}/>;
  };
  
  const getImage = (value) => {
    return <img src={value} style={{display: 'block'}}/>;
  };
  
  const getContentItem = (item) => {
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
  
  const getContent = (section) => { // TODO: content types: Image, Figma, Video etc.
    switch (section.type) {
      case 'usage':
        return getSnippet();
      case 'info':
        return getInfo();
      case 'tip':
        return getTip();
      // case 'note':
      //   return getNote();
      // case 'caution':
      //   return getCaution();
      case 'table':
        return getTable(section);
      case 'props':
        return getPropsList();
      case 'list':
        return section.content.forEach((item, index) => {
          const isLast = index === section.content.length - 1;
          
          return getListItem(item, isLast, section.layout);
        });
      default:
        return section.content.forEach((item, index) => {
          const isLast = index === section.content.length - 1;
          const margin = isLast ? '0' : '0 0 40px 0';
          
          return (
            <div style={{border: '1px solid #F8F9FA', margin}}>
              {getContentItem(item)}
            </div>
          );
        });
    }
  };

  const getBasicLayout = (section) => {
    const direction = section.type !== 'list' && section.layout === 'horizontal' ? 'row' : 'column';
    
    return (
      <div style={{display: 'flex', flexDirection: direction}}>
        {getHeader(section.title, section.description, section.type)}
        {getContent(section)}
      </div>
    );
  };

  const getDivider = (section) => {
    if (section.type === 'table' || section.type === 'list') {
      return <div style={{height: 1, width: '100%', backgroundColor: '#E8ECF0', margin: '60px 0 60px 0'}}/>;
    } else {
      return <div style={{height: 60}}/>;
    }
  };
  
  const buildDocsSections = (sections) => {
    if (sections) {
      sections.forEach(section => {
        return (
          <div>
            {getBasicLayout(section)}
            {getDivider(section)}
          </div>
        );
      });
    } else {
      return <p>Coming soon... 👩🏻‍💻</p>;
    }
  };

  const buildTabs = () => {
    const tabs = component.docs?.tabs;

    if (tabs) {
      return (
        <Tabs className="main-tabs">
          {tabs.forEach((tab, index) => {
            const sections = tab.sections;
            return (
              <TabItem value={index} label={tab.title} attributes={{className: 'single-tab'}}>
                {buildDocsSections(sections)}
              </TabItem>
            );
          })}
        </Tabs>
      );
    }
  };

  const buildHero = () => {
    const hero = component.docs?.header;
    
    if (hero) {
      // const isIncubatorComponent = component.category === 'incubator';
      // const name = isIncubatorComponent ? `Incubator.${component.name}` : component.name;
      const section = {
        // title: name,
        layout: 'horizontal',
        ...hero,
        type: 'hero'
      };
      
      return getBasicLayout(section);
    }
  };

  return (
    <div>
      <p>{text.value}</p>
      {/* {buildHero()} */}
      {/* {buildTabs()} */}
    </div>
  );
}
