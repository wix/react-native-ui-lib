import _pt from "prop-types";
// TODO: Support style customization
import React, { useCallback, useRef, useMemo, useEffect, useState } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import Animated from 'react-native-reanimated';
import { onScrollEvent, useValues } from 'react-native-redash';
import { Colors, Spacings } from "../../style";
import View from "../../components/view";
import Fader, { FaderPosition } from "../../components/fader";
import { Constants } from "../../helpers";
import Item from "./Item";
import usePresenter from "./usePresenter";
import Text from "../../components/text";
const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);
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
}) => {
  const scrollView = useRef();
  const [offset] = useValues([0], []);
  const onScroll = onScrollEvent({
    y: offset
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

  const scrollToIndex = (index, animated) => {
    // this is done to handle onMomentumScrollEnd not being called in Android:
    // https://github.com/facebook/react-native/issues/26661
    if (Constants.isAndroid && prevIndex.current !== index) {
      prevIndex.current = index;
      onChange?.(items?.[index]?.value, index);
    } //@ts-ignore for some reason scrollToOffset isn't recognized


    setTimeout(() => scrollView.current?.getNode()?.scrollToOffset({
      offset: index * itemHeight,
      animated
    }), 100);
  };

  const selectItem = useCallback(index => {
    scrollToIndex(index, true);
  }, [itemHeight]);

  const onValueChange = event => {
    setScrollOffset(event.nativeEvent.contentOffset.y);
    const {
      index,
      value
    } = getRowItemAtOffset(event.nativeEvent.contentOffset.y);
    onChange?.(value, index);
  };

  const renderItem = useCallback(({
    item,
    index
  }) => {
    return <Item index={index} itemHeight={itemHeight} offset={offset} activeColor={activeTextColor} inactiveColor={inactiveTextColor} style={textStyle} {...item} centerH={!label} onSelect={selectItem} testID={`${testID}.item_${index}`} />;
  }, [itemHeight]);

  const renderSeparators = () => {
    return <View absF centerV pointerEvents="none">
        <View style={styles.separators} />
      </View>;
  };

  const renderLabel = () => {
    return <View centerV>
        <Text marginL-s2 text80M {...labelProps} color={activeTextColor} style={labelStyle}>
          {label}
        </Text>
      </View>;
  };

  const fader = useMemo(() => position => {
    return <Fader visible position={position} size={60} />;
  }, []);
  const getItemLayout = useCallback((_data, index) => {
    return {
      length: itemHeight,
      offset: itemHeight * index,
      index
    };
  }, [itemHeight]);
  const contentContainerStyle = useMemo(() => {
    return {
      paddingVertical: height / 2 - itemHeight / 2
    };
  }, [height, itemHeight]);
  return <View testID={testID} bg-white style={style}>
      <View row marginH-s5 centerH>
        <View>
          <AnimatedFlatList testID={`${testID}.list`} height={height} data={items} // @ts-ignore reanimated2
        keyExtractor={keyExtractor} scrollEventThrottle={100} onScroll={onScroll} onMomentumScrollEnd={onValueChange} showsVerticalScrollIndicator={false} onLayout={scrollToPassedIndex} // @ts-ignore
        ref={scrollView} contentContainerStyle={contentContainerStyle} snapToInterval={itemHeight} decelerationRate={Constants.isAndroid ? 0.98 : 'normal'} renderItem={renderItem} getItemLayout={getItemLayout} initialScrollIndex={currentIndex} />
        </View>
        {label && renderLabel()}
      </View>
      {fader(FaderPosition.BOTTOM)}
      {fader(FaderPosition.TOP)}
      {renderSeparators()}
    </View>;
});
WheelPicker.propTypes = {
  /**
     * Data source for WheelPicker
     */
  items: _pt.array,

  /**
     * Describe the height of each item in the WheelPicker
     * default value: 44
     */
  itemHeight: _pt.number,

  /**
     * Describe the number of rows visible
     * default value: 5
     */
  numberOfVisibleRows: _pt.number,

  /**
     * Text color for the focused row
     */
  activeTextColor: _pt.string,

  /**
     * Text color for other, non-focused rows
     */
  inactiveTextColor: _pt.string,

  /**
     * Additional label on the right of the item text
     */
  label: _pt.string,

  /**
     * Event, on active row change
     */
  onChange: _pt.func,

  /**
     * Support passing items as children props
     */
  children: _pt.oneOfType([_pt.element, _pt.arrayOf(_pt.element)]),
  testID: _pt.string
};

const keyExtractor = item => `${item.value}`;

export default WheelPicker;
const styles = StyleSheet.create({
  separators: {
    borderTopWidth: 1,
    borderBottomWidth: 1,
    height: Spacings.s9,
    borderColor: Colors.grey60
  }
});