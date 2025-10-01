import { ComponentDriver } from "../../testkit/Component.driver";
export class TextDriver extends ComponentDriver {
  getTextContent = async () => {
    if (await this.exists()) {
      return (await this.getElementProps()).children;
    } else {
      console.warn(`Text component with testID:${this.testID}, is not found. So you can't get the content`);
      return null;
    }
  };
  isPressable = async () => {
    if (await this.exists()) {
      return typeof (await this.getElementProps()).onPress === 'function';
    } else {
      console.warn(`TextDriver: cannot click because testID:${this.testID} were not found`);
      return null;
    }
  };
}