import {RenderAPI} from '@testing-library/react-native';
import {ReactTestInstance} from 'react-test-renderer';

export const ImageDriver = async ({wrapperComponent, testID}: {wrapperComponent: RenderAPI; testID: string}) => {
  const text: ReactTestInstance | null = await wrapperComponent.queryByTestId(testID);
  return {
    //todo more research on this component
    exists: () => !!text,
    getRootElement: () => text
    // getImageContent: () => text.props.value
  };
};
