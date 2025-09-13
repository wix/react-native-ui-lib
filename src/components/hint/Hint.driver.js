import { ComponentDriver } from "../../testkit/Component.driver";
export class HintDriver extends ComponentDriver {
  getHintContent = async () => this.getByTestId(`${this.testID}.message`);
  getHintModal = async () => this.getByTestId(`${this.testID}.modal`);
}