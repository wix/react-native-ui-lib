import React, {useCallback, useMemo, useState} from 'react';
import {LayoutChangeEvent, StyleSheet} from 'react-native';
import {useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
import {useDidUpdate} from '../../hooks';
import View from '../view';
import TouchableOpacity from '../touchableOpacity';

export type ExpandableSectionProps = {
  /**
   * expandableSection header element
   */
  sectionHeader?: JSX.Element;
  /**
   * expandableSection expandable children
   */
  children?: React.ReactNode;
  /**
   * should the expandableSection be expanded
   */
  expanded?: boolean;
  /**
   * should the expandableSection open above the sectionHeader
   */
  top?: boolean;
  /**
   * action for when pressing the header of the expandableSection
   */
  onPress?: () => void;
  /**
   * Set a minimum height for the expandableSection
   * If the children height is less than the minHeight, the expandableSection will collapse to that height
   * If the children height is greater than the minHeight, the expandableSection will result with only the children rendered (sectionHeader will not be rendered)
   */
  minHeight?: number;
  /**
   * Testing identifier
   */
  testID?: string;
};

/**
 * @description: ExpandableSection component to render expanded section below or above the sectionHeader
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ExpandableSectionScreen.tsx
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/ExpandableSection/ExpandableSection.gif?raw=true
 */

function ExpandableSection(props: ExpandableSectionProps) {
  const {minHeight, expanded, sectionHeader, onPress, children, top, testID} = props;
  const [height, setHeight] = useState(0);
  const animatedHeight = useSharedValue(0);
  const shouldShowSectionHeader = !minHeight || height > minHeight;

  const onLayout = (event: LayoutChangeEvent) => {
    const layoutHeight = event.nativeEvent.layout.height;

    if (layoutHeight > 0 && Math.abs(height - layoutHeight) > 1) {
      setHeight(layoutHeight);
    }
  };

  const animateHeight = useCallback((shouldAnimate = true) => {
    const collapsedHeight = Math.min(minHeight ?? 0, height);
    const toValue = expanded ? height : collapsedHeight;
    animatedHeight.value = shouldAnimate ? withTiming(toValue) : toValue;
  },
  [animatedHeight, expanded, height, minHeight]);

  useDidUpdate(() => {
    animateHeight(false);
  }, [height, minHeight]);

  useDidUpdate(() => {
    animateHeight();
  }, [expanded]);

  const expandableStyle = useAnimatedStyle(() => {
    return {
      height: animatedHeight.value
    };
  }, []);

  const style = useMemo(() => [styles.hidden, expandableStyle], [expandableStyle]);

  const accessibilityState = useMemo(() => {
    return {expanded};
  }, [expanded]);

  const renderChildren = () => {
    return (
      <View reanimated style={style}>
        <View absH onLayout={onLayout}>
          {children}
        </View>
      </View>
    );
  };

  const Container = onPress ? TouchableOpacity : View;

  if (shouldShowSectionHeader) {
    return (
      <View style={styles.hidden}>
        {top && renderChildren()}
        <Container onPress={onPress} testID={testID} accessibilityState={accessibilityState}>
          {sectionHeader}
        </Container>
        {!top && renderChildren()}
      </View>
    );
  } else {
    return renderChildren();
  }
}

export default ExpandableSection;

const styles = StyleSheet.create({
  hidden: {
    overflow: 'hidden'
  }
});
