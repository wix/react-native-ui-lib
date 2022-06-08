import React, {useMemo} from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import View from '../view';
import Dash from './Dash';
import {LineProps, LineTypes} from './types';

const LINE_WIDTH = 2;
const ENTRY_POINT_HEIGHT = 2;

type LinePropsInternal = LineProps & {
  top?: boolean;
  style?: ViewStyle;
};

const Line = React.memo((props: LinePropsInternal) => {
  const {type, color = 'transparent', entry, top, style} = props;

  const solidLineStyle = useMemo(() => {
    return [style, styles.solidLine, {backgroundColor: color}];
  }, [color, style]);

  const dashedLineStyle = useMemo(() => {
    return [style, styles.dashedLine];
  }, [style]);

  const renderStartPoint = () => {
    if (entry) {
      return <View style={[styles.entryPoint, {backgroundColor: color}]}/>;
    }
  };

  const renderLine = () => {
    if (type === LineTypes.DASHED) {
      return <Dash vertical dashColor={color} style={dashedLineStyle}/>;
    }
    return <View style={solidLineStyle}/>;
  };

  return (
    <>
      {top && renderStartPoint()}
      {renderLine()}
      {!top && renderStartPoint()}
    </>
  );
});

export default Line;

const styles = StyleSheet.create({
  entryPoint: {
    width: 12,
    height: ENTRY_POINT_HEIGHT
  },
  solidLine: {
    width: LINE_WIDTH,
    overflow: 'hidden'
  },
  dashedLine: {
    overflow: 'hidden'
  }
});
