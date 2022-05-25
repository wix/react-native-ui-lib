import {ImageDriver} from '../image/Image.driver';
import {ComponentDriver, ComponentDriverArgs} from '../../testkit/Component.driver';
import {TextDriver} from '../text/Text.driver';

/**
 * You mast to pass the component or the uniDriver
 * if you chooses to passing component please run clear after each test
 * */
export class ButtonDriver extends ComponentDriver {
  private readonly labelDriver: TextDriver;
  private readonly iconDriver: ImageDriver;

  constructor(componentDriverArgs: ComponentDriverArgs) {
    super(componentDriverArgs);

    this.labelDriver = new TextDriver({...componentDriverArgs, testID: `${this.testID}.label`});
    this.iconDriver = new ImageDriver({...componentDriverArgs, testID: `${this.testID}.icon`});
  }

  getTextContent = async () => {
    if (await this.exists()) {
      return (await this.getElementProps()).children;
    } else {
      console.warn(`Text component with testID:${this.testID}, is not found. So you can't get the content`);
      return null;
    }
  }

  isPressable = async () => {
    if (this.exists()) {
      return typeof (await this.getElementProps()).onPress === 'function';
    } else {
      console.warn(`TextDriver: cannot click because testID:${this.testID} were not found`);
      return null;
    }
  }

  // label
  getLabelRootElement = () => this.labelDriver.getElement();
  isLabelExists = () => this.labelDriver.exists();
  getLabelContent = () => this.labelDriver.getTextContent();
  // icon
  getIconElement = () => this.iconDriver.getElement();
  isIconExists = () => this.iconDriver.exists()

}
