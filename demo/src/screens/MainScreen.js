import _ from 'lodash';
import React, {Component} from 'react';
import {ListView, StyleSheet, FlatList} from 'react-native';
import autobind from 'react-autobind';
import {Navigation} from 'react-native-navigation';
import {navigationData} from '../menuStructure';
import {
  Constants,
  Assets,
  Colors,
  Typography,
  View,
  Text,
  Button,
  Carousel,
  ListMenu,
  TextInput,
  Image,
} from 'react-native-ui-lib'; //eslint-disable-line


const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
  sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
});

export default class UiLibExplorerMenu extends Component {
  constructor(props) {
    super(props);
    autobind(this);

    this.state = {
      currentPage: 0,
      filteredNavigationData: navigationData,
      dataSource: ds.cloneWithRowsAndSections(navigationData),
    };

    this.filterExplorerScreens = _.throttle(this.filterExplorerScreens, 300);

    Navigation.events().bindComponent(this);

    const navigationStyle = this.getSearchNavigationStyle();
    // navigationStyle.topBar.rightButtons.push({
    //   id: 'uilib.settingsButton',
    //   enabled: true,
    //   icon: Assets.icons.settings,
    // });
    Navigation.mergeOptions(this.props.componentId, navigationStyle);
  }

  componentDidMount() {
    // this.showScreen({name: 'unicorn.PlaygroundScreen', title: 'Playground'});
    // this.openScreen({name: 'unicorn.components.ToastsScreen', title: 'Testing'});
  }

  /** Navigation */
  getSearchNavigationStyle() {
    return {
      topBar: {
        drawBehind: true, // will not work without passing 'translucent: true'
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

    switch (buttonId) {
      // case 'uilib.settingsButton':
      //   this.pushScreen({
      //     name: 'example.Settings',
      //   });
      //   break;
      case 'uilib.searchButton':
        this.toggleTopBar(false);
        break;
      default:
        break;
    }
  };

  toggleTopBar = (shouldShow) => {
    Navigation.mergeOptions(this.props.componentId, {
      topBar: {
        visible: shouldShow,
        animate: true,
      },
    });
  }

  closeSearchBox() {
    this.toggleTopBar(true);
  }

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
  openScreen(row) {
    this.closeSearchBox();

    setImmediate(() => {
      this.filterExplorerScreens('');
    });

    this.pushScreen(row);
  }

  filterExplorerScreens(filterText) {
    let filteredNavigationData = {};
    if (!filterText) {
      filteredNavigationData = navigationData;
    } else {
      _.each(navigationData, (menuSection, menuSectionKey) => {
        const filteredMenuSection = _.filter(menuSection, (menuItem) => {
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
      dataSource: ds.cloneWithRowsAndSections(filteredNavigationData),
    });
  }

  /** Renders */
  renderRow(row) {
    return (
      <ListMenu.Item
        title={row.title}
        onPress={() => this.openScreen(row)}
        description={row.description}
        showAccessoryIndicator
      />
    );
  }

  renderSeparator(sId, id) {
    return <View style={styles.separator} key={'s' + sId + '_' + id}/>;
  }

  renderSectionHeader(sectionData, sectionID) {
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionText}>{sectionID}</Text>
      </View>
    );
  }

  renderHeader() {    
    return (
      <View row spread>
        <TextInput
          ref={r => (this.toggledSearch = r)}
          placeholder="Search your component.."
          onChangeText={this.filterExplorerScreens}
          onBlur={this.onSearchBoxBlur}
          onDismiss={this.onSearchBoxBlur}
          value={this.state.filterText}
          style={{
            height: Constants.isIOS ? 60 : 56,
            marginTop: Constants.isIOS ? Constants.statusBarHeight - 16 : 0,
            marginLeft: 16,
            color: Colors.violet30,
          }}
          hideUnderline
        />
        <Button
          style={{marginRight: 16}}
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
        <Image source={Assets.icons.general.chevronRight} style={{tintColor: Colors.dark10}}/>
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
    const pages = Object.keys(navigationData);
    return (
      <View style={styles.breadcrumbs} row>
        {_.map(pages, (key, index) => {
          const isLast = index === pages.length - 1;
          return (
            <View key={key} row centerV>
              <Button
                link
                dark50={currentPage !== index}
                dark10={currentPage === index}
                text50
                label={key}
                style={{height: 30}}
                onPress={() => this.carousel.goToPage(index)}
              />
              {!isLast && <Text marginH-5>&middot;</Text>}
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
        {_.map(data, (group, key) => {
          return (
            <View key={key} style={styles.page}>
              <View style={styles.pageTitleContainer}>
                <Text text20>{key}</Text>
              </View>
              <View
                style={[
                  styles.pageTitleExtraDivider,
                  {width: dividerWidths[_.indexOf(keys, key) % dividerWidths.length]},
                  {transform: [{translateX: dividerTransforms[_.indexOf(keys, key) % dividerTransforms.length]}]}
                ]}
              />

              <View flex>
                <FlatList data={group} keyExtractor={(item, index) => item.title} renderItem={this.renderItem}/>
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
          keyExtractor={(item, index) => index}
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
            {this.renderCarousel(navigationData)}
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
    borderColor: Colors.dark60,
  },
  pageTitleExtraDivider: {
    borderTopWidth: 1,
    borderColor: Colors.blue70,
    width: '70%',
    marginTop: 5,
    marginBottom: 22,
  },
  text: {
    textAlign: 'left',
    fontSize: 22,
    padding: 20,
  },
  row: {
    height: 56,
    justifyContent: 'center',
  },
  entryTextDeprecated: {
    textDecorationLine: 'line-through',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark70,
  },
  sectionContainer: {
    backgroundColor: Colors.dark20,
    paddingVertical: 4,
    paddingLeft: 12,
  },
  sectionText: {
    ...Typography.text60,
    color: Colors.white,
  },
});
