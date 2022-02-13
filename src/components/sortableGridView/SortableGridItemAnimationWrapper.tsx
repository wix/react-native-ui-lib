import React from 'react';
import {View, Constants} from 'react-native-ui-lib';

interface SortableGridItemAnimationWrapperProps {
    children: React.ReactNode;
    id: string;
}

const SortableGridItemAnimationWrapper: React.FC<SortableGridItemAnimationWrapperProps> = ({children}) => {

  const screenHeight = Constants.screenHeight;
  // contentHeight
  return (
    <View>
      {children}
    </View>
  );
};

export default SortableGridItemAnimationWrapper;

