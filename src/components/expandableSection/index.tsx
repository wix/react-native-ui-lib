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
   * action for when pressing the header of the expandableSection
   */
  onPress?: () => void;
};

function ExpandableSection(props: ExpandableSectionProps) {
  const {expanded, sectionHeader, children} = props;

const onPress = () => {
  props.onPress?.();
  LayoutAnimation.configureNext({...LayoutAnimation.Presets.easeInEaseOut, duration: 300});
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onPress}>{sectionHeader}</TouchableOpacity>
      {expanded && children}
    </View>
  );
}

export default ExpandableSection;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden'
  }
});
