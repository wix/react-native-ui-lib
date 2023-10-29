import {DragData, UniDriver} from '../UniDriver';
import {fireEvent, render, RenderAPI} from '@testing-library/react-native';
import {ReactTestInstance} from 'react-test-renderer';
import {act} from '@testing-library/react-hooks';
import _ from 'lodash';
import {
  MultipleInstancesException,
  NoSelectorException,
  SelectorChainingException,
  SelectorNotFoundException
} from '../DriverException';

export class TestingLibraryDriver<Props> implements UniDriver<Props> {
  private readonly renderAPI: RenderAPI | null;
  private readonly reactTestInstances: ReactTestInstance[];

  constructor(instance: ReactTestInstance[]);
  constructor(component: JSX.Element);
  constructor(componentOrInstance: JSX.Element | ReactTestInstance[]) {
    if (componentOrInstance === null) {
      throw Error('Expected a component or test instance');
    }
    if (Array.isArray(componentOrInstance)) {
      this.reactTestInstances = componentOrInstance;
      this.renderAPI = null;
    } else {
      this.renderAPI = render(componentOrInstance);
      this.reactTestInstances = [];
    }
  }

  selectorByTestId = async (testId: string): Promise<UniDriver<Props>> => {
    if (!this.renderAPI) {
      throw new SelectorChainingException();
    }
    const instances = await this.renderAPI.queryAllByTestId(testId);
    if (instances) {
      return Promise.resolve(new TestingLibraryDriver(instances));
    } else {
      return Promise.reject(new NoSelectorException());
    }
  };

  selectorByText = async (text: string): Promise<UniDriver<Props>> => {
    if (!this.renderAPI) {
      throw new SelectorChainingException();
    }
    const instances = await this.renderAPI.findAllByText(text).catch(() => []);
    return new TestingLibraryDriver(instances);
  };

  getByDisplayValue = async (value: string): Promise<UniDriver<Props>> => {
    if (!this.renderAPI) {
      throw new SelectorChainingException();
    }
    const instances = await this.renderAPI?.findAllByDisplayValue(value).catch(() => []);
    return new TestingLibraryDriver(instances);
  };

  first = (): Promise<UniDriver<Props>> => this.at(0);

  at = (index: number): Promise<UniDriver<Props>> => {
    return Promise.resolve(new TestingLibraryDriver([this.reactTestInstances[index]]));
  };

  instance = async (): Promise<any> => {
    if (!this.reactTestInstances) {
      throw new NoSelectorException();
    }
    this.validateExplicitInstance();
    return this.reactTestInstances[0];
  };

  getInstanceProps = async (): Promise<any> => {
    const instance = await this.instance();
    return _.get(instance, 'props');
  };

  press = (): void => {
    if (!this.reactTestInstances) {
      throw new NoSelectorException();
    }
    this.validateExplicitInstance();
    this.validateSingleInstance();
    fireEvent.press(this.reactTestInstances[0]);
  };

  drag = (data: DragData | DragData[]): void => {
    if (!this.reactTestInstances) {
      throw new NoSelectorException();
    }
    this.validateExplicitInstance();
    this.validateSingleInstance();
    fireEvent.press(this.reactTestInstances[0], data);
  };

  focus = (): void => {
    if (!this.reactTestInstances) {
      throw new NoSelectorException();
    }
    this.validateExplicitInstance();
    this.validateSingleInstance();
    fireEvent(this.reactTestInstances[0], 'focus');
  };

  blur = (): void => {
    if (!this.reactTestInstances) {
      throw new NoSelectorException();
    }
    this.validateExplicitInstance();
    this.validateSingleInstance();
    fireEvent(this.reactTestInstances[0], 'blur');
  };

  typeText = async (text: string): Promise<void> => {
    if (!this.reactTestInstances) {
      throw new NoSelectorException();
    }
    this.validateExplicitInstance();
    this.validateSingleInstance();
    await act(() => fireEvent.changeText(this.reactTestInstances[0], text));
  };

  scrollX = (deltaX: number) => this.scroll({x: deltaX});

  scrollY = (deltaY: number) => this.scroll({y: deltaY});

  private scroll = async ({x = 0, y = 0}: {x?: number; y?: number} = {}) => {
    if (!this.reactTestInstances) {
      throw new NoSelectorException();
    }
    this.validateExplicitInstance();
    this.validateSingleInstance();
    fireEvent.scroll(this.reactTestInstances[0], {
      nativeEvent: {
        layoutMeasurement: {
          width: 1080,
          height: 1920
        },
        contentSize: {
          width: 1080,
          height: 1920
        },
        contentOffset: {x, y}
      }
    });
  };

  private validateExplicitInstance = () => {
    if (this.reactTestInstances.length > 1) {
      throw new MultipleInstancesException(this.reactTestInstances.length);
    }
  };

  private validateSingleInstance = () => {
    if (this.reactTestInstances.length === 0) {
      throw new SelectorNotFoundException();
    }
  };
}
