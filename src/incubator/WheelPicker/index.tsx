// TODO: Support style customization
import React, {useCallback, useRef, useMemo, useEffect, useState} from 'react';
import {TextStyle, ViewStyle, FlatList, NativeSyntheticEvent, NativeScrollEvent} from 'react-native';
import Animated from 'react-native-reanimated';
import {onScrollEvent, useValues} from 'react-native-redash';
import {Colors, Spacings} from '../../../src/style';
import View from '../../components/view';
import Fader, {FaderPosition} from '../../components/fader';
import {Constants} from '../../helpers';
import Item, {ItemProps} from './Item';
import usePresenter from './usePresenter';
import Text, {TextProps} from '../../components/text';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export interface WheelPickerProps {
  /**
   * Data source for WheelPicker
   */
  items?: ItemProps[];
  /**
   * Describe the height of each item in the WheelPicker
   * default value: 44
   */
  itemHeight?: number;
  /**
   * Describe the number of rows visible
   * default value: 5
   */
  numberOfVisibleRows?: number;
  /**
   * Text color for the focused row
   */
  activeTextColor?: string;
  /**
   * Text color for other, non-focused rows
   */
  inactiveTextColor?: string;
  /**
   * Row text style
   */
  textStyle?: TextStyle;
  /**
   * Additional label on the right of the item text
   */
  rightLabel?: string;
  /**
   * The Additional right label's style
   */
  rightLabelStyle?: TextStyle;
  /**
   * The Additional right label's props
   */
  rightLabelProps?: TextProps;
  /**
   * Event, on active row change
   */
  onChange?: (item: string | number, index: number) => void;
  /**
   * Container's ViewStyle, height is computed according to itemHeight * numberOfVisibleRows
   */
  style?: Omit<ViewStyle, 'height'>;
  /**
   * Support passing items as children props
   */
  children?: JSX.Element | JSX.Element[];
  /**
   * WheelPicker initial value, can be ItemProps.value, number as index
   */
  selectedValue: ItemProps | number | string;
}

const WheelPicker = React.memo(
  ({
    items: propItems,
    itemHeight = 44,
    numberOfVisibleRows = 5,
    activeTextColor = Colors.primary,
    inactiveTextColor,
    textStyle,
    rightLabel,
    rightLabelStyle,
    rightLabelProps,
    onChange,
    style,
    children,
    selectedValue
  }: WheelPickerProps) => {
    const scrollView = useRef<Animated.ScrollView>();
    const [offset] = useValues([0], []);
    const onScroll = onScrollEvent({y: offset});

    const {height, items, shouldControlComponent, index: currentIndex, getRowItemAtOffset} = usePresenter({
      selectedValue,
      items: propItems,
      children,
      itemHeight,
      preferredNumVisibleRows: numberOfVisibleRows
    });

    const [scrollOffset, setScrollOffset] = useState(currentIndex * itemHeight);

    useEffect(() => {
      controlComponent();
    });

    /**
     * The picker is a controlled component. This means we expect the
     * to relay on `selectedValue` prop to be our
     * source of truth - not the picker current value.
     * This way, you can control disallow or mutate selection of some values.
     */
    const controlComponent = () => {
      if (shouldControlComponent(scrollOffset)) {
        scrollToIndex(currentIndex, true);
      }
    };

    const scrollToPassedIndex = () => {
      scrollToIndex(currentIndex, false);
    };

    const scrollToIndex = (index: number, animated: boolean) => {
      if (scrollView.current?.getNode()) {
        //@ts-ignore for some reason scrollToOffset isn't recognized
        scrollView.current?.getNode()?.scrollToOffset({offset: index * itemHeight, animated});
      }
    };

    const selectItem = useCallback(
      index => {
        scrollToIndex(index, true);
      },
      [itemHeight]
    );

    const onValueChange = (event: NativeSyntheticEvent<NativeScrollEvent>) => {
      setScrollOffset(event.nativeEvent.contentOffset.y);

      const {index, value} = getRowItemAtOffset(event.nativeEvent.contentOffset.y);
      onChange?.(value, index);
    };

    const renderItem = useCallback(
      ({item, index}) => {
        return (
          <Item
            index={index}
            itemHeight={itemHeight}
            offset={offset}
            activeColor={activeTextColor}
            inactiveColor={inactiveTextColor}
            style={textStyle}
            {...item}
            onSelect={selectItem}
          />
        );
      },
      [itemHeight]
    );

    const separators = () => {
      return (
        <View absF centerV pointerEvents="none">
          <View
            style={{
              borderTopWidth: 1,
              borderBottomWidth: 1,
              height: Spacings.s9,
              borderColor: Colors.grey60
            }}
            center
          >
            <Text marginL-80 text80M {...rightLabelProps} color={activeTextColor} style={rightLabelStyle}>
              {rightLabel}
            </Text>
          </View>
        </View>
      );
    };

    const fader = useMemo(() => (position: FaderPosition) => {
      return <Fader visible position={position} size={60}/>;
    }, []);

    return (
      <View style={style}>
        <AnimatedFlatList
          height={height}
          data={items}
          // @ts-ignore reanimated2
          keyExtractor={keyExtractor}
          scrollEventThrottle={100}
          onScroll={onScroll}
          onMomentumScrollEnd={onValueChange}
          showsVerticalScrollIndicator={false}
          onLayout={scrollToPassedIndex}
          // @ts-ignore
          ref={scrollView}
          contentContainerStyle={{
            paddingVertical: height / 2 - itemHeight / 2
          }}
          snapToInterval={itemHeight}
          decelerationRate={Constants.isAndroid ? 0.98 : 'normal'}
          renderItem={renderItem}
        />
        {fader(FaderPosition.BOTTOM)}
        {fader(FaderPosition.TOP)}
        {separators()}
      </View>
    );
  });

const keyExtractor = (item: ItemProps) => `${item.value}`;

export default WheelPicker;
