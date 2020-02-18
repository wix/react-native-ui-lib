import _ from 'lodash';
import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import {StyleSheet} from 'react-native';
import {asBaseComponent, forwardRef} from '../../commons';
import {Colors} from '../../style';
import TouchableOpacity from '../touchableOpacity';
import View from '../view';

const MAX_SHOWN_PAGES = 7;
const NUM_LARGE_INDICATORS = 3;
const DEFAULT_INDICATOR_COLOR = Colors.blue30;

function getColorStyle(color, inactiveColor, isCurrentPage) {
  const activeColor = color || DEFAULT_INDICATOR_COLOR;
  return {
    borderColor: isCurrentPage ? activeColor : inactiveColor || activeColor,
    backgroundColor: isCurrentPage ? activeColor : inactiveColor || 'transparent'
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
class PageControl extends PureComponent {
  static displayName = 'PageControl';
  static propTypes = {
    /**
     * Limit the number of page indicators shown.
     * enlargeActive prop is disabled in this state,
     * When set to true there will be maximum of 7 shown.
     * Only relevant when numOfPages > 5.
     */
    limitShownPages: PropTypes.bool,
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
     * The size of the page indicator.
     * When setting limitShownPages the medium sized will be 2/3 of size and the small will be 1/3 of size.
     * An alternative is to send an array [smallSize, mediumSize, largeSize].
     */
    size: PropTypes.oneOfType([PropTypes.number, PropTypes.array]),
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

  static DEFAULT_SIZE = 10;
  static DEFAULT_SPACING = 4;

  static defaultProps = {
    enlargeActive: false
  };

  constructor(props) {
    super(props);

    this.state = {
      numOfPagesShown: Math.min(MAX_SHOWN_PAGES, props.numOfPages),
      largeIndicatorsOffset: 0,
      pagesOffset: 0,
      prevPage: undefined
    };

    if (Array.isArray(props.size)) {
      if (props.size[0] >= props.size[1] || props.size[1] >= props.size[2]) {
        console.warn('It is recommended that largeSize > mediumSize > smallSize, currently: smallSize=',
          props.size[0],
          'mediumSize=',
          props.size[1],
          'largeSize=',
          props.size[2]);
      }
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    const {currentPage} = nextProps;
    const {largeIndicatorsOffset: prevLargeIndicatorsOffset, prevPage} = prevState;
    const newState = {};

    if (currentPage !== prevPage) {
      newState.prevPage = currentPage;
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
    const {numOfPages} = this.props;
    let mediumSize,
      smallSize,
      {size = PageControl.DEFAULT_SIZE} = this.props;
    if (Array.isArray(size)) {
      smallSize = size[0];
      mediumSize = size[1];
      size = size[2];
    } else {
      mediumSize = (size * 2) / 3;
      smallSize = size / 3;
    }

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

  onPagePress = ({index}) => {
    _.invoke(this.props, 'onPagePress', index);
  };

  renderIndicator(index, size, enlargeActive) {
    const {currentPage, color, inactiveColor, onPagePress, spacing = PageControl.DEFAULT_SPACING} = this.props;
    return (
      <TouchableOpacity
        index={index}
        onPress={onPagePress && this.onPagePress}
        key={index}
        style={[
          styles.pageIndicator,
          {marginHorizontal: spacing / 2},
          getColorStyle(color, inactiveColor, index === currentPage),
          getSizeStyle(size, enlargeActive, index, currentPage)
        ]}
      />
    );
  }

  renderDifferentSizeIndicators() {
    const {numOfPagesShown, pagesOffset} = this.state;

    return _.map(_.times(numOfPagesShown), index => {
      const adjustedIndex = index + pagesOffset;
      const adjustedSize = this.getSize(adjustedIndex);
      if (adjustedSize) {
        return this.renderIndicator(adjustedIndex, adjustedSize, false);
      } else {
        return null;
      }
    });
  }

  renderSameSizeIndicators() {
    const {numOfPages, size: sizeFromProps = PageControl.DEFAULT_SIZE, enlargeActive} = this.props;
    const size = Array.isArray(sizeFromProps) ? sizeFromProps[2] : sizeFromProps;

    return _.map(_.times(numOfPages), index => this.renderIndicator(index, size, enlargeActive));
  }

  render() {
    const {containerStyle} = this.props;

    return (
      <View style={[styles.container, containerStyle]} inaccessible>
        {this.showLimitedVersion(this.props) ? this.renderDifferentSizeIndicators() : this.renderSameSizeIndicators()}
      </View>
    );
  }
}

export default asBaseComponent(forwardRef(PageControl));

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
