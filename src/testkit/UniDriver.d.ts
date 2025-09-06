export type DragData = {
    absoluteX?: number;
    absoluteY?: number;
    translationX?: number;
    translationY?: number;
    velocityX?: number;
    velocityY?: number;
    x?: number;
    y?: number;
};
export interface UniDriver<Props = any> {
    selectorByTestId(testId: string): Promise<UniDriver<Props>>;
    selectorByText(text: string): Promise<UniDriver<Props>>;
    getByDisplayValue(value: string): Promise<UniDriver<Props>>;
    first(): Promise<UniDriver<Props>>;
    at(index: number): Promise<UniDriver<Props>>;
    instance(): Promise<any>;
    getInstanceProps(): Promise<Props>;
    press(): void;
    drag(data: DragData | DragData[]): void;
    focus(): void;
    blur(): void;
    typeText(text: string): Promise<void>;
    scrollX(deltaX: number): Promise<void>;
    scrollY(deltaY: number): Promise<void>;
}
export type UniDriverClass = {
    new (...args: any[]): UniDriver;
};
