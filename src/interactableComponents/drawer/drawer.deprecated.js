import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, Animated, View, TouchableOpacity, TouchableHighlight} from 'react-native';
import Interactable from 'react-native-interactable';
import {PureBaseComponent} from '../../commons';
import {screenWidth} from '../../helpers/Constants';
import {Colors, Typography} from '../../style';

const SCALE_POINT = 72; // scaling content style by height
const MIN_LEFT_MARGIN = 56;
const DEFAULT_ICON_SIZE = 24;
const MIN_ITEM_WIDTH = 43; // NOTE: this is the min for the input ranges calc!
const ITEM_BG = Colors.blue30;
const ITEM_PADDING = 12;
const BLEED = 15;
const ITEM_PROP_TYPES = {
  width: PropTypes.number,
  background: PropTypes.string,
  text: PropTypes.string,
  icon: PropTypes.number,
  onPress: PropTypes.func
};

/**
 * @description: Interactable Drawer component
 * @extendslink:
 */
export default class Drawer extends PureBaseComponent {
  static displayName = 'IGNORE';

  static propTypes = {
    /**
     * The drawer top layer's damping
     */
    damping: PropTypes.number,
    /**
     * The drawer top layer's tention
     */
    tension: PropTypes.number,
    /**
     * Press handler
     */
    onPress: PropTypes.func,
    /**
     * OnDragStart handler
     */
    onDragStart: PropTypes.func,
    /**
     * The bottom layer's items to appear when opened from the right
     */
    rightItems: PropTypes.arrayOf(PropTypes.shape(ITEM_PROP_TYPES)),
    /**
     * The bottom layer's item to appear when opened from the left (a single item)
     */
    leftItem: PropTypes.shape(ITEM_PROP_TYPES),
    /**
     * Whether to give the items equal width (the max width)
     */
    equalWidths: PropTypes.bool,
    /**
     * The color for the text and icon tint of the items
     */
    itemsTintColor: PropTypes.string,
    /**
     * The items' icon size
     */
    itemsIconSize: PropTypes.number,
    /**
     * The items' text style
     */
    itemsTextStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    /**
     * Perform the animation in natively
     */
    useNativeAnimations: PropTypes.bool
  };

  static defaultProps = {
    damping: 0.7,
    tension: 300,
    itemsTintColor: Colors.white,
    itemsIconSize: DEFAULT_ICON_SIZE
  };

  constructor(props) {
    super(props);

    this.deltaX = new Animated.Value(0);
    this.drawer = React.createRef();

    this.state = {
      inMotion: false,
      position: 1,
      width: screenWidth
    };
  }

  UNSAFE_componentWillReceiveProps(nextProps) {
    if (
      JSON.stringify(this.props.leftItem) !== JSON.stringify(nextProps.leftItem) ||
      JSON.stringify(this.props.rightItems) !== JSON.stringify(nextProps.rightItems)
    ) {
      this.closeDrawer();
    }
  }

  onAlert = ({nativeEvent}) => {
    const event = JSON.stringify(nativeEvent);

    if (event.includes('"first":"leave"')) {
      this.interactableElem.snapTo({index: 2});
    }
    if (event.includes('"second":"enter"')) {
      this.interactableElem.snapTo({index: 1});
    }
  };
  onSnap = ({nativeEvent}) => {
    const {index} = nativeEvent;
    const {position} = this.state;
    if (index !== position) {
      this.setState({position: index});
    }
  };
  onDrag = ({nativeEvent}) => {
    const {state} = nativeEvent;
    if (state === 'start') {
      this.setState({inMotion: true});
      _.invoke(this.props, 'onDragStart');
    }
  };
  onStop = () => {
    const {inMotion} = this.state;
    if (inMotion) {
      this.setState({inMotion: false});
    }
  };
  onPress = () => {
    this.closeDrawer();
    setTimeout(() => {
      _.invoke(this.props, 'onPress');
    }, 0);
  };

  closeDrawer = () => {
    this.interactableElem.snapTo({index: 1});
  };
  generateStyles() {
    this.styles = createStyles(this.getThemeProps());
  }
  getAnimationConfig() {
    const {animationConfig} = this.getThemeProps();
    return {
      useNativeDriver: true,
      ...animationConfig
    };
  }

  getMaxItemWidth() {
    const {rightItems} = this.props;
    const {width} = this.state;
    return rightItems ? (width - MIN_LEFT_MARGIN) / rightItems.length : width - MIN_LEFT_MARGIN;
  }
  getMinItemWidth() {
    const {equalWidths} = this.getThemeProps();
    const maxWidth = this.getMaxItemWidth();
    const minWidth = equalWidths ? maxWidth : MIN_ITEM_WIDTH;
    return minWidth > maxWidth ? maxWidth : minWidth;
  }
  getRightItemsTotalWidth(numberOfItems) {
    const {rightItems} = this.getThemeProps();
    let total = 0;

    if (_.size(rightItems) > 0) {
      const items = rightItems.reverse();
      const size = numberOfItems && numberOfItems >= 0 ? numberOfItems : items.length;

      for (let i = 0; i < size; i++) {
        total += this.getItemWidth(items[i]);
      }
    }
    return total;
  }
  getItemWidth(item) {
    let width = this.getMinItemWidth();
    if (item && item.width) {
      width = Math.max(item.width, width);
      width = Math.min(width, this.getMaxItemWidth());
    }
    return width;
  }

  getBoundaries() {
    const {leftItem, rightItems, equalWidths} = this.getThemeProps();
    const leftSpring = 80;
    const leftBound = this.getItemWidth(leftItem) + leftSpring;
    const rightSpring = equalWidths ? 0 : 30;
    const rightWidth = this.getRightItemsTotalWidth();
    const rightBound = rightWidth > 0 ? -rightWidth - rightSpring : 0;

    return {
      right: _.isEmpty(leftItem) ? 0 : leftBound,
      left: _.isEmpty(rightItems) ? 0 : rightBound
    };
  }
  getSnapPoints() {
    const {leftItem, rightItems, damping, tension} = this.getThemeProps();
    const size = rightItems ? rightItems.length : 0;

    const left = !_.isEmpty(leftItem) ? {x: this.getItemWidth(leftItem), damping, tension} : {};
    const initial = {x: 0, damping, tension};
    const last = rightItems && !_.isEmpty(rightItems[0]) ? {x: -this.getRightItemsTotalWidth(), damping, tension} : {};

    switch (size) {
      case 0:
        return [left, initial];
      default:
        return [left, initial, last];
    }
  }
  getAlertAreas() {
    const {rightItems} = this.props;
    const size = rightItems ? rightItems.length : 0;

    const first = {id: 'first', influenceArea: {left: -this.getRightItemsTotalWidth(1)}};
    const second = {id: 'second', influenceArea: {left: -this.getRightItemsTotalWidth(size - 1)}};

    switch (size) {
      case 0:
      case 1:
        return [];
      case 2:
        return [first];
      default:
        return [first, second];
    }
  }
  getInputRanges() {
    const {rightItems} = this.getThemeProps();
    const size = rightItems ? rightItems.length : 0;
    const interval = 65;
    const inputRanges = [];

    for (let i = 0; i < size; i++) {
      const itemWidth = this.getItemWidth(rightItems[i]);
      const end = itemWidth - size * BLEED;
      const max = -(end + interval * i);
      const min = -(itemWidth * (i + 1));
      inputRanges.push([min, max]);
    }
    return inputRanges.reverse();
  }

  onLayout = event => {
    const {width, height} = event.nativeEvent.layout;

    const typography = height >= SCALE_POINT ? Typography.text70 : Typography.text80;
    const textTopMargin = height > SCALE_POINT ? 8 : 0;
    const itemPadding = height >= SCALE_POINT ? ITEM_PADDING : 8;

    this.setState({width, height, typography, textTopMargin, itemPadding});
  };

  renderLeftItem() {
    const {leftItem, itemsTintColor, itemsIconSize, itemsTextStyle} = this.getThemeProps();
    const {height, typography, textTopMargin} = this.state;
    const leftItemWidth = this.getItemWidth(leftItem);
    const background = (leftItem ? leftItem.background : undefined) || ITEM_BG;
    const onLeftPress = leftItem ? leftItem.onPress : undefined;

    return (
      <View style={this.styles.leftItemContainer} pointerEvents={'box-none'}>
        <Animated.View
          style={{
            backgroundColor: background,
            position: 'absolute',
            left: 0,
            right: 0,
            transform: [
              {
                translateX: this.deltaX.interpolate({
                  inputRange: [0, leftItemWidth],
                  outputRange: [-leftItemWidth, 0],
                  extrapolateRight: 'clamp'
                })
              }
            ]
          }}
          {...this.getAnimationConfig()}
        >
          <TouchableHighlight onPress={onLeftPress} underlayColor={Colors.rgba(Colors.white, 0.3)}>
            <View
              style={{
                height,
                width: leftItemWidth,
                padding: ITEM_PADDING,
                justifyContent: 'center',
                alignItems: 'center'
              }}
            >
              {leftItem && leftItem.icon && (
                <Animated.Image
                  source={leftItem.icon}
                  style={[
                    {
                      tintColor: itemsTintColor,
                      width: itemsIconSize,
                      height: itemsIconSize,
                      opacity: this.deltaX.interpolate({
                        inputRange: [leftItemWidth - BLEED, leftItemWidth],
                        outputRange: [0, 1],
                        extrapolateLeft: 'clamp',
                        extrapolateRight: 'clamp'
                      }),
                      transform: [
                        {
                          scale: this.deltaX.interpolate({
                            inputRange: [leftItemWidth - BLEED, leftItemWidth],
                            outputRange: [0.7, 1],
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp'
                          })
                        }
                      ]
                    }
                  ]}
                  {...this.getAnimationConfig()}
                />
              )}
              {leftItem && leftItem.text && (
                <Animated.Text
                  numberOfLines={1}
                  style={[
                    {
                      color: itemsTintColor,
                      ...typography,
                      ...itemsTextStyle,
                      marginTop: textTopMargin,
                      opacity: this.deltaX.interpolate({
                        inputRange: [leftItemWidth - BLEED, leftItemWidth],
                        outputRange: [0, 1],
                        extrapolateLeft: 'clamp',
                        extrapolateRight: 'clamp'
                      }),
                      transform: [
                        {
                          scale: this.deltaX.interpolate({
                            inputRange: [leftItemWidth - BLEED, leftItemWidth],
                            outputRange: [0.7, 1],
                            extrapolateLeft: 'clamp',
                            extrapolateRight: 'clamp'
                          })
                        }
                      ]
                    }
                  ]}
                  {...this.getAnimationConfig()}
                >
                  {leftItem.text}
                </Animated.Text>
              )}
            </View>
          </TouchableHighlight>
        </Animated.View>
      </View>
    );
  }
  renderGhostButton = (item, index) => {
    return (
      <TouchableHighlight
        key={index}
        style={[
          this.styles.item,
          {
            width: this.getItemWidth(item),
            backgroundColor: Colors.rgba(Colors.white, 0)
          }
        ]}
        onPress={item.onPress}
        underlayColor={Colors.rgba(Colors.white, 0.3)}
      >
        <View/>
      </TouchableHighlight>
    );
  };
  renderRightItem(item, index) {
    if (!item) {
      return;
    }
    const {itemsTintColor, itemsIconSize, itemsTextStyle} = this.getThemeProps();
    const {itemPadding, typography, textTopMargin} = this.state;
    const inputRanges = this.getInputRanges();

    return (
      <View
        key={index}
        style={[
          this.styles.item,
          {
            width: this.getItemWidth(item),
            backgroundColor: item.background || ITEM_BG,
            padding: itemPadding
          }
        ]}
      >
        {item.icon && (
          <Animated.Image
            source={item.icon}
            style={[
              {
                tintColor: itemsTintColor,
                width: itemsIconSize,
                height: itemsIconSize,
                opacity: this.deltaX.interpolate({
                  inputRange: inputRanges[index],
                  outputRange: [1, 0],
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp'
                }),
                transform: [
                  {
                    scale: this.deltaX.interpolate({
                      inputRange: inputRanges[index],
                      outputRange: [1, 0.7],
                      extrapolateLeft: 'clamp',
                      extrapolateRight: 'clamp'
                    })
                  }
                ]
              }
            ]}
            {...this.getAnimationConfig()}
          />
        )}
        {item.text && (
          <Animated.Text
            numberOfLines={1}
            style={[
              {
                color: itemsTintColor,
                ...typography,
                ...itemsTextStyle,
                marginTop: textTopMargin,
                opacity: this.deltaX.interpolate({
                  inputRange: inputRanges[index],
                  outputRange: [1, 0],
                  extrapolateLeft: 'clamp',
                  extrapolateRight: 'clamp'
                }),
                transform: [
                  {
                    scale: this.deltaX.interpolate({
                      inputRange: inputRanges[index],
                      outputRange: [1, 0.7],
                      extrapolateLeft: 'clamp',
                      extrapolateRight: 'clamp'
                    })
                  }
                ]
              }
            ]}
            {...this.getAnimationConfig()}
          >
            {item.text}
          </Animated.Text>
        )}
      </View>
    );
  }
  renderRightItems() {
    const {rightItems} = this.getThemeProps();

    return (
      <View style={this.styles.rightItemsContainer}>
        {_.map(rightItems, (item, index) => {
          return this.renderRightItem(item, index);
        })}
      </View>
    );
  }
  render() {
    const {style, onPress, rightItems} = this.getThemeProps();
    const Container = onPress ? TouchableOpacity : View;
    const backgroundColor = _.get(rightItems, '[0].background', ITEM_BG);
    const containerWidth = this.state.width || screenWidth;

    return (
      <View style={[style, this.styles.container, {backgroundColor}]} onLayout={this.onLayout}>
        {rightItems && this.renderRightItems()}
        {this.renderLeftItem()}

        <Interactable.View
          ref={el => (this.interactableElem = el)}
          horizontalOnly
          boundaries={this.getBoundaries()}
          snapPoints={this.getSnapPoints()}
          alertAreas={this.getAlertAreas()}
          onAlert={this.onAlert}
          onSnap={this.onSnap}
          onDrag={this.onDrag}
          onStop={this.onStop}
          dragToss={0.01}
          animatedValueX={this.deltaX}
          style={[this.styles.interactable, {width: containerWidth * 2}]}
        >
          <View style={{backgroundColor: Colors.white}}>
            <Container
              style={[this.styles.childrenContainer, {width: containerWidth}]}
              activeOpacity={0.7}
              onPress={this.onPress}
            >
              {this.props.children}
            </Container>
          </View>
          {rightItems && (
            <View style={{width: containerWidth, flexDirection: 'row'}}>
              {_.map(rightItems, this.renderGhostButton)}
            </View>
          )}
        </Interactable.View>
      </View>
    );
  }
}

function createStyles() {
  return StyleSheet.create({
    container: {
      overflow: 'hidden'
    },
    interactable: {
      flexDirection: 'row',
      backgroundColor: 'transparent'
    },
    childrenContainer: {
      left: 0,
      right: 0
    },
    rightItemsContainer: {
      position: 'absolute',
      right: 0,
      height: '100%',
      flexDirection: 'row'
    },
    leftItemContainer: {
      position: 'absolute',
      left: 0,
      right: 100,
      flexDirection: 'row'
    },
    item: {
      justifyContent: 'center',
      alignItems: 'center'
    }
  });
}
