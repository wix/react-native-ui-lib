import { RenderAPI } from '@testing-library/react-native';
import { ReactTestInstance } from 'react-test-renderer';
declare const ButtonDriverFactory: ({ wrapperComponent, testID }: {
    wrapperComponent: RenderAPI;
    testID: string;
}) => Promise<{
    exists: () => boolean;
    getRootElement: () => ReactTestInstance | null;
    isClickable: () => boolean;
    click: () => void;
    getLabelRootElement: () => ReactTestInstance | null;
    isLabelExists: () => boolean;
    getLabelContent: () => any;
    getIconRootElement: () => ReactTestInstance | null;
    isIconExists: () => boolean;
}>;
export default ButtonDriverFactory;
