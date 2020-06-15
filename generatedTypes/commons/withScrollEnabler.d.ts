import React from 'react';
import { FlatListProps, ScrollViewProps } from 'react-native';
export declare type WithScrollEnablerProps = (FlatListProps<any> | ScrollViewProps) & {
    ref?: any;
};
declare function withScrollEnabler<PROPS extends WithScrollEnablerProps>(WrappedComponent: React.ComponentType<WithScrollEnablerProps>): React.ComponentType<PROPS>;
export default withScrollEnabler;
