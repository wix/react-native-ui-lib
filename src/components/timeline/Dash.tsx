import React, {useState, useCallback, useMemo} from 'react';
import {StyleSheet, StyleProp, ViewProps, ViewStyle, LayoutChangeEvent} from 'react-native';
import View from '../view';
import {Colors} from '../../style';
import {Layout} from './types';

interface DashProps extends ViewProps {
  vertical?: boolean;
  dashGap: number;
  dashLength: number;
  dashThickness: number;
  dashColor?: string;
  style?: StyleProp<ViewStyle>;
}

const Dash = (props: DashProps) => {
  const {style, vertical, dashGap, dashLength, dashThickness, dashColor} = props;
  const [measurements, setMeasurements] = useState<Layout | undefined>();

  const onDashLayout = useCallback((event: LayoutChangeEvent) => {
    const {x, y, width, height} = event.nativeEvent.layout;
    setMeasurements({x, y, width, height});
  }, []);

  const dashStyle = useMemo(() => {
    return {
      width: vertical ? dashThickness : dashLength,
      height: vertical ? dashLength : dashThickness,
      marginRight: vertical ? 0 : dashGap,
      marginBottom: vertical ? dashGap : 0,
      backgroundColor: dashColor
    };
  }, [vertical, dashLength, dashThickness, dashGap, dashColor]);

  const lineStyle = useMemo(() => {
    const directionStyle = vertical ? styles.column : styles.row;
    const sizeStyle = {
      width: vertical ? dashThickness : dashLength,
      height: vertical ? dashLength : dashThickness
    };
    return [directionStyle, sizeStyle, style];
  }, [style, vertical, dashThickness, dashLength]);

  const renderDash = () => {
    const length = (vertical ? measurements?.height : measurements?.width) || 0;
    const n = Math.ceil(length / (dashGap + dashLength));
    const dash = [];
    
    for (let i = 0; i < n; i++) {
      dash.push(<View key={i} style={dashStyle}/>);
    }

    return dash;
  };

  return (
    <View onLayout={onDashLayout} style={lineStyle}>
      {renderDash()}
    </View>
  );
};

export default Dash;
Dash.defaultProps = {
  dashGap: 6,
  dashLength: 6,
  dashThickness: 2,
  dashColor: Colors.black
};

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row'
  },
  column: {
    flexDirection: 'column'
  }
});
