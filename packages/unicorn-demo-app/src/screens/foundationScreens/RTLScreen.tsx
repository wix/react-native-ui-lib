import React, {useState} from 'react';
import {Colors, View, Text, Icon, TextField, Picker, Checkbox, Incubator, ListItem, Avatar, Button, Toast} from 'react-native-ui-lib';

const pickerItems = [
  {value: 0, label: 'לא'},
  {value: 1, label: 'כן'}
];
const chevronIcon = require('../../assets/icons/chevronRight.png');

const RTLScreen = () => {
  const [checkboxValue, setCheckboxValue] = useState(false);
  const [sliderValue, setSliderValue] = useState(0);

  return (
    <View flex>
      <View flex padding-page>
        <Text text50>מסך דוגמא בעברית</Text>
        <Text text70>בדיקה לטקסט רץ בעברית שהוא מיושר כמו שצריך לימין</Text>
        <Text marginB-20 grey30>Toggle RTL/LTR from the settings screen</Text>

        <TextField
          placeholder="שם מלא"
          floatingPlaceholder={false}
          label="שם"
          showCharCounter
          maxLength={20}
          validate="required"
          validationMessage="לא לשכוח שם"
        />
        
        <Picker placeholder="מגיע\ה" label="נוכחות" items={pickerItems}/>
        
        <Checkbox
          value={checkboxValue}
          label={'עם תווית'}
          onValueChange={value => setCheckboxValue(value)}
        />

        <View row spread marginT-20 marginL-10>
          <Incubator.Slider
            onValueChange={value => setSliderValue(value)}
            value={sliderValue}
            minimumValue={0}
            maximumValue={100}
            step={1}
            containerStyle={{flex: 1}} // only for Slider in row
          />
          <Text text70BO marginL-20 numberOfLines={1} style={{width: 40, alignSelf: 'center'}}>{sliderValue}</Text>
        </View>

        <ListItem
          height={75.8}
          onPress={() => console.warn('list item press')}
          marginT-20
        >
          <ListItem.Part left marginR-20>
            <Avatar
              size={54}
              source={{uri: 'https://i.pravatar.cc/150?img=3'}}
              label={'IT'}
            />
          </ListItem.Part>

          <ListItem.Part middle column>
            <ListItem.Part>
              <Text text70 color={Colors.grey10} numberOfLines={1}>איש כלשהו</Text>
            </ListItem.Part>
            <ListItem.Part>
              <Text text80 color={Colors.grey40} numberOfLines={1}>מחובר/ת</Text>
            </ListItem.Part>
          </ListItem.Part>

          <ListItem.Part right>
            <Button size={'small'} label={'שלח'} onPress={() => console.warn('list button press')}/>
          </ListItem.Part>
        </ListItem>

        <View centerV row marginT-20 left>
          <Icon
            marginR-20
            source={chevronIcon}
            size={16}
            supportRTL
          />
          <View center style={{height: 40, width: 40, borderRadius: 20, backgroundColor: Colors.red50}}>
            <Text text60>כאן</Text>
          </View>
        </View>
      </View>
      
      <Toast visible position={'bottom'} message="עדיין לא עדכנת את לוח הזמנים ופרטי אנשי הצוות"/>
    </View>
  ); 
};

export default RTLScreen;
