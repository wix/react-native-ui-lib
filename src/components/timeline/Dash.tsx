/*
 * Draws fully customizable dashed lines vertically or horizontally
 * source:react-native-dash
 * copied as a result of 'SyntaxError: Cannot use import statement outside a module' pointing to util.js file
 */

import React from 'react';
import {View, StyleSheet, ViewProps} from 'react-native';
import MeasureMeHOC from 'react-native-measureme';

interface DashProps extends ViewProps {
  style?: ViewStyle,
  dashGap: number,
  dashLength: number,
  dashThickness: number,
  dashColor?: string,
  dashStyle?: ViewStyle
}

const Dash = (props: DashProps) => {
  const {style, width, height, dashGap, dashLength, dashStyle, onLayout} = props;
  const isRow = isStyleRow(style);
  const length = isRow ? width : height;
  const n = Math.ceil(length / (dashGap + dashLength));
  const calculatedDashStyles = getDashStyle(props);
  const dash = [];
  
  for (let i = 0; i < n; i++) {
    dash.push(<View key={i} style={[calculatedDashStyles, dashStyle]}/>);
  }

  return (
    <View onLayout={onLayout} style={[style, isRow ? styles.row : styles.column]}>
      {dash}
    </View>
  );
};

export default MeasureMeHOC(Dash);
Dash.defaultProps = {
  dashGap: 2,
  dashLength: 4,
  dashThickness: 2,
  dashColor: 'black'
};

const styles = StyleSheet.create({
  row: {flexDirection: 'row'},
  column: {flexDirection: 'column'}
});

// util
const isStyleRow = style => {
  const flatStyle = StyleSheet.flatten(style || {});
  return flatStyle.flexDirection !== 'column';
};

const getDashStyleId = ({dashGap, dashLength, dashThickness, dashColor}, isRow) =>
  `${dashGap}-${dashLength}-${dashThickness}-${dashColor}-${isRow ? 'row' : 'column'}`;

const createDashStyleSheet = ({dashGap, dashLength, dashThickness, dashColor}, isRow) => {
  const idStyle = {
    width: isRow ? dashLength : dashThickness,
    height: isRow ? dashThickness : dashLength,
    marginRight: isRow ? dashGap : 0,
    marginBottom: isRow ? 0 : dashGap,
    backgroundColor: dashColor
  };
  return idStyle;
};

let stylesStore = {};
const getDashStyle = props => {
  const isRow = isStyleRow(props.style);
  const id = getDashStyleId(props, isRow);
  if (!stylesStore[id]) {
    stylesStore = {
      ...stylesStore,
      [id]: createDashStyleSheet(props, isRow)
    };
  }
  return stylesStore[id];
};
