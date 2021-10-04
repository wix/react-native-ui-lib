// TODO: Support style customization
import {isFunction, isUndefined} from 'lodash';
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
import {asBaseComponent} from '../../commons/new';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

enum WheelPickerAlign {
  CENTER = 'center',
  RIGHT = 'right',
  LEFT = 'left'
}

export interface WheelPickerProps {
  /**
   * Initial value (doesn't work with selectedValue)
   */
  initialValue?: ItemProps | number | string;
  /**
   * The current selected value
   */
  selectedValue?: ItemProps | number | string;
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
   * Align the content to center, right ot left (default: center)
   */
  align?: WheelPickerAlign;
  testID?: string;
}

const WheelPicker = ({
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
  align,
  style,
  children,
  initialValue,
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
    initialValue,
    selectedValue,
    items: propItems,
    children,
    itemHeight,
    preferredNumVisibleRows: numberOfVisibleRows
  });

  const prevIndex = useRef(currentIndex);
  const [scrollOffset, setScrollOffset] = useState(currentIndex * itemHeight);
  const [flatListWidth, setFlatListWidth] = useState(0);
  const keyExtractor = useCallback((item: ItemProps, index: number) => `${item}.${index}`, []);

  /* This effect enforce the index to be controlled by selectedValue passed by the user */
  useEffect(() => {
    if (shouldControlComponent(scrollOffset)) {
      scrollToIndex(currentIndex, true);
    }
  });

  /* This effect making sure to reset index if initialValue has changed */
  useEffect(() => {
    !isUndefined(initialValue) && scrollToIndex(currentIndex, true);
  }, [currentIndex]);

  const scrollToPassedIndex = useCallback(() => {
    scrollToIndex(currentIndex, false);
  }, []);

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
  },
  [onChange]);

  const alignmentStyle = useMemo(() =>
    align === WheelPickerAlign.RIGHT
      ? {alignSelf: 'flex-end'}
      : align === WheelPickerAlign.LEFT
        ? {alignSelf: 'flex-start'}
        : {alignSelf: 'center'},
  [align]);

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

  const separators = useMemo(() => {
    return (
      <View absF centerV pointerEvents="none">
        <View style={styles.separators}/>
      </View>
    );
  }, []);

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
    return <Fader visible position={position} size={60}/>;
  },
  []);

  const getItemLayout = useCallback((_data, index: number) => {
    return {length: itemHeight, offset: itemHeight * index, index};
  },
  [itemHeight]);

  const updateFlatListWidth = useCallback((width: number) => {
    setFlatListWidth(width);
  }, []);

  const contentContainerStyle = useMemo(() => {
    return [
      {
        paddingVertical: height / 2 - itemHeight / 2
      },
      alignmentStyle
    ];
  }, [height, itemHeight, alignmentStyle]);

  return (
    <View testID={testID} bg-white style={style}>
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

const styles = StyleSheet.create({
  separators: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: Spacings.s9,
    borderColor: Colors.grey60
  },
  label: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0
  }
});
