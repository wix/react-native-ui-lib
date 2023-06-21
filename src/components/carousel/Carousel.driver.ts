import {CarouselProps} from './types';
import {ComponentDriver} from '../../testkit';

export class CarouselDriver extends ComponentDriver<CarouselProps> {
  getContentOffset = async () => (await this.getElementProps()).contentOffset;
  scroll = async (delta: number) => (await this.uniDriver.selectorByTestId(this.testID)).scrollX(delta);
}
