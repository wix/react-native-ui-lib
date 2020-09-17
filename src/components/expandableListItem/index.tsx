import _ from 'lodash';
import React, {useState} from 'react';
import {LayoutAnimation} from 'react-native';
import {View, ListItem, Button} from 'react-native-ui-lib';

export type ExpandableListItemProps = {
  /**
   * expandableListItem text element
   */
  textElement?: JSX.Element;
  /**
   * elements to be in expandableListItem carousel
   */
  contentElement?: JSX.Element;
  /**
   * expandableListItem icon color
   */
  iconColor?: string;
};

const chevronDown = require('../../assets/icons/chevronDown.png');
const chevronUp = require('../../assets/icons/chevronUp.png');

function ExpandableListItem(props: ExpandableListItemProps) {
  const [expanded, setExpanded] = useState(false);
  const {iconColor, textElement, contentElement} = props;

  const onExpand = () => {
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
    setExpanded(!expanded);
  };

  return (
    <View style={{borderWidth: 0, borderRadius: 0}}>
      <ListItem>
        <ListItem.Part column style={{marginLeft: 10, marginTop: 15}}>
          {textElement}
        </ListItem.Part>
        <ListItem.Part column style={{marginLeft: 380, marginTop: 25, position: 'absolute'}}>
          <Button
            iconSource={expanded ? chevronUp : chevronDown}
            iconStyle={{tintColor: iconColor}}
            style={{backgroundColor: 'transparent'}}
            onPress={() => onExpand()}
          ></Button>
        </ListItem.Part>
      </ListItem>
      {expanded && contentElement}
    </View>
  );
}

export default ExpandableListItem;
