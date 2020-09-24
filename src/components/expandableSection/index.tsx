import _ from 'lodash';
import React, {useEffect} from 'react';
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
   * should the expandableSection be expanded
   */
  expanded?: boolean;
};

function ExpandableSection(props: ExpandableSectionProps) {
  const {expanded, sectionHeader, children} = props;

  useEffect(() => {
    LayoutAnimation.configureNext({...LayoutAnimation.Presets.easeInEaseOut, duration: 300});
  }, [expanded]);


  return (
    <View style={styles.container}>
      {sectionHeader}
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
