import React, {useImperativeHandle, useRef} from 'react';
import {ExpandableOverlayMethods} from '../../../incubator/expandableOverlay';
import {TextFieldMethods} from '../../textField';

interface UseImperativePickerHandleProps {
  selectAll: () => void;
}

const useImperativePickerHandle = (ref: React.Ref<any>,
  expandableRef: React.MutableRefObject<ExpandableOverlayMethods | null>,
  props: UseImperativePickerHandleProps) => {
  const pickerRef = useRef<TextFieldMethods>();
  useImperativeHandle(ref, () => {
    const {isFocused, focus, blur, clear, validate, isValid} = pickerRef.current ?? {};
    // @ts-expect-error useRef return type is possible null therefor it throw TS error
    const {openExpandable, closeExpandable, toggleExpandable} = expandableRef.current;
    const {selectAll} = props;

    return {
      isFocused,
      focus,
      blur,
      clear,
      validate,
      isValid,
      openExpandable,
      closeExpandable,
      toggleExpandable,
      selectAll
    };
  });

  return pickerRef;
};

export default useImperativePickerHandle;
