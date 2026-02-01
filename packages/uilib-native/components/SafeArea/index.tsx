import React from 'react';
import {View, ViewStyle, StyleProp, Platform} from 'react-native';
import SafeAreaSpacerViewIos from './SafeAreaSpacerView';

const isIOS = Platform.OS === 'ios';

export type SafeAreaSpacerViewProps = {
  style?: StyleProp<ViewStyle>;
};

const SafeAreaSpacerView = ({style}: SafeAreaSpacerViewProps) => {
  return isIOS ? <SafeAreaSpacerViewIos style={style}/> : <View style={style}/>;
};

SafeAreaSpacerView.displayName = 'SafeAreaSpacerView';
export default SafeAreaSpacerView;
