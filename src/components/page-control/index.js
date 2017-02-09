import React, {PropTypes} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import _ from 'lodash';
import * as Constants from '../../helpers/Constants';
import {ThemeManager} from '../../style';

function getColorStyle(color, index, currentPage) {
  const compColor = color || ThemeManager.primaryColor;
  return {borderColor: compColor, backgroundColor: (index === currentPage) ? compColor : 'transparent'};
}

/**
 * Page indicator, typically used in paged scroll-views
 */
function PageControl({containerStyle, numOfPages, currentPage, onPagePress, color, size = 10}) {
  const style = createStyles(size);
  return (
    <View style={[style.container, containerStyle]}>
      {
        _.map([...new Array(numOfPages)], (item, index) =>
          <TouchableOpacity
            disabled={_.isUndefined(onPagePress)}
            onPress={() => onPagePress && onPagePress(index)}
            key={index}
            style={[style.pageIndicator, getColorStyle(color, index, currentPage)]}
          />)
      }
    </View>
  );
}

PageControl.displayName = 'PageControl';
PageControl.propTypes = {
  /**
   * Additional styles for the top container
   */
  containerStyle: PropTypes.object,
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
  color: React.PropTypes.string,
  /**
   * The size of the page indicator
   */
  size: PropTypes.number,
};

function createStyles(size) {
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

export default PageControl;
