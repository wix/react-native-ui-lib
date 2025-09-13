import _chunk from "lodash/chunk";
import _isUndefined from "lodash/isUndefined";
import _inRange from "lodash/inRange";
import _uniq from "lodash/uniq";
import _map from "lodash/map";
import _toUpper from "lodash/toUpper";
import _times from "lodash/times";
import memoize from 'memoize-one';
import React, { PureComponent } from 'react';
import { StyleSheet } from 'react-native';
import { Colors } from "../../style";
import { Constants } from "../../commons/new";
import View from "../view";
import Carousel from "../carousel";
import ScrollBar from "../scrollBar";
import PageControl from "../pageControl";
import ColorSwatch, { SWATCH_SIZE, SWATCH_MARGIN } from "../colorSwatch";
const VERTICAL_PADDING = 16;
const HORIZONTAL_PADDING = 20;
const MINIMUM_MARGIN = 16;
const SCROLLABLE_HEIGHT = 92;
const DEFAULT_NUMBER_OF_ROWS = 3;

/**
 * @description: A color palette component
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ColorPickerScreen.tsx
 * @notes: This is a screen width component
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/ColorPalette/ColorPalette.gif?raw=true
 */
class ColorPalette extends PureComponent {
  static displayName = 'ColorPalette';
  static defaultProps = {
    numberOfRows: DEFAULT_NUMBER_OF_ROWS,
    usePagination: true,
    loop: true,
    backgroundColor: Colors.$backgroundDefault
  };
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 0,
      scrollable: false,
      orientation: undefined,
      contentWidth: undefined
    };
    this.initLocalVariables();
  }
  carousel = React.createRef();
  scrollBar = React.createRef();
  itemsRefs = React.createRef();
  selectedColorIndex = undefined;
  selectedPage = undefined;
  currentColorsCount = undefined;
  itemsPerRow = 0;
  itemsPerPage = 0;
  usePagination = undefined;
  innerMargin = undefined;
  swatchStyles = undefined;
  componentDidMount() {
    this.dimensionsChangeListener = Constants.addDimensionsEventListener(this.onOrientationChanged);
    _times(this.props.colors.length, i => {
      this.itemsRefs.current[i] = React.createRef();
    });
    this.scrollToSelected();
  }
  componentDidUpdate(prevProps) {
    if (this.props.colors !== prevProps.colors) {
      const newIndex = this.itemsRefs.current.length;
      this.itemsRefs.current[newIndex] = React.createRef();
      this.scrollToSelected();
    }
  }
  componentWillUnmount() {
    Constants.removeDimensionsEventListener(this.dimensionsChangeListener || this.onOrientationChanged);
  }
  onOrientationChanged = () => {
    if (this.state.orientation !== Constants.orientation) {
      this.initLocalVariables();
      this.setState({
        orientation: Constants.orientation
      }); // only to trigger render
    }
  };
  initLocalVariables() {
    this.itemsRefs.current = [];
    this.selectedColorIndex = undefined;
    this.selectedPage = undefined;
    this.currentColorsCount = this.colors.length;
    this.itemsPerRow = this.getItemsPerRow();
    this.itemsPerPage = this.itemsPerRow * this.getNumberOfRows();
    this.usePagination = this.shouldUsePagination();
    this.innerMargin = this.getInnerMargin();
    this.swatchStyles = [];
  }
  get value() {
    const {
      value
    } = this.props;
    if (Colors.isTransparent(value)) {
      return value;
    }
    return _toUpper(value);
  }
  get colors() {
    return this.getUniqueColors(this.props.colors);
  }
  get containerWidth() {
    const {
      containerWidth
    } = this.props;
    return containerWidth || Constants.windowWidth;
  }
  getUniqueColors = memoize(colors => {
    const c = _map(colors, color => {
      if (Colors.isTransparent(color)) {
        return color;
      }
      return _toUpper(color);
    });
    return _uniq(c);
  });
  getNumberOfRows() {
    const {
      numberOfRows = DEFAULT_NUMBER_OF_ROWS
    } = this.props;
    if (!_inRange(numberOfRows, 2, 6)) {
      console.warn(`${numberOfRows} is not within valid range of color rows (2 to 5);
        defaulting to ${DEFAULT_NUMBER_OF_ROWS}.`);
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
    const {
      usePagination
    } = this.props;
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
  scrollToSelected = () => setTimeout(() => {
    const {
      scrollable,
      currentPage
    } = this.state;
    if (scrollable && this.selectedColorIndex !== undefined && this.itemsRefs.current) {
      // The this.selectedColorIndex layout doesn't update on time
      // so we use this.selectedColorIndex - 1 and add an offset of 1 Swatch
      const childRef = this.itemsRefs.current[this.selectedColorIndex - 1]?.current;
      if (childRef) {
        const childLayout = childRef.getLayout();
        const leftMargins = this.getHorizontalMargins(this.selectedColorIndex).marginLeft;
        const childX = childLayout.x + childLayout.width + SWATCH_MARGIN + leftMargins + SWATCH_SIZE;
        if (childX > this.containerWidth) {
          this.scrollBar?.current?.scrollTo({
            x: childX + HORIZONTAL_PADDING - this.containerWidth,
            y: 0,
            animated: false
          });
        }
      } else if (this.usePagination) {
        this.carousel?.current?.goToPage(this.selectedPage || currentPage, false);
      }
    }
  }, 100);
  onContentSizeChange = contentWidth => {
    this.setState({
      scrollable: contentWidth > this.containerWidth,
      contentWidth
    });
  };
  onChangePage = index => {
    this.setState({
      currentPage: index
    });
  };
  onValueChange = (value, colorInfo) => {
    this.props.onValueChange?.(value, colorInfo);
  };
  getHorizontalMargins = index => {
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
    return {
      marginLeft,
      marginRight
    };
  };
  getSwatchStyle = index => {
    const sizeHasChanged = this.colors.length !== this.currentColorsCount;
    const isNextToLastIndex = index === this.colors.length - 2;

    // Need to update the next to last item because it's margin needs to changed
    if (!_isUndefined(this.swatchStyles)) {
      if (_isUndefined(this.swatchStyles[index]) || !this.usePagination && sizeHasChanged && isNextToLastIndex) {
        this.swatchStyles[index] = [this.getHorizontalMargins(index), this.props.swatchStyle];
        if (sizeHasChanged && isNextToLastIndex) {
          this.currentColorsCount = this.colors.length;
        }
      }
      return this.swatchStyles[index];
    }
  };
  renderColorSwatch(color, index) {
    const {
      animatedIndex,
      testID
    } = this.props;
    return <ColorSwatch style={this.getSwatchStyle(index)} index={index} key={color} color={color} value={color} selected={this.value === color} animated={index === animatedIndex} onPress={this.onValueChange} ref={this.itemsRefs.current[index]} testID={`${testID}-${color}`} />;
  }
  renderPalette(props, contentStyle, colors, pageIndex) {
    const {
      style,
      ...others
    } = props;
    return <View key={pageIndex} {...others} style={[styles.paletteContainer, contentStyle, style]}>
        {_map(colors, (color, i) => {
        if (color === this.value) {
          this.selectedColorIndex = i;
          this.selectedPage = pageIndex;
        }
        return this.renderColorSwatch(color, i);
      })}
      </View>;
  }
  renderScrollableContent() {
    const {
      containerStyle,
      backgroundColor,
      ...others
    } = this.props;
    const {
      scrollable,
      contentWidth
    } = this.state;
    return <ScrollBar ref={this.scrollBar} style={[containerStyle, {
      backgroundColor
    }]} scrollEnabled={scrollable} onContentSizeChange={this.onContentSizeChange} height={SCROLLABLE_HEIGHT} containerProps={{
      width: !scrollable ? contentWidth : undefined
    }} gradientHeight={SCROLLABLE_HEIGHT - 12} gradientColor={backgroundColor}>
        {this.renderPalette(others, styles.scrollContent, this.colors, 0)}
      </ScrollBar>;
  }
  renderPaginationContent() {
    const {
      containerStyle,
      loop,
      backgroundColor,
      ...others
    } = this.props;
    const {
      currentPage
    } = this.state;
    const colorGroups = _chunk(this.colors, this.itemsPerPage);
    return <View center style={[containerStyle, styles.paginationContainer, {
      backgroundColor
    }]}>
        <Carousel loop={loop} onChangePage={this.onChangePage} ref={this.carousel}>
          {_map(colorGroups, (colorsPerPage, index) => {
          return this.renderPalette(others, {
            ...styles.page,
            width: this.containerWidth
          }, colorsPerPage, index);
        })}
        </Carousel>
        <PageControl size={6} color={Colors.$backgroundInverted} inactiveColor={Colors.$backgroundDisabled} spacing={8} numOfPages={colorGroups.length} currentPage={currentPage} />
      </View>;
  }
  render() {
    return this.usePagination ? this.renderPaginationContent() : this.renderScrollableContent();
  }
}
export default ColorPalette;
const styles = StyleSheet.create({
  paletteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingLeft: HORIZONTAL_PADDING,
    paddingVertical: VERTICAL_PADDING
  },
  paginationContainer: {
    flex: 1,
    paddingBottom: VERTICAL_PADDING
  },
  page: {
    flexWrap: 'wrap'
  },
  scrollContent: {
    height: SCROLLABLE_HEIGHT,
    paddingLeft: 12
  }
});