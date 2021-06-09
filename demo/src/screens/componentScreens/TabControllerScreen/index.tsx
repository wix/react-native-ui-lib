import React, {Component} from 'react';
import {ActivityIndicator} from 'react-native';
import {Assets, TabController, Colors, View, Text, Button, TabControllerItemProps} from 'react-native-ui-lib';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import _ from 'lodash';

import Tab1 from './tab1';
import Tab2 from './tab2';
import Tab3 from './tab3';

const TABS = ['Home', 'Posts', 'Reviews', 'Videos', 'Photos', 'Events', 'About', 'Community', 'Groups', 'Offers'];

interface State {
  asCarousel: boolean;
  centerSelected: boolean;
  fewItems: boolean;
  selectedIndex: number;
  key: string | number;
  items: TabControllerItemProps[];
}

class TabControllerScreen extends Component<{}, State> {

  constructor(props: {}) {
    super(props);
    this.state = {
      asCarousel: true,
      centerSelected: false,
      fewItems: false,
      selectedIndex: 0,
      key: Date.now(),
      items: []
    };

    this.state.items = this.generateTabItems();
  }

  generateTabItems = (fewItems = this.state.fewItems): TabControllerItemProps[] => {
    let items: TabControllerItemProps[] = _.chain(TABS)
      .take(fewItems ? 3 : TABS.length)
      .map<TabControllerItemProps>(tab => ({label: tab, key: tab}))
      .value();

    const addItem: TabControllerItemProps = {icon: Assets.icons.demo.add, key: 'add', ignore: true, width: 60, onPress: this.onAddItem};

    return fewItems ? items : [...items, addItem];
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

  onAddItem = () => {
    console.warn('Add Item');
  };

  toggleItemsCount = () => {
    const {fewItems} = this.state;
    const items = this.generateTabItems(!fewItems);
    this.setState({fewItems: !fewItems, items, key: Date.now()});
  };

  toggleCarouselMode = () => {
    this.setState({
      asCarousel: !this.state.asCarousel,
      key: this.state.asCarousel ? 'asCarousel' : 'staticPages'
    });
  };

  toggleCenterSelected = () => {
    const {fewItems, centerSelected} = this.state;
    this.setState({
      items: this.generateTabItems(fewItems),
      centerSelected: !centerSelected,
      key: Date.now()
    });
  };

  onChangeIndex = (selectedIndex: number) => {
    this.setState({selectedIndex});
  };

  renderLoadingPage() {
    return (
      <View flex center>
        <ActivityIndicator size="large" />
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
          <Tab1 />
        </TabController.TabPage>
        <TabController.TabPage index={1}>
          <Tab2 />
        </TabController.TabPage>
        <TabController.TabPage index={2} lazy lazyLoadTime={1500} renderLoading={this.renderLoadingPage}>
          <Tab3 />
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
    const {key, selectedIndex, asCarousel, centerSelected, fewItems, items} = this.state;
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
            key={key}
            // uppercase
            // indicatorStyle={{backgroundColor: 'green', height: 3}}
            // indicatorInsets={0}
            // spreadItems={false}
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
            size={Button.sizes.small}
            onPress={this.toggleItemsCount}
          />
          <Button
            bg-grey20={!asCarousel}
            bg-green30={asCarousel}
            label={`Carousel : ${asCarousel ? 'ON' : 'OFF'}`}
            marginB-12
            size={Button.sizes.small}
            onPress={this.toggleCarouselMode}
          />
          <Button
            bg-grey20={!centerSelected}
            bg-green30={centerSelected}
            label={`centerSelected : ${centerSelected ? 'ON' : 'OFF'}`}
            size={Button.sizes.small}
            onPress={this.toggleCenterSelected}
          />
        </View>
      </View>
    );
  }
}

export default gestureHandlerRootHOC(TabControllerScreen);
