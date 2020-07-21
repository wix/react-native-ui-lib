import React, {Component} from 'react';
import {ActivityIndicator} from 'react-native';
import {
  TabController,
  Colors,
  View,
  Text,
  Button
} from 'react-native-ui-lib'; //eslint-disable-line
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import _ from 'lodash';

import Tab1 from './tab1';
import Tab2 from './tab2';
import Tab3 from './tab3';

const TABS = [
  'Home',
  'Posts',
  'Reviews',
  'Videos',
  'Photos',
  'Events',
  'About',
  'Community',
  'Groups',
  'Offers'
];

class TabControllerScreen extends Component {
  state = {
    asCarousel: true,
    centerSelected: false,
    fewItems: false,
    selectedIndex: 0,
    items: _.chain(TABS)
      .map((tab) => ({label: tab, key: tab}))
      .value(),
    key: Date.now()
  };

  componentDidMount() {
    // this.slow();
  }

  slow() {
    setTimeout(() => {
      _.times(5000, () => {
        console.log('slow log');
      });

      this.slow();
    }, 10);
  }

  addTab = () => {
    const {tabsCount} = this.state;

    if (tabsCount < 6) {
      this.setState({
        tabsCount: tabsCount + 1,
        key: Date.now(),
        selectedIndex: tabsCount
      });
    }
  };

  toggleItemsCount = () => {
    const {fewItems} = this.state;

    let items;
    if (fewItems) {
      items = _.chain(TABS)
        .map((tab) => ({label: tab, key: tab}))
        .value();
    } else {
      items = _.chain(TABS)
        .take(3)
        .map((tab) => ({label: tab, key: tab}))
        .value();
    }

    this.setState({fewItems: !fewItems, items, key: Date.now()});
  };

  toggleCarouselMode = () => {
    this.setState({
      asCarousel: !this.state.asCarousel,
      key: this.state.asCarousel ? 'asCarousel' : 'staticPages'
    });
  };

  toggleCenterSelected = () => {
    this.setState({
      centerSelected: !this.state.centerSelected,
      key: Date.now()
    });
  };

  onChangeIndex = (selectedIndex) => {
    this.setState({selectedIndex});
  };

  renderLoadingPage() {
    return (
      <View flex center>
        <ActivityIndicator size="large"/>
        <Text text60L marginT-10>
          Loading
        </Text>
      </View>
    );
  }

  renderTabPages() {
    const {asCarousel} = this.state;
    const Container = asCarousel ? TabController.PageCarousel : View;
    const containerProps = asCarousel ? {} : {flex: true};
    return (
      <Container {...containerProps}>
        <TabController.TabPage index={0}>
          <Tab1/>
        </TabController.TabPage>
        <TabController.TabPage index={1}>
          <Tab2/>
        </TabController.TabPage>
        <TabController.TabPage
          index={2}
          lazy
          lazyLoadTime={1500}
          renderLoading={this.renderLoadingPage}
        >
          <Tab3/>
        </TabController.TabPage>

        {_.map(_.takeRight(TABS, TABS.length - 3), (title, index) => {
          return (
            <TabController.TabPage key={title} index={index + 3}>
              <View padding-s5>
                <Text text40>{title}</Text>
              </View>
            </TabController.TabPage>
          );
        })}
      </Container>
    );
  }

  render() {
    const {
      key,
      selectedIndex,
      asCarousel,
      centerSelected,
      fewItems,
      items
    } = this.state;
    return (
      <View flex bg-grey70>
        <TabController
          key={key}
          asCarousel={asCarousel}
          selectedIndex={selectedIndex}
          onChangeIndex={this.onChangeIndex}
          items={items}
        >
          <TabController.TabBar
            // items={items}
            // key={key}
            // uppercase
            // indicatorStyle={{backgroundColor: 'green', height: 3}}
            // labelColor={'green'}
            // selectedLabelColor={'red'}
            // labelStyle={{fontSize: 20}}
            // iconColor={'green'}
            // selectedIconColor={'blue'}
            enableShadow
            activeBackgroundColor={Colors.blue60}
            centerSelected={centerSelected}
          >
            {/* {this.renderTabItems()} */}
          </TabController.TabBar>
          {this.renderTabPages()}
        </TabController>
        <View absB left margin-20 marginB-100 style={{zIndex: 1}}>
          <Button
            bg-green10={!fewItems}
            bg-green30={fewItems}
            label={fewItems ? 'Show Many Items' : 'Show Few Items'}
            marginB-12
            size="small"
            onPress={this.toggleItemsCount}
          />
          <Button
            bg-grey20={!asCarousel}
            bg-green30={asCarousel}
            label={`Carousel : ${asCarousel ? 'ON' : 'OFF'}`}
            marginB-12
            size="small"
            onPress={this.toggleCarouselMode}
          />
          <Button
            bg-grey20={!centerSelected}
            bg-green30={centerSelected}
            label={`centerSelected : ${centerSelected ? 'ON' : 'OFF'}`}
            size="small"
            onPress={this.toggleCenterSelected}
          />
        </View>
      </View>
    );
  }
}

export default gestureHandlerRootHOC(TabControllerScreen);
