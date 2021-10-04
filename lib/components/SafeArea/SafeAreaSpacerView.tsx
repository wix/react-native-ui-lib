import React from 'react';
import {View, requireNativeComponent, ViewStyle, Platform} from 'react-native';

const NativeSafeAreaSpacerView = requireNativeComponent('SafeAreaSpacerView');
const isIOS = Platform.OS === 'ios';

export type SafeAreaSpacerViewProps = {
  style?: ViewStyle;
};

const SafeAreaSpacerView = ({style}: SafeAreaSpacerViewProps) => {
  return (
    // @ts-ignore
    isIOS ? <NativeSafeAreaSpacerView style={style}/> : <View style={style}/>
  );
};

SafeAreaSpacerView.displayName = 'IGNORE';
export default SafeAreaSpacerView;
