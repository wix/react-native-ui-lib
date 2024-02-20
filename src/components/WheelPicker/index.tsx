// TODO: Support style customization
import {isFunction, isUndefined} from 'lodash';
import React, {useCallback, useRef, useMemo, useEffect, useState} from 'react';
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
import {FlatList} from 'react-native-gesture-handler';
import {Colors, Spacings} from 'style';
import {Constants} from '../../commons/new';
import {useThemeProps} from '../../hooks';
import View from '../../components/view';
import Text, {TextProps} from '../../components/text';
import Fader, {FaderPosition, FaderProps} from '../../components/fader';
import Item, {ItemProps} from './Item';
import usePresenter from './usePresenter';
import {WheelPickerAlign} from './types';
export {WheelPickerAlign};

export const ITEM_HEIGHT = 44;

export type WheelPickerProps<T> = {
  /**
   * Initial value
   */
  initialValue?: T;
  /**
   * Data source for WheelPicker
   */
  items?: ItemProps<T>[];
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
  flatListProps?: Partial<FlatListProps<ItemProps<T>>>;
}

const WheelPicker = <T extends string | number = number>(props: WheelPickerProps<T>) => {
  const AnimatedFlatList = useMemo(() => Animated.createAnimatedComponent<FlatListProps<ItemProps<T>>>(FlatList), []);
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
  const scrollView = useRef<Animated.ScrollView>();
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

  const prevInitialValue = useRef(initialValue);
  const prevIndex = useRef(currentIndex);
  const [flatListWidth, setFlatListWidth] = useState(0);
  const keyExtractor = useCallback((item: ItemProps<T>, index: number) => `${item}.${index}`, []);
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
    !isUndefined(initialValue) && scrollToIndex(currentIndex, true);
  }, [currentIndex]);

  const _onChange = useCallback((value: T, index: number) => {
    if (prevInitialValue.current !== initialValue) {
      // don't invoke 'onChange' if 'initialValue' changed
      prevInitialValue.current = initialValue;
    } else {
      onChange?.(value, index);
    }
  },
  [initialValue, onChange]);

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

  const renderItem = useCallback(({item, index}: ListRenderItemInfo<ItemProps<T>>) => {
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

  return (
    <View testID={testID} bg-$backgroundDefault style={style}>
      <View row centerH>
        <View flexG>
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
            // @ts-ignore
            ref={scrollView}
            // @ts-expect-error
            contentContainerStyle={contentContainerStyle}
            snapToInterval={itemHeight}
            decelerationRate={Constants.isAndroid ? 0.98 : 'normal'}
            renderItem={renderItem}
            getItemLayout={getItemLayout}
            initialScrollIndex={Constants.isIOS ? currentIndex : undefined}
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
export default WheelPicker;
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
    top: 0,
    bottom: 0
  }
});
