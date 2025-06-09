import React, {useState, useMemo, useCallback, useEffect} from 'react';
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
  children: JSX.Element | JSX.Element[];
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
    collapsed = true,
    disablePresses = false,
    onItemPress,
    backgroundColor,
    contentContainerStyle,
    itemBorderRadius = 0,
    backgroundColor,
    onCollapseWillChange,
    onCollapseChanged
  } = props;
  const itemsCount = React.Children.count(children);
  const [firstItemHeight, setFirstItemHeight] = useState<number>();
  const [isCollapsed, setIsCollapsed] = useState(collapsed);

  useEffect(() => {
    setIsCollapsed(collapsed);
  }, [collapsed]);

  useDidUpdate(async () => {
    onCollapseWillChange?.(isCollapsed);
    await animate();
    onCollapseChanged?.(isCollapsed);
  }, [isCollapsed, itemsCount]);

  /** Animations */

  const animatedScale = new Animated.Value(isCollapsed ? buttonStartValue : 1);
  const animatedOpacity = new Animated.Value(isCollapsed ? buttonStartValue : 1);
  const animatedContentOpacity = useMemo(() => {
    return new Animated.Value(isCollapsed ? 0 : 1);
  }, [isCollapsed]);
  const easeOut = Easing.bezier(0, 0, 0.58, 1);

  const getItemScale = useCallback((index: number) => {
    if (isCollapsed) {
      if (index === 1) {
        return 0.95;
      }

      if (index === 2) {
        return 0.9;
      }
    }
    return 1;
  },
  [isCollapsed, itemsCount]);

  const getAnimatedScales = useCallback(() => {
    return React.Children.map(children, (_item, index) => {
      return new Animated.Value(getItemScale(index));
    }) as Animated.Value[];
  }, [children, getItemScale]);

  const animatedScaleArray = useMemo(() => {
    return getAnimatedScales();
  }, [getAnimatedScales]);

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
          toValue: newScale,
          easing: easeOut,
          duration: DURATION,
          useNativeDriver: true
        }).start(resolve);
      }));
    }
    return Promise.all(promises);
  };

  /** Actions */

  const close = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsCollapsed(true);
  };

  const open = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
    setIsCollapsed(false);
  };

  /** Styles */

  const getTop = (index: number) => {
    let start = 0;

    if (index === 1) {
      start += PEEP;
    }

    if (index === 2) {
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

  const touchableOpacityStyle = useMemo(() => {
    return [
      styles.touchable,
      {
        height: firstItemHeight ? firstItemHeight + PEEP * 2 : undefined,
        zIndex: itemsCount
      }
    ];
  }, [firstItemHeight, itemsCount]);

  const cardStyle = useMemo(() => {
    return backgroundColor ? [styles.card, {backgroundColor}] : styles.card;
  }, [backgroundColor]);

  /** Events */

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

  /** Renders */

  const renderItem = (item: JSX.Element | JSX.Element[], index: number) => {
    return (
      <Animated.View
        onLayout={index === 0 ? onLayout : undefined}
        style={[
          Constants.isIOS && (index === 0 || index === 1 || index === 2 || !isCollapsed) && styles.containerShadow,
          contentContainerStyle,
          //@ts-expect-error 'position' doesn't match AnimatedInterpolation type
          getItemStyle(index),
          {
            borderRadius: Constants.isIOS ? itemBorderRadius : undefined,
            alignSelf: 'center',
            zIndex: itemsCount - index,
            transform: [{scaleX: animatedScaleArray[index]}],
            width: Constants.windowWidth - 40,
            height: isCollapsed ? firstItemHeight : undefined
          }
        ]}
        collapsable={false}
      >
        <Card style={cardStyle} onPress={() => _onItemPress(index)} borderRadius={itemBorderRadius} elevation={5}>
          <Animated.View style={index !== 0 ? {opacity: animatedContentOpacity} : undefined} collapsable={false}>
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

        {isCollapsed && <TouchableOpacity onPress={open} activeOpacity={1} style={touchableOpacityStyle}/>}
      </View>
    </View>
  );
};

export default asBaseComponent<StackAggregatorProps>(StackAggregator);
StackAggregator.displayName = 'StackAggregator';

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
