import React from 'react';
import { TextInput, TextInputProps } from 'react-native';
declare const useImperativeInputHandle: (ref: React.Ref<any>, props: Pick<TextInputProps, 'onChangeText'>) => React.MutableRefObject<TextInput | undefined>;
export default useImperativeInputHandle;
