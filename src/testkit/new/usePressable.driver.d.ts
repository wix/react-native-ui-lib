import { ComponentDriverResult } from './Component.driver';
import { PressableProps } from 'react-native';
export interface PressableDriverResult extends ComponentDriverResult {
    press: () => void;
    hasOnPress: () => boolean;
    onPressIn: () => void;
    hasOnPressIn: () => boolean;
    onPressOut: () => void;
    hasOnPressOut: () => boolean;
    onLongPress: () => void;
    hasOnLongPress: () => boolean;
}
export type PressableDriverProps = Partial<Pick<PressableProps, 'onPress' | 'onPressIn' | 'onPressOut' | 'onLongPress'>>;
export declare const usePressableDriver: <DriverProps extends ComponentDriverResult = ComponentDriverResult>(driver: DriverProps) => PressableDriverResult & DriverProps;
