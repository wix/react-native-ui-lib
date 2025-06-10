import React from 'react';
import {View, ViewStyle, Platform} from 'react-native';
// Import the Codegen specification for New Architecture
import SafeAreaSpacerViewNativeComponent from './SafeAreaSpacerViewNativeComponent';

const isIOS = Platform.OS === 'ios';

export type SafeAreaSpacerViewProps = {
  style?: ViewStyle;
};

const SafeAreaSpacerView = ({style}: SafeAreaSpacerViewProps) => {
  return (
    isIOS ? <SafeAreaSpacerViewNativeComponent style={style}/> : <View style={style}/>
  );
};

SafeAreaSpacerView.displayName = 'IGNORE';
export default SafeAreaSpacerView;
