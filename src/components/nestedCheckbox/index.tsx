import _ from 'lodash';
import React, {useState, useCallback, useMemo} from 'react';
import {useDidUpdate} from '../../hooks';
import {Spacings} from '../../style';
import View from '../view';
import Checkbox, {CheckboxProps} from '../checkbox/index';

export interface NestedCheckboxProps extends CheckboxProps {
  children?: React.ReactElement<CheckboxProps> | React.ReactElement<CheckboxProps>[];
}

const NestedCheckbox = ((props: NestedCheckboxProps) => {
  const {value = false, onValueChange, children, testID = 'checkbox'} = props;
  
  useDidUpdate(() => {
    console.warn('NestedCheckbox is an uncontrolled component, do not update the value prop.');
  }, [value]);

  const values: boolean[] = useMemo(() => {
    const items = React.Children.map(children, (child) => {
      return child?.props?.value || false;
    });
    return items || [];
  }, [children]);

  const [childrenValues, setChildrenValues] = useState<boolean[]>(values);

  const isSomeChildChecked = useCallback(() => {
    for (let i = 0; i < values.length; i++) {
      if (values[i] === true) {
        return true;
      }
    }
    return false;
  }, [values]);

  const areAllChildrenEqual = useCallback(() => {
    let i = 0;
    while (i < values.length - 1) {
      if (values[i] === values[i + 1]) {
        i++;
      } else {
        return false;
      }
    }
    return true;
  }, [values]);

  const [parentValue, setParentValue] = useState<boolean>(isSomeChildChecked());
  const [indeterminate, setIndeterminate] = useState<boolean>(!areAllChildrenEqual());

  const setAllValues = useCallback((value: boolean) => {
    for (let i = 0; i < values.length; i++) {
      values[i] = value;
    }
    setChildrenValues(values);
  }, [values]);

  const setValueForIndex = useCallback((value: boolean, index: number) => {
    values[index] = value;
    setChildrenValues(_.clone(values)); // clone in order to invoke render in case parent/indeterminate didn't change
  }, [values]);

  const onParentValueChange = useCallback((value: boolean) => {
    // update all children and parent and invoke onValueChange
    setAllValues(value);
    setIndeterminate(false);
    setParentValue(value);
    
    onValueChange?.(value);
  }, [setAllValues, onValueChange]);

  const toggleChildValue = useCallback((value: boolean, index: number) => {
    // update one child and parent
    setValueForIndex(value, index);
    setIndeterminate(!areAllChildrenEqual());
    setParentValue(isSomeChildChecked());
  }, [setValueForIndex, areAllChildrenEqual, isSomeChildChecked]);

  const renderChildren = (): any[] => {
    const items = React.Children.map(children, (child, index) => {
      if (child && child.type === Checkbox) {
        return React.cloneElement(child, {
          testID: `${testID}.child${index}`,
          style: {marginTop: Spacings.s1},
          value: childrenValues[index],
          onValueChange: (value: boolean) => {
            toggleChildValue(value, index);
            child?.props?.onValueChange?.(value);
          }
        });
      } else {
        console.warn('NestedCheckbox children must be of type Checkbox.');
      }
    });
    return items || [];
  };

  return (
    <>
      <Checkbox indeterminate={indeterminate} value={parentValue} onValueChange={onParentValueChange} testID={'checkbox.parent'}/>
      <View marginL-s5 marginV-s1>
        {renderChildren()}
      </View>
    </>
  );
});

export {NestedCheckbox}; // For tests
NestedCheckbox.displayName = 'NestedCheckbox';
export default NestedCheckbox;
