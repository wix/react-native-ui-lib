// TODO: Support style customization
import {isFunction} from 'lodash';
import React, {useCallback, useRef, useMemo, useEffect, useState} from 'react';
import {TextStyle, ViewStyle, FlatList, NativeSyntheticEvent, NativeScrollEvent, StyleSheet} from 'react-native';
import Animated, {useSharedValue, useAnimatedScrollHandler} from 'react-native-reanimated';
import {Colors, Spacings} from 'style';
import View from '../../components/view';
import Fader, {FaderPosition} from '../../components/fader';
import {Constants} from 'helpers';
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
  label?: string;
  /**
   * The Additional label's style
   */
  labelStyle?: TextStyle;
  /**
   * The Additional label's props
   */
  labelProps?: TextProps;
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
  testID?: string;
}

const WheelPicker = React.memo(({
  items: propItems,
  itemHeight = 44,
  numberOfVisibleRows = 5,
  activeTextColor = Colors.primary,
  inactiveTextColor,
  textStyle,
  label,
  labelStyle,
  labelProps,
  onChange,
  style,
  children,
  selectedValue,
  testID
}: WheelPickerProps) => {
  const scrollView = useRef<Animated.ScrollView>();
  const offset = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(e => {
    offset.value = e.contentOffset.y;
  });

  const {
    height,
    items,
    shouldControlComponent,
    index: currentIndex,
    getRowItemAtOffset
  } = usePresenter({
    selectedValue,
    items: propItems,
    children,
    itemHeight,
    preferredNumVisibleRows: numberOfVisibleRows
  });

  const prevIndex = useRef(currentIndex);
  const [scrollOffset, setScrollOffset] = useState(currentIndex * itemHeight);

  useEffect(() => {
    controlComponent();
  });

  const keyExtractor = useCallback((item: ItemProps, index: number) => `${item}.${index}`, []);

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

  const scrollToPassedIndex = useCallback(() => {
    scrollToIndex(currentIndex, false);
  }, []);

  const scrollToOffset = (index: number, animated: boolean) => {
    // TODO: we should remove this split (the getNode section) in V6 and remove support for reanimated 1
    //@ts-ignore for some reason scrollToOffset isn't recognized
    if (isFunction(scrollView.current?.scrollToOffset)) {
      //@ts-ignore
      scrollView.current?.scrollToOffset({offset: index * itemHeight, animated})
    } else {
      //@ts-ignore
      scrollView.current?.getNode()?.scrollToOffset({offset: index * itemHeight, animated});
    }
  };

  const scrollToIndex = (index: number, animated: boolean) => {
    // this is done to handle onMomentumScrollEnd not being called in Android:
    // https://github.com/facebook/react-native/issues/26661
    if (Constants.isAndroid && prevIndex.current !== index) {
      prevIndex.current = index;
      onChange?.(items?.[index]?.value, index);
    }
    setTimeout(() => scrollToOffset(index, animated), 100);
  };

  const selectItem = useCallback(index => {
    scrollToIndex(index, true);
  },
  [itemHeight]);

  const onValueChange = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    setScrollOffset(event.nativeEvent.contentOffset.y);

    const {index, value} = getRowItemAtOffset(event.nativeEvent.contentOffset.y);
    onChange?.(value, index);
  }, [onChange]);

  const renderItem = useCallback(({item, index}) => {
    return (
      <Item
        index={index}
        itemHeight={itemHeight}
        offset={offset}
        activeColor={activeTextColor}
        inactiveColor={inactiveTextColor}
        style={textStyle}
        {...item}
        centerH={!label}
        onSelect={selectItem}
        testID={`${testID}.item_${index}`}
      />
    );
  },
  [itemHeight]);

  const separators = useMemo(() => {
    return (
      <View absF centerV pointerEvents="none">
        <View style={styles.separators}/>
      </View>
    );
  }, []);

  const labelContainer = useMemo(() => {
    return (
      <View centerV>
        <Text marginL-s2 text80M {...labelProps} color={activeTextColor} style={labelStyle}>
          {label}
        </Text>
      </View>
    );
  }, []);

  const fader = useMemo(() => (position: FaderPosition) => {
    return <Fader visible position={position} size={60}/>;
  },
  []);

  const getItemLayout = useCallback((_data, index: number) => {
    return {length: itemHeight, offset: itemHeight * index, index};
  },
  [itemHeight]);

  const contentContainerStyle = useMemo(() => {
    return {paddingVertical: height / 2 - itemHeight / 2};
  }, [height, itemHeight]);

  return (
    <View testID={testID} bg-white style={style}>
      <View row marginH-s5 centerH>
        <View>
          <AnimatedFlatList
            testID={`${testID}.list`}
            height={height}
            data={items}
            // @ts-ignore reanimated2
            keyExtractor={keyExtractor}
            scrollEventThrottle={100}
            onScroll={scrollHandler}
            onMomentumScrollEnd={onValueChange}
            showsVerticalScrollIndicator={false}
            onLayout={scrollToPassedIndex}
            // @ts-ignore
            ref={scrollView}
            contentContainerStyle={contentContainerStyle}
            snapToInterval={itemHeight}
            decelerationRate={Constants.isAndroid ? 0.98 : 'normal'}
            renderItem={renderItem}
            getItemLayout={getItemLayout}
            initialScrollIndex={currentIndex}
          />
        </View>
        {label && labelContainer}
      </View>
      {fader(FaderPosition.BOTTOM)}
      {fader(FaderPosition.TOP)}
      {separators}
    </View>
  );
});

export default WheelPicker;

const styles = StyleSheet.create({
  separators: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: Spacings.s9,
    borderColor: Colors.grey60
  }
});
