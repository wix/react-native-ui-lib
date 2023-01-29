import {UniDriver, UniDriverClass} from './UniDriver';
import {TestingLibraryDriver} from './drivers/TestingLibraryDriver';

export type ComponentDriverArgs = {
  testID: string;
  Driver?: UniDriverClass;
  component: JSX.Element
}

/**
 * Please run clear after each test
 * */
export class ComponentDriver {
  protected readonly testID: string;
  protected readonly uniDriver: UniDriver;
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

  exists = async (): Promise<boolean> => {
    try {
      const element = await this.getElement();
      if (element) {
        return Promise.resolve(true);
      } else {
        return Promise.resolve(false);
      }
    } catch {
      return Promise.resolve(false);
    }
  }

  getElement = () => {
    return this.getByTestId(this.testID);
  }

  press = async () => {
    return this.uniDriver
      .selectorByTestId(this.testID)
      .then((driver) => driver.press());
  };

  layout = ({height, width, x, y}: {height: number, width: number, x: number, y: number}) => {
    this.uniDriver
      .selectorByTestId(this.testID)
      .then((driver) => driver.layout({height, width, x, y}));
  };

  protected getByTestId = (testID: string) => {
    return this.uniDriver
      .selectorByTestId(testID)
      .then((driver) => driver.instance());
  };

  getElementProps = () => {
    return this.getPropsByTestId(this.testID);
  };

  getPropsByTestId = (testID: string) => {
    return this.uniDriver
      .selectorByTestId(testID)
      .then((driver) => driver.getInstanceProps());
  };

  selectorByText = (text: string) => {
    return this.uniDriver
      .selectorByText(text)
      .then((driver) => driver.instance());
  }

  getByDisplayValue = (text: string) => {
    return this.uniDriver
      .getByDisplayValue(text)
      .then((driver) => driver.instance());
  }
}
