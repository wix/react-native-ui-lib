import React, {useImperativeHandle, useRef} from 'react';
import {ExpandableOverlayMethods} from '../../../incubator/expandableOverlay';
import {TextFieldMethods} from '../../../incubator/TextField';

const useImperativePickerHandle = (ref: React.Ref<any>,
  expandableRef: React.MutableRefObject<ExpandableOverlayMethods | null>) => {
  const pickerRef = useRef<TextFieldMethods>();
  useImperativeHandle(ref, () => {
    // @ts-expect-error useRef return type is possible null therefor it throw TS error
    const {isFocused, focus, blur, clear, validate} = pickerRef.current;
    // @ts-expect-error useRef return type is possible null therefor it throw TS error
    const {openExpandable, closeExpandable, toggleExpandable} = expandableRef.current;

    return {
      isFocused,
      focus,
      blur,
      clear,
      validate,
      openExpandable,
      closeExpandable,
      toggleExpandable
    };
  });

  return pickerRef;
};

export default useImperativePickerHandle;
