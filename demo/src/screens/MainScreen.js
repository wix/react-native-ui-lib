import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {TouchableOpacity, Text, ListView, StyleSheet} from 'react-native';
import _ from 'lodash';
import autobind from 'react-autobind';
import {Colors, Typography, View, TextInput} from 'react-native-ui-lib';//eslint-disable-line
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

  openScreen(row) {
    const {navigator} = this.props;
    navigator.push({
      screen: row.screen,
      title: row.title,
      // overrideBackPress: row.overrideBackPress,
      backButtonTitle: '',
    });
    this.filterExplorerScreens('');
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
      filterText,
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

  renderRow(row, index) {
    return (
      <TouchableOpacity
        testID={index}
        style={{justifyContent: 'center', paddingVertical: 20, paddingHorizontal: 25}}
        onPress={() => this.openScreen(row)}
      >
        <Text text70>
          {row.title}
        </Text>
      </TouchableOpacity>
    );
  }

  render() {
    return (
      <View flex>
        <View style={{marginLeft: 20, marginTop: 20}} >
          <TextInput
            style={styles.textInput}
            value={this.state.filterText}
            hideUnderline
            text80
            placeholder="Search your component.."
            onChangeText={this.filterExplorerScreens}
          />
        </View>
        <ListView
          dataSource={this.state.dataSource}
          renderRow={this.renderRow}
          renderSeparator={this.renderSeparator}
          renderSectionHeader={this.renderSectionHeader}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  row: {
    height: 56,
    justifyContent: 'center',
  },
  separator: {
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark70,
  },
  sectionContainer: {
    backgroundColor: Colors.violet30,
    paddingVertical: 4,
    paddingLeft: 12,
  },
  sectionText: {
    ...Typography.text70,
    color: Colors.white,
  },
  textInput: {
    textAlign: 'left',
    fontSize: 15,
  },
});
