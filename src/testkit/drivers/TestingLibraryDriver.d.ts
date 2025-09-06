/// <reference types="react" />
import { DragData, UniDriver } from '../UniDriver';
import { ReactTestInstance } from 'react-test-renderer';
export declare class TestingLibraryDriver<Props> implements UniDriver<Props> {
    private readonly renderAPI;
    private readonly reactTestInstances;
    constructor(instance: ReactTestInstance[]);
    constructor(component: JSX.Element);
    selectorByTestId: (testId: string) => Promise<UniDriver<Props>>;
    selectorByText: (text: string) => Promise<UniDriver<Props>>;
    getByDisplayValue: (value: string) => Promise<UniDriver<Props>>;
    first: () => Promise<UniDriver<Props>>;
    at: (index: number) => Promise<UniDriver<Props>>;
    instance: () => Promise<any>;
    getInstanceProps: () => Promise<any>;
    press: () => void;
    drag: (data: DragData | DragData[]) => void;
    focus: () => void;
    blur: () => void;
    typeText: (text: string) => Promise<void>;
    scrollX: (deltaX: number) => Promise<void>;
    scrollY: (deltaY: number) => Promise<void>;
    private scroll;
    private validateExplicitInstance;
    private validateSingleInstance;
}
