// TODO: Support style customization
import {isFunction, isUndefined} from 'lodash';
import React, {useCallback, useRef, useMemo, useEffect, useState} from 'react';
import {TextStyle, ViewStyle, FlatList, NativeSyntheticEvent, NativeScrollEvent, StyleSheet, ListRenderItemInfo, FlatListProps} from 'react-native';
import Animated, {useSharedValue, useAnimatedScrollHandler} from 'react-native-reanimated';
import {Colors, Spacings} from 'style';
import {Constants, asBaseComponent} from '../../commons/new';
import View from '../../components/view';
import Fader, {FaderPosition, FaderProps} from '../../components/fader';
import Item, {ItemProps} from './Item';
import Text, {TextProps} from '../../components/text';
import usePresenter from './usePresenter';
import {WheelPickerAlign} from './types';

const AnimatedFlatList = Animated.createAnimatedComponent<FlatListProps<ItemProps>>(FlatList);

export interface WheelPickerProps {
  /**
   * Initial value
   */
  initialValue?: ItemProps | number | string;
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
  textStyle?: Omit<TextStyle, 'color'>;
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
   * Align the content to center, right ot left (default: center)
   */
  align?: WheelPickerAlign;
  /**
   * Extra style for the separators
   */
  separatorsStyle?: ViewStyle;
  testID?: string;
  /**
   * Change the default (white) tint color of the fade view.
   */
  faderProps?: Omit<FaderProps, 'visible' | 'position'>;
}

const WheelPicker = ({
  items: propItems,
  itemHeight = 44,
  numberOfVisibleRows = 5,
  activeTextColor = Colors.$textPrimary,
  inactiveTextColor,
  textStyle,
  label,
  labelStyle,
  labelProps,
  onChange,
  align = WheelPickerAlign.CENTER,
  style,
  children,
  initialValue = 0,
  separatorsStyle,
  testID,
  faderProps
}: WheelPickerProps) => {
  const scrollView = useRef<Animated.ScrollView>();
  const offset = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(e => {
    offset.value = e.contentOffset.y;
  });

  const {
    height,
    items,
    index: currentIndex,
    getRowItemAtOffset
  } = usePresenter({
    initialValue,
    items: propItems,
    children,
    itemHeight,
    preferredNumVisibleRows: numberOfVisibleRows
  });

  const prevInitialValue = useRef(initialValue);
  const prevIndex = useRef(currentIndex);
  const [flatListWidth, setFlatListWidth] = useState(0);
  const keyExtractor = useCallback((item: ItemProps, index: number) => `${item}.${index}`, []);

  useEffect(() => {
    // This effect making sure to reset index if initialValue has changed
    !isUndefined(initialValue) && scrollToIndex(currentIndex, true);
  }, [currentIndex]);

  const _onChange = useCallback((value: string | number, index: number) => {
    if (prevInitialValue.current !== initialValue) {
      // don't invoke 'onChange' if 'initialValue' changed
      prevInitialValue.current = initialValue;
    } else {
      onChange?.(value, index);
    }
  },
  [initialValue, onChange]);

  const onValueChange = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {index, value} = getRowItemAtOffset(event.nativeEvent.contentOffset.y);
    _onChange(value, index);
  },
  [_onChange, getRowItemAtOffset]);

  const onMomentumScrollEndAndroid = (index: number) => {
    // handle Android bug: ScrollView does not call 'onMomentumScrollEnd' when scrolled programmatically (https://github.com/facebook/react-native/issues/26661)
    if (Constants.isAndroid && prevIndex.current !== index) {
      prevIndex.current = index;
      _onChange(items?.[index]?.value, index);
    }
  };

  const scrollToOffset = (index: number, animated: boolean) => {
    // TODO: we should remove this split (the getNode section) in V6 and remove support for reanimated 1
    //@ts-expect-error for some reason scrollToOffset isn't recognized
    if (isFunction(scrollView.current?.scrollToOffset)) {
      //@ts-expect-error
      scrollView.current?.scrollToOffset({offset: index * itemHeight, animated});
    } else {
      //@ts-expect-error
      scrollView.current?.getNode()?.scrollToOffset({offset: index * itemHeight, animated});
    }
  };

  const scrollToIndex = (index: number, animated: boolean) => {
    onMomentumScrollEndAndroid(index);
    setTimeout(() => scrollToOffset(index, animated), 100);
  };

  const scrollToPassedIndex = useCallback(() => {
    scrollToIndex(currentIndex, false);
  }, []);

  const selectItem = useCallback((index: number) => {
    scrollToIndex(index, true);
  },
  [itemHeight]);

  const renderItem = useCallback(({item, index}: ListRenderItemInfo<ItemProps>) => {
    return (
      <Item
        index={index}
        itemHeight={itemHeight}
        offset={offset}
        activeColor={activeTextColor}
        inactiveColor={inactiveTextColor}
        style={textStyle}
        {...item}
        fakeLabel={label}
        fakeLabelStyle={labelStyle}
        fakeLabelProps={labelProps}
        centerH={!label}
        onSelect={selectItem}
        testID={`${testID}.item_${index}`}
      />
    );
  },
  [itemHeight]);

  const getItemLayout = useCallback((_data: any, index: number) => {
    return {length: itemHeight, offset: itemHeight * index, index};
  },
  [itemHeight]);

  const updateFlatListWidth = useCallback((width: number) => {
    setFlatListWidth(width);
  }, []);

  const alignmentStyle = useMemo(() => {
    return align === WheelPickerAlign.RIGHT
      ? {alignSelf: 'flex-end'}
      : align === WheelPickerAlign.LEFT
        ? {alignSelf: 'flex-start'}
        : {alignSelf: 'center'};
  }, [align]);

  const contentContainerStyle = useMemo(() => {
    return [
      {
        paddingVertical: height / 2 - itemHeight / 2
      },
      alignmentStyle
    ];
  }, [height, itemHeight, alignmentStyle]);

  const labelContainerStyle = useMemo(() => {
    return [{position: 'absolute', top: 0, bottom: 0}, alignmentStyle];
  }, [alignmentStyle]);

  const labelContainer = useMemo(() => {
    return (
      // @ts-expect-error
      <View style={labelContainerStyle} width={flatListWidth} pointerEvents="none">
        <View style={styles.label} centerV pointerEvents="none">
          <Text marginL-s2 marginR-s5 text80M {...labelProps} color={activeTextColor} style={labelStyle}>
            {label}
          </Text>
        </View>
      </View>
    );
  }, [flatListWidth, labelContainerStyle, label, labelProps, activeTextColor, labelStyle]);

  const fader = useMemo(() => (position: FaderPosition) => {
    return <Fader visible position={position} size={60} {...faderProps}/>;
  },
  []);

  const separators = useMemo(() => {
    return (
      <View absF centerV pointerEvents="none">
        <View style={[styles.separators, separatorsStyle]}/>
      </View>
    );
  }, []);

  return (
    <View testID={testID} bg-$backgroundDefault style={style}>
      <View row centerH>
        <View flexG>
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
            // @ts-expect-error
            contentContainerStyle={contentContainerStyle}
            snapToInterval={itemHeight}
            decelerationRate={Constants.isAndroid ? 0.98 : 'normal'}
            renderItem={renderItem}
            getItemLayout={getItemLayout}
            initialScrollIndex={currentIndex}
            onContentSizeChange={updateFlatListWidth}
            /* This fixes an issue with RTL when centering flatlist content using alignSelf */
            centerContent={align === 'center' && Constants.isRTL}
          />
        </View>
      </View>
      {label && labelContainer}
      {fader(FaderPosition.BOTTOM)}
      {fader(FaderPosition.TOP)}
      {separators}
    </View>
  );
};

WheelPicker.alignments = WheelPickerAlign;
WheelPicker.displayName = 'Incubator.WheelPicker';
export default asBaseComponent<WheelPickerProps, typeof WheelPicker>(WheelPicker);
export {ItemProps as WheelPickerItemProps};

const styles = StyleSheet.create({
  separators: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: Spacings.s9,
    borderColor: Colors.$outlineDefault
  },
  label: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0
  }
});
