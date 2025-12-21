import {DragData, UniDriver, UniDriverClass} from './UniDriver';
import {TestingLibraryDriver} from './drivers/TestingLibraryDriver';

export type ComponentDriverArgs = {
  testID: string;
  Driver?: UniDriverClass;
  component: JSX.Element
}

/**
 * Please run clear after each test
 */
export class ComponentDriver<Props> {
  protected readonly testID: string;
  protected readonly uniDriver: UniDriver<Props>;
  static uniDrivers: {[key: string]: UniDriver} = {};

  static clear() {
    ComponentDriver.uniDrivers = {};
  }

  constructor({
    testID,
    component,
    Driver = TestingLibraryDriver
  }: ComponentDriverArgs) {
    this.testID = testID;
    const hash = require('object-hash');
    const componentHashcode = hash(component);
    if (!ComponentDriver.uniDrivers[componentHashcode]) {
      ComponentDriver.uniDrivers[componentHashcode] = new Driver(component);
    }
    this.uniDriver = ComponentDriver.uniDrivers[componentHashcode];
  }

  exists = async (): Promise<boolean> => !!(await this.getElement());

  getElement = () => {
    return this.getByTestId(this.testID);
  };

  press = async () => {
    return this.uniDriver
      .selectorByTestId(this.testID)
      .then((driver) => driver.press());
  };

  drag = async (data: DragData | DragData[]) => {
    return this.uniDriver
      .selectorByTestId(this.testID)
      .then((driver) => driver.drag(data));
  };

  focus = async () => {
    return this.uniDriver
      .selectorByTestId(this.testID)
      .then((driver) => driver.focus());
  };

  blur = async () => {
    return this.uniDriver
      .selectorByTestId(this.testID)
      .then((driver) => driver.blur());
  };

  protected getByTestId = (testID: string) => {
    return this.uniDriver
      .selectorByTestId(testID)
      .then((driver) => driver.instance());
  };

  getElementProps = (): Promise<Props> => {
    return this.getPropsByTestId(this.testID);
  };

  getPropsByTestId = (testID: string): Promise<Props> => {
    return this.uniDriver
      .selectorByTestId(testID)
      .then((driver) => driver.getInstanceProps());
  };

  selectorByText = (text: string) => {
    return this.uniDriver
      .selectorByText(text)
      .then((driver) => driver.instance());
  };

  getByDisplayValue = (text: string) => {
    return this.uniDriver
      .getByDisplayValue(text)
      .then((driver) => driver.instance());
  };
}
