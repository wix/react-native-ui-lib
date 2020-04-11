// TODO: Convert to typescript
// TODO: Support onChange callback
// TODO: Support initial value
// TODO: Support style customization
// TODO: Support custom item height
// TODO: Support control of visible items
import _ from 'lodash';
import React, {useCallback, useRef} from 'react';
import Animated, {concat} from 'react-native-reanimated';
import {onScrollEvent, transformOrigin, useValues} from 'react-native-redash';

import View from '../../components/view';
import Text from '../../components/text';
import TouchableOpacity from '../../components/touchableOpacity';
import {Constants} from '../../helpers';

const ITEM_HEIGHT = 48;

const AnimatedTouchableOpacity = Animated.createAnimatedComponent(TouchableOpacity);
const AnimatedText = Animated.createAnimatedComponent(Text);

const WheelPicker = () => {
  const scrollview = useRef();
  const [_offset] = useValues([0], []);

  const onScroll = onScrollEvent({y: _offset});

  const selectItem = useCallback(({index}) => {
    scrollview.current.getNode().scrollTo({y: index * ITEM_HEIGHT, animated: true});
  });

  const renderItem = useCallback((index) => {
    const itemOffset = index * ITEM_HEIGHT;
    const opacity = Animated.interpolate(_offset, {
      inputRange: [itemOffset - ITEM_HEIGHT, itemOffset, itemOffset + ITEM_HEIGHT],
      outputRange: [0.5, 1, 0.5]
    });

    const rotateXValue = Animated.interpolate(_offset, {
      inputRange: [itemOffset - 2.5 * ITEM_HEIGHT, itemOffset, itemOffset + 2.5 * ITEM_HEIGHT],
      outputRange: [-90, 0, -90]
    });
    const rotateX = concat(rotateXValue, 'deg');

    const scale = Animated.interpolate(_offset, {
      inputRange: [itemOffset - 2 * ITEM_HEIGHT, itemOffset, itemOffset + 2 * ITEM_HEIGHT],
      outputRange: [0.7, 1, 0.7]
    });

    return (
      <AnimatedTouchableOpacity
        activeOpacity={1}
        style={{
          height: ITEM_HEIGHT,
          opacity,
          transform: transformOrigin({x: 125, y: 24}, {rotateX})
        }}
        key={index}
        center
        onPress={selectItem}
        index={index}
      >
        <AnimatedText text60 style={{transform: [{scale}]}}>
          {index}
        </AnimatedText>
      </AnimatedTouchableOpacity>
    );
  });

  const height = ITEM_HEIGHT * 4;
  return (
    <View center flex>
      <View width={250} height={height} br20 style={{borderWidth: 1}}>
        <Animated.ScrollView
          scrollEventThrottle={16}
          onScroll={onScroll}
          showsVerticalScrollIndicator={false}
          ref={scrollview}
          contentContainerStyle={{paddingVertical: height / 2 - ITEM_HEIGHT / 2}}
          snapToInterval={ITEM_HEIGHT}
          decelerationRate={Constants.isAndroid ? 0.98 : 'normal'}
        >
          {_.times(20, (index) => {
            return renderItem(index);
          })}
        </Animated.ScrollView>
        <View absF centerV pointerEvents="none">
          <View style={{borderTopWidth: 1, borderBottomWidth: 1, height: ITEM_HEIGHT}}/>
        </View>
      </View>
    </View>
  );
};

export default WheelPicker;
