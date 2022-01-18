import {RenderAPI} from '@testing-library/react-native';
import {ReactTestInstance} from 'react-test-renderer';


const TextDriverFactory = async ({wrapperComponent, testID}: {wrapperComponent: RenderAPI, testID: string}) => {

  const text: ReactTestInstance | null = await wrapperComponent.queryByTestId(testID);
  return {
    //todo more research on this component
    exists: () => !!text,
    getRootElement: () => text,
    getTextContent: () => {
      if (text) {
        return text.props.children;
      } else {
        console.warn(`Text component with testId:${testID}, is not found. So you can't get the content`);
        return null;
      }
    }
    // isClickable: () => te
    // click: () => fireEvent.press(text),

  };
};

export default TextDriverFactory;
