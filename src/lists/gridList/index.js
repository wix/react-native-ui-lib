import React, {PropTypes} from 'react';
import {ListView,
  StyleSheet} from 'react-native';
import {BaseComponent} from '../../commons';
import {Colors} from '../../style';
import Item from './GridListItem';
import NewItem from './GridListNewItem';

class GridList extends BaseComponent {

  static propTypes = {
    ...BaseComponent.propTypes,
    backgroundColor: PropTypes.string,
  }

  static defaultProps = {
    ...BaseComponent.defaultProps,
    backgroundColor: Colors.dark80,
  }

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  render() {
    return (
      <ListView
        {...this.props}
        contentContainerStyle={this.styles.container}
      />
    );
  }
}

GridList.Item = Item;
GridList.NewItem = NewItem;

export default GridList;

function createStyles({backgroundColor}) {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      backgroundColor,
      paddingBottom: 15,
    },
  });
}

