import React from 'react';
import PropTypes from 'prop-types';
import {StyleSheet} from 'react-native';
import {BaseComponent} from '../../commons';
import View from '../view';

/**
 * @description: ListItem.Part, a sub ListItem component for layout-ing inside a ListItem
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/BasicListScreen.js
 */
export default class ListItemPart extends BaseComponent {
  static displayName = 'ListItem.Part';
  static propTypes = {
    /**
     * this part content will be aligned to left
     */
    left: PropTypes.bool,
    /**
     * this part content will be aligned to spreaded
     */
    middle: PropTypes.bool,
    /**
     * this part content will be aligned to right
     */
    right: PropTypes.bool,
    /**
     * this part content direction will be row (default)
     */
    row: PropTypes.bool,
    /**
     * this part content direction will be column
     */
    column: PropTypes.bool,
    /**
     * container style
     */
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array])
  };

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  render() {
    const {containerStyle, ...others} = this.props;
    return (
      <View style={[this.styles.container, containerStyle]} {...others}>
        {this.props.children}
      </View>
    );
  }
}

function createStyles({left, right, middle, column}) {
  let justifyContent;
  if (!column) {
    justifyContent = 'space-between';
    if (left) {
      justifyContent = 'flex-start';
    }
    if (right) {
      justifyContent = 'flex-end';
    }
    if (middle) {
      justifyContent = 'space-between';
    }
  } else {
    justifyContent = 'center';
  }

  return StyleSheet.create({
    container: {
      flexDirection: column ? undefined : 'row',
      flex: middle ? 1 : 0,
      justifyContent,
      alignItems: column ? undefined : 'center'
    }
  });
}
