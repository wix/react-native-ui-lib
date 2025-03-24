import React, {useCallback, useContext} from 'react';
import {StyleSheet} from 'react-native';
import Button from '../button';
import Checkbox from '../checkbox';
import View from '../view';
import Text from '../text';
import Dividers from '../../style/dividers';
import PickerContext from './PickerContext';
import {PickerSelectionStatusProps} from './types';

export default function PickerSelectionStatusBar(props: PickerSelectionStatusProps) {
  const {containerStyle, getLabel, showLabel = true} = props;
  const context = useContext(PickerContext);
  const {toggleAllItemsSelection, selectedCount = 0, areAllItemsSelected} = context;

  const checkboxIndeterminate = !!selectedCount && !areAllItemsSelected;
  const label =
    getLabel?.({selectedCount, areAllItemsSelected}) ??
    `${selectedCount} Selected ${areAllItemsSelected ? '(All)' : ''}`;

  const handlePress = useCallback(() => {
    const newSelectionState = !areAllItemsSelected;
    toggleAllItemsSelection?.(newSelectionState);
    if (props.selectAllType === 'button') {
      props?.buttonProps?.onPress?.({customValue: newSelectionState});
    } else if (props.selectAllType === 'checkbox') {
      props?.checkboxProps?.onValueChange?.(newSelectionState);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [areAllItemsSelected, toggleAllItemsSelection]);

  const renderSelectionStatus = () => {
    return (
      <View flexG={!showLabel} style={!showLabel && styles.componentContainer}>
        {props.selectAllType === 'button' ? (
          <Button
            label={areAllItemsSelected ? 'Deselect All' : 'Select All'}
            link
            {...props?.buttonProps}
            onPress={handlePress}
          />
        ) : (
          props.selectAllType === 'checkbox' && (
            <Checkbox
              {...props.checkboxProps}
              value={selectedCount > 0}
              indeterminate={checkboxIndeterminate}
              onValueChange={handlePress}
            />
          )
        )}
      </View>
    );
  };

  const renderLabel = () => {
    if (showLabel) {
      return <Text>{label}</Text>;
    }
  };

  return (
    <View>
      <View row spread paddingH-page marginV-s4 style={containerStyle}>
        {renderLabel()}
        {renderSelectionStatus()}
      </View>
      <View style={Dividers.d20}/>
    </View>
  );
}

const styles = StyleSheet.create({
  componentContainer: {
    alignItems: 'flex-end'
  }
});
