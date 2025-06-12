import React, {useState, useCallback, useEffect} from 'react';
import {View, ViewStyle, Dimensions} from 'react-native';
import SafeAreaInsetsManager from './SafeAreaInsetsManager';

export type SafeAreaSpacerViewProps = {
  style?: ViewStyle;
};

const SafeAreaSpacerView = ({style}: SafeAreaSpacerViewProps) => {  
  const [safeAreaInsets, setSafeAreaInsets] = useState({top: 0, left: 0, bottom: 0, right: 0});
  const [spacerHeight, setSpacerHeight] = useState(0);

  useEffect(() => {    
    const getSafeAreaInsets = async () => {
      try {
        const insets = await SafeAreaInsetsManager.getSafeAreaInsets();
        if (insets) {
          setSafeAreaInsets(insets);
        }
      } catch (error) {
        console.warn('SafeAreaSpacerView: Failed to get initial safe area insets:', error);
      }
    };

    getSafeAreaInsets();

    // Add delegate to listen for safe area changes from native component
    const delegate = {
      onSafeAreaInsetsDidChangeEvent: (insets: any) => {
        if (insets) {
          setSafeAreaInsets(insets);
        }
      }
    };

    SafeAreaInsetsManager.addSafeAreaChangedDelegate(delegate);

    return () => {
      SafeAreaInsetsManager.removeSafeAreaChangedDelegate(delegate);
    };
  }, []);

  // Position detection with useCallback
  const handleLayout = useCallback((event: any) => {    
    const {y} = event.nativeEvent.layout;
    const screenHeight = Dimensions.get('window').height;
        
    let height = 0;
    // Check if positioned within safe area bounds
    if (y < safeAreaInsets.top) {
      height = safeAreaInsets.top;
    } else if (y > screenHeight - safeAreaInsets.bottom) {
      height = safeAreaInsets.bottom;
    }
    
    if (height !== spacerHeight) {
      setSpacerHeight(height);
    }
  }, [safeAreaInsets, spacerHeight]);

  const spacerStyle = {
    height: spacerHeight,
    ...style
  };

  return <View style={spacerStyle} onLayout={handleLayout}/>;
};

SafeAreaSpacerView.displayName = 'SafeAreaSpacerView';
export default SafeAreaSpacerView;
