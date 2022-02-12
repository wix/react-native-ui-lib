import { RenderAPI } from '@testing-library/react-native';
import { ReactTestInstance } from 'react-test-renderer';
declare const TextDriverFactory: ({ wrapperComponent, testID }: {
    wrapperComponent: RenderAPI;
    testID: string;
}) => Promise<{
    exists: () => boolean;
    getRootElement: () => ReactTestInstance | null;
    getTextContent: () => any;
    isClickable: () => boolean;
    click: () => void;
}>;
export default TextDriverFactory;
