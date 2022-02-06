import {fireEvent, RenderAPI} from '@testing-library/react-native';
import {ReactTestInstance} from 'react-test-renderer';
import _ from 'lodash';

const TextDriverFactory = async ({wrapperComponent, testID}: {wrapperComponent: RenderAPI, testID: string}) => {

  const text: ReactTestInstance | null = await wrapperComponent.queryByTestId(testID);
  return {
    exists: () => !!text,
    getRootElement: () => text,
    getTextContent: () => {
      if (text) {
        return text.props.children;
      } else {
        console.warn(`Text component with testId:${testID}, is not found. So you can't get the content`);
        return null;
      }
    },
    isClickable: () => typeof _.get(text, 'props.onPress') === 'function',
    click: () => {
      if (text) {
        fireEvent.press(text);
      } else {
        console.warn(`TextDriverFactory: cannot click because testID:${testID} were not found`);
      }
    }

  };
};

export default TextDriverFactory;
