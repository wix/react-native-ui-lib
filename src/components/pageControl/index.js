import React from 'react';
import PropTypes from 'prop-types';
import {View, StyleSheet} from 'react-native';
import _ from 'lodash';
import * as Constants from '../../helpers/Constants';
import {ThemeManager} from '../../style';
import {BaseComponent} from '../../commons';
import TouchableOpacity from '../touchableOpacity';

function getColorStyle(color, index, currentPage) {
  const compColor = color || ThemeManager.primaryColor;
  return {borderColor: compColor, backgroundColor: (index === currentPage) ? compColor : 'transparent'};
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
     * Color of the selected page dot and the border of the not selected pages
     */
    color: PropTypes.string,
    /**
     * The size of the page indicator
     */
    size: PropTypes.number,
  };

  generateStyles() {
    this.styles = createStyles(this.props.size);
  }

  render() {
    const {numOfPages, currentPage, color, containerStyle, onPagePress} = this.props;
    return (
      <View style={[this.styles.container, containerStyle]}>
        {
          _.map([...new Array(numOfPages)], (item, index) =>
            <TouchableOpacity
              disabled={_.isUndefined(onPagePress)}
              onPress={() => onPagePress && onPagePress(index)}
              key={index}
              style={[this.styles.pageIndicator, getColorStyle(color, index, currentPage)]}
            />)
        }
      </View>
    );
  }
}

function createStyles(size = 10) {
  return StyleSheet.create({
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    pageView: {
      width: Constants.screenWidth,
      height: Constants.screenHeight,
    },
    pageIndicator: {
      backgroundColor: 'transparent',
      borderWidth: 1,
      marginRight: 2,
      marginLeft: 2,
      width: size,
      height: size,
      borderRadius: size / 2,
    },
  });
}
