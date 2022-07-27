import _ from 'lodash';
import React, { Component } from 'react';
import AsyncStorage from '@react-native-community/async-storage';
import PropTypes from 'prop-types';
import { StyleSheet, FlatList, ViewPropTypes, SectionList, ScrollView } from 'react-native';
import { Navigation } from 'react-native-navigation';
import { gestureHandlerRootHOC } from 'react-native-gesture-handler';
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
  TabController,
  Constants,
  Fader,
  Chip
} from 'react-native-ui-lib'; //eslint-disable-line
import { navigationData } from './MenuStructure';

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
      filteredNavigationData: data,
      chipsLabels: _.map(data, section => (section.title)),
      sectionsData: _.map(data, section => ({ title: section.title, data: section.screens })),
      selectedSection: 0,
      faderStart: false,
      faderEnd: true
    };

    Navigation.events().bindComponent(this);
  }

  sectionListRef = React.createRef();
  scrollViewRef = React.createRef();


  onSearchBoxBlur = () => {
    this.closeSearchBox();
  };

  getMenuData = () => {
    return this.props.navigationData || navigationData;
  };

  navigationButtonPressed = event => {
    const { buttonId } = event;
    const data = this.getMenuData();

    if (buttonId === 'uilib.settingsButton') {
      console.log(`2nd call to pushScreen: ${this.settingsScreenName}`)
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

  scrollToSection = (index) => {
    this?.sectionListRef?.current?.scrollToLocation({
      animated: true,
      sectionIndex: index,
      itemIndex: 0,
      viewPosition: 0
    });
  };

  scrollChipsSection = (index) => {
    const { selectedSection } = this.state
    const offset = index < selectedSection ? 60 * index : 85 * index
    this?.scrollViewRef?.current.scrollTo(
      { x: offset, animated: true }
    )
  }


  pushScreen = options => {
    console.log(`options: ${options}`)
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

  setDefaultScreen = ({ customValue: item }) => {
    console.log(`Default Screen:`, item)
    AsyncStorage.setItem('uilib.defaultScreen', item.screen);
    this.openScreen({ customValue: item });
  };

  openScreen = ({ customValue: row }) => {
    console.log(`row: `, row)
    this.closeSearchBox();

    setTimeout(() => {
      this.pushScreen(row);
    }, 0);
  };

  updateSearch = _.throttle(filterText => {
    this.setState({ filterText }, () => {
      this.filterExplorerScreens();
    });
  }, 800);

  clearSearch = () => {
    this.updateSearch('');
  };

  filterExplorerScreens = () => {
    const { filterText } = this.state;
    let filteredNavigationData = {};
    const data = this.getMenuData();

    if (!filterText) {
      filteredNavigationData = data;
    } else {
      _.each(data, (menuSection, menuSectionKey) => {
        const filteredMenuSection = _.filter(menuSection.screens, menuItem => {
          const { title, description, tags } = menuItem;
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
    const { filterText } = this.state;
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
          filterText ? (
            <Button link marginR-5 iconSource={Assets.icons.demo.close} $iconDefault onPress={this.clearSearch} />
          ) : (
            <Icon marginR-10 tintColor={Colors.$iconDefault} source={Assets.icons.demo.search} />
          )
        }
      />
    );
  };

  onPress = ({ customValue: index }) => {
    console.log(`Adi - onPress!!!! The new index: ${index} || The current in state: ${this.state.selectedSection}`)
    const { chipsLabels } = this.state
    this.setState({
      selectedSection: index,
      faderStart: index != 0 ? true : false,
      faderEnd: index === chipsLabels.length - 1 ? false : true
    })
    this.scrollToSection(index);
    this.scrollChipsSection(index)
  }

  renderChip(label, index) {
    return (
      <Chip marginH-5 marginV-10 marginL-15={index === 0} label={label} key={index}
        containerStyle={index === this.state.selectedSection ? styles.selectedChipContainer : styles.chipContainer}
        onPress={this.onPress}
        customValue={index}
        labelStyle={index === this.state.selectedSection ? styles.selectedChip : undefined}
      />)
  }

  renderSectionHeader = ({ section }) => {
    return (
      <View backgroundColor={'white'}>
        <Text back marginV-20 marginH-20 text60M>{section.title}</Text>
      </View>
    )
  }

  itemSeparator = () => {
    return <View style={styles.itemSeparatorContainer} />
  }

  sectionSeparator = () => {
    return <View style={styles.sectionSeparatorContainer} />
  }

  renderItem = ({ item }) => {
    const { renderItem } = this.props;

    if (renderItem) {
      return renderItem({ item }, this.openScreen);
    }

    if (item.screen) {
      return (
        <TouchableOpacity
          centerV
          row
          spread
          paddingH-s5
          paddingV-s2
          onPress={this.openScreen}
          customValue={item}
          onLongPress={this.setDefaultScreen}
          activeBackgroundColor={Colors.$backgroundPrimaryHeavy}
          activeOpacity={1}
        >
          <Text style={[item.deprecate && styles.entryTextDeprecated]} grey10 text80>
            {item.title}
          </Text>
          <Icon source={chevronIcon} style={{ tintColor: Colors.grey10 }} supportRTL />
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
        contentContainerStyle={{ paddingTop: 20 }}
        keyExtractor={(_item, index) => index.toString()}
        renderItem={this.renderItem}
      />
    );
  }

  onCheckViewableItems = ({ viewableItems }) => {

    console.log('Adi - viewableItems', _.map(viewableItems, item => `${item.section.title} - ${item.item.title}`));
    const { chipsLabels, selectedSection } = this.state
    const title = viewableItems[0]['section']['title']
    console.log('Adi - current section', title);
    const sectionIndex = _.findIndex(chipsLabels, function (c) { return c === title });
    // console.log(`Adi - || The title: ${title} ||   onCheckViewableItems!!!! The current state: ${selectedSection} || The changing selection: ${sectionIndex}`)
    if (sectionIndex != -1) {
      console.log(`Adi - Changing the state from onCheckViewableItems, the new index ${sectionIndex}`)
      this.scrollChipsSection(sectionIndex)
      this.setState({
        selectedSection: sectionIndex,
        faderStart: sectionIndex != 0 ? true : false,
        faderEnd: sectionIndex === chipsLabels.length - 1 ? false : true
      })
    }
  }

  handleScroll = (event) => {
    //scrollEventThrottle={16} onScroll={this.handleScroll}
    console.log(event.nativeEvent.contentOffset.x);
    // let { faderStart, faderEnd } = this.state
    // // Fader start set to false
    // if (event.nativeEvent.contentOffset.x > 80) {
    //   faderStart = true
    // } else {
    //   faderStart = flingGestureHandlerProps
    // }
    // // Fader end set to false
    // if (event.nativeEvent.contentOffset.x > 720) {
    //   faderEnd = false
    // } else {
    //   faderEnd = true
    // }
  }

  render() {
    const { containerStyle } = this.props;
    const { filteredNavigationData, filterText, selectedSection } = this.state;
    const showNoResults = _.isEmpty(filteredNavigationData) && !!filterText;
    const showResults = !_.isEmpty(filteredNavigationData) && !!filterText;
    const showSectionList = !filterText;
    const chipsLabels = this.state.chipsLabels
    const sectionsData = this.state.sectionsData

    console.log(`selectedSection:${selectedSection}`)

    return (
      <View testID="demo_main_screen" flex style={containerStyle}>
        {this.renderSearch(this.navigationData)}

        {showResults && this.renderSearchResults(filteredNavigationData)}
        {showSectionList &&
          <>
            <ChipsSeparator />
            <ScrollView horizontal showsHorizontalScrollIndicator={false} ref={this.scrollViewRef} onScrollToIndexFailed={() => console.log('first')}
            >
              {chipsLabels.map((label, index) => {
                return this.renderChip(label, index)
              })}
            </ScrollView>
            <Fader size={25} visible={this.state.faderStart} position={Fader.position.START} />
            <Fader size={25} visible={this.state.faderEnd} position={Fader.position.END} />
            <ChipsSeparator />
          </>
        }

        {
          showSectionList &&
          <SectionList
            sections={sectionsData}
            ref={this.sectionListRef}
            keyExtractor={(item, index) => item + index}
            renderItem={this.renderItem}
            renderSectionHeader={this.renderSectionHeader}
            ItemSeparatorComponent={this.itemSeparator}
            onViewableItemsChanged={this.onCheckViewableItems}
            viewabilityConfig={{
              itemVisiblePercentThreshold: 90 //means if 50% of the item is visible
            }}
          />
        }

        {
          showNoResults && (
            <View padding-20>
              <Text grey40 text50>
                Sorry, nothing was found. Try Button or something..
              </Text>
            </View>
          )
        }
      </View >
    );
  }
}

const styles = StyleSheet.create({
  entryTextDeprecated: {
    textDecorationLine: 'line-through'
  },
  searchContainer: {
    padding: Spacings.s1,
    paddingBottom: 0,
  },
  searchField: {
    padding: Spacings.s3,
    // backgroundColor: Colors.$backgroundNeutralLight,
    borderRadius: 8
  },
  chipsSeparatorContainer: {
    height: 1,
    marginVertical: 3,
    backgroundColor: Colors.grey60,
  },
  itemSeparatorContainer: {
    height: 1,
    backgroundColor: Colors.grey60,
    marginHorizontal: 20,
    marginVertical: 7
  },
  sectionSeparatorContainer: {
    height: 5,
    backgroundColor: Colors.grey60,
  },
  chipContainer: {
    height: 20,
  },
  selectedChipContainer: {
    height: 20,
    borderColor: Colors.blue30
  },
  selectedChip: {
    color: Colors.blue30
  }
});

function ChipsSeparator(props) {
  return (
    <>
      <View style={styles.chipsSeparatorContainer} />
    </>
  )
}

export default gestureHandlerRootHOC(MainScreen);