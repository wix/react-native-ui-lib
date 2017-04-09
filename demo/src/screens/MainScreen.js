import React, {Component, PropTypes} from 'react';
import {TouchableOpacity, View, Text, ListView, StyleSheet} from 'react-native';
import _ from 'lodash';
import autobind from 'react-autobind';
import {Colors, Typography} from 'react-native-ui-lib';//eslint-disable-line
import {navigationData} from '../menuStructure';

const ds = new ListView.DataSource({
  rowHasChanged: (r1, r2) => r1 !== r2,
  sectionHeaderHasChanged: (s1, s2) => s1 !== s2,
});

export default class UiLibExplorerMenu extends Component {

  static propTypes = {
    navigator: PropTypes.object,
  };

  constructor(props) {
    super(props);
    autobind(this);
    this.state = {
      dataSource: ds.cloneWithRowsAndSections(navigationData),
    };
  }

  componentDidMount() {
    this.props.navigator.push({screen: 'example.lists.BasicListScreen'});
  }

  openScreen(row) {
    const {navigator} = this.props;
    navigator.push({
      screen: row.screen,
      title: row.title,
      // overrideBackPress: row.overrideBackPress,
      backButtonTitle: '',
    });
  }

  filterExplorerScreens(filterText) {
    let filteredNavigationData = {};
    if (!filterText) {
      filteredNavigationData = navigationData;
    } else {
      _.each(navigationData, (menuSection, menuSectionKey) => {
        const filteredMenuSection = _.filter(menuSection, (menuItem) => {
          const {title, description, tags} = menuItem;

          return _.includes(_.lowerCase(title), _.toLower(filterText)) ||
            _.includes(_.toLower(description), _.toLower(filterText)) ||
            _.includes(_.toLower(tags), _.toLower(filterText));
        });

        if (!_.isEmpty(filteredMenuSection)) {
          filteredNavigationData[menuSectionKey] = filteredMenuSection;
        }
      });
    }

    this.setState({
      dataSource: ds.cloneWithRowsAndSections(filteredNavigationData),
    });
  }

  renderSectionHeader(sectionData, sectionID) {
    return (
      <View style={styles.sectionContainer}>
        <Text style={styles.sectionText}>{sectionID}</Text>
      </View>
    );
  }

  renderSeparator(sId, id) {
    return (<View style={styles.separator} key={`s${sId}_${id}`} />);
  }

  renderRow(row) {
    return (
      <TouchableOpacity
        style={{justifyContent: 'center', paddingVertical: 20, paddingHorizontal: 25}}
        onPress={() => this.openScreen(row)}
      >
        <Text>
          {row.title}
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <ListView
        dataSource={this.state.dataSource}
        renderRow={this.renderRow}
        renderSeparator={this.renderSeparator}
        renderSectionHeader={this.renderSectionHeader}
      />
    );
  }
}

const styles = StyleSheet.create({
  text: {
    textAlign: 'left',
    fontSize: 22,
    padding: 20,
  },
  row: {
    height: 56,
    justifyContent: 'center',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark70,
  },
  sectionContainer: {
    backgroundColor: Colors.violet40,
    paddingVertical: 4,
    paddingLeft: 12,
  },
  sectionText: {
    ...Typography.text60,
    color: Colors.white,
  },
});
