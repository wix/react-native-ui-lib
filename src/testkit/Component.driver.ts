import {ReactTestInstance} from 'react-test-renderer';
import {UniDriver, UniDriverClass} from './UniDriver';
import {TestingLibraryDriver} from './testing-library/TestingLibraryDriver';

type ComponenXorUniDriver = XOR<{uniDriver: UniDriver}, {component: JSX.Element | ReactTestInstance[]}>

export type ComponentDriverArgs = {
  testID: string;
  Driver?: UniDriverClass;
} & ComponenXorUniDriver

/**
 * You mast to pass the component or the uniDriver
 * if you chooses to passing component please run clear after each test
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
    uniDriver,
    Driver = TestingLibraryDriver
  }: ComponentDriverArgs) {
    this.testID = testID;
    if (uniDriver && component) {
      console.warn('You need to pass the uniDriver or the component');
    }

    if (component) {
      const hash = require('object-hash');
      const componentHashcode = hash(component);
      if (!ComponentDriver.uniDrivers[componentHashcode]) {
        ComponentDriver.uniDrivers[componentHashcode] = new Driver(component);
      }
      this.uniDriver = ComponentDriver.uniDrivers[componentHashcode];
    } else if (uniDriver) {
      this.uniDriver = uniDriver;
    } else {
      throw new Error('You mast to pass uniDriver or component');
    }
  }

  exists = async (): Promise<boolean> => {
    const text = await this.getByTestId(this.testID);
    return !!text;
  }

  getElement = () => {
    return this.getByTestId(this.testID);
  }

  press = async () => {
    return this.uniDriver
      .selectorByTestId(this.testID)
      .then((driver) => driver.press());
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
}
