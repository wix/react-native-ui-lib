import React, {useCallback} from 'react';
import {SectionList} from 'react-native';
import {Navigation} from 'react-native-navigation';
import {View, Text, TouchableOpacity, Colors, Dividers, Icon} from 'react-native-ui-lib'; //eslint-disable-line

const chevronIcon = require('../assets/icons/chevronRight.png');

const sectionsData = [
  {
    title: 'Effects',
    data: [{title: 'Card Flip', screen: 'unicorn.MotionCardFlip'}]
  }
];

const MotionMainScreen = ({componentId}) => {
  const handlePress = useCallback(({customValue: item}) => {
    if (item.screen) {
      Navigation.push(componentId, {
        component: {
          name: item.screen,
          options: {
            topBar: {
              title: {
                text: item.title
              }
            },
            bottomTabs: {
              visible: false
            }
          }
        }
      });
    }
  }, [componentId]);

  return (
    <View testID="demo_simple_main_screen" flex useSafeArea>
      <SectionList
        sections={sectionsData}
        keyExtractor={(item, index) => `${item.title}-${index}`}
        renderItem={({item}) => <SectionItem item={item} onPress={handlePress}/>}
        renderSectionHeader={({section}) => <SectionHeader section={section}/>}
      />
    </View>
  );
};

const SectionItem = React.memo(props => {
  const {item, onPress} = props;
  return (
    <TouchableOpacity
      centerV
      row
      spread
      paddingH-s5
      paddingV-s4
      onPress={onPress}
      customValue={item}
      activeBackgroundColor={Colors.$backgroundPrimaryLight}
      activeOpacity={1}
      style={Dividers.d10}
    >
      <Text text80>{item.title}</Text>
      <Icon source={chevronIcon} style={{tintColor: Colors.$iconDefault}} supportRTL/>
    </TouchableOpacity>
  );
});

const SectionHeader = React.memo(props => {
  const {section} = props;
  return (
    <View bg-$backgroundDefault>
      <Text marginV-20 marginH-20 text60M>
        {section.title}
      </Text>
    </View>
  );
});

export default MotionMainScreen;
