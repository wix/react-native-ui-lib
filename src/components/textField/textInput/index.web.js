import React, { useCallback } from 'react';
import { TextInput as RNTextInput } from 'react-native';
const adjustInputHeight = element => {
  element.style.height = 0;
  const newHeight = element.offsetHeight - element.clientHeight + element.scrollHeight;
  element.style.height = `${newHeight}px`;
};

// we need this wrapper of TextInput on web because of multiline bug in react-native-web
// https://github.com/necolas/react-native-web/issues/795
export const TextInput = props => {
  const {
    multiline,
    onChange,
    onLayout,
    ...other
  } = props;
  const _onLayout = useCallback(event => {
    const element = event?.target;
    if (element && multiline) {
      adjustInputHeight(element);
    }
    onLayout?.(event);
  }, [multiline, onLayout]);
  const _onChange = useCallback(event => {
    const element = event?.target || event?.nativeEvent?.target;
    if (element && multiline) {
      adjustInputHeight(element);
    }
    onChange?.(event);
  }, [multiline, onChange]);
  return <RNTextInput {...other} multiline={multiline} onChange={_onChange} onLayout={_onLayout} />;
};