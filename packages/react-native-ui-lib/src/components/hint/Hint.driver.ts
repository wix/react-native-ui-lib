import {HintProps} from './index';
import {ComponentDriver} from '../../testkit/Component.driver';

export class HintDriver extends ComponentDriver<HintProps> {

  getHintContent = async () => this.getByTestId(`${this.testID}.message`);

  getHintModal = async () => this.getByTestId(`${this.testID}.modal`);
}
