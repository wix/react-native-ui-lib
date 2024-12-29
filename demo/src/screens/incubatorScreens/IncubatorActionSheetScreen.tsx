import React, {useState} from 'react';
import {View, Button, Incubator} from 'react-native-ui-lib';
const pickOption = (index: string) => {
  console.log(`picked option ${index}`);
};

const OPTIONS = [
  {label: 'option 1', onPress: () => pickOption('option 1')},
  {label: 'option 2', onPress: () => pickOption('option 2')},
  {label: 'option 3', onPress: () => pickOption('option 3')},
  {label: 'option 1', onPress: () => pickOption('option 1')},
  {label: 'option 2', onPress: () => pickOption('option 2')},
  {label: 'option 3', onPress: () => pickOption('option 3')},
  {label: 'option 1', onPress: () => pickOption('option 1')},
  {label: 'option 2', onPress: () => pickOption('option 2')},
  {label: 'option 3', onPress: () => pickOption('option 3')},
  {label: 'option 1', onPress: () => pickOption('option 1')},
  {label: 'option 2', onPress: () => pickOption('option 2')},
  {label: 'option 3', onPress: () => pickOption('option 3')},
  {label: 'option 1', onPress: () => pickOption('option 1')},
  {label: 'option 2', onPress: () => pickOption('option 2')},
  {label: 'option 3', onPress: () => pickOption('option 3')},
  {label: 'cancel', onPress: () => pickOption('cancel')}
];

const GRID_OPTIONS = [
  {
    title: 'option 1',
    onPress: () => pickOption('option 1'),
    imageSource: {
      uri: 'https://www.gravatar.com/avatar/205e460b479e2e5b48aec07710c08d50?s=200'
    },
    imageStyle: {width: 40, height: 40}
  },
  {title: 'option 2', onPress: () => pickOption('option 2')},
  {title: 'option 3', onPress: () => pickOption('option 3')},
  {title: 'option 1', onPress: () => pickOption('option 1')},
  {title: 'option 2', onPress: () => pickOption('option 2')},
  {title: 'option 3', onPress: () => pickOption('option 3')},
  {title: 'option 1', onPress: () => pickOption('option 1')},
  {title: 'option 2', onPress: () => pickOption('option 2')},
  {title: 'option 3', onPress: () => pickOption('option 3')},
  {title: 'option 1', onPress: () => pickOption('option 1')},
  {title: 'option 2', onPress: () => pickOption('option 2')},
  {title: 'option 3', onPress: () => pickOption('option 3')},
  {title: 'option 1', onPress: () => pickOption('option 1')},
  {title: 'option 2', onPress: () => pickOption('option 2')},
  {title: 'option 3', onPress: () => pickOption('option 3')},
  {title: 'cancel', onPress: () => pickOption('cancel')}
];

function IncubatorActionSheetScreen() {
  const [visible, setVisible] = useState(false);
  return (
    <View bg-grey80 flex padding-20>
      <Button
        label="Show Action Sheet"
        onPress={() => {
          console.log(`Button pressed`);
          setVisible(true);
        }}
      />
      <Incubator.ActionSheet
        visible={visible}
        options={OPTIONS}
        onDismiss={() => {
          console.log(`props onDismiss called!`);
          setVisible(false);
        }}
        dialogProps={{
          bottom: true,
          centerH: true,
          width: '90%',
          headerProps: {title: 'Action Sheet', subtitle: 'sub'}
        }}
        gridOptions={GRID_OPTIONS}
      />
    </View>
  );
}

export default IncubatorActionSheetScreen;
