import React from "react";
import { View, requireNativeComponent } from "react-native";
const NativeSafeAreaSpacerView = requireNativeComponent("SafeAreaSpacerView", null);
const SafeAreaSpacerView = ({ style }) => {
    return NativeSafeAreaSpacerView ? (<NativeSafeAreaSpacerView style={style}/>) : (<View style={style}/>);
};
export default SafeAreaSpacerView;
