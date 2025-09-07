import React from 'react';
import View from "../view";
import PieSegment from "./PieSegment";
import { SvgPackage } from "../../optionalDependencies";
const {
  Svg,
  Path
} = SvgPackage;
import { LogService } from "../../services";
const DEFAULT_DIAMETER = 144;
const PieChart = props => {
  const {
    segments,
    diameter = DEFAULT_DIAMETER,
    ...others
  } = props;
  if (!Svg || !Path) {
    LogService.error(`RNUILib PieChart requires installing "@react-native-svg" dependency`);
    return null;
  }
  const renderPieSegments = () => {
    let currentStartAngle = 0;
    return segments.map((segment, index) => {
      const startAngle = currentStartAngle;
      currentStartAngle += segment.percentage / 100 * 360;
      return <PieSegment key={index} {...segment} {...others} startAngle={startAngle} radius={diameter / 2} />;
    });
  };
  return <View width={diameter} height={diameter}>
      {renderPieSegments()}
    </View>;
};
export default PieChart;