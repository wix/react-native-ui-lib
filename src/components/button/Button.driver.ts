import {ImageDriver} from '../image/Image.driver';
import {ComponentDriver, ComponentDriverArgs} from '../../testkit/Component.driver';
import {TextDriver} from '../text/Text.driver';

/**
 * Please run clear after each test
 * */
export class ButtonDriver extends ComponentDriver {
  private readonly labelDriver: TextDriver;
  private readonly iconDriver: ImageDriver;

  constructor(componentDriverArgs: ComponentDriverArgs) {
    super(componentDriverArgs);

    this.labelDriver = new TextDriver({...componentDriverArgs, testID: `${this.testID}.label`});
    this.iconDriver = new ImageDriver({...componentDriverArgs, testID: `${this.testID}.icon`});
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
