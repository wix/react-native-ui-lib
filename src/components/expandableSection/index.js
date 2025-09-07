import React, { useCallback, useMemo, useState } from 'react';
import { StyleSheet } from 'react-native';
import { useAnimatedStyle, useSharedValue, withTiming } from 'react-native-reanimated';
import { useDidUpdate } from "../../hooks";
import View from "../view";
import TouchableOpacity from "../touchableOpacity";
/**
 * @description: ExpandableSection component to render expanded section below or above the sectionHeader
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ExpandableSectionScreen.tsx
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/ExpandableSection/ExpandableSection.gif?raw=true
 */

function ExpandableSection(props) {
  const {
    minHeight,
    expanded,
    sectionHeader,
    onPress,
    children,
    top,
    testID
  } = props;
  const [height, setHeight] = useState(0);
  const animatedHeight = useSharedValue(0);
  const shouldShowSectionHeader = !minHeight || height > minHeight;
  const onLayout = event => {
    const layoutHeight = event.nativeEvent.layout.height;
    if (layoutHeight > 0 && height !== layoutHeight) {
      setHeight(layoutHeight);
    }
  };
  const animateHeight = useCallback((shouldAnimate = true) => {
    const collapsedHeight = Math.min(minHeight ?? 0, height);
    const toValue = expanded ? height : collapsedHeight;
    animatedHeight.value = shouldAnimate ? withTiming(toValue) : toValue;
  }, [animatedHeight, expanded, height, minHeight]);
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
    return {
      expanded
    };
  }, [expanded]);
  const renderChildren = () => {
    return <View reanimated style={style}>
        <View absH onLayout={onLayout}>
          {children}
        </View>
      </View>;
  };
  const Container = onPress ? TouchableOpacity : View;
  if (shouldShowSectionHeader) {
    return <View style={styles.hidden}>
        {top && renderChildren()}
        <Container onPress={onPress} testID={testID} accessibilityState={accessibilityState}>
          {sectionHeader}
        </Container>
        {!top && renderChildren()}
      </View>;
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