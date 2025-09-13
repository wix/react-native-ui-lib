/// <reference types="react" />
import { DragData, UniDriver, UniDriverClass } from './UniDriver';
export type ComponentDriverArgs = {
    testID: string;
    Driver?: UniDriverClass;
    component: JSX.Element;
};
/**
 * Please run clear after each test
 */
export declare class ComponentDriver<Props> {
    protected readonly testID: string;
    protected readonly uniDriver: UniDriver<Props>;
    static uniDrivers: {
        [key: string]: UniDriver;
    };
    static clear(): void;
    constructor({ testID, component, Driver }: ComponentDriverArgs);
    exists: () => Promise<boolean>;
    getElement: () => Promise<any>;
    press: () => Promise<void>;
    drag: (data: DragData | DragData[]) => Promise<void>;
    focus: () => Promise<void>;
    blur: () => Promise<void>;
    protected getByTestId: (testID: string) => Promise<any>;
    getElementProps: () => Promise<Props>;
    getPropsByTestId: (testID: string) => Promise<Props>;
    selectorByText: (text: string) => Promise<any>;
    getByDisplayValue: (text: string) => Promise<any>;
}
