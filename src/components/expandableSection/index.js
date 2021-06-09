import _pt from "prop-types";
import React from 'react';
import { LayoutAnimation, StyleSheet } from 'react-native';
import View from "../view";
import TouchableOpacity from "../touchableOpacity";

/**
 * @description: ExpandableSection component to render expanded section below or above the sectionHeader
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ExpandableSectionScreen.tsx
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/ExpandableSection/ExpandableSection.gif?raw=true
 */
function ExpandableSection(props) {
  const {
    expanded,
    sectionHeader,
    children,
    top
  } = props;

  const onPress = () => {
    props.onPress?.();
    LayoutAnimation.configureNext({ ...LayoutAnimation.Presets.easeInEaseOut,
      duration: 300
    });
  };

  return <View style={styles.container}>
      {top && expanded && children}
      <TouchableOpacity onPress={onPress}>{sectionHeader}</TouchableOpacity>
      {!top && expanded && children}
    </View>;
}

ExpandableSection.propTypes = {
  /**
     * expandableSection header element
     */
  sectionHeader: _pt.element,

  /**
     * expandableSection expandable children
     */
  children: _pt.node,

  /**
     * should the expandableSection be expanded
     */
  expanded: _pt.bool,

  /**
     * should the expandableSection open above the sectionHeader
     */
  top: _pt.bool,

  /**
     * action for when pressing the header of the expandableSection
     */
  onPress: _pt.func
};
export default ExpandableSection;
const styles = StyleSheet.create({
  container: {
    overflow: 'hidden'
  }
});