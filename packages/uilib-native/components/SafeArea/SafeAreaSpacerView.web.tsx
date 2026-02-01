import React from 'react';
import {View, ViewStyle} from 'react-native';


export type SafeAreaSpacerViewProps = {
  style?: ViewStyle;
};

const SafeAreaSpacerView = ({style}: SafeAreaSpacerViewProps) => {
  return (<View style={style}/>);
};

SafeAreaSpacerView.displayName = 'IGNORE';
export default SafeAreaSpacerView;
