import _ from 'lodash';
import memoize from 'memoize-one';
import React, {PureComponent} from 'react';
import {StyleSheet, UIManager, findNodeHandle, StyleProp, ViewStyle} from 'react-native';
import {Constants} from '../../helpers';
import {Colors} from '../../style';
import {asBaseComponent} from '../../commons/new';
import View from '../view';
import Carousel from '../carousel';
import PageControl from '../pageControl';
import ColorSwatch, {SWATCH_SIZE} from './ColorSwatch';
import ScrollBar from '../scrollBar';


interface Props {
  /**
   * Array of colors to render in the palette
   */
  colors: string[];
  /**
   * Style to pass the palette container
   */
  containerStyle?: StyleProp<ViewStyle>;
  /**
   * The container margins
   */
  containerWidth?: number;
  /**
   * Whether to use pagination when number of colors exceeds the number of rows
   */
  usePagination?: boolean;
  /**
   * Whether the colors pagination scrolls in a loop
   */
  loop?: boolean;
  /**
   * The number of color rows from 2 to 5
   */
  numberOfRows?: number;
  /**
   * Style to pass all the ColorSwatches in the palette
   */
  swatchStyle?: StyleProp<ViewStyle>;
  /**
   * The value of the selected swatch
   */
  value?: string;
  /**
   * The index of the item to animate at first render (default is last)
   */
  animatedIndex?: number;
  /**
   * Invoked once when value changes by selecting one of the swatches in the palette
   */
  onValueChange?: (value: string, options: object) => void;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}
export type ColorPaletteProps = Props;

interface State {
  currentPage: number,
  scrollable: boolean,
  orientation?: string,
  contentWidth?: number
}

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
class ColorPalette extends PureComponent<Props, State> {
  static displayName = 'ColorPalette';

  static defaultProps = {
    numberOfRows: DEFAULT_NUMBER_OF_ROWS,
    usePagination: true,
    loop: true
  };

  constructor(props: Props) {
    super(props);

    this.state = {
      currentPage: 0,
      scrollable: false,
      orientation: undefined,
      contentWidth: undefined
    };

    this.initLocalVariables();
  }

  carousel: React.RefObject<typeof Carousel> = React.createRef();
  scrollBar: React.RefObject<any> = React.createRef();
  itemsRefs?: React.RefObject<typeof ColorSwatch>[] = undefined;
  selectedColorIndex?: number = undefined;
  selectedPage?: number = undefined;
  currentColorsCount?: number = undefined;
  itemsPerRow = 0;
  itemsPerPage = 0;
  usePagination?: boolean = undefined;
  innerMargin?: number = undefined;
  swatchStyles?: StyleProp<ViewStyle>[] = undefined;

  componentDidMount() {
    Constants.addDimensionsEventListener(this.onOrientationChanged);
  }

  componentWillUnmount() {
    Constants.removeDimensionsEventListener(this.onOrientationChanged);
  }

  onOrientationChanged = () => {
    if (this.state.orientation !== Constants.orientation) {
      this.initLocalVariables();
      this.setState({orientation: Constants.orientation}); // only to trigger render
    }
  };

  initLocalVariables() {
    this.itemsRefs = undefined;
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
    const {containerWidth} = this.props;
    return containerWidth || Constants.screenWidth;
  }

  getUniqueColors = memoize(colors => {
    const c = _.map(colors, color => {
      if (Colors.isTransparent(color)) {
        return color;
      }
      return _.toUpper(color);
    });
    return _.uniq(c);
  });

  getNumberOfRows() {
    const {numberOfRows = DEFAULT_NUMBER_OF_ROWS} = this.props;

    if (!_.inRange(numberOfRows, 2, 6)) {
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

    if (scrollable && this.selectedColorIndex !== undefined && this.itemsRefs) {
      const childRef = this.itemsRefs[this.selectedColorIndex];

      if (childRef) {
        const handle = findNodeHandle(childRef.current);
        if (handle) {
          //@ts-ignore
          UIManager.measureLayoutRelativeToParent(handle, e => {
            console.warn(e);
          },
          (x: number, _y: number, w: number, _h: number) => {
            if (x + w > this.containerWidth) {
              this.scrollBar?.current?.scrollTo({
                x: x + w + HORIZONTAL_PADDING - this.containerWidth,
                y: 0,
                animated: false
              });
            }
          });
        }
      }
    } else if (this.usePagination) {
      this.carousel?.current?.goToPage(this.selectedPage || currentPage, false);
    }
  }

  onContentSizeChange = (contentWidth: number) => {
    this.setState({
      scrollable: contentWidth > this.containerWidth, contentWidth});
  };

  onChangePage = (index: number) => {
    this.setState({currentPage: index});
  };

  onValueChange = (value: string, options: object) => {
    this.props.onValueChange?.(value, options);
  };

  onLayout = () => {
    setTimeout(() => {
      this.scrollToSelected();
    }, 0);
  };

  getHorizontalMargins = (index: number) => {
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

  getSwatchStyle = (index: number) => {
    const sizeHasChanged = this.colors.length !== this.currentColorsCount;
    const isNextToLastIndex = index === this.colors.length - 2;

    // Need to update the next to last item because it's margin needs to changed
    if (!_.isUndefined(this.swatchStyles)) {
      if (_.isUndefined(this.swatchStyles[index]) || (!this.usePagination && sizeHasChanged && isNextToLastIndex)) {
        this.swatchStyles[index] = [this.getHorizontalMargins(index), this.props.swatchStyle];
        if (sizeHasChanged && isNextToLastIndex) {
          this.currentColorsCount = this.colors.length;
        }
      }
      return this.swatchStyles[index];
    }
  };

  addRefByIndex = (index: number, ref?: any) => {
    if (this.itemsRefs && ref) {
      this.itemsRefs[index] = ref;
    }
  }

  renderColorSwatch(color: string, index: number) {
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
        ref={r => this.addRefByIndex(index, r)}
        testID={`${testID}-${color}`}
      />
    );
  }

  renderPalette(props: Props, contentStyle: StyleProp<ViewStyle>, colors: string[], pageIndex: number) {
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
        {this.renderPalette(others, styles.scrollContent, this.colors, 0)}
      </ScrollBar>
    );
  }

  renderPaginationContent() {
    const {containerStyle, loop, ...others} = this.props;
    const {currentPage} = this.state;
    const colorGroups = _.chunk(this.colors, this.itemsPerPage);

    return (
      <View center style={[containerStyle, styles.paginationContainer]}>
        <Carousel loop={loop} onChangePage={this.onChangePage} ref={this.carousel}>
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

export default asBaseComponent<Props>(ColorPalette);

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
