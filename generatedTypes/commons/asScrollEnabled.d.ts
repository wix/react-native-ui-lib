/* eslint-disable no-unused-vars */
import React from 'react';
import {FlatListProps} from 'react-native';
declare function asScrollEnabled<PROPS extends FlatListProps>(
  WrappedComponent: React.ComponentType<FlatListProps>
): React.ComponentType<PROPS>;
export default asScrollEnabled;
