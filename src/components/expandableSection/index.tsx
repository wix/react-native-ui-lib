import _ from 'lodash';
import React, {useState} from 'react';
import {LayoutAnimation} from 'react-native';
import View from '../view';
//@ts-ignore
import ListItem from '../listItem';
import Button from '../button';


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
  iconColor?: string;
};

const chevronDown = require('../../assets/icons/chevronDown.png');
const chevronUp = require('../../assets/icons/chevronUp.png');

function ExpandableSection(props: ExpandableSectionProps) {
  const [expanded, setExpanded] = useState(false);
  const {iconColor, sectionHeader, children} = props;

  const onExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setExpanded(!expanded);
  };

  return (
    <View style={{borderWidth: 0, borderRadius: 0}}>
        <View style={{marginLeft: 10, marginTop: 15}}>
          {sectionHeader}
        </View>
        <View style={{marginLeft: 380, marginTop: 25, position: 'absolute'}}>
          <Button
            iconSource={expanded ? chevronUp : chevronDown}
            iconStyle={{tintColor: iconColor}}
            style={{backgroundColor: 'transparent'}}
            onPress={() => onExpand()}
          ></Button>
        </View>
      {expanded && children}
    </View>
  );
}

export default ExpandableSection;
