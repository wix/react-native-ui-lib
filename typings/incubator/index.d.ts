import {Component} from 'react';
import {State as RNGestureHandlerState} from 'react-native-gesture-handler';
import {ColorValue} from '../style/colors';

export namespace Incubator {

  export interface TouchableOpacityProps {
    feedbackColor?: ColorValue;
    backgroundColor?: ColorValue;
    activeOpacity?: number;
    activeScale?: number;
    onPress?: (props: TouchableOpacityProps) => void;
    pressState?: RNGestureHandlerState;
  }

  export class TouchableOpacity extends Component<TouchableOpacityProps> {}
}
