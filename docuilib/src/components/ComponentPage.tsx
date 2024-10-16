import _ from 'lodash';
import React from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';
import './ComponentPage.module.scss';

export default function ComponentPage({component}) {
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
    return <a href={component.example} target="_blank" rel="noreferrer" style={{fontSize: '16px', fontWeight: '700', lineHeight: '18px', borderBottom: '1px solid'}}>Code Example</a>;
  };

  const getTitle = (type, title) => {
    const size = getTitleSize(type);
    const weight = getTitleWeight(type);
    return <span style={{fontSize: size, fontWeight: weight}}>{title}</span>;
  };

  const getHeader = (title, description, type) => {
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
            {getCodeExample()}
          </div>
        );
      default:
        return (
          <div style={{display: 'flex', flexDirection: 'column', flex: 1, alignContent: 'start', margin: '0 40px 40px 0'}}>
            {title && getTitle(type, title)}
            {description && <span style={{fontSize: '16px', fontWeight: '400', color: desColor}}>{description}</span>}
          </div>
        );
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

  const getPropsList = () => {
    const props = component.props;

    if (props) {
      const descColor = getDescriptionColor('item');
      const sorted = _.sortBy(props, p => p.name);

      return _.map(sorted, prop => {
        const defaultValue = prop.default ? `. Default is ${prop.default}` : '';

        return (
          <div className="column">
            <div className="row" style={{marginBottom: 12}}>
              <div style={{fontSize: '16px', fontWeight: '700', marginRight: 12}}>{prop.name}</div>
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
    }
  };

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
    // content += getContentItem(value); // TODO: content types: Image, Figma, Video etc.
    return _.map(content, (item, index: number) => {
      const value = item.value;

      if (index < numberOfColumns - 1) {
        return (
          <td style={{backgroundColor: 'white', padding: '8px 12px 8px 12px'}}>
            <img src={value} style={{display: 'block'}}/>
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

  const getTable = section => {
    const columns = section.columns;
    const rows = section.content;
    const numberOfColumns = columns.length;

    return (
      <div>
        {section.name && <div style={{fontSize: '20px', fontWeight: '700', marginBottom: 16}}>{section.name}</div>}
        <table>
          <tr>
            {getTableHeaders(columns)}
          </tr>
          {getTableRows(rows, numberOfColumns)}
        </table>
      </div>
    );
  };

  const getUsage = () => {
    if (component.snippet) {
      return (
        <div>
          <CodeBlock language="jsx">
            {component.snippet?.map(item => _.replace(item, new RegExp(/\$[1-9]/, 'g'), '')).join('\n')}
          </CodeBlock>
        </div>
      );
    }
  };

  const buildMassageBox = (color, icon, title, description) => {
    return (
      <div className="row" style={{backgroundColor: color, marginBottom: 20, padding: '16px 20px 16px 22px', alignItems: 'center'}}>
        <img src={icon} width={20} height={20} style={{border: '1px solid', marginRight: 14}}/>
        <div className="column">
          <div style={{fontSize: '16px', fontWeight: '700'}}>{title}</div>
          {description}
        </div>
      </div>
    );
  };

  const getExtendsLinks = () => {
    const components = component.extends;
    const links = component.extendsLink;
    
    return _.map(components, (component, index: number) => {
      return <a href={links[index]} target="_blank" rel="noreferrer" style={{fontSize: '16px', fontWeight: '700', lineHeight: '18px', borderBottom: '1px solid'}}>{component}</a>;
    });
  };

  const getInfo = (section) => {
    const icon = undefined; //TODO: add info icon
    const title = section.title || 'INFO';
    let description = section.massage;
    if (!description && component.extends) {
      const links = getExtendsLinks(); //TODO: separate links with comma
      const text = <span style={{fontWeight: 'bold'}}>{links}</span>;
      description = <div>This component extends the {text} props.</div>;
    }
    
    return description && buildMassageBox('#E9F3FF', icon, title, description);
  };

  const getTip = (section) => {
    const icon = undefined; //TODO: add insights icon
    const title = section.title || 'TIP';
    let description = section.massage;
    if (!description && component.modifiers) {
      const text = <span style={{fontWeight: 'bold'}}>{component.modifiers?.join(', ')}</span>;
      description = <div>This component support {text} modifiers.</div>;
    }

    return description && buildMassageBox('#E3F7F2', icon, title, description);
  };

  const getMassage = (section) => {
    return buildMassageBox(section.color, section.icon, section.title, section.description);
  };

  const getListItem = (item, isLast, layout) => {
    const data = {
      ...item,
      type: 'item',
      layout
    };

    return (
      <div className="column" style={{marginBottom: isLast ? 0 : 40}}>
        {getBasicLayout(data)}
      </div>
    );
  };

  const getList = section => {
    const content = section.content;

    return _.map(content, (item, index: number) => {
      const isLast = index === content.length - 1;
      return getListItem(item, isLast, section.layout);
    });
  };

  const getFigmaEmbed = item => {
    const value = item.value;
    const height = item.height || 450;

    return <iframe width={'100%'} height={height} src={value}/>;
  };

  const getImage = value => {
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

  const getSectionContent = content => {
    return (
      <div className="column">
        {_.map(content, (item, index: number) => {
          const isLast = index === content.length - 1;

          return (
            <div style={{marginBottom: isLast ? 0 : 40, border: '1px solid #F8F9FA'}}>
              {getContentItem(item)}
            </div>
          );
        })}
      </div>
    );
  };

  const getContent = section => {
    //TODO: Add generic type for massageBox to pass title, description, icon and bgColor
    switch (section.type) {
      case 'props':
        return getPropsList();
      case 'table':
        return getTable(section);
      case 'list':
        return getList(section);
      case 'hero':
      case 'item':
      case 'section':
        return getSectionContent(section.content);
      default:
        return;
    }
  };

  const getBasicLayout = section => {
    const direction = section.type !== 'list' && section.layout === 'horizontal' ? 'row' : 'column';

    return (
      <div style={{display: 'flex', flexDirection: direction}}>
        {getHeader(section.title, section.description, section.type)}
        {getContent(section)}
      </div>
    );
  };

  const getDivider = section => {
    if (section.type === 'table' || section.type === 'list') {
      return <div style={{height: 1, width: '100%', backgroundColor: '#E8ECF0', margin: '60px 0 60px 0'}}/>;
    } else {
      return <div style={{height: 60}}/>;
    }
  };

  const buildDocsSections = sections => {
    if (sections) {
      return _.map(sections, section => {
        switch (section.type) {
          case 'usage':
            return getUsage();
          case 'info':
            return getInfo(section);
          case 'tip':
            return getTip(section);
          case 'massage':
            return getMassage(section);
          default:
            return (
              <div>
                {getBasicLayout(section)}
                {getDivider(section)}
              </div>
            );
        }
      });
    } else {
      return <p>Coming soon... 👩🏻‍💻</p>;
    }
  };

  const getTabItems = tabs => {
    return _.map(tabs, (tab, index) => {
      return (
        <TabItem value={index} label={tab.title} attributes={{className: 'single-tab'}}>
          {buildDocsSections(tab.sections)}
        </TabItem>
      );
    });
  };

  const buildTabs = () => {
    const tabs = component.docs?.tabs;

    if (tabs) {
      return <Tabs className="main-tabs">{getTabItems(tabs)}</Tabs>;
    }
  };

  const buildHero = () => {
    const hero = component.docs?.hero;

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
      {buildHero()}
      {buildTabs()}
    </div>
  );
}
