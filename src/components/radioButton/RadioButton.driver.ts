import {ComponentDriver, ImageDriver, TextDriver} from '../../testkit';
import {ComponentDriverArgs} from '../../testkit/Component.driver';

export class RadioButtonDriver extends ComponentDriver {
  private readonly labelDriver: TextDriver;
  private readonly iconDriver: ImageDriver;

  constructor(componentDriverArgs: ComponentDriverArgs) {
    super(componentDriverArgs);

    this.labelDriver = new TextDriver({...componentDriverArgs, testID: `${this.testID}.label`});
    this.iconDriver = new ImageDriver({...componentDriverArgs, testID: `${this.testID}.icon`});
  }

  hasLabel = () => this.labelDriver.exists();
  hasIcon= () => this.iconDriver.exists();
}
