// TODO: Support onChange callback
// TODO: Support style customization
// TODO: Support control of visible items
import _ from 'lodash';
import React, {useCallback, useRef} from 'react';
import {TextStyle, FlatList, StyleProp} from 'react-native';
import Animated from 'react-native-reanimated';
import {onScrollEvent, useValues} from 'react-native-redash';

import View from '../../components/view';
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

const WheelPicker = ({items, itemHeight = 48, activeItemTextStyle}: WheelPickerProps) => {
  const height = itemHeight * 4;
  const scrollView = useRef<Animated.ScrollView>();
  const [offset] = useValues([0], []);
  const onScroll = onScrollEvent({y: offset});

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
    // TODO: need to implement on change event that calc the current selected index
  }, [itemHeight]);

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

  return (
    <View>
      <View width={250} height={height} br20>
        <AnimatedFlatList
          data={items}
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
        <View absF centerV pointerEvents="none">
          <View
            style={{
              borderTopWidth: 1,
              borderBottomWidth: 1,
              height: itemHeight
            }}
          />
        </View>
      </View>
    </View>
  );
};

const keyExtractor = (item: WrappedItem) => `${item.value}-${item.isActive}`;

export default WheelPicker;
