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
function PageControl({containerStyle, numOfPages, currentPage, onPagePress, color}) {
  return (
    <View style={[styles.container, containerStyle]}>
      {
        _.map([...new Array(numOfPages)], (item, index) =>
          <TouchableOpacity
            onPress={() => onPagePress && onPagePress(index)}
            key={index}
            style={[styles.pageIndicator, getColorStyle(color, index, currentPage)]}
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
   * Color of the selected page and the border of the not selected pages
   */
  color: React.PropTypes.string,
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});

export default PageControl;
