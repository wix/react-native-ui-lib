import {ComponentDriver} from '../../testkit';

export class HintDriver extends ComponentDriver {

  getHintContent = async () => this.getByTestId(`${this.testID}.message`);

  getHintModal = async () => this.getByTestId(`${this.testID}.modal`);
}
