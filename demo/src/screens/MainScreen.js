import _ from 'lodash';
import React, {Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';
import {StyleSheet, FlatList, ViewPropTypes} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {Assets, Colors, View, Text, TextField, Image, TabController} from 'react-native-ui-lib'; //eslint-disable-line
import {navigationData} from './MenuStructure';

const settingsIcon = require('../assets/icons/settings.png');
const chevronIcon = require('../assets/icons/chevronRight.png');

class MainScreen extends Component {
  static propTypes = {
    containerStyle: ViewPropTypes.style,
    renderItem: PropTypes.func,
    renderSectionTitle: PropTypes.func,
    pageStyle: ViewPropTypes.style
  };

  static options() {
    return {
      topBar: {
        rightButtons: [
          {
            id: 'uilib.settingsButton',
            testID: 'uilib.settingsButton',
            enabled: true,
            icon: settingsIcon
          }
        ]
      }
    };
  }

  constructor(props) {
    super(props);

    const data = props.navigationData || navigationData;

    this.state = {
      currentPage: 0,
      filteredNavigationData: data
    };

    this.filterExplorerScreens = _.throttle(this.filterExplorerScreens, 300);

    Navigation.events().bindComponent(this);
  }

  onSearchBoxBlur = () => {
    this.closeSearchBox();
    this.filterExplorerScreens('');
  }

  getMenuData = () => {
    return this.props.navigationData || navigationData;
  };

  navigationButtonPressed = event => {
    const {buttonId} = event;
    const data = this.getMenuData();

    if (buttonId === 'uilib.settingsButton') {
      this.pushScreen({
        name: 'unicorn.Settings',
        passProps: {navigationData: data, playground: this.props.playground}
      });
    }
  };

  pushScreen = options => {
    Navigation.push(this.props.componentId, {
      component: {
        name: options.name || options.screen,
        passProps: options.passProps,
        options: {
          topBar: {
            title: {
              text: options.title
            }
          }
        }
      }
    });
  };

  closeSearchBox = () => {
    this.input.blur();
  };

  setDefaultScreen = item => {
    AsyncStorage.setItem('uilib.defaultScreen', item.screen);
  };

  openScreen = row => {
    this.closeSearchBox();

    setTimeout(() => {
      this.filterExplorerScreens('');
      this.pushScreen(row);
    }, 0);
  };

  filterExplorerScreens = filterText => {
    let filteredNavigationData = {};
    const data = this.getMenuData();

    if (!filterText) {
      filteredNavigationData = data;
    } else {
      _.each(data, (menuSection, menuSectionKey) => {
        const filteredMenuSection = _.filter(menuSection.screens, menuItem => {
          const {title, description, tags} = menuItem;
          return (
            _.includes(_.lowerCase(title), _.toLower(filterText)) ||
            _.includes(_.toLower(description), _.toLower(filterText)) ||
            _.includes(_.toLower(tags), _.toLower(filterText))
          );
        });

        if (!_.isEmpty(filteredMenuSection)) {
          filteredNavigationData[menuSectionKey] = filteredMenuSection;
        }
      });
    }

    this.setState({
      filterText,
      filteredNavigationData
    });
  };

  /** Renders */
  renderSearch = () => {
    return (
      <TextField
        ref={r => (this.input = r)}
        value={this.state.filterText}
        placeholder="Search for your component..."
        onChangeText={this.filterExplorerScreens}
        onBlur={this.onSearchBoxBlur}
        containerStyle={{padding: 16, paddingBottom: 0}}
        style={{
          padding: 12,
          backgroundColor: Colors.dark80,
          borderRadius: 8
        }}
        enableErrors={false}
        hideUnderline
        floatingPlaceholder={false}
        text70
        rightButtonProps={{iconSource: Assets.icons.search, style: {marginRight: 12}}}
      />
    );
  }

  renderItem = ({item}) => {
    const {renderItem} = this.props;

    if (renderItem) {
      return renderItem({item}, this.openScreen);
    }

    return (
      <View centerV row marginB-10>
        <Image source={chevronIcon} style={{tintColor: Colors.dark10}} supportRTL/>
        <Text
          style={[item.deprecate && styles.entryTextDeprecated]}
          dark10
          marginL-10
          text50
          onPress={() => this.openScreen(item)}
          onLongPress={() => this.setDefaultScreen(item)}
        >
          {item.title}
        </Text>
      </View>
    );
  };

  renderSearchResults(data) {
    const flatData = _.flatMap(data);

    return (
      <FlatList
        keyboardShouldPersistTaps="always"
        contentContainerStyle={{padding: 20}}
        data={flatData}
        keyExtractor={(item, index) => index.toString()}
        renderItem={this.renderItem}
      />
    );
  }

  renderPages(data) {
    let index = 0;
    return (
      <TabController.PageCarousel>
        {_.map(data, (section, key) => {
          return (
            <TabController.TabPage key={key} index={index++}>
              <View padding-s5 flex>
                <FlatList
                  showsVerticalScrollIndicator={false}
                  data={section.screens}
                  keyExtractor={item => (item.screen ? item.title : `header_${item.title}`)}
                  renderItem={this.renderItem}
                />
              </View>
            </TabController.TabPage>
          );
        })}
      </TabController.PageCarousel>
    );
  }

  render() {
    const {containerStyle} = this.props;
    const {filteredNavigationData, filterText} = this.state;
    const showNoResults = _.isEmpty(filteredNavigationData) && !!filterText;
    const showResults = !_.isEmpty(filteredNavigationData) && !!filterText;
    const showCarousel = !filterText;
    const data = this.getMenuData();

    const sections = Object.keys(data);

    return (
      <View testID="demo_main_screen" flex style={containerStyle}>
        {this.renderSearch()}

        {showResults && this.renderSearchResults(filteredNavigationData)}

        {showCarousel && (
          <TabController asCarousel>
            <TabController.TabBar items={sections.map(label => ({label}))}/>
            {this.renderPages(data)}
          </TabController>
        )}
        {showNoResults && (
          <View padding-20>
            <Text dark40 text50>
              Sorry, nothing was found. Try Button or something..
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  entryTextDeprecated: {
    textDecorationLine: 'line-through'
  }
});

export default gestureHandlerRootHOC(MainScreen);
