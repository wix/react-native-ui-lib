import React, {useMemo, useState} from 'react';
import {LayoutChangeEvent, StyleSheet} from 'react-native';
import {useAnimatedStyle, useSharedValue, withTiming} from 'react-native-reanimated';
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
  const {expanded, sectionHeader, onPress, children, top, testID} = props;
  const [height, setHeight] = useState(0);
  const animatedHeight = useSharedValue(0);

  const onLayout = (event: LayoutChangeEvent) => {
    const onLayoutHeight = event.nativeEvent.layout.height;

    if (onLayoutHeight > 0 && height !== onLayoutHeight) {
      setHeight(onLayoutHeight);
    }
  };

  const expandableStyle = useAnimatedStyle(() => {
    animatedHeight.value = expanded ? withTiming(height) : withTiming(0);

    return {
      height: animatedHeight.value
    };
  }, [expanded, height]);

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

  return (
    <View style={styles.hidden}>
      {top && renderChildren()}
      <TouchableOpacity onPress={onPress} testID={testID} accessibilityState={accessibilityState}>
        {sectionHeader}
      </TouchableOpacity>
      {!top && renderChildren()}
    </View>
  );
}

export default ExpandableSection;

const styles = StyleSheet.create({
  hidden: {
    overflow: 'hidden'
  }
});
