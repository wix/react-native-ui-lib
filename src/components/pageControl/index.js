import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet} from 'react-native';
import {ThemeManager} from '../../style';
import {BaseComponent} from '../../commons';
import TouchableOpacity from '../touchableOpacity';
import View from '../view';

function getColorStyle(color, inactiveColor, index, currentPage) {
  const compColor = color || ThemeManager.primaryColor;
  return {
    borderColor: index === currentPage ? compColor : inactiveColor || compColor,
    backgroundColor: index === currentPage ? compColor : inactiveColor || 'transparent'
  };
}

function getSizeStyle(size, enlargeActive, index, currentPage) {
  const temp = enlargeActive ? (index === currentPage ? size + 2 : size) : size;
  return {width: temp, height: temp, borderRadius: temp / 2};
}

/**
 * @description: Page indicator, typically used in paged scroll-views
 * @image: https://user-images.githubusercontent.com/33805983/34663655-76698110-f460-11e7-854b-243d27f66fec.png
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/PageControlScreen.js
 */
export default class PageControl extends BaseComponent {
  static displayName = 'PageControl';
  static propTypes = {
    /**
     * Additional styles for the top container
     */
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    /**
     * Total number of pages
     */
    numOfPages: PropTypes.number,
    /**
     * Zero-based index of the current page
     */
    currentPage: PropTypes.number,
    /**
     * Action handler for clicking on a page indicator
     */
    onPagePress: PropTypes.func,
    /**
     * Color of the selected page dot and, if inactiveColor not passed, the border of the not selected pages
     */
    color: PropTypes.string,
    /**
     * Color of the unselected page dots and the border of the not selected pages
     */
    inactiveColor: PropTypes.string,
    /**
     * The size of the page indicator
     */
    size: PropTypes.number,
    /**
     * Whether to enlarge the active page indicator
     */
    enlargeActive: PropTypes.bool,
    /**
     * The space between the siblings page indicators
     */
    spacing: PropTypes.number
  };

  static defaultProps = {
    size: 10,
    spacing: 4,
    enlargeActive: false
  };

  render() {
    const {
      numOfPages,
      currentPage,
      color,
      inactiveColor,
      containerStyle,
      onPagePress,
      size,
      spacing,
      enlargeActive
    } = this.props;

    return (
      <View
        style={[styles.container, containerStyle]}
        accessible
        accessibilityLabel={`page control page ${this.props.currentPage + 1}`}
      >
        {_.map([...new Array(numOfPages)], (item, index) => (
          <TouchableOpacity
            disabled={_.isUndefined(onPagePress)}
            onPress={() => onPagePress && onPagePress(index)}
            key={index}
            style={[
              styles.pageIndicator,
              {marginRight: spacing / 2, marginLeft: spacing / 2},
              getColorStyle(color, inactiveColor, index, currentPage),
              getSizeStyle(size, enlargeActive, index, currentPage)
            ]}
          />
        ))}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center'
  },
  pageIndicator: {
    backgroundColor: 'transparent',
    borderWidth: 1
  }
});
