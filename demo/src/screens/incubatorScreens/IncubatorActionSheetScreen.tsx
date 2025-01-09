import React, {useState} from 'react';
import {View, Button, Incubator} from 'react-native-ui-lib';
import {renderBooleanOption} from '../ExampleScreenPresenter';
import {listItems, gridItems} from './ActionSheetItems';

function IncubatorActionSheetScreen() {
  const [visible, setVisible] = useState(false);
  const [useGrid, setUseGrid] = useState(false);

  return (
    <View bg-grey80 flex padding-20>
      <Button
        label="Show Action Sheet"
        onPress={() => {
          console.log(`Button pressed`);
          setVisible(true);
        }}
      />
      <View marginV-s2 gap-s1 style={{width: 150}}>
        {renderBooleanOption('Use Grid Layout', 'useGrid', {spread: true, state: useGrid, setState: setUseGrid})}
      </View>

      <Incubator.ActionSheet
        visible={visible}
        options={useGrid ? gridItems : listItems}
        onDismiss={() => {
          console.log(`props onDismiss called!`);
          setVisible(false);
        }}
        dialogProps={{
          bottom: true,
          centerH: true,
          width: '95%',
          headerProps: {title: 'Action Sheet', subtitle: 'sub'}
        }}
        gridOptions={useGrid ? {numColumns: 3} : undefined}
      />
    </View>
  );
}

export default IncubatorActionSheetScreen;
