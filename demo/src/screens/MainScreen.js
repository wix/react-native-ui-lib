import _ from 'lodash';
import React, {Component} from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';
import {StyleSheet, FlatList} from 'react-native';
import {ViewPropTypes} from 'deprecated-react-native-prop-types';
import {Navigation} from 'react-native-navigation';
import {gestureHandlerRootHOC} from 'react-native-gesture-handler';
import {
  Assets,
  Colors,
  Spacings,
  View,
  Text,
  TextField,
  TouchableOpacity,
  Icon,
  Button,
  TabController
} from 'react-native-ui-lib'; //eslint-disable-line
import {navigationData} from './MenuStructure';

const settingsIcon = require('../assets/icons/settings.png');
const chevronIcon = require('../assets/icons/chevronRight.png');

class MainScreen extends Component {
  static propTypes = {
    containerStyle: ViewPropTypes.style,
    renderItem: PropTypes.func,
    pageStyle: ViewPropTypes.style
  };

  settingsScreenName = 'unicorn.Settings';

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

    Navigation.events().bindComponent(this);
  }

  onSearchBoxBlur = () => {
    this.closeSearchBox();
  };

  getMenuData = () => {
    return this.props.navigationData || navigationData;
  };

  navigationButtonPressed = event => {
    const {buttonId} = event;
    const data = this.getMenuData();

    if (buttonId === 'uilib.settingsButton') {
      this.pushScreen({
        name: this.settingsScreenName,
        passProps: {
          navigationData: data,
          playground: this.props.playground,
          extraSettingsUI: this.props.extraSettingsUI
        }
      });
    }
  };

  pushScreen = options => {
    Navigation.push(this.props.componentId, {
      component: {
        name: options.name || options.screen,
        id: this.settingsScreenName,
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
    this.input?.blur();
  };

  setDefaultScreen = item => {
    AsyncStorage.setItem('uilib.defaultScreen', item.screen);
    this.openScreen(item);
  };

  openScreen = row => {
    this.closeSearchBox();

    setTimeout(() => {
      this.pushScreen(row);
    }, 0);
  };

  updateSearch = _.throttle(filterText => {
    this.setState({filterText}, () => {
      this.filterExplorerScreens();
    });
  }, 800);

  clearSearch = () => {
    this.updateSearch('');
  };

  filterExplorerScreens = () => {
    const {filterText} = this.state;
    let filteredNavigationData = {};
    const data = this.getMenuData();

    if (!filterText) {
      filteredNavigationData = data;
    } else {
      _.each(data, (menuSection, menuSectionKey) => {
        const filteredMenuSection = _.filter(menuSection.screens, menuItem => {
          const {title, description, tags} = menuItem;
          return (
            _.includes(_.toLower(title), _.toLower(filterText)) ||
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
      filteredNavigationData
    });
  };

  /** Renders */
  renderSearch = () => {
    const {filterText} = this.state;
    return (
      <TextField
        migrate
        preset={null}
        ref={r => (this.input = r)}
        testID="uilib.search_for_component"
        placeholder="Search for your component..."
        onChangeText={this.updateSearch}
        onBlur={this.onSearchBoxBlur}
        containerStyle={styles.searchContainer}
        fieldStyle={styles.searchField}
        enableErrors={false}
        hideUnderline
        floatingPlaceholder={false}
        text70
        trailingAccessory={
          filterText ? (
            <Button link iconSource={Assets.icons.demo.close} $iconDefault onPress={this.clearSearch}/>
          ) : (
            <Icon tintColor={Colors.$iconDefault} source={Assets.icons.demo.search}/>
          )
        }
      />
    );
  };

  renderItem = ({item}) => {
    const {renderItem} = this.props;

    if (renderItem) {
      return renderItem({item}, this.openScreen);
    }

    if (item.screen) {
      return (
        <TouchableOpacity
          centerV
          row
          spread
          paddingH-s5
          paddingV-s2
          onPress={() => this.openScreen(item)}
          onLongPress={() => this.setDefaultScreen(item)}
          activeBackgroundColor={Colors.$backgroundPrimaryHeavy}
          activeOpacity={1}
        >
          <Text style={[item.deprecate && styles.entryTextDeprecated]} grey10 text50>
            {item.title}
          </Text>
          <Icon source={chevronIcon} style={{tintColor: Colors.grey10}} supportRTL/>
        </TouchableOpacity>
      );
    } else {
      return (
        <View paddingH-s5 marginV-s1 height={20} bg-grey80>
          <Text text80M>{item.title}</Text>
        </View>
      );
    }
  };

  renderSearchResults(data) {
    const flatData = _.flatMap(data);

    return (
      <FlatList
        keyboardShouldPersistTaps="always"
        data={flatData}
        contentContainerStyle={{paddingTop: 20}}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={this.renderItem}
      />
    );
  }

  renderPages(data) {
    const {pageStyle} = this.props;
    let index = 0;
    return (
      <TabController.PageCarousel>
        {_.map(data, (section, key) => {
          return (
            <TabController.TabPage key={key} lazy={index !== 0} index={index++}>
              <View paddingT-20 flex style={pageStyle}>
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

    return (
      <View testID="demo_main_screen" flex style={containerStyle}>
        {this.renderSearch()}

        {showResults && this.renderSearchResults(filteredNavigationData)}

        {showCarousel && (
          <TabController
            asCarousel
            items={_.map(data, section => ({label: section.title, testID: `section.${section.title}`}))}
          >
            <TabController.TabBar testID={'mainScreenTabBar'}/>
            {this.renderPages(data)}
          </TabController>
        )}
        {showNoResults && (
          <View padding-20>
            <Text grey40 text50>
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
  },
  searchContainer: {
    padding: Spacings.s4,
    paddingBottom: 0,
    marginBottom: Spacings.s2
  },
  searchField: {
    padding: Spacings.s3,
    backgroundColor: Colors.$backgroundNeutralLight,
    borderRadius: 8
  }
});

export default gestureHandlerRootHOC(MainScreen);
