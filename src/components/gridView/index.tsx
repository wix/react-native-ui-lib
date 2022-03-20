import _ from 'lodash';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Spacings} from 'style';
// TODO: we should use asBaseComponent here instead of using UIComponent directly
import UIComponent from '../../commons/UIComponent';
import View from '../view';
import Text from '../text';
import {Constants} from '../../commons/new';
import GridListItem, {GridListItemProps} from '../gridListItem';
import {formatLastItemLabel} from '../../helpers/FormattingPresenter';

const DEFAULT_NUM_COLUMNS = 3;
const DEFAULT_ITEM_SPACINGS = Spacings.s4;
export interface GridViewProps {
  /**
   * The list of items based on GridListItem props
   */
  items?: GridListItemProps[];
  /**
   * pass the desired grid view width (will improve loading time)
   */
  viewWidth?: number;
  /**
   * Allow a responsive item width to the maximum item width
   */
  maxItemWidth?: number;
  /**
   * Number of items to show in a row (ignored when passing maxItemWidth)
   */
  numColumns?: number;
  /**
   * Spacing between each item
   */
  itemSpacing?: number;
  /**
   * overlay label for the last item
   */
  lastItemLabel?: string | number;
  /**
   * color of overlay label for the last item
   */
  lastItemOverlayColor?: string;
  /**
   * whether to keep the items initial size when orientation changes,
   * in which case the apt number of columns will be calculated automatically.
   * Ignored when passing 'maxItemWidth'
   */
  keepItemSize?: boolean;
  /**
   * Pass to render a custom item
   */
  renderCustomItem?: (item: GridListItemProps) => React.ReactElement;
}

interface GridViewState {
  viewWidth: number;
  numColumns: number;
  itemSize: number;
}

/**
 * @description: A auto-generated grid view that calculate item size according to given props
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/GridViewScreen.tsx
 */
class GridView extends UIComponent<GridViewProps, GridViewState> {
  static displayName = 'GridView';

  static defaultProps = {
    numColumns: DEFAULT_NUM_COLUMNS,
    itemSpacing: DEFAULT_ITEM_SPACINGS
  };

  private dimensionsChangeListener: any;

  state = {
    viewWidth: this.getGridContainerWidth(),
    numColumns: this.calcNumberOfColumns(),
    itemSize: this.calcItemSize()
  };

  static getDerivedStateFromProps(nextProps: GridViewProps, prevState: GridViewState) {
    let viewWidth;
    let numColumns;
    if (nextProps.viewWidth && Math.floor(nextProps.viewWidth) !== prevState.viewWidth) {
      viewWidth = Math.floor(nextProps.viewWidth);
    }
    if (!nextProps.keepItemSize && nextProps.numColumns !== prevState.numColumns) {
      numColumns = nextProps.numColumns;
    }

    if (viewWidth || viewWidth) {
      return {viewWidth, numColumns};
    } else {
      return null;
    }
  }

  componentDidMount() {
    this.dimensionsChangeListener = Constants.addDimensionsEventListener(this.onOrientationChanged);
  }

  componentWillUnmount() {
    Constants.removeDimensionsEventListener(this.dimensionsChangeListener || this.onOrientationChanged);
  }

  onOrientationChanged = () => {
    const {keepItemSize} = this.props;
    const {itemSize} = this.state;

    if (!this.props.viewWidth) {
      const newItemSize = keepItemSize ? itemSize : this.calcItemSize();
      this.setState({
        viewWidth: Math.floor(this.getDefaultViewWidth()),
        numColumns: this.calcNumberOfColumns(),
        itemSize: newItemSize
      });
    }
  };

  getDefaultViewWidth() {
    return Constants.screenWidth - Spacings.s5 * 2;
  }

  getGridContainerWidth() {
    return Math.floor(this.props.viewWidth || this.getDefaultViewWidth());
  }

  calcNumberOfColumns() {
    const {numColumns, itemSpacing = DEFAULT_ITEM_SPACINGS, maxItemWidth} = this.props;
    const containerWidth = this.getGridContainerWidth();

    if (maxItemWidth) {
      return Math.ceil((containerWidth + itemSpacing) / (maxItemWidth + itemSpacing));
    } else {
      return numColumns || DEFAULT_NUM_COLUMNS;
    }
  }

  calcItemSize() {
    const {itemSpacing = DEFAULT_ITEM_SPACINGS} = this.props;
    const containerWidth = this.getGridContainerWidth();
    const numColumns = this.calcNumberOfColumns();

    return (containerWidth - itemSpacing * (numColumns - 1)) / numColumns;
  }

  renderLastItemOverlay() {
    const {lastItemLabel, items, lastItemOverlayColor} = this.props;
    const formattedLabel = formatLastItemLabel(lastItemLabel, {shouldAddPlus: true});

    if (!lastItemLabel) {
      return;
    }

    const imageBorderRadius = _.flow(_.first, item => _.get(item, 'imageProps.borderRadius'))(items);
    return (
      <View style={[styles.overlayContainer, {backgroundColor: lastItemOverlayColor, borderRadius: imageBorderRadius}]}>
        <Text mainBold white>
          {formattedLabel}
        </Text>
      </View>
    );
  }

  renderItem = (item: GridListItemProps, index: number) => {
    const {itemSize} = this.state;
    const {items, itemSpacing, renderCustomItem} = this.props;
    const {numColumns = DEFAULT_NUM_COLUMNS} = this.state;

    const itemsCount = _.size(items);
    const rowCount = Math.ceil(itemsCount / numColumns);
    const isLastItemInRow = (index + 1) % numColumns === 0;
    const isLastRow = index + 1 > (rowCount - 1) * numColumns;
    const isLastItem = index === itemsCount - 1;
    const size =
      typeof item.itemSize === 'object'
        ? {
          width: itemSize,
          height: item.itemSize?.height || itemSize
        }
        : itemSize;

    const itemProps = {
      key: index,
      ...item,
      itemSize: size,
      containerStyle: [
        !isLastItemInRow && {
          marginRight: itemSpacing
        },
        !isLastRow && {
          marginBottom: itemSpacing
        },
        item.containerStyle
      ],
      children: isLastItem ? this.renderLastItemOverlay() : undefined
    };

    return renderCustomItem ? renderCustomItem(itemProps) : <GridListItem {...itemProps}/>;
  };

  render() {
    const {itemSize} = this.state;
    const {items, viewWidth} = this.props;

    return (
      <View style={[styles.container, {width: viewWidth ? Math.floor(viewWidth) : undefined}]}>
        {itemSize && _.map(items, this.renderItem)}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    flexWrap: 'wrap'
  },
  overlayContainer: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default GridView;
