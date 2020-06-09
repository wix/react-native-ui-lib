/* eslint-disable no-unused-vars */
import React from 'react';
import {FlatListProps} from 'react-native';
declare function withScrollEnabler<PROPS extends FlatListProps<any>>(
  WrappedComponent: React.ComponentType<FlatListProps<any>>
): React.ComponentType<PROPS>;
export default withScrollEnabler;
