import _ from 'lodash';
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {StyleSheet, FlatList, SectionList, ScrollView} from 'react-native';
import {ViewPropTypes} from 'deprecated-react-native-prop-types';
import {Navigation} from 'react-native-navigation';
import {
  Assets,
  Colors,
  Typography,
  Spacings,
  View,
  Text,
  TextField,
  TouchableOpacity,
  Icon,
  Button,
  Fader,
  Chip,
  Dividers
} from 'react-native-ui-lib'; //eslint-disable-line
import {navigationData} from './MenuStructure';
import Storage, {DEFAULT_SCREEN, RECENT_SCREENS} from '../storage';

const settingsIcon = require('../assets/icons/settings.png');
const chevronIcon = require('../assets/icons/chevronRight.png');
const FADER_SIZE = 50;

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

    const recentScreens = Storage.getString(RECENT_SCREENS);

    const data = props.navigationData || navigationData;
    this.state = {
      currentPage: 0,
      filteredNavigationData: data,
      chipsLabels: _.map(data, section => section.title),
      sectionsData: _.map(data, section => ({title: section.title, data: section.screens})),
      recentScreens: recentScreens ? JSON.parse(recentScreens) : [],
      selectedSection: 0,
      faderStart: false,
      faderEnd: true
    };

    Navigation.events().bindComponent(this);
  }

  sectionListRef = React.createRef();
  scrollViewRef = React.createRef();

  viewabilityConfig = {itemVisiblePercentThreshold: 60};

  hasPressItem = false;
  hasUserScrolled = false;

  componentDidUpdate(prevState) {
    const {selectedSection} = this.state;
    if (prevState.selectedSection !== selectedSection) {
      if (this.hasPressItem) {
        this.scrollToSection(selectedSection);
        this.scrollChipsSection(selectedSection);
      }
      if (this.hasUserScrolled) {
        this.scrollChipsSection(selectedSection);
      }
      this.hasPressItem = false;
    }
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

  scrollToSection = index => {
    this?.sectionListRef?.current?.scrollToLocation({
      animated: true,
      sectionIndex: index,
      itemIndex: 1,
      viewPosition: 0
    });
  };

  scrollChipsSection = index => {
    const {selectedSection, filterText} = this.state;
    const offset = index < selectedSection ? 60 * index : 85 * index;
    if (!filterText) {
      this?.scrollViewRef?.current.scrollTo({x: offset, animated: true});
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

  setDefaultScreen = ({customValue: item}) => {
    Storage.set(DEFAULT_SCREEN, item.screen);
    this.openScreen({customValue: item});
  };

  updateRecentScreens(screen) {
    const {recentScreens} = this.state;
    recentScreens.unshift(screen);
    const uniqueArr = [...new Set(recentScreens.map(item => JSON.stringify(item)))].map(item => JSON.parse(item));

    Storage.set(RECENT_SCREENS, JSON.stringify(uniqueArr));

    this.setState({
      recentScreens: uniqueArr
    });
  }

  openScreen = ({customValue: row}) => {
    this.closeSearchBox();
    this.updateRecentScreens(row);

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
    this.input?.clear();
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

  setHasUserScrolled = () => {
    this.hasUserScrolled = true;
  };

  removeHasUserScrolled = () => {
    this.hasUserScrolled = false;
  };

  onEndReached = () => {
    const {chipsLabels} = this.state;
    this.removeHasUserScrolled;
    this.scrollChipsSection(chipsLabels.length - 1);
    this.setState({
      selectedSection: chipsLabels.length - 1,
      faderStart: true,
      faderEnd: false
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
        leadingAccessory={
          <View>
            <Icon marginR-s2 tintColor={Colors.$iconDefault} source={Assets.icons.demo.search}/>
          </View>
        }
        trailingAccessory={
          filterText ? (
            <Button link marginR-5 iconSource={Assets.icons.demo.close} $iconDefault onPress={this.clearSearch}/>
          ) : undefined
        }
      />
    );
  };

  onPress = ({customValue: index}) => {
    const {chipsLabels} = this.state;
    this.hasPressItem = true;
    this.hasUserScrolled = false;
    this.setState({
      selectedSection: index,
      faderStart: index !== 0,
      faderEnd: index !== chipsLabels.length - 1
    });
  };

  onCheckViewableItems = ({viewableItems}) => {
    const {chipsLabels, selectedSection} = this.state;
    if (!this.hasPressItem && this.hasUserScrolled) {
      const title = viewableItems[0]?.section.title;
      const sectionIndex = _.findIndex(chipsLabels, c => {
        return c === title;
      });

      if (sectionIndex !== -1 && sectionIndex !== selectedSection) {
        this.setState({
          selectedSection: sectionIndex,
          faderStart: sectionIndex !== 0,
          faderEnd: sectionIndex !== chipsLabels.length - 1
        });
      }
    }
  };

  renderChip(label, index) {
    return (
      <Chip
        marginH-5
        marginV-10
        marginL-15={index === 0}
        label={label}
        key={index}
        containerStyle={index === this.state.selectedSection ? styles.selectedChipContainer : styles.chipContainer}
        onPress={this.onPress}
        customValue={index}
        labelStyle={index === this.state.selectedSection ? styles.selectedChip : undefined}
      />
    );
  }

  renderSectionHeader = ({section}) => {
    return <SectionHeader section={section}/>;
  };

  renderRecentScreens = () => {
    const {recentScreens} = this.state;

    if (recentScreens.length > 0) {
      return (
        <View row paddingV-s2 paddingH-s5 centerV>
          <Text text90BO marginR-s2>
            Recent:
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {recentScreens.map(screen => {
              return (
                <Chip
                  marginR-s2
                  label={screen.title}
                  key={screen.title}
                  onPress={this.openScreen}
                  customValue={screen}
                  labelStyle={Typography.text100BO}
                />
              );
            })}
          </ScrollView>
        </View>
      );
    }
  };

  renderItem = ({item}) => {
    const {renderItem} = this.props;

    if (renderItem) {
      return renderItem({item}, this.openScreen);
    }

    if (item.screen) {
      return <SectionItem item={item} onPress={this.openScreen} onLongPress={this.setDefaultScreen}/>;
    } else {
      return (
        <View paddingH-s5 marginV-s1 height={20} bg-$backgroundNeutralLight>
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
        contentContainerStyle={styles.searchResultsContainer}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={this.renderItem}
      />
    );
  }

  render() {
    const {containerStyle} = this.props;
    const {filteredNavigationData, filterText, chipsLabels, sectionsData} = this.state;
    const showNoResults = _.isEmpty(filteredNavigationData) && !!filterText;
    const showResults = !_.isEmpty(filteredNavigationData) && !!filterText;
    const showSectionList = !filterText;

    return (
      <View testID="demo_main_screen" flex style={containerStyle} useSafeArea>
        {this.renderSearch(this.navigationData)}

        {showResults && this.renderSearchResults(filteredNavigationData)}
        {showSectionList && (
          <View style={styles.scrollViewContainer}>
            <ScrollView
              decelerationRate="fast"
              horizontal
              showsHorizontalScrollIndicator={false}
              ref={this.scrollViewRef}
            >
              {chipsLabels.map((label, index) => {
                return this.renderChip(label, index);
              })}
            </ScrollView>
            <Fader size={FADER_SIZE} visible={this.state.faderStart} position={Fader.position.START}/>
            <Fader size={FADER_SIZE} visible={this.state.faderEnd} position={Fader.position.END}/>
          </View>
        )}

        {this.renderRecentScreens()}

        {showSectionList && (
          <SectionList
            sections={sectionsData}
            ref={this.sectionListRef}
            keyExtractor={(item, index) => item + index}
            renderItem={this.renderItem}
            renderSectionHeader={this.renderSectionHeader}
            onViewableItemsChanged={this.onCheckViewableItems}
            viewabilityConfig={this.viewabilityConfig}
            onScrollBeginDrag={this.setHasUserScrolled}
            onScrollEndDrag={this.removeHasUserScrolled}
            onMomentumScrollBegin={this.setHasUserScrolled}
            onMomentumScrollEnd={this.removeHasUserScrolled}
            onEndReached={this.onEndReached}
          />
        )}

        {showNoResults && (
          <View padding-20>
            <Text $textNeutralLight text50>
              Sorry, nothing was found. Try Button or something..
            </Text>
          </View>
        )}
      </View>
    );
  }
}

const SectionItem = React.memo(props => {
  const {item, onPress, onLongPress} = props;
  return (
    <TouchableOpacity
      centerV
      row
      spread
      paddingH-s5
      paddingV-s4
      onPress={onPress}
      customValue={item}
      onLongPress={onLongPress}
      activeBackgroundColor={Colors.$backgroundPrimaryLight}
      activeOpacity={1}
      style={Dividers.d10}
    >
      <Text style={[item.deprecate && styles.entryTextDeprecated]} text80>
        {item.title}
      </Text>
      <Icon source={chevronIcon} style={{tintColor: Colors.$iconDefault}} supportRTL/>
    </TouchableOpacity>
  );
});

const SectionHeader = React.memo(props => {
  const {section} = props;
  return (
    <View bg-$backgroundDefault>
      <Text marginV-20 marginH-20 text60M>
        {section.title}
      </Text>
    </View>
  );
});

const styles = StyleSheet.create({
  entryTextDeprecated: {
    textDecorationLine: 'line-through'
  },
  searchContainer: {
    padding: Spacings.s1,
    paddingBottom: 0
  },
  searchField: {
    padding: Spacings.s3,
    borderRadius: 8
  },
  chipContainer: {
    height: 20
  },
  selectedChipContainer: {
    height: 20,
    borderColor: Colors.$textPrimary
  },
  selectedChip: {
    color: Colors.$textPrimary
  },
  scrollViewContainer: {
    borderBottomColor: Colors.$outlineDefault,
    borderBottomWidth: 1,
    borderTopColor: Colors.$outlineDefault,
    borderTopWidth: 1
  },
  searchResultsContainer: {paddingTop: 20}
});

export default MainScreen;
