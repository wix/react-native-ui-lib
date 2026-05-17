// TODO: Support style customization
import {isFunction, isUndefined} from 'lodash';
import React, {useCallback, useRef, useMemo, useEffect, useState, type JSX} from 'react';
import {
  TextStyle,
  ViewStyle,
  NativeSyntheticEvent,
  NativeScrollEvent,
  StyleSheet,
  ListRenderItemInfo,
  FlatListProps
} from 'react-native';
import Animated, {useSharedValue, useAnimatedScrollHandler} from 'react-native-reanimated';
import {FlatList, GestureHandlerRootView} from 'react-native-gesture-handler';
import {Colors, Spacings} from '../../style';
import {Constants} from '../../commons/new';
import {useThemeProps} from '../../hooks';
import View from '../view';
import Text, {TextProps} from '../text';
import Fader, {FaderPosition, FaderProps} from '../fader';
import Item, {WheelPickerItemProps} from './Item';
import usePresenter from './usePresenter';
import {WheelPickerAlign, WheelPickerItemValue} from './types';
export {WheelPickerAlign, WheelPickerItemValue};

export const ITEM_HEIGHT = 44;

export type WheelPickerProps<T = WheelPickerItemValue> = {
  /**
   * Initial value
   */
  initialValue?: T;
  /**
   * Data source for WheelPicker
   */
  items?: WheelPickerItemProps<T>[];
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
  onChange?: (item: T, index: number) => void;
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
  disableRTL?: boolean;
  /**
   * Extra style for the separators
   */
  separatorsStyle?: ViewStyle;
  testID?: string;
  /**
   * Change the default (white) tint color of the fade view.
   */
  faderProps?: Omit<FaderProps, 'visible' | 'position'>;
  /**
   * Props to be sent to the FlatList
   */
  flatListProps?: Partial<FlatListProps<WheelPickerItemProps<T>>>;
}

const WheelPicker = <T extends WheelPickerItemValue>(props: WheelPickerProps<T>) => {
  const AnimatedFlatList = 
    useMemo(() => Animated.createAnimatedComponent<FlatListProps<WheelPickerItemProps<T>>>(FlatList), []);
  const themeProps = useThemeProps(props, 'WheelPicker');

  const {
    items: propItems,
    itemHeight = ITEM_HEIGHT,
    numberOfVisibleRows = 5,
    activeTextColor = Colors.$textPrimary,
    inactiveTextColor,
    textStyle,
    label,
    labelStyle,
    labelProps,
    onChange,
    align = WheelPickerAlign.CENTER,
    disableRTL,
    style,
    children,
    initialValue,
    separatorsStyle,
    testID,
    faderProps,
    flatListProps
  } = themeProps;
  const scrollView = useRef<Animated.ScrollView>(undefined);
  const offset = useSharedValue(0);
  const scrollHandler = useAnimatedScrollHandler(e => {
    offset.value = e.contentOffset.y;
  });
  const shouldDisableRTL = useMemo(() => {
    return Constants.isRTL && disableRTL;
  }, [disableRTL]);

  const {
    height,
    items,
    index: currentIndex = 0,
    getRowItemAtOffset
  } = usePresenter({
    initialValue,
    items: propItems,
    children,
    itemHeight,
    preferredNumVisibleRows: numberOfVisibleRows
  });

  const shouldSkipNextOnChange = useRef(false);
  const prevIndex = useRef(currentIndex);
  const [flatListWidth, setFlatListWidth] = useState(0);
  const keyExtractor = useCallback((item: WheelPickerItemProps<T>, index: number) => `${item}.${index}`, []);
  const androidFlatListProps = useMemo(() => {
    if (Constants.isAndroid) {
      return {
        maxToRenderPerBatch: items.length
      };
    }
  }, [items]);

  useEffect(() => {
    // This effect should replace the onLayout function in the FlatList, should happen only once
    scrollToIndex(currentIndex, true);
  }, []);

  useEffect(() => {
    // This effect making sure to reset index if initialValue has changed
    if (!isUndefined(initialValue)) {
      shouldSkipNextOnChange.current = true;
      scrollToIndex(currentIndex, true);
    }
  }, [currentIndex]);

  const _onChange = useCallback((value: T, index: number) => {
    if (!shouldSkipNextOnChange.current) {
      onChange?.(value, index);
    }
  },
  [onChange]);

  const disableOnChangeSkip = useCallback(() => {
    shouldSkipNextOnChange.current = false;
  }, []);

  const onValueChange = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const {value, index} = getRowItemAtOffset(event.nativeEvent.contentOffset.y);
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

  const selectItem = useCallback((index: number) => {
    shouldSkipNextOnChange.current = false;
    scrollToIndex(index, true);
  },
  [itemHeight]);

  const labelMargins = useMemo(() => {
    return {
      'marginL-s2': !shouldDisableRTL,
      'marginR-s5': !shouldDisableRTL,
      'marginR-s2': !!shouldDisableRTL,
      'marginL-s5': !!shouldDisableRTL
    };
  }, [shouldDisableRTL]);

  const fakeLabelProps = useMemo(() => {
    return {...labelMargins, ...labelProps};
  }, [labelMargins, labelProps]);

  const renderItem = useCallback(({item, index}: ListRenderItemInfo<WheelPickerItemProps<T>>) => {
    return (
      <Item
        index={index}
        itemHeight={itemHeight}
        offset={offset}
        activeColor={activeTextColor}
        inactiveColor={inactiveTextColor}
        style={textStyle}
        testID={`${testID}.item_${index}`}
        {...item}
        disableRTL={shouldDisableRTL}
        fakeLabel={label}
        fakeLabelStyle={labelStyle}
        fakeLabelProps={fakeLabelProps}
        centerH={!label}
        onSelect={selectItem}
      />
    );
  },
  [
    itemHeight,
    shouldDisableRTL,
    fakeLabelProps,
    offset,
    testID,
    labelStyle,
    label,
    activeTextColor,
    inactiveTextColor,
    textStyle,
    selectItem
  ]);

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

  const labelInnerContainerStyle = useMemo(() => {
    return [styles.label, shouldDisableRTL ? {left: 0} : {right: 0}];
  }, [shouldDisableRTL]);

  const labelContainer = useMemo(() => {
    return (
      // @ts-expect-error
      <View style={labelContainerStyle} width={flatListWidth} pointerEvents="none">
        <View style={labelInnerContainerStyle} centerV pointerEvents="none">
          <Text
            {...labelMargins}
            text80M
            {...labelProps}
            color={activeTextColor}
            style={labelStyle}
            testID={`${testID}.label`}
          >
            {label}
          </Text>
        </View>
      </View>
    );
  }, [
    labelMargins,
    flatListWidth,
    labelContainerStyle,
    labelInnerContainerStyle,
    label,
    labelProps,
    activeTextColor,
    labelStyle,
    testID
  ]);

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

  const offsets = useMemo(() => items.map((_, i) => i * itemHeight), [items, itemHeight]);

  return (
    <View testID={testID} bg-$backgroundDefault style={style}>
      {separators}
      <View row centerH>
        <GestureHandlerRootView style={styles.gestureContainer}>
          <AnimatedFlatList
            {...androidFlatListProps}
            {...flatListProps}
            testID={`${testID}.list`}
            listKey={`${testID}.flatList`}
            height={height}
            data={items}
            // @ts-ignore reanimated2
            keyExtractor={keyExtractor}
            scrollEventThrottle={100}
            onScroll={scrollHandler}
            onMomentumScrollEnd={onValueChange}
            showsVerticalScrollIndicator={false}
            onScrollBeginDrag={disableOnChangeSkip} // user dragged wheel.
            // @ts-ignore
            ref={scrollView}
            // @ts-expect-error
            contentContainerStyle={contentContainerStyle}
            snapToOffsets={offsets}
            decelerationRate={Constants.isAndroid ? 0.98 : 'normal'}
            renderItem={renderItem}
            getItemLayout={getItemLayout}
            initialScrollIndex={Constants.isIOS ? currentIndex : undefined}
            onContentSizeChange={updateFlatListWidth}
            /* This fixes an issue with RTL when centering flatlist content using alignSelf */
            centerContent={align === 'center' && Constants.isRTL}
          />
        </GestureHandlerRootView>
      </View>
      {label && labelContainer}
      {fader(FaderPosition.BOTTOM)}
      {fader(FaderPosition.TOP)}
    </View>
  );
};

WheelPicker.alignments = WheelPickerAlign;
export default WheelPicker;
export {WheelPickerItemProps};

const styles = StyleSheet.create({
  gestureContainer: {
    flexGrow: 1
  },
  separators: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: Spacings.s9,
    borderColor: Colors.$outlineDefault
  },
  label: {
    position: 'absolute',
    top: 0,
    bottom: 0
  }
});
