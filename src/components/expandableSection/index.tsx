import _ from 'lodash';
import React from 'react';
import {LayoutAnimation, StyleSheet} from 'react-native';
import View from '../view';
import TouchableOpacity from '../touchableOpacity'

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
 * @gif: https://media.giphy.com/media/uCGZ92nZPdBOmF1H1z/giphy.gif, https://media.giphy.com/media/0VIh41mkSl8omS49oD/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ExpandableSectionScreen.tsx
 */

function ExpandableSection(props: ExpandableSectionProps) {
  const {expanded, sectionHeader, children, top} = props;

const onPress = () => {
  props.onPress?.();
  LayoutAnimation.configureNext({...LayoutAnimation.Presets.easeInEaseOut, duration: 300});
  }

  return (
    <View style={styles.container}> 
      {top && expanded && children}
      <TouchableOpacity onPress={onPress}>{sectionHeader}</TouchableOpacity>
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
