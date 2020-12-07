// TODO: Support onChange callback
// TODO: Support style customization
// TODO: Support control of visible items
import _ from 'lodash';
import React, {useCallback, useRef, useMemo} from 'react';
import {TextStyle, FlatList, NativeSyntheticEvent, NativeScrollEvent} from 'react-native';
import Animated from 'react-native-reanimated';
import {onScrollEvent, useValues} from 'react-native-redash';
import {Colors} from '../../../src/style';
import View from '../../components/view';
import Fader, {FaderPosition} from '../../components/fader';
import {Constants} from '../../helpers';
import useMiddleIndex from './helpers/useListMiddleIndex';
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
  selectedTextColor?: string;
  /**
   * TextStyle for other, non-focused rows
   */
  unselectedTextStyle?: string;
  /**
   * Row text style
   */
  textStyle?: TextStyle;
  /**
   * Event, on active row change
   */
  onChange: (index: number, item?: ItemProps) => void;
}

const WheelPicker = ({items, itemHeight = 48, selectedTextColor, unselectedTextStyle, textStyle, onChange: onChangeEvent}: WheelPickerProps) => {
  const height = itemHeight * 5;
  const scrollView = useRef<Animated.ScrollView>();
  const [offset] = useValues([0], []);
  const onScroll = onScrollEvent({y: offset});
  
  const listSize = items?.length || 0;
  const middleIndex = useMiddleIndex({itemHeight, listSize});

  const selectItem = useCallback(
    index => {
      if (scrollView.current?.getNode()) {
        //@ts-ignore for some reason scrollToOffset isn't recognized
        scrollView.current.getNode().scrollToOffset({offset: index * itemHeight, animated: true});
      }
    },
    [itemHeight]
  );

  const onChange = useCallback((event: NativeSyntheticEvent<NativeScrollEvent>) => {
    const index = middleIndex(event.nativeEvent.contentOffset.y);
    onChangeEvent(index, items?.[index]);
  }, []);
  
  const renderItem = useCallback(({item, index}) => {
    return (
      <Item
        index={index}
        itemHeight={itemHeight}
        offset={offset}
        activeColor={selectedTextColor}
        inactiveColor={unselectedTextStyle}
        style={textStyle}
        {...item}
        onSelect={selectItem}
      />
    );
  }, [itemHeight]);

  const renderFader = useMemo(
    () => (position: FaderPosition) => {
      return <Fader visible position={position} size={60} />;
    },
    []
  );

  const separators = useMemo(() => {
    return (
      <View absF centerV pointerEvents="none">
        <View
          style={{
            borderTopWidth: 1,
            borderBottomWidth: 1,
            height: itemHeight,
            borderColor: Colors.grey50
          }}
        />
      </View>
    );
  }, []);

  return (
    <View>
      <View width={250} height={height} br20>
        <AnimatedFlatList
          data={items}
          keyExtractor={keyExtractor}
          scrollEventThrottle={100}
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

const keyExtractor = (item: ItemProps) => `${item.value}`;

export default WheelPicker;
