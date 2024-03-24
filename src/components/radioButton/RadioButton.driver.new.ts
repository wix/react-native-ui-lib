import {RadioButtonProps} from './index';
import {useComponentDriver, ComponentProps, ComponentDriverResult} from '../../testkit/new/Component.driver';
import {TextDriver} from '../text/Text.driver.new';
import {ImageDriver} from '../image/Image.driver.new';

interface RadioButtonDriverInterface extends ComponentDriverResult<RadioButtonProps> {
  hasLabel: () => boolean;
  hasIcon: () => boolean;
}

export const RadioButtonDriver = (props: ComponentProps): RadioButtonDriverInterface => {
  const {renderTree, testID} = props;
  const baseDriver = useComponentDriver<RadioButtonProps>(props);
  const labelDriver = TextDriver({renderTree, testID: `${testID}.label`});
  const iconDriver = ImageDriver({renderTree, testID: `${testID}.icon`});

  return {
    ...baseDriver,
    hasLabel: () => labelDriver.exists(),
    hasIcon: () => iconDriver.exists()
  };
};

