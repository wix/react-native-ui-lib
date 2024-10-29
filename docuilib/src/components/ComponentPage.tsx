import _ from 'lodash';
import React from 'react';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import './ComponentPage.module.scss';
import {ListSection} from './pageComponents/ListSection';
import {Section} from './pageComponents/Section';
import {Banner} from './pageComponents/Banner';

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

    // TODO: align Tabs bottom border with TabItem's selected indication line
    if (tabs) {
      return <Tabs className="main-tabs">{getTabItems(tabs)}</Tabs>;
    }
  };

  /** Hero */

  const buildHero = () => {
    const hero = component.docs?.hero;

    if (hero) {
      // TODO: align hero's image to page title
      // const name = component.category === 'incubator' ? `Incubator.${component.name}` : component.name;
      const section = {
        // title: name,
        layout: 'horizontal',
        ...hero,
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
