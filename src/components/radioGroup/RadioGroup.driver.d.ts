import { RadioGroupProps } from './index';
import { ComponentDriver, ComponentDriverArgs } from '../../testkit/Component.driver';
type RadioGroupDriverArgs = ComponentDriverArgs & {
    testIDs: {
        [key: string]: string;
    };
};
export declare class RadioGroupDriver extends ComponentDriver<RadioGroupProps> {
    private readonly radioButtonDrivers;
    constructor(radioGroupDriverArgs: RadioGroupDriverArgs);
    pressOn: (radioButtonTestId: string) => Promise<void>;
}
export {};
