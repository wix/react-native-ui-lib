import { ReactTestInstance } from 'react-test-renderer';
import { within } from '@testing-library/react-native';
export interface ComponentProps {
    renderTree: ReturnType<typeof within>;
    testID: string | RegExp;
}
export interface ComponentDriverResult {
    getElement: () => ReactTestInstance;
    queryElement: () => ReactTestInstance | undefined;
    exists: () => boolean;
}
export declare const useComponentDriver: (props: ComponentProps) => ComponentDriverResult;
export declare const ComponentDriver: (props: ComponentProps) => ComponentDriverResult;
