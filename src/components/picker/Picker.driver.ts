import {PickerProps} from './types';
import {ComponentDriver} from '../../testkit';

export class PickerDriver extends ComponentDriver<PickerProps> {
  getPickerOverlay = async () => await this.getByTestId(`${this.testID}.overlay`);
  getPickerOverlayProps = async () => await this.getPropsByTestId(`${this.testID}.overlay`);
}
