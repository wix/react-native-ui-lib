// TODO: Support style customization
// TODO: Support control of visible items
import _ from 'lodash';
import React, {useCallback, useRef, useState, useMemo} from 'react';
import {TextStyle, FlatList, StyleProp, NativeSyntheticEvent, NativeScrollEvent} from 'react-native';
import Animated from 'react-native-reanimated';
import {useValues} from 'react-native-redash';
import {Colors} from '../../../src/style';
import View from '../../components/view';
import Fader, {FaderPosition} from '../../components/fader';
import {Constants} from '../../helpers';

import Item, {ItemProps} from './Item';

const AnimatedFlatList = Animated.createAnimatedComponent(FlatList);

export interface WheelPickerProps {
  /**
   * Data source for WheelPicker
   */
  items?: ItemProps[];
  /**
   * Describe the height of each item in the WheelPicker
   */
  itemHeight?: number;
  /**
   * TextStyle for the focused row
   */
  activeItemTextStyle?: StyleProp<TextStyle>;
  /**
   * TextStyle for other, non-focused rows
   */
  inactiveItemTextStyle?: StyleProp<TextStyle>;
  /**
   * Event, on active row change
   */
  onChange: (index: number, item?: ItemProps) => void;
}

type WrappedItem = {
  isActive: boolean;
} & ItemProps;

const WheelPicker = ({items, itemHeight = 48, activeItemTextStyle, inactiveItemTextStyle, onChange: onChangeEvent}: WheelPickerProps) => {
  const height = itemHeight * 5;
  const scrollView = useRef<Animated.ScrollView>();
  const [offset] = useValues([0], []);
  const activeIndex = useRef<number>(0);

  const wrapItems = (items?: ItemProps[]): WrappedItem[] => {
    return _.map(items, (item, index: number) => {
      return {...item, isActive: activeIndex.current === index};
    });
  };

  const [itemsWrap, setItemWrapped] = useState<WrappedItem[]>(wrapItems(items));

  const selectItem = useCallback(
    index => {
      if (scrollView.current?.getNode()) {
        //@ts-ignore for some reason scrollToOffset not recognized
        scrollView.current.getNode().scrollToOffset({offset: index * itemHeight, animated: true});
      }
    },
    [itemHeight]
  );

  const onChange = useCallback(() => {
    onChangeEvent(activeIndex.current, items?.[activeIndex.current]);
  }, [itemHeight]);

  const valueInRange = (value: number, min: number, max: number): number => {
    if (value < min || value === -0) {
      return min;
    }
    if (value > max) {
      return max;
    }
    return value;
  };

  const calculateCurrentIndex = (offset: number): number => {
    const calculatedIndex = Math.round(offset / itemHeight);
    return valueInRange(calculatedIndex, 0, items!.length - 1);
  };

  const updateItems = () => {
    setItemWrapped(wrapItems(items));
  };

  const onScroll = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const currentIndex = calculateCurrentIndex(event.nativeEvent.contentOffset.y);
    if (activeIndex.current != currentIndex) {
      activeIndex.current = currentIndex;
      updateItems();
    }
  }, []);

  const renderItem = useCallback(({item, index}) => {
    return (
      <Item
        index={index}
        itemHeight={itemHeight}
        offset={offset}
        textStyle={activeItemTextStyle}
        {...item}
        onSelect={selectItem}
      />
    );
  }, []);

  const renderFader = useMemo(
    () => (position: FaderPosition) => {
      return <Fader visible position={position} size={60} />;
    },
    []
  );

  const renderSeparators = useMemo(() => {
    return (
      <View absF centerV pointerEvents="none">
        <View
          style={{
            borderTopWidth: 1,
            borderBottomWidth: 1,
            height: itemHeight,
            borderColor: Colors.grey60
          }}
        />
      </View>
    );
  }, []);

  return (
    <View>
      <View width={250} height={height} br20>
        <AnimatedFlatList
          data={itemsWrap}
          keyExtractor={keyExtractor}
          scrollEventThrottle={16}
          onScroll={onScroll}
          onMomentumScrollEnd={onChange}
          showsVerticalScrollIndicator={false}
          // @ts-ignore
          ref={scrollView}
          contentContainerStyle={{
            paddingVertical: height / 2 - itemHeight / 2
          }}
          snapToInterval={itemHeight}
          decelerationRate={Constants.isAndroid ? 0.98 : 'normal'}
          renderItem={renderItem}
        />
        {renderFader(FaderPosition.BOTTOM)}
        {renderFader(FaderPosition.TOP)}
        {renderSeparators}
      </View>
    </View>
  );
};

const keyExtractor = (item: WrappedItem) => `${item.value}-${item.isActive}`;

export default WheelPicker;
