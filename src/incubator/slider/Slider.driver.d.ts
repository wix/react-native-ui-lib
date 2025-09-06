import { SliderProps } from './index';
import { ComponentDriver } from '../../testkit/Component.driver';
export declare class SliderDriver extends ComponentDriver<SliderProps> {
    isDisabled: () => Promise<boolean>;
}
