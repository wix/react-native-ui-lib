import { ComponentDriverResult } from './Component.driver';
import { NativeScrollEvent, NativeScrollPoint } from 'react-native';
type ScrollableDriverOptions = Omit<NativeScrollEvent, 'contentOffset'>;
type ContentOffset = Partial<NativeScrollPoint>;
export type ScrollProps = ContentOffset & {
    options?: ScrollableDriverOptions;
};
export interface ScrollableDriverResult extends ComponentDriverResult {
    scroll: (contentOffset: ContentOffset, options?: ScrollableDriverOptions) => void;
    triggerEvent: (eventName?: string, event?: Partial<NativeScrollEvent>) => void;
}
export declare const useScrollableDriver: <DriverProps extends ComponentDriverResult = ComponentDriverResult>(driver: DriverProps) => ScrollableDriverResult & DriverProps;
export {};
