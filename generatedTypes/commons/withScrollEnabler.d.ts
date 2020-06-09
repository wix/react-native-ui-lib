/* eslint-disable no-unused-vars */
import React from 'react';
import {FlatListProps, ScrollViewProps} from 'react-native';
export type WithScrollEnablerProps = FlatListProps | ScrollViewProps;
declare function withScrollEnabler<PROPS extends WithScrollEnablerProps>(
  WrappedComponent: React.ComponentType<WithScrollEnablerProps>
): React.ComponentType<PROPS>;
export default withScrollEnabler;
