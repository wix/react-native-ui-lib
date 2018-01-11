import React from 'react';
import PropTypes from 'prop-types';
import {ListView, View, StyleSheet} from 'react-native';
import _ from 'lodash';
import {BaseComponent} from '../../commons';
import {Colors} from '../../style';

const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});

/** THIS IS DEPRECATED */
/**
 * GridList component
 */
class GridList extends BaseComponent {
  static displayName = 'IGNORE';
  static propTypes = {
    ...BaseComponent.propTypes,
    backgroundColor: PropTypes.string,
    items: PropTypes.array,
    renderItem: PropTypes.func,
    itemsInRow: PropTypes.number,
  };

  static defaultProps = {
    ...BaseComponent.defaultProps,
    backgroundColor: Colors.dark80,
    items: [],
    itemsInRow: 2,
  };

  constructor(props) {
    super(props);

    this.renderRow = this.renderRow.bind(this);

    const groups = this.generateGroups();
    this.state = {
      dataSource: ds.cloneWithRows(groups),
    };
  }

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  generateGroups() {
    const {items, itemsInRow} = this.props;
    const groups = [];
    for (let i = 0; i < items.length; i += itemsInRow) {
      groups.push(items.slice(i, i + itemsInRow));
    }

    return groups;
  }

  renderRow(row, sectionId, rowId) {
    const {renderItem} = this.props;

    return (
      <View key={rowId} style={this.styles.row}>
        {_.map(row, (item, index) => {
          return renderItem(item, rowId + index);
        })}
      </View>
    );
  }

  render() {
    const {contentContainerStyle, itemsInRow, ...others} = this.props;
    return (
      <ListView
        dataSource={this.state.dataSource}
        pageSize={itemsInRow}
        renderRow={this.renderRow}
        {...others}
        contentContainerStyle={[this.styles.container, contentContainerStyle]}
      />
    );
  }
}

function createStyles({backgroundColor}) {
  return StyleSheet.create({
    container: {
      backgroundColor,
      paddingBottom: 15,
    },
    row: {
      flex: 1,
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
  });
}

export default GridList;
