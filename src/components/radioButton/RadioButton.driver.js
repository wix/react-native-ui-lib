import { ComponentDriver } from "../../testkit/Component.driver";
import { ImageDriver } from "../image/Image.driver";
import { TextDriver } from "../text/Text.driver";
export class RadioButtonDriver extends ComponentDriver {
  constructor(componentDriverArgs) {
    super(componentDriverArgs);
    this.labelDriver = new TextDriver({
      ...componentDriverArgs,
      testID: `${this.testID}.label`
    });
    this.iconDriver = new ImageDriver({
      ...componentDriverArgs,
      testID: `${this.testID}.icon`
    });
  }
  hasLabel = () => this.labelDriver.exists();
  hasIcon = () => this.iconDriver.exists();
}