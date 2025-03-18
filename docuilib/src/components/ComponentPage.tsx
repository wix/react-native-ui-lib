import _ from 'lodash';
import React from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import './ComponentPage.module.scss';
import {ListSection} from './pageComponents/ListSection';
import {Section} from './pageComponents/Section';
import {Banner} from './pageComponents/Banner';
import {devTab} from './pageComponents/DefaultTabs';

export default function ComponentPage({component}) {
  const Divider = section => {
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
          case 'info':
          case 'tip':
          case 'banner':
            return <Banner section={section} component={component}/>;
          case 'list':
            return (
              <div>
                <ListSection section={section} component={component}/>
                <Divider section={section}/>
              </div>
            );
          default:
            return (
              <div>
                <Section section={section} component={component}/>
                <Divider section={section}/>
              </div>
            );
        }
      });
    } else {
      return <p>Coming soon... 👩🏻‍💻</p>;
    }
  };

  /** Tabs */

  const getTabItems = tabs => {
    return _.map(tabs, (tab) => {
      return (
        <TabItem value={tab.title.toLowerCase()} label={tab.title} attributes={{className: 'single-tab'}}>
          {buildDocsSections(tab.sections)}
        </TabItem>
      );
    });
  };

  const buildTabs = () => {
    const tabs = component.docs?.tabs ?? [];
    const api = component.props;
    const tabsArray = !_.isEmpty(api) ? [...tabs, devTab] : tabs;
    
    // TODO: align Tabs bottom border with TabItem's selected indication line
    if (tabs) {
      return <Tabs queryString="tab" className="main-tabs">{getTabItems(tabsArray)}</Tabs>;
    }
  };

  /** Hero */

  const buildHero = () => {
    const hero = component.docs?.hero;

    if (hero) {
      const section = {
        layout: 'horizontal',
        ...hero,
        title: component.name,
        type: 'hero'
      };

      return <Section section={section} component={component}/>;
    }
  };

  return (
    <div>
      {buildHero()}
      {buildTabs()}
    </div>
  );
}
