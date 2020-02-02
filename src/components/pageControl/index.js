import _ from 'lodash';
import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import {StyleSheet} from 'react-native';
import {ThemeManager} from '../../style';
import TouchableOpacity from '../touchableOpacity';
import View from '../view';

const MAX_SHOWN_PAGES = 7;
const NUM_LARGE_INDICATORS = 3;

function getColorStyle(color, inactiveColor, isCurrentPage) {
  const compColor = color || ThemeManager.primaryColor;
  return {
    borderColor: isCurrentPage ? compColor : inactiveColor || compColor,
    backgroundColor: isCurrentPage ? compColor : inactiveColor || 'transparent'
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
export default class PageControl extends PureComponent {
  static displayName = 'PageControl';
  static propTypes = {
    /**
     * Limit the number of page indicators shown.
     * enlargeActive prop is disabled in this state,
     * while mediumSize and smallSize are enabled (and disabled when this is disabled).
     * When set to true there will be maximum of 7 shown.
     * Only relevant when numOfPages > 5.
     */
    limitShownPages: PropTypes.bool,
    /**
     * Size of page indicator to the sides of the regular one.
     * Only relevant when limitShownPages is in effect.
     */
    mediumSize: PropTypes.number,
    /**
     * Size of page indicator to the side of the medium one (on other side of the regular one).
     * Only relevant when limitShownPages is in effect.
     */
    smallSize: PropTypes.number,
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
     * Irrelevant when limitShownPages is in effect.
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

  constructor(props) {
    super(props);

    this.state = {
      numOfPagesShown: Math.min(MAX_SHOWN_PAGES, props.numOfPages),
      largeIndicatorsOffset: 0,
      pagesOffset: 0,
      isReverse: false,
      prevPage: undefined
    };

    if (this.showLimitedVersion(props)) {
      const {smallSize, mediumSize, size} = props;
      if (mediumSize >= size || smallSize >= mediumSize) {
        console.warn('It is recommended that size > mediumSize > smallSize, currently: size=',
          size,
          'mediumSize=',
          mediumSize,
          'smallSize=',
          smallSize);
      }
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {currentPage} = nextProps;
    const {largeIndicatorsOffset: prevLargeIndicatorsOffset, isReverse: prevIsReverse, prevPage} = prevState;
    const newState = {};

    if (currentPage !== prevPage) {
      newState.prevPage = currentPage;
      const isReverse = currentPage - prevPage < 0;
      if (prevIsReverse !== isReverse) {
        newState.isReverse = isReverse;
      }

      if (currentPage >= prevLargeIndicatorsOffset + NUM_LARGE_INDICATORS) {
        newState.pagesOffset = Math.max(0, currentPage - NUM_LARGE_INDICATORS - 1);
        newState.largeIndicatorsOffset = currentPage - NUM_LARGE_INDICATORS + 1;
      } else if (currentPage < prevLargeIndicatorsOffset) {
        newState.pagesOffset = Math.max(0, currentPage - 2);
        newState.largeIndicatorsOffset = currentPage;
      }
    }

    return _.isEmpty(newState) ? null : newState;
  }

  showLimitedVersion({limitShownPages, numOfPages}) {
    return limitShownPages && numOfPages > 5;
  }

  getSize(index) {
    const {largeIndicatorsOffset} = this.state;
    const {numOfPages, size, smallSize, mediumSize} = this.props;
    if (index < 0 || index > numOfPages - 1) {
      return undefined;
    } else if (index >= largeIndicatorsOffset && index < largeIndicatorsOffset + NUM_LARGE_INDICATORS) {
      return size;
    } else if (index === largeIndicatorsOffset - 1 || index === largeIndicatorsOffset + NUM_LARGE_INDICATORS) {
      return mediumSize;
    } else if (index === largeIndicatorsOffset - 2 || index === largeIndicatorsOffset + NUM_LARGE_INDICATORS + 1) {
      return smallSize;
    }
  }

  renderDifferentSizeIndicators() {
    const {numOfPagesShown, pagesOffset} = this.state;
    const {currentPage, color, inactiveColor, onPagePress, spacing} = this.props;

    return _.map([...new Array(numOfPagesShown)], (item, index) => {
      const adjustedIndex = index + pagesOffset;
      const adjustedSize = this.getSize(adjustedIndex);
      if (adjustedSize) {
        return (
          <TouchableOpacity
            disabled={_.isUndefined(onPagePress)}
            onPress={() => onPagePress && onPagePress(adjustedIndex)}
            key={adjustedIndex}
            style={[
              styles.pageIndicator,
              {marginRight: spacing / 2, marginLeft: spacing / 2},
              getColorStyle(color, inactiveColor, adjustedIndex === currentPage),
              getSizeStyle(adjustedSize, false, adjustedIndex, currentPage)
            ]}
          />
        );
      } else {
        return null;
      }
    });
  }

  renderSameSizeIndicators() {
    const {numOfPages, currentPage, color, inactiveColor, onPagePress, size, spacing, enlargeActive} = this.props;

    return _.map([...new Array(numOfPages)], (item, index) => (
      <TouchableOpacity
        disabled={_.isUndefined(onPagePress)}
        onPress={() => onPagePress && onPagePress(index)}
        key={index}
        style={[
          styles.pageIndicator,
          {marginRight: spacing / 2, marginLeft: spacing / 2},
          getColorStyle(color, inactiveColor, index === currentPage),
          getSizeStyle(size, enlargeActive, index, currentPage)
        ]}
      />
    ));
  }

  render() {
    const {containerStyle} = this.props;

    return (
      <View
        style={[styles.container, containerStyle]}
        accessible
        accessibilityLabel={`page control page ${this.props.currentPage + 1}`}
      >
        {this.showLimitedVersion(this.props) ? this.renderDifferentSizeIndicators() : this.renderSameSizeIndicators()}
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
