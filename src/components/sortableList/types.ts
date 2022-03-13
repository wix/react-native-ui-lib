import {SharedValue} from 'react-native-reanimated';

export interface BaseItemProps {
  index: number;
  height: number;
}

export interface ScrollProps {
    scroll: SharedValue<number>;
}
