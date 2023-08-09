import _ from 'lodash';
import React, {useState, useCallback, useMemo, useEffect, useRef} from 'react';
import {Spacings} from '../../style';
import View from '../view';
import Checkbox, {CheckboxProps} from '../checkbox/index';

enum ValueTypes {
  CHECKED = 'checked',
  UNCHECKED = 'unchecked',
  INDETERMINATE = 'indeterminate'
}
export interface NestedCheckboxProps extends CheckboxProps {
  children?: React.ReactElement<CheckboxProps>[];
  // setParentValue?: (value: ValueTypes) => void;
}

const NestedCheckbox = ((props: NestedCheckboxProps) => {
  const parentRef = useRef<NestedCheckboxProps>(null);
  const {value = false, onValueChange, children, /* setParentValue,  */...others} = props;

  /** Children values */

  const values: boolean[] = useMemo(() => {
    const items = React.Children.map(children, (child) => {
      const childValue = child?.props?.value;
      // const childIndeterminateState = child?.type === NestedCheckbox;
      // console.log('item value: ', child?.type === NestedCheckbox, childValue, child?.props?.indeterminate);
      return childValue !== undefined ? childValue : value;
    });
    return items || [];
  }, [children, value]);

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

  /** Value */

  const getCurrentValue = useCallback(() => {
    if (!areAllChildrenEqual()) {
      return ValueTypes.INDETERMINATE;
    } else if (isSomeChildChecked()) {
      return ValueTypes.CHECKED;
    }
    return ValueTypes.UNCHECKED;
  }, [isSomeChildChecked, areAllChildrenEqual]);

  const [currentValue, setCurrentValue] = useState<ValueTypes>(getCurrentValue());

  useEffect(() => {
    // currentValue was changed by a (child) checkbox
    // console.log('----- effect currentValue -----: ', props.label, currentValue, setParentValue, getCurrentValue());
    const current = getCurrentValue();
    console.log('current: ', props.label, current, currentValue);
    if (current === ValueTypes.INDETERMINATE) {
      // setParentValue?.(current);
      parentRef.current?.setCurrentValue?.(current);
    } else {
      parentRef.current?.onValueChange?.(!(current === ValueTypes.UNCHECKED));
    }
  }, [currentValue]);

  useEffect(() => {
    console.log('----- effect value -----: ', props.label, value);
    // value was changed by a nested checkbox (current) of another nested checkbox
    onCurrentValueChange?.(value);
  }, [value]);

  const setAllValues = useCallback((value: boolean) => {
    for (let i = 0; i < values.length; i++) {
      values[i] = value;
    }
    setChildrenValues(values);
  }, [values]);

  const setValueForIndex = useCallback((value: boolean, index: number) => {
    values[index] = value;
    setChildrenValues(_.clone(values)); // clone in order to invoke render in case currentValue didn't change
  }, [values]);

  const onCurrentValueChange = useCallback((value: boolean) => {
    // update all children
    setAllValues(value);

    //current and invoke it's onValueChange
    setCurrentValue(value ? ValueTypes.CHECKED : ValueTypes.UNCHECKED);
    onValueChange?.(value);
  }, [setAllValues, onValueChange]);

  const toggleChildValue = useCallback((value: boolean, index: number) => {
    // update one child
    setValueForIndex(value, index);

    // update current
    const current = getCurrentValue();
    setCurrentValue(current);
  }, [setValueForIndex, getCurrentValue]);

  const renderChildren = (): any[] => {
    const items = React.Children.map(children, (child, index) => {
      if (child && (child.type === Checkbox || child.type === NestedCheckbox)) {
        return React.cloneElement(child, {
          style: {marginTop: Spacings.s1},
          value: childrenValues[index],
          onValueChange: (value: boolean) => {
            toggleChildValue(value, index);
            child?.props?.onValueChange?.(value);
          },
          // setParentValue: child.type === NestedCheckbox ? setCurrentValue : undefined,
          parentRef: parentRef.current
        });
      } else {
        console.warn('NestedCheckbox children must be of type Checkbox.');
      }
    });
    return items || [];
  };

  return (
    <>
      <Checkbox
        {...others}
        value={!(currentValue === ValueTypes.UNCHECKED)}
        indeterminate={currentValue === ValueTypes.INDETERMINATE}
        onValueChange={onCurrentValueChange}
      />
      <View marginL-s5 marginV-s1>
        {renderChildren()}
      </View>
    </>
  );
});

NestedCheckbox.displayName = 'NestedCheckbox';
export default NestedCheckbox;
