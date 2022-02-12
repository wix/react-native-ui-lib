import { RenderAPI } from '@testing-library/react-native';
import { ReactTestInstance } from 'react-test-renderer';
declare const ImageDriverFactory: ({ wrapperComponent, testID }: {
    wrapperComponent: RenderAPI;
    testID: string;
}) => Promise<{
    exists: () => boolean;
    getRootElement: () => ReactTestInstance | null;
}>;
export default ImageDriverFactory;
