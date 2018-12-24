import _ from 'lodash';
import React, {Component} from 'react';
import autobind from 'react-autobind';
import {StyleSheet, FlatList} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {ThemeManager, Constants, Assets, Colors, View, Text, Button, Carousel, TextField, Image} from 'react-native-ui-lib'; //eslint-disable-line
import {navigationData} from './MenuStructure';

export default class UiLibExplorerMenu extends Component {
  constructor(props) {
    super(props);
    autobind(this);

    const data = props.navigationData || navigationData;

    this.state = {
      currentPage: 0,
      filteredNavigationData: data,
    };

    this.filterExplorerScreens = _.throttle(this.filterExplorerScreens, 300);

    Navigation.events().bindComponent(this);

    const navigationStyle = this.getSearchNavigationStyle();
    navigationStyle.topBar.rightButtons.push({
      id: 'uilib.settingsButton',
      enabled: true,
      icon: Assets.icons.settings,
    });
    Navigation.mergeOptions(props.componentId, navigationStyle);
  }

  componentDidMount() {
    // this.showScreen({name: 'unicorn.PlaygroundScreen', title: 'Playground'});
    // this.openScreen({name: 'unicorn.components.ToastsScreen', title: 'Testing'});
  }

  /** Navigation */
  getMenuData() {
    return this.props.navigationData || navigationData;
  }

  getSearchNavigationStyle() {
    return {
      topBar: {
        drawBehind: true,
        translucent: true,
        rightButtons: [
          {
            id: 'uilib.searchButton',
            enabled: true,
            icon: Assets.icons.search,
          },
        ],
      },
    };
  }

  navigationButtonPressed = (event) => {
    const {buttonId} = event;
    const data = this.getMenuData();

    switch (buttonId) {
      case 'uilib.settingsButton':
        this.pushScreen({
          name: 'unicorn.Settings',
          passProps: {navigationData: data, playground: this.props.playground},
        });
        break;
      case 'uilib.searchButton':
        this.toggleTopBar(false);
        break;
      default:
        break;
    }
  };

  pushScreen(options) {
    Navigation.push(this.props.componentId, {
      component: {
        name: options.name || options.screen,
        passProps: options.passProps,
        options: {
          topBar: {
            title: {
              text: options.title,
            },
          },
        },
      },
    });
  }

  showScreen(options) {
    Navigation.showModal({
      stack: {
        children: [
          {
            component: {
              name: options.name || options.screen,
              passProps: options.passProps,
              options: {
                topBar: {
                  title: {
                    text: options.title,
                  },
                },
              },
            },
          },
        ],
      },
    });
  }

  /** Events */
  onChangePage(newPage) {
    this.setState({
      currentPage: newPage,
    });
  }

  onSearchBoxBlur() {
    this.closeSearchBox();
    this.filterExplorerScreens('');
  }

  /** Actions */
  toggleTopBar = (shouldShow) => {
    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
        visible: shouldShow,
        animate: true,
      },
    });
  };

  closeSearchBox() {
    this.toggleTopBar(true);
  }

  openScreen(row) {
    this.closeSearchBox();
    setImmediate(() => {
      this.filterExplorerScreens('');
    });
    this.pushScreen(row);
  }

  filterExplorerScreens(filterText) {
    let filteredNavigationData = {};
    const data = this.getMenuData();

    if (!filterText) {
      filteredNavigationData = data;
    } else {
      _.each(data, (menuSection, menuSectionKey) => {
        const filteredMenuSection = _.filter(menuSection.screens, (menuItem) => {
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
      filteredNavigationData,
    });
  }

  /** Renders */
  renderHeader() {
    return (
      <View row spread style={{height: Constants.isIOS ? (Constants.isIphoneX ? 80 : 60) : 56}}>
        <TextField
          ref={r => (this.toggledSearch = r)}
          placeholder="Search your component.."
          onChangeText={this.filterExplorerScreens}
          onBlur={this.onSearchBoxBlur}
          onDismiss={this.onSearchBoxBlur}
          value={this.state.filterText}
          style={{
            marginTop: Constants.isIOS ? Constants.statusBarHeight + 10 : 14,
            marginLeft: 16,
            color: ThemeManager.primaryColor,
            width: Constants.screenWidth - 80,
          }}
          hideUnderline
        />
        <Button
          style={{marginRight: 16, marginTop: Constants.isIOS ? Constants.statusBarHeight : 0}}
          iconSource={Assets.icons.search}
          size={'small'}
          onPress={this.onSearchBoxBlur}
          backgroundColor={'transparent'}
        />
      </View>
    );
  }

  renderItem({item}) {
    return (
      <View centerV row paddingL-20 marginB-10>
        <Image source={Assets.icons.chevronRight} style={{tintColor: Colors.dark10}} />
        <Text
          style={[item.deprecate && styles.entryTextDeprecated]}
          dark10
          marginL-10
          text50
          onPress={() => this.openScreen(item)}
        >
          {item.title}
        </Text>
      </View>
    );
  }

  renderBreadcrumbs() {
    const {currentPage} = this.state;
    const data = this.getMenuData();
    const sections = Object.keys(data);

    return (
      <View style={styles.breadcrumbs} row>
        {_.map(data, (section, key) => {
          const index = sections.indexOf(key);
          const isLast = index === sections.length - 1;
          return (
            <View key={key} row centerV>
              <Button
                // link
                size={Button.sizes.xSmall}
                marginB-5
                marginR-5={!isLast}
                text80
                // dark50={currentPage !== index}
                // dark10={currentPage === index}
                // text50
                outline={currentPage !== index}
                label={section.title}
                style={{height: 30}}
                onPress={() => this.carousel.goToPage(index)}
              />
              {/* {!isLast && <Text marginH-5>&middot;</Text>} */}
            </View>
          );
        })}
      </View>
    );
  }

  renderCarousel(data) {
    const dividerTransforms = [-10, -55, -20];
    const dividerWidths = ['60%', '75%', '90%'];
    const keys = _.keys(data);

    return (
      <Carousel onChangePage={this.onChangePage} ref={carousel => (this.carousel = carousel)}>
        {_.map(data, (section, key) => {
          return (
            <View key={key} style={styles.page}>
              <View style={styles.pageTitleContainer}>
                <Text text40>{key}</Text>
              </View>
              <View
                style={[
                  styles.pageTitleExtraDivider,
                  {width: dividerWidths[_.indexOf(keys, key) % dividerWidths.length]},
                  {transform: [{translateX: dividerTransforms[_.indexOf(keys, key) % dividerTransforms.length]}]},
                ]}
              />
              <View flex>
                <FlatList data={section.screens} keyExtractor={item => item.title} renderItem={this.renderItem} />
              </View>
            </View>
          );
        })}
      </Carousel>
    );
  }

  renderSearchResults(data) {
    const flatData = _.flatMap(data);

    return (
      <View paddingH-24>
        <FlatList
          keyboardShouldPersistTaps="always"
          data={flatData}
          keyExtractor={(item, index) => index.toString()}
          renderItem={this.renderItem}
        />
      </View>
    );
  }

  render() {
    const {filteredNavigationData, filterText} = this.state;
    const showNoResults = _.isEmpty(filteredNavigationData) && !!filterText;
    const showResults = !_.isEmpty(filteredNavigationData) && !!filterText;
    const showCarousel = !filterText;
    const data = this.getMenuData();

    return (
      <View flex bg-dark80>
        {this.renderHeader()}
        {showNoResults && (
          <View paddingH-24>
            <Text dark40 text50>
              Sorry, nothing was found. Try Button or something..
            </Text>
          </View>
        )}
        {showCarousel && (
          <View flex useSafeArea>
            {this.renderBreadcrumbs()}
            {this.renderCarousel(data)}
          </View>
        )}
        {showResults && this.renderSearchResults(filteredNavigationData)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  breadcrumbs: {
    padding: 12,
    flexWrap: 'wrap',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  page: {
    width: Constants.screenWidth,
    flex: 1,
    paddingLeft: 24,
  },
  pageTitleContainer: {
    borderBottomWidth: 1,
    paddingBottom: 4,
    borderColor: Colors.dark60,
  },
  pageTitleExtraDivider: {
    marginTop: 5,
    marginBottom: 22,
  },
  entryTextDeprecated: {
    textDecorationLine: 'line-through',
  },
});
