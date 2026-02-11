import _ from 'lodash';
import React, {Component} from 'react';
import {ActivityIndicator, StyleSheet} from 'react-native';
import {
  Assets,
  TabController,
  Colors,
  View,
  Text,
  Button,
  TabControllerItemProps,
  TabControllerImperativeMethods
} from 'react-native-ui-lib';

import Tab1 from './tab1';
import Tab2 from './tab2';
import Tab3 from './tab3';

const TABS = ['Home', 'Posts', 'Reviews', 'Videos', 'Photos', 'Events', 'About', 'Community', 'Groups', 'Offers'];

interface State {
  asCarousel: boolean;
  centerSelected: boolean;
  fewItems: boolean;
  initialIndex: number;
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
      initialIndex: 0,
      selectedIndex: 0,
      key: Date.now(),
      items: this.generateTabItems(false)
    };
  }
  tabController = React.createRef<TabControllerImperativeMethods>();

  generateTabItems = (fewItems = this.state.fewItems): TabControllerItemProps[] => {
    // @ts-expect-error
    const items: TabControllerItemProps[] = _.flow(tabs => _.take(tabs, fewItems ? 3 : TABS.length),
      (tabs: TabControllerItemProps[]) =>
        _.map<TabControllerItemProps>(tabs, (tab: TabControllerItemProps, index: number) => ({
          label: tab,
          key: tab,
          icon: index === 2 ? Assets.icons.demo.dashboard : undefined,
          badge: index === 5 ? {label: '2'} : undefined,
          leadingAccessory: index === 3 ? <Text marginR-4>{Assets.emojis.movie_camera}</Text> : undefined,
          trailingAccessory: index === 4 ? <Text marginL-4>{Assets.emojis.camera}</Text> : undefined
        })))(TABS);

    const addItem: TabControllerItemProps & {key: string} = {
      icon: Assets.icons.demo.add,
      key: 'add',
      ignore: true,
      width: 60,
      onPress: this.onAddItem
    };

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

  setTab = () => {
    this.tabController.current?.setTab(2);
  };

  onAddItem = () => {
    const {items} = this.state;
    let newItems = items.slice(0, -1) as TabControllerItemProps[];
    newItems = [...newItems, {label: `New Item # ${newItems.length + 1}`}, items[items.length - 1]];
    this.setState({items: newItems});
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
        <ActivityIndicator size="large"/>
        <Text text60L marginT-10>
          Loading
        </Text>
      </View>
    );
  }

  renderTabPages() {
    const {asCarousel, fewItems} = this.state;
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
        <TabController.TabPage index={2} lazy lazyLoadTime={1500} renderLoading={this.renderLoadingPage}>
          <Tab3/>
        </TabController.TabPage>

        {!fewItems &&
          _.map(_.takeRight(TABS, TABS.length - 3), (title, index) => {
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
    const {key, initialIndex, asCarousel, centerSelected, fewItems, items} = this.state;
    return (
      <View flex bg-$backgroundDefault>
        <TabController
          key={key}
          ref={this.tabController}
          asCarousel={asCarousel}
          initialIndex={initialIndex}
          onChangeIndex={this.onChangeIndex}
          items={items}
        >
          <TabController.TabBar
            // items={items}
            key={key}
            // uppercase
            // indicatorStyle={{backgroundColor: 'green', height: 3}}
            // indicatorInsets={0}
            spreadItems={!fewItems}
            backgroundColor={fewItems ? 'transparent' : undefined}
            // labelColor={'green'}
            // selectedLabelColor={'red'}
            labelStyle={styles.labelStyle}
            selectedLabelStyle={styles.selectedLabelStyle}
            // iconColor={'green'}
            // selectedIconColor={'blue'}
            enableShadow
            activeBackgroundColor={Colors.$backgroundPrimaryMedium}
            centerSelected={centerSelected}
          />
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
            marginB-12
            onPress={this.toggleCenterSelected}
          />
          <Button label="setTab (Imperative)" bg-green10 onPress={this.setTab} size={Button.sizes.small}/>
        </View>
      </View>
    );
  }
}

export default TabControllerScreen;

const styles = StyleSheet.create({
  labelStyle: {
    fontSize: 16
  },
  selectedLabelStyle: {
    fontSize: 16
  }
});
