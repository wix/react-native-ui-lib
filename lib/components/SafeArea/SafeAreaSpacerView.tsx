import React, {useState, useEffect, useCallback, useMemo} from 'react';
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
        console.warn('SafeAreaSpacerView: Failed to get safe area insets:', error);
      }
    };

    getSafeAreaInsets();

    // Add delegate to listen for safe area changes
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

  // Always add onLayout, regardless of insets - wrapped with useCallback
  const handleLayout = useCallback((event: any) => {
    const {y} = event.nativeEvent.layout;
    const screenHeight = Dimensions.get('window').height;
      
    let height = 0;
    // If positioned in top half of screen, use top safe area
    if (y < safeAreaInsets.top) {
      height = safeAreaInsets.top;
    } else if (y > screenHeight - safeAreaInsets.bottom) {
      // If positioned in bottom half of screen, use bottom safe area
      height = safeAreaInsets.bottom;
    }
    
    setSpacerHeight(height);
  }, [safeAreaInsets]);

  const spacerStyle = useMemo(() => ({
    height: spacerHeight,
    ...style
  }), [spacerHeight, style]);

  return <View style={spacerStyle} onLayout={handleLayout}/>;
};

SafeAreaSpacerView.displayName = 'SafeAreaSpacerView';
export default SafeAreaSpacerView;
