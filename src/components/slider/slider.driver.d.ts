import { SliderProps } from './types';
import { ComponentDriver } from '../../testkit/Component.driver';
export declare class SliderDriver extends ComponentDriver<SliderProps> {
    isDisabled: () => Promise<boolean>;
}
