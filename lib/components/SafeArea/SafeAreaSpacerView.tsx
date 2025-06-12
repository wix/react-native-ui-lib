import React, {useState, useCallback} from 'react';
import {View, ViewStyle, Dimensions} from 'react-native';

export type SafeAreaSpacerViewProps = {
  style?: ViewStyle;
};

const SafeAreaSpacerView = ({style}: SafeAreaSpacerViewProps) => {  
  const [spacerHeight, setSpacerHeight] = useState(0);

  // Hardcoded safe area values - typical iPhone values
  const safeAreaInsets = {top: 47, left: 0, bottom: 34, right: 0};

  // Position detection with useCallback
  const handleLayout = useCallback((event: any) => {    
    const {y} = event.nativeEvent.layout;
    const screenHeight = Dimensions.get('window').height;
        
    let height = 0;
    // Simple detection: top half = top inset, bottom half = bottom inset
    if (y < safeAreaInsets.top) {
      height = safeAreaInsets.top;
    } else if (y > screenHeight - safeAreaInsets.bottom) {
      height = safeAreaInsets.bottom;
    }
    
    setSpacerHeight(height);
  }, []);

  const spacerStyle = {
    height: spacerHeight,
    ...style
  };

  return <View style={spacerStyle} onLayout={handleLayout}/>;
};

SafeAreaSpacerView.displayName = 'IGNORE';
export default SafeAreaSpacerView;
