import React, {useMemo} from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import View from '../view';
import Dash from '../dash';
import {LineProps, LineTypes} from './types';

const LINE_WIDTH = 2;
const ENTRY_POINT_HEIGHT = 2;

type LinePropsInternal = LineProps & {
  top?: boolean;
  style?: ViewStyle;
};

const Line = React.memo((props: LinePropsInternal) => {
  const {type, color = 'transparent', entry, top, style, width = LINE_WIDTH, testID} = props;

  const solidLineStyle = useMemo(() => {
    return [style, styles.line, {width, backgroundColor: color}];
  }, [color, style, width]);

  const dashedLineStyle = useMemo(() => {
    return [style, styles.line];
  }, [style]);

  const renderStartPoint = () => {
    if (entry) {
      return (
        <View
          style={[styles.entryPoint, {backgroundColor: color}]}
          testID={`${testID}.${top ? 'startPoint' : 'endPoint'}`}
        />
      );
    }
  };

  const renderLine = () => {
    if (type === LineTypes.DASHED) {
      return <Dash vertical color={color} containerStyle={dashedLineStyle} testID={`${testID}.dashedLine`}/>;
    }
    return <View style={solidLineStyle} testID={`${testID}.solidLine`}/>;
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
  line: {
    overflow: 'hidden'
  }
});
