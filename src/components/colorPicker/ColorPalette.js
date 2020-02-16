import _ from 'lodash';
import PropTypes from 'prop-types';
import memoize from 'memoize-one';
import React from 'react';
import {StyleSheet, UIManager, findNodeHandle} from 'react-native';
import {Constants} from '../../helpers';
import {Colors} from '../../style';
import {PureBaseComponent} from '../../commons';
import View from '../view';
import Carousel from '../carousel';
import PageControl from '../pageControl';
import ColorSwatch, {SWATCH_SIZE} from './ColorSwatch';
import ScrollBar from '../scrollBar';


const VERTICAL_PADDING = 16;
const HORIZONTAL_PADDING = 20;
const MINIMUM_MARGIN = 16;
const SCROLLABLE_HEIGHT = 92;
const DEFAULT_NUMBER_OF_ROWS = 3;

/**
 * @description: A color palette component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ColorPickerScreen.js
 * @notes: This is a screen width component
 */
export default class ColorPalette extends PureBaseComponent {
  static displayName = 'ColorPalette';

  static propTypes = {
    /**
     * Array of colors to render in the palette
     */
    colors: PropTypes.arrayOf(PropTypes.string).isRequired,
    /**
     * Style to pass the palette container
     */
    containerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    /**
     * The container margins
     */
    containerWidth: PropTypes.number,
    /**
     * Whether to use pagination when number of colors exceeds the number of rows
     */
    usePagination: PropTypes.bool,
    /**
     * Whether the colors pagination scrolls in a loop
     */
    loop: PropTypes.bool,
    /**
     * The number of color rows from 2 to 5
     */
    numberOfRows: PropTypes.number,
    /**
     * Style to pass all the ColorSwatches in the palette
     */
    swatchStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    /**
     * The value of the selected swatch
     */
    value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool]),
    /**
     * The index of the item to animate at first render (default is last)
     */
    animatedIndex: PropTypes.number,
    /**
     * Invoked once when value changes by selecting one of the swatches in the palette
     */
    onValueChange: PropTypes.func
  };

  static defaultProps = {
    numberOfRows: DEFAULT_NUMBER_OF_ROWS,
    usePagination: true,
    loop: true
  };

  constructor(props) {
    super(props);

    this.state = {
      currentPage: 0,
      scrollable: false
    };

    this.carousel = React.createRef();
    this.scrollBar = React.createRef();
    this.initLocalVariables();
  }

  componentDidMount() {
    Constants.addDimensionsEventListener(this.onOrientationChanged);
  }

  componentWillUnmount() {
    Constants.removeDimensionsEventListener(this.onOrientationChanged);
  }

  onOrientationChanged = () => {
    this.initLocalVariables();
    this.setState({orientation: Constants.orientation}); // only to trigger render
  }

  initLocalVariables() {
    this.itemsRefs = undefined;
    this.selectedColorIndex = undefined;
    this.selectedPage = undefined;
    this.currentColorsCount = this.colors.length;
    this.itemsPerRow = this.getItemsPerRow();
    this.itemsPerPage = this.itemsPerRow * this.getNumberOfRows();
    this.usePagination = this.shouldUsePagination();
    this.innerMargin = this.getInnerMargin();
    this.swatchStyle = [];
  }

  get value() {
    const {value} = this.props;

    if (Colors.isTransparent(value)) {
      return value;
    }
    return _.toUpper(value);
  }

  get colors() {
    return this.getUniqueColors(this.props.colors);
  }

  get containerWidth() {
    const {containerWidth} = this.getThemeProps();
    return containerWidth || Constants.screenWidth;
  }

  getUniqueColors = memoize(
    (colors) => {
      const c = _.map(colors, color => {
        if (Colors.isTransparent(color)) {
          return color;
        }
        return _.toUpper(color);
      });
      return _.uniq(c);
    }
  );

  getNumberOfRows() {
    const {numberOfRows} = this.props;

    if (!_.inRange(numberOfRows, 2, 6)) {
      console.warn(`${numberOfRows} is not within valid range of color rows (2 to 5); defaulting to ${DEFAULT_NUMBER_OF_ROWS}.`);
      return DEFAULT_NUMBER_OF_ROWS;
    }
    return numberOfRows;
  }

  getItemsPerRow() {
    let itemsPerRow = 1;
    // first item has the page's padding around it
    const firstItemWidth = 2 * HORIZONTAL_PADDING + SWATCH_SIZE;
    // additional items have the minimum width of the margin between them and the previous item's width
    const additionalItemMinimumWidth = SWATCH_SIZE + MINIMUM_MARGIN;
    // floor(space left / size of additional items)
    itemsPerRow += Math.floor((this.containerWidth - firstItemWidth) / additionalItemMinimumWidth);

    return itemsPerRow;
  }

  shouldUsePagination() {
    const {usePagination} = this.props;
    return usePagination && this.colors.length > this.itemsPerPage;
  }

  getInnerMargin() {
    if (!this.usePagination) {
      return HORIZONTAL_PADDING / 2;
    }

    // Now that we have the itemsPerRow set, we can calculate the actual innerMargin
    const remainingSpace = this.containerWidth - this.itemsPerRow * SWATCH_SIZE - 2 * HORIZONTAL_PADDING;
    // With pagination - there's 1 less space than the number of items
    const numberOfMargins = this.itemsPerRow - 1;
    const margin = remainingSpace / numberOfMargins;
    // We have to subtract something since otherwise some Android devices will overflow into the next line
    return (margin - 0.001) / 2;
  }

  scrollToSelected() {
    const {scrollable, currentPage} = this.state;

    if (scrollable && this.selectedColorIndex !== undefined) {
      const childRef = this.itemsRefs[this.selectedColorIndex];
      
      if (childRef) {
        const handle = findNodeHandle(childRef);
        if (handle) {
          UIManager.measureLayoutRelativeToParent(handle,
            e => {
              console.warn(e);
            },
            (x, y, w, h) => {
              if (x + w > this.containerWidth) {
                this.scrollBar.current.scrollTo({
                  x: x + w + HORIZONTAL_PADDING - this.containerWidth,
                  y: 0,
                  animated: false
                });
              }
            });
        }
      }
    } else if (this.usePagination) {
      this.carousel.current.goToPage(this.selectedPage || currentPage, false);
    }
  }

  onContentSizeChange = contentWidth => {
    this.setState({scrollable: contentWidth > this.containerWidth, contentWidth});
  };

  onChangePage = index => {
    this.setState({currentPage: index});
  };

  onValueChange = (value, options) => {
    _.invoke(this.props, 'onValueChange', value, options);
  };

  onLayout = () => {
    setTimeout(() => {
      this.scrollToSelected();
    }, 0);
  };

  getHorizontalMargins = (index) => {
    const isFirst = index === 0;
    const isOnLeft = isFirst || index % this.itemsPerRow === 0;
    const isOnRight = index % this.itemsPerRow === this.itemsPerRow - 1;
    
    let marginLeft;
    let marginRight;

    if (this.usePagination) {
      marginLeft = isOnLeft ? 0 : this.innerMargin;
      marginRight = isOnRight ? 0 : this.innerMargin;
    } else {
      const isLast = index === this.colors.length - 1;
      marginLeft = isFirst ? 8 : this.innerMargin;
      marginRight = isLast ? 20 : this.innerMargin;
    }

    return {marginLeft, marginRight};
  };

  getSwatchStyle = (index) => {
    const sizeHasChanged = this.colors.length !== this.currentColorsCount;
    const isNextToLastIndex = index === this.colors.length - 2;

    // Need to update the next to last item because it's margin needs to changed
    if (_.isUndefined(this.swatchStyle[index]) || (!this.usePagination && sizeHasChanged && isNextToLastIndex)) {
      this.swatchStyle[index] = {...this.getHorizontalMargins(index), ...this.props.swatchStyle};
      if (sizeHasChanged && isNextToLastIndex) {
        this.currentColorsCount = this.colors.length;
      }
    }

    return this.swatchStyle[index];
  };

  renderColorSwatch(color, index) {
    const {animatedIndex, testID} = this.props;

    return (
      <ColorSwatch
        style={this.getSwatchStyle(index)}
        index={index}
        key={color}
        color={color}
        value={color}
        selected={this.value === color}
        animated={index === animatedIndex}
        onPress={this.onValueChange}
        ref={r => (this.itemsRefs[index] = r)}
        testID={`${testID}-${color}`}
      />
    );
  }

  renderPalette(props, contentStyle, colors, pageIndex) {
    const {style, ...others} = props;
    this.itemsRefs = [];

    return (
      <View key={pageIndex} {...others} style={[styles.paletteContainer, contentStyle, style]} onLayout={this.onLayout}>
        {_.map(colors, (color, i) => {
          if (color === this.value) {
            this.selectedColorIndex = i;
            this.selectedPage = pageIndex;
          }
          return this.renderColorSwatch(color, i);
        })}
      </View>
    );
  }

  renderScrollableContent() {
    const {containerStyle, ...others} = this.props;
    const {scrollable, contentWidth} = this.state;

    return (
      <ScrollBar
        ref={this.scrollBar}
        style={[containerStyle, styles.scrollContainer]}
        scrollEnabled={scrollable}
        onContentSizeChange={this.onContentSizeChange}
        height={SCROLLABLE_HEIGHT}
        containerProps={{width: !scrollable ? contentWidth : undefined}}
        gradientHeight={SCROLLABLE_HEIGHT - 12}
      >
        {this.renderPalette(others, styles.scrollContent, this.colors)}
      </ScrollBar>
    );
  }

  renderPaginationContent() {
    const {containerStyle, loop, ...others} = this.props;
    const {currentPage} = this.state;
    const colorGroups = _.chunk(this.colors, this.itemsPerPage);

    return (
      <View center style={[containerStyle, styles.paginationContainer]}>
        <Carousel migrate loop={loop} onChangePage={this.onChangePage} ref={this.carousel}>
          {_.map(colorGroups, (colorsPerPage, index) => {
            return this.renderPalette(others, {...styles.page, width: this.containerWidth}, colorsPerPage, index);
          })}
        </Carousel>
        <PageControl
          size={6}
          color={Colors.dark10}
          inactiveColor={Colors.dark50}
          spacing={8}
          numOfPages={colorGroups.length}
          currentPage={currentPage}
        />
      </View>
    );
  }

  render() {
    return this.usePagination ? this.renderPaginationContent() : this.renderScrollableContent();
  }
}

const styles = StyleSheet.create({
  paletteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: HORIZONTAL_PADDING,
    paddingVertical: VERTICAL_PADDING
  },
  paginationContainer: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingBottom: VERTICAL_PADDING
  },
  scrollContainer: {
    backgroundColor: Colors.white
  },
  page: {
    flexWrap: 'wrap'
  },
  scrollContent: {
    height: SCROLLABLE_HEIGHT,
    paddingLeft: 12
  }
});
