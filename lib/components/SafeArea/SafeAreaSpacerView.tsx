import React, {useState, useCallback, useEffect, useMemo} from 'react';
import {View, ViewStyle, Dimensions, StyleProp} from 'react-native';
import SafeAreaInsetsManager from './SafeAreaInsetsManager';

export type SafeAreaSpacerViewProps = {
  style?: StyleProp<ViewStyle>;
};

const SafeAreaSpacerView = ({style}: SafeAreaSpacerViewProps) => {  
  const [safeAreaInsets, setSafeAreaInsets] = useState({top: 0, left: 0, bottom: 0, right: 0});
  const [componentHeight, setComponentHeight] = useState(0);
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
    setComponentHeight(y);
  }, []);

  useEffect(() => {
    const screenHeight = Dimensions.get('window').height;
        
    let height = 0;
    // Check if positioned within safe area bounds
    if (componentHeight < safeAreaInsets.top) {
      height = safeAreaInsets.top;
    } else if (componentHeight > screenHeight - safeAreaInsets.bottom) {
      height = safeAreaInsets.bottom;
    }
    
    if (height !== spacerHeight) {
      setSpacerHeight(height);
    }
  }, [componentHeight, safeAreaInsets, spacerHeight]);

  const spacerStyle = useMemo(() => [{height: spacerHeight}, style], [spacerHeight, style]);

  return <View style={spacerStyle} onLayout={handleLayout}/>;
};

SafeAreaSpacerView.displayName = 'SafeAreaSpacerView';
export default SafeAreaSpacerView;
