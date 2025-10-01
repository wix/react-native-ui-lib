import { useImperativeHandle, useRef } from 'react';
const useImperativePickerHandle = (ref, expandableRef) => {
  const pickerRef = useRef();
  useImperativeHandle(ref, () => {
    const {
      isFocused,
      focus,
      blur,
      clear,
      validate,
      isValid
    } = pickerRef.current ?? {};
    // @ts-expect-error useRef return type is possible null therefor it throw TS error
    const {
      openExpandable,
      closeExpandable,
      toggleExpandable
    } = expandableRef.current;
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