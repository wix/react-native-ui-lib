export interface UniDriver {
  selectorByTestId(testId: string): Promise<UniDriver>;
  selectorByText(text: string): Promise<UniDriver>;
  getByDisplayValue(value: string): Promise<UniDriver>;
  first(): Promise<UniDriver>;
  at(index: number): Promise<UniDriver>;
  instance(): Promise<any>;
  getInstanceProps(): Promise<any>;
  press(): Promise<any>;
  typeText(text: string): Promise<void>;
  scrollX(deltaX: number): Promise<void>;
  scrollY(deltaY: number): Promise<void>;
}

export type UniDriverClass = {new (...args: any[]): UniDriver;};
