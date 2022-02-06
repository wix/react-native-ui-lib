import { RenderAPI } from '@testing-library/react-native';
import { ReactTestInstance } from 'react-test-renderer';
declare const TextFieldDriverFactory: ({ wrapperComponent, testID }: {
    wrapperComponent: RenderAPI;
    testID: string;
}) => Promise<{
    exists: () => boolean;
    getRootElement: () => ReactTestInstance | null;
    content: () => any;
    isDisabled: () => any;
    changeText: (text: string) => void;
    isPlaceholderVisible: () => boolean | undefined;
    getPlaceholderContent: () => any;
    getLabelRootElement: () => ReactTestInstance | null;
    isLabelExists: () => boolean;
    getLabelContent: () => any;
    getValidationMsgRootElement: () => ReactTestInstance | null;
    isValidationMsgExists: () => boolean;
    getValidationMsgContent: () => any;
    getCharCounterRootElement: () => ReactTestInstance | null;
    isCharCounterExists: () => boolean;
    getCharCounterContent: () => any;
}>;
export default TextFieldDriverFactory;
