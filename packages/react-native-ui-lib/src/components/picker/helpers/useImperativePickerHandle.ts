import React, {useImperativeHandle, useRef} from 'react';
import {ExpandableOverlayMethods} from '../../../incubator/expandableOverlay';
import {TextFieldMethods} from '../../textField';

const useImperativePickerHandle = (ref: React.Ref<any>,
  expandableRef: React.MutableRefObject<ExpandableOverlayMethods | null>) => {
  const pickerRef = useRef<TextFieldMethods>();
  useImperativeHandle(ref, () => {
    const {isFocused, focus, blur, clear, validate, isValid} = pickerRef.current ?? {};
    // @ts-expect-error useRef return type is possible null therefor it throw TS error
    const {openExpandable, closeExpandable, toggleExpandable} = expandableRef.current;

    return {
      isFocused,
      focus,
      blur,
      clear,
      validate,
      isValid,
      openExpandable,
      closeExpandable,
      toggleExpandable
    };
  });

  return pickerRef;
};

export default useImperativePickerHandle;
