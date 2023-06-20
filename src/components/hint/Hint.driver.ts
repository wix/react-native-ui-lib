import {HintProps} from './index';
import {ComponentDriver} from '../../testkit';

export class HintDriver extends ComponentDriver<HintProps> {

  getHintContent = async () => this.getByTestId(`${this.testID}.message`);

  getHintModal = async () => this.getByTestId(`${this.testID}.modal`);
}
