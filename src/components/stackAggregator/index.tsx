import React, {useState, useMemo} from 'react';
import {StyleSheet, Animated, Easing, LayoutAnimation, StyleProp, ViewStyle, LayoutChangeEvent} from 'react-native';
import {Colors} from '../../style';
import View, {ViewProps} from '../view';
import TouchableOpacity from '../touchableOpacity';
import Button, {ButtonSize, ButtonProps} from '../button';
import Card from '../card';
import {Constants, asBaseComponent} from '../../commons/new';
import {useDidUpdate} from '../../hooks';

const PEEP = 8;
const DURATION = 300;
const MARGIN_BOTTOM = 24;
const buttonStartValue = 0.8;
const icon = require('./assets/arrow-down.png');

export type StackAggregatorProps = ViewProps & {
   /**
     * The initial state of the stack
     */
    collapsed?: boolean;
    /**
     * Component Children
     */
    children: JSX.Element | JSX.Element[]
    /**
     * The container style
     */
    containerStyle?: StyleProp<ViewStyle>;
    /**
     * The content container style
     */
    contentContainerStyle?: StyleProp<ViewStyle>;
    /**
     * The items border radius
     */
    itemBorderRadius?: number;
    /**
     * Props passed to the 'show less' button
     */
    buttonProps?: ButtonProps;
    /**
     * A callback for item press
     */
    onItemPress?: (index: number) => void;
    /**
     * A callback for collapse state will change (value is future collapsed state)
     */
    onCollapseWillChange?: (changed: boolean) => void;
    /**
     * A callback for collapse state change (value is collapsed state)
     */
    onCollapseChanged?: (changed: boolean) => void;
    /**
     * A setting that disables the cards' onPress
     */
    disablePresses?: boolean;
};

/**
 * @description: Stack aggregator component
 * @modifiers: margin, padding
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/StackAggregatorScreen.tsx
 */
const StackAggregator = (props: StackAggregatorProps) => {
  const {
    children,
    containerStyle,
    buttonProps,
    collapsed = false,
    disablePresses,
    onItemPress,
    contentContainerStyle,
    itemBorderRadius,
    onCollapseWillChange,
    onCollapseChanged
  } = props;
  const [firstItemHeight, setFirstItemHeight] = useState<number>();
  const [isCollapsed, setIsCollapsed] = useState(collapsed);
  const itemsCount = React.Children.count(children);

  const animatedScale = new Animated.Value(isCollapsed ? buttonStartValue : 1);
  const animatedOpacity = new Animated.Value(isCollapsed ? buttonStartValue : 1);
  const animatedContentOpacity = useMemo(() => {
    return new Animated.Value(isCollapsed ? 0 : 1);
  }, [isCollapsed]);
  const easeOut = Easing.bezier(0, 0, 0.58, 1);
  
  const getItemScale = (index: number) => {
    if (isCollapsed) {
      if (index === itemsCount - 2) {
        return 0.95;
      }
      if (index === itemsCount - 1) {
        return 0.9;
      }
    }
    return 1;
  };

  const getAnimatedScales = () => {
    return React.Children.map(children, (_item, index) => {
      return new Animated.Value(getItemScale(index));
    }) as Animated.Value[];
  };

  const animatedScaleArray: Animated.Value[] = getAnimatedScales();

  useDidUpdate(() => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    onCollapseWillChange?.(isCollapsed);
    animate();
    onCollapseChanged?.(isCollapsed);
  }, [isCollapsed, onCollapseWillChange, onCollapseChanged]);

  const animate = () => {
    return Promise.all([animateValues(), animateCards()]);
  };

  const animateValues = () => {
    const newValue = isCollapsed ? buttonStartValue : 1;
    return new Promise(resolve => {
      Animated.parallel([
        Animated.timing(animatedOpacity, {
          duration: DURATION,
          toValue: Number(newValue),
          useNativeDriver: true
        }),
        Animated.timing(animatedScale, {
          toValue: Number(newValue),
          easing: easeOut,
          duration: DURATION,
          useNativeDriver: true
        }),
        Animated.timing(animatedContentOpacity, {
          toValue: Number(isCollapsed ? 0 : 1),
          easing: easeOut,
          duration: DURATION,
          useNativeDriver: true
        })
      ]).start(resolve);
    });
  };

  const animateCards = () => {
    const promises = [];
    for (let index = 0; index < itemsCount; index++) {
      const newScale = getItemScale(index);

      promises.push(new Promise(resolve => {
        Animated.timing(animatedScaleArray[index], {
          toValue: Number(newScale),
          easing: easeOut,
          duration: DURATION,
          useNativeDriver: true
        }).start(resolve);
      }));
    }
    return Promise.all(promises);
  };

  const close = () => {
    setIsCollapsed(true);
  };

  const open = () => {
    setIsCollapsed(false);
  };

  const getTop = (index: number) => {
    let start = 0;

    if (index === itemsCount - 2) {
      start += PEEP;
    }
    if (index === itemsCount - 1) {
      start += PEEP * 2;
    }

    return start;
  };

  const getItemStyle = (index: number) => {
    if (isCollapsed) {
      return {
        position: index !== 0 ? 'absolute' : undefined,
        top: getTop(index)
      };
    }
    return {
      marginBottom: MARGIN_BOTTOM,
      marginTop: index === 0 ? 40 : undefined
    };
  };

  const itemContainerStyle = useMemo(() => {
    return {opacity: animatedContentOpacity};
  }, [animatedContentOpacity]);

  const cardStyle = useMemo(() => {
    return [contentContainerStyle, styles.card];
  }, [contentContainerStyle]);

  const _onItemPress = (index: number) => {
    if (!disablePresses) {
      onItemPress?.(index);
    }
  };

  const onLayout = (event: LayoutChangeEvent) => {
    const height = event.nativeEvent.layout.height;

    if (height) {
      setFirstItemHeight(height);
    }
  };

  const renderItem = (item: JSX.Element | JSX.Element[], index: number) => {
    return (
      <Animated.View
        // key={index}
        onLayout={index === 0 ? onLayout : undefined}
        style={[
          Constants.isIOS && styles.containerShadow,
          //@ts-expect-error 'position' doesn't match AnimatedInterpolation type
          getItemStyle(index),
          {
            borderRadius: Constants.isIOS ? itemBorderRadius : undefined,
            alignSelf: 'center',
            zIndex: itemsCount - index,
            transform: [{scaleX: animatedScaleArray[index]}],
            width: Constants.screenWidth - 40,
            height: isCollapsed ? firstItemHeight : undefined
          }
        ]}
        collapsable={false}
      >
        <Card
          style={cardStyle}
          onPress={() => _onItemPress(index)}
          borderRadius={itemBorderRadius}
          elevation={5}
        >
          <Animated.View style={index !== 0 ? itemContainerStyle : undefined} collapsable={false}>
            {item}
          </Animated.View>
        </Card>
      </Animated.View>
    );
  };

  return (
    <View style={containerStyle}>
      <View style={styles.subContainer}>
        <Animated.View
          style={{
            position: 'absolute',
            right: 0,
            opacity: animatedOpacity,
            transform: [{scale: animatedScale}]
          }}
        >
          <Button
            label={'Show less'}
            iconSource={icon}
            link
            size={ButtonSize.small}
            {...buttonProps}
            marginH-24
            marginB-20
            onPress={close}
            style={styles.button}
          />
        </Animated.View>

        {React.Children.map(children, (item, index) => {
          return renderItem(item as JSX.Element | JSX.Element[], index);
        })}

        {isCollapsed && (
          <TouchableOpacity
            onPress={open}
            activeOpacity={1}
            style={[
              styles.touchable,
              {
                height: firstItemHeight ? firstItemHeight + PEEP * 2 : undefined,
                zIndex: itemsCount
              }
            ]}
          />
        )}
      </View>
    </View>
  );
};

export default asBaseComponent<StackAggregatorProps>(StackAggregator);
StackAggregator.displayName = 'StackAggregator';
StackAggregator.defaultProps = {
  collapsed: true,
  disablePresses: false,
  itemBorderRadius: 0
};

const styles = StyleSheet.create({
  subContainer: {
    marginBottom: PEEP * 3
  },
  touchable: {
    position: 'absolute',
    width: '100%'
  },
  containerShadow: {
    backgroundColor: Colors.white,
    shadowColor: Colors.grey40,
    shadowOpacity: 0.25,
    shadowRadius: 12,
    shadowOffset: {height: 5, width: 0}
  },
  card: {
    overflow: 'hidden',
    flexShrink: 1
  },
  button: {
    zIndex: 100
  }
});
