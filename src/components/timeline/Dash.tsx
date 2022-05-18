/*
 * Draws fully customizable dashed lines vertically or horizontally
 * source:react-native-dash
 * copied as a result of 'SyntaxError: Cannot use import statement outside a module' pointing to util.js file
 */

import React, {useState, useCallback, useMemo} from 'react';
import {StyleSheet, StyleProp, ViewProps, ViewStyle, LayoutChangeEvent} from 'react-native';
import View from '../view';
import {Layout} from './types';

interface DashProps extends ViewProps {
  vertical?: boolean;
  dashGap: number;
  dashLength: number;
  dashThickness: number;
  dashColor?: string;
  dashStyle?: ViewStyle;
  style?: StyleProp<ViewStyle>;
}

const Dash = (props: DashProps) => {
  const {style, vertical, dashGap, dashLength, dashThickness, dashStyle, onLayout} = props;
  const [measurements, setMeasurements] = useState<Layout | undefined>();
  const isRow = isStyleRow(style);

  const onDashLayout = useCallback((event: LayoutChangeEvent) => {
    const {x, y, width, height} = event.nativeEvent.layout;
    setMeasurements({x, y, width, height});
    onLayout?.(event);
  },
  [onLayout]);

  const lineStyle = useMemo(() => {
    if (vertical) {
      return {
        width: dashThickness,
        height: dashLength
      };
    } else {
      return {
        height: dashThickness,
        width: dashLength
      };
    }
  }, [vertical, dashThickness, dashLength]);

  const renderDash = () => {
    const length = (isRow ? measurements?.width : measurements?.height) || 0;
    const n = Math.ceil(length / (dashGap + dashLength));
    const calculatedDashStyles = getDashStyle(props);
    const dash = [];

    for (let i = 0; i < n; i++) {
      dash.push(<View key={i} style={[calculatedDashStyles, dashStyle]}/>);
    }
    return dash;
  };


  return (
    <View onLayout={onDashLayout} style={[lineStyle, style, isRow ? styles.row : styles.column]}>
      {renderDash()}
    </View>
  );
};

export default Dash;
Dash.defaultProps = {
  dashGap: 6,
  dashLength: 6,
  dashThickness: 2,
  dashColor: 'black'
};

const styles = StyleSheet.create({
  row: {flexDirection: 'row'},
  column: {flexDirection: 'column'}
});

// util
const isStyleRow = (style?: StyleProp<ViewStyle>) => {
  if (style) {
    const flatStyle = StyleSheet.flatten(style || {});
    return flatStyle.flexDirection !== 'column';
  }
  return false;
};

const getDashStyleId = ({dashGap, dashLength, dashThickness, dashColor}: DashProps, isRow: boolean) =>
  `${dashGap}-${dashLength}-${dashThickness}-${dashColor}-${isRow ? 'row' : 'column'}`;

const createDashStyleSheet = ({dashGap, dashLength, dashThickness, dashColor}: DashProps, isRow: boolean) => {
  const idStyle = {
    width: isRow ? dashLength : dashThickness,
    height: isRow ? dashThickness : dashLength,
    marginRight: isRow ? dashGap : 0,
    marginBottom: isRow ? 0 : dashGap,
    backgroundColor: dashColor
  };
  return idStyle;
};

let stylesStore: {[id: string]: ViewStyle} = {};
const getDashStyle = (props: DashProps) => {
  const isRow = isStyleRow(props.style);
  const id = getDashStyleId(props, isRow);
  if (id && !stylesStore[id]) {
    stylesStore = {
      ...stylesStore,
      [id]: createDashStyleSheet(props, isRow)
    };
  }
  return stylesStore[id];
};
