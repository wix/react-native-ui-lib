import React, {useMemo} from 'react';
import {LayoutAnimation, StyleSheet} from 'react-native';
import View from '../view';
import TouchableOpacity from '../touchableOpacity';
import {useDidUpdate} from 'hooks';

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
};

/**
 * @description: ExpandableSection component to render expanded section below or above the sectionHeader
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ExpandableSectionScreen.tsx
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/ExpandableSection/ExpandableSection.gif?raw=true
 */

function ExpandableSection(props: ExpandableSectionProps) {
  const {expanded, sectionHeader, children, top} = props;

  /**
   * TODO: move to reanimated LayoutAnimation after updating to version 2.3.0
   * after migration, trigger the animation only in useDidUpdate.
   */
  const animate = () => {
    LayoutAnimation.configureNext({...LayoutAnimation.Presets.easeInEaseOut, duration: 300});
  };

  const onPress = () => {
    props.onPress?.();
    animate();
  };

  useDidUpdate(() => {
    animate();
  }, [expanded]);

  const accessibilityState = useMemo(() => {
    return {expanded};
  }, [expanded]);

  return (
    <View style={styles.container}>
      {top && expanded && children}
      <TouchableOpacity onPress={onPress} accessibilityState={accessibilityState}>
        {sectionHeader}
      </TouchableOpacity>
      {!top && expanded && children}
    </View>
  );
}

export default ExpandableSection;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden'
  }
});
