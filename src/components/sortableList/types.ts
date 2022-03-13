import {SharedValue} from 'react-native-reanimated';

export const ANIMATION_END_DURATION = 200;

export interface BaseItemProps {
  index: number;
  height: number;
}

export interface ScrollProps {
    scroll: SharedValue<number>;
}
