import React from 'react';
import {StyleSheet} from 'react-native';

import {Constants} from '../../commons/new';
import View from '../view';
import {HintProps, HintTargetFrame} from './types';

interface HintMockChildrenProps extends Pick<HintProps, 'children' | 'backdropColor'> {
  containerPosition?: {top: number | undefined; left: number | undefined};
  targetLayout?: HintTargetFrame;
}

export default function HintMockChildren({
  children,
  backdropColor,
  containerPosition,
  targetLayout
}: HintMockChildrenProps) {
  const isBackdropColorPassed = backdropColor !== undefined;
  if (children && React.isValidElement(children)) {
    const layout = {
      ...containerPosition,
      width: targetLayout?.width,
      height: targetLayout?.height,
      right: Constants.isRTL ? targetLayout?.x : undefined,
      left: Constants.isRTL ? undefined : targetLayout?.x
    };

    return (
      <View style={[styles.mockChildrenContainer, layout, !isBackdropColorPassed && styles.hidden]}>
        {React.cloneElement<any>(children, {
          collapsable: false,
          key: 'mock',
          style: [children.props.style, styles.mockChildren]
        })}
      </View>
    );
  }
  return null;
}

const styles = StyleSheet.create({
  hidden: {opacity: 0},
  mockChildrenContainer: {
    position: 'absolute'
  },
  mockChildren: {
    margin: undefined,
    marginVertical: undefined,
    marginHorizontal: undefined,
    marginTop: undefined,
    marginRight: undefined,
    marginBottom: undefined,
    marginLeft: undefined,

    top: undefined,
    left: undefined,
    right: undefined,
    bottom: undefined
  }
});
