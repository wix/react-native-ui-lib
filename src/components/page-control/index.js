import React, {PropTypes} from 'react';
import {View, StyleSheet, TouchableOpacity} from 'react-native';
import _ from 'lodash';
import * as Constants from '../../helpers/Constants';
import {Colors} from '../../style';

/**
 * Page indicator, typically used in paged scroll-views
 */
function PageControl({containerStyle, numOfPages, currentPage, onPagePress}) {
  return (
    <View style={[styles.container, containerStyle]}>
      {
        _.map([...new Array(numOfPages)], (item, index) =>
          <TouchableOpacity
            onPress={() => onPagePress && onPagePress(index)}
            key={index}
            style={[styles.pageIndicator, {backgroundColor: (index === currentPage) ? Colors.dark30 : 'transparent'}]}
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
    borderColor: Colors.dark30,
    borderWidth: 1,
    marginRight: 2,
    marginLeft: 2,
    width: 10,
    height: 10,
    borderRadius: 5,
  },
});

export default PageControl;
