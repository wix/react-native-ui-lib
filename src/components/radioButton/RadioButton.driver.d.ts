import { RadioButtonProps } from './index';
import { ComponentDriver, ComponentDriverArgs } from '../../testkit/Component.driver';
export declare class RadioButtonDriver extends ComponentDriver<RadioButtonProps> {
    private readonly labelDriver;
    private readonly iconDriver;
    constructor(componentDriverArgs: ComponentDriverArgs);
    hasLabel: () => Promise<boolean>;
    hasIcon: () => Promise<boolean>;
}
