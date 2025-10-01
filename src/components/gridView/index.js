import _map from "lodash/map";
import _size from "lodash/size";
import _get from "lodash/get";
import _first from "lodash/first";
import _flow from "lodash/flow";
import React from 'react';
import { StyleSheet } from 'react-native';
import { Spacings } from "../../style";
// TODO: we should use asBaseComponent here instead of using UIComponent directly
import UIComponent from "../../commons/UIComponent";
import View from "../view";
import Text from "../text";
import { Constants } from "../../commons/new";
import GridListItem from "../gridListItem";
import { formatLastItemLabel } from "../../helpers/FormattingPresenter";
const DEFAULT_NUM_COLUMNS = 3;
const DEFAULT_ITEM_SPACINGS = Spacings.s4;
/**
 * @description: A auto-generated grid view that calculate item size according to given props
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/GridViewScreen.tsx
 */
class GridView extends UIComponent {
  static displayName = 'GridView';
  static defaultProps = {
    numColumns: DEFAULT_NUM_COLUMNS,
    itemSpacing: DEFAULT_ITEM_SPACINGS
  };
  state = {
    viewWidth: this.getGridContainerWidth(),
    numColumns: this.calcNumberOfColumns(),
    itemSize: this.calcItemSize()
  };
  static getDerivedStateFromProps(nextProps, prevState) {
    let viewWidth;
    let numColumns;
    if (nextProps.viewWidth && Math.floor(nextProps.viewWidth) !== prevState.viewWidth) {
      viewWidth = Math.floor(nextProps.viewWidth);
    }
    if (!nextProps.keepItemSize && nextProps.numColumns !== prevState.numColumns) {
      numColumns = nextProps.numColumns;
    }
    if (viewWidth || viewWidth) {
      return {
        viewWidth,
        numColumns
      };
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
    const {
      keepItemSize
    } = this.props;
    const {
      itemSize
    } = this.state;
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
    return Constants.windowWidth - (Constants.getPageMargins() || Spacings.s5) * 2;
  }
  getGridContainerWidth() {
    return Math.floor(this.props.viewWidth || this.getDefaultViewWidth());
  }
  calcNumberOfColumns() {
    const {
      numColumns,
      itemSpacing = DEFAULT_ITEM_SPACINGS,
      maxItemWidth
    } = this.props;
    const containerWidth = this.getGridContainerWidth();
    if (maxItemWidth) {
      return Math.ceil((containerWidth + itemSpacing) / (maxItemWidth + itemSpacing));
    } else {
      return numColumns || DEFAULT_NUM_COLUMNS;
    }
  }
  calcItemSize() {
    const {
      itemSpacing = DEFAULT_ITEM_SPACINGS
    } = this.props;
    const containerWidth = this.getGridContainerWidth();
    const numColumns = this.calcNumberOfColumns();
    return (containerWidth - itemSpacing * (numColumns - 1)) / numColumns;
  }
  renderLastItemOverlay() {
    const {
      lastItemLabel,
      items,
      lastItemOverlayColor
    } = this.props;
    const formattedLabel = formatLastItemLabel(lastItemLabel, {
      shouldAddPlus: true
    });
    if (!lastItemLabel) {
      return;
    }
    const imageBorderRadius = _flow(_first, item => _get(item, 'imageProps.borderRadius'))(items);
    return <View style={[styles.overlayContainer, {
      backgroundColor: lastItemOverlayColor,
      borderRadius: imageBorderRadius
    }]}>
        <Text mainBold white>
          {formattedLabel}
        </Text>
      </View>;
  }
  renderItem = (item, index) => {
    const {
      itemSize
    } = this.state;
    const {
      items,
      itemSpacing,
      renderCustomItem
    } = this.props;
    const {
      numColumns = DEFAULT_NUM_COLUMNS
    } = this.state;
    const itemsCount = _size(items);
    const rowCount = Math.ceil(itemsCount / numColumns);
    const isLastItemInRow = (index + 1) % numColumns === 0;
    const isLastRow = index + 1 > (rowCount - 1) * numColumns;
    const isLastItem = index === itemsCount - 1;
    const size = typeof item.itemSize === 'object' ? {
      width: itemSize,
      height: item.itemSize?.height || itemSize
    } : itemSize;
    const itemProps = {
      key: index,
      ...item,
      itemSize: size,
      containerStyle: [!isLastItemInRow && {
        marginRight: itemSpacing
      }, !isLastRow && {
        marginBottom: itemSpacing
      }, item.containerStyle],
      children: isLastItem ? this.renderLastItemOverlay() : undefined
    };
    return renderCustomItem ? renderCustomItem(itemProps) : <GridListItem {...itemProps} />;
  };
  render() {
    const {
      itemSize
    } = this.state;
    const {
      items,
      viewWidth
    } = this.props;
    return <View style={[styles.container, {
      width: viewWidth ? Math.floor(viewWidth) : undefined
    }]}>
        {itemSize && _map(items, this.renderItem)}
      </View>;
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