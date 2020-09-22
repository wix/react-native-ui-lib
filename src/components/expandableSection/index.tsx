import _ from 'lodash';
import React from 'react';
import {LayoutAnimation, StyleSheet} from 'react-native';
import View from '../view';

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
   * expandableSection icon color
   */
  expanded?: boolean;
};

function ExpandableSection(props: ExpandableSectionProps) {
  const {expanded, sectionHeader, children} = props;

  function onValueChange() {
    LayoutAnimation.configureNext({...LayoutAnimation.Presets.easeInEaseOut, duration: 200});
    return expanded && children;
  }

  return (
    <View style={styles.container}>
      {sectionHeader}
      {onValueChange()}
    </View>
  );
}

export default ExpandableSection;

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden'
  }
});
