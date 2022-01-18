import {fireEvent, RenderAPI} from '@testing-library/react-native';
import {ReactTestInstance} from 'react-test-renderer';
import TextDriver from '../text/Text.driver';
import ImageDriver from '../image/Image.driver';
import _ from 'lodash';


const ButtonDriverFactory = async ({wrapperComponent, testID}: {wrapperComponent: RenderAPI, testID: string}) => {
  const button: ReactTestInstance | null = await wrapperComponent.queryByTestId(testID);
  const label = await TextDriver({wrapperComponent, testID: `${testID}.label`});
  const icon = await ImageDriver({wrapperComponent, testID: `${testID}.icon`});
  return {
    exists: () => !!button,
    getRootElement: () => button,
    isClickable: () => !_.get(button, 'props.accessibilityState.disabled'),
    click: () => {
      if (button) {
        fireEvent.press(button);
      } else {
        console.warn(`ButtonDriverFactory: cannot click because testID:${testID} were not found`);
      }
    },
    // label
    getLabelRootElement: () => label.getRootElement(),
    isLabelExists: () => label.exists(),
    getLabelContent: () => label.getTextContent(),
    // icon
    getIconRootElement: () => icon.getRootElement(),
    isIconExists: () => icon.exists()
  };
};

export default ButtonDriverFactory;
