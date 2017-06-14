import React from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import PropTypes from 'prop-types';
import View from '../view';
import Text from '../text';
import {Colors, Typography} from '../../style';
import {BaseComponent} from '../../commons';
import {Constants} from '../../helpers';

/**
 * @description: TabBarItem inner component of TabBar
 */
export default class TabBarItem extends BaseComponent {
  static displayName = 'TabBarItem';

  static propTypes = {
    /**
     * label of the tab
     */
    label: PropTypes.string,
    /**
     * custom label style
     */
    labelStyle: Text.propTypes.style,
    /**
     * custom selected tab label style
     */
    selectedLabelStyle: Text.propTypes.style,
    /**
     * whether the tab is selected or not
     */
    selected: PropTypes.bool,
    /**
     * callback for when pressing a tab
     */
    onPress: PropTypes.func,
  }

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  render() {
    const {label, labelStyle, selected, selectedLabelStyle, onPress} = this.props;
    return (
      <View flex center>
        <TouchableOpacity
          activeOpacity={1}
          onPress={onPress}
        >
          <Text
            style={[
              this.styles.label,
              labelStyle, selected && this.styles.labelSelected,
              selected && selectedLabelStyle]}
          >
            {label}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

function createStyles() {
  return StyleSheet.create({
    container: {
    },
    label: {
      color: Colors.dark10,
      ...Typography.text90,
    },
    labelSelected: {
      color: Colors.blue30,
      fontWeight: Constants.isIOS ? '600' : '700',
    },
  });
}
