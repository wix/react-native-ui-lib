import React, {useCallback, useMemo, useEffect, useState} from 'react';
import {StyleSheet, ImageRequireSource, ViewStyle, MeasureOnSuccessCallback, LayoutChangeEvent} from 'react-native';
import Dash from 'react-native-dash';
import {Colors, Spacings} from '../../style';
import View from '../view';
import Icon from '../icon';
import Text from '../text';


const LINE_WIDTH = 2;
const POINT_SIZE = 12;
const HALO_WIDTH = 4;
const HALO_TINT = 70;
const HOLLO_WIDTH = 2;
const CONTENT_POINT_SIZE = 20;
const ICON_SIZE = 12;
const CONTENT_CONTAINER_PADDINGS = Spacings.s2;
const POINT_MARGINS = Spacings.s1;

export enum StateTypes {
  CURRENT = 'current', // default
  NEXT = 'next',
  ERROR = 'error',
  SUCCESS = 'success'
}

export enum LineTypes {
  FULL = 'full', // default
  DASHED = 'dashed'
}

export enum PointTypes {
  BULLET = 'bullet', // default
  HOLLOW = 'hollow',
  HALO = 'halo'
}

export type LineProps = {
  state?: StateTypes;
  type?: LineTypes;
  color?: string;
  /** to mark as entry point */
  entry?: boolean;
}

export type PointProps = {
  state?: StateTypes;
  type?: PointTypes;
  color?: string;
  icon?: ImageRequireSource;
  label?: number;
  /** to align point to this view's center */
  alignmentTargetRef?: React.MutableRefObject<undefined>;
  /** the target view's top parent view */
  targetContainerRef?: React.MutableRefObject<undefined>;
}

type Position = {
  x: number;
  y: number;
  width: number;
  height: number;
};

export type TimelineProps = {
  height: number;
  topLine?: LineProps;
  bottomLine?: LineProps;
  point?: PointProps;
  renderContent?: (props: TimelineProps) => JSX.Element;
  testID?: string;
};

const Timeline = (props: TimelineProps) => {
  const {height, topLine, bottomLine, point, renderContent} = props;
  const [targetMeasurements, setTargetMeasurements] = useState<Position | undefined>();
  const [contentContainerMeasurements, setContentContainerMeasurements] = useState<Position | undefined>();
  const [pointMeasurements, setCircleMeasurements] = useState<Position | undefined>();

  const onMeasure: MeasureOnSuccessCallback = (x, y, width, height) => {
    setTargetMeasurements({x, y, width, height});
  };

  useEffect(() => {
    setTimeout(() => {
      if (point?.alignmentTargetRef?.current && point?.targetContainerRef) {
        // point.alignmentTargetRef.current.measure?.(onMeasure); // Android always returns x, y = 0
        //@ts-expect-error
        point.alignmentTargetRef.current.measureLayout?.(point.targetContainerRef.current, onMeasure);
      }
    }, 0);
  }, [point?.alignmentTargetRef, point?.targetContainerRef]);

  const visible = useMemo(() => {
    return {opacity: contentContainerMeasurements ? 1 : 0};
  }, [contentContainerMeasurements]);

  const containerStyle = useMemo(() => {
    return [styles.container, visible, {height}];
  }, [visible, height]);

  const getStateColor = (state?: StateTypes) => {
    switch (state) {
      case StateTypes.CURRENT:
        return Colors.$backgroundPrimaryHeavy;
      case StateTypes.NEXT:
        return Colors.$backgroundNeutralIdle;
      case StateTypes.ERROR:
        return Colors.$backgroundDangerHeavy;
      case StateTypes.SUCCESS:
        return Colors.$backgroundSuccessHeavy;
      default: 
        return Colors.$backgroundPrimaryHeavy;
    }
  };

  const getLineColor = useCallback((line?: LineProps) => {
    return line?.color || getStateColor(line?.state);
  }, []);

  const calcLineHeight = useCallback(() => {
    let height = 0;
    if (targetMeasurements && contentContainerMeasurements && pointMeasurements) {
      const pointCenter = pointMeasurements.height / 2;
      const contentY = contentContainerMeasurements.y + CONTENT_CONTAINER_PADDINGS / 2;
      const targetCenterY = targetMeasurements?.y + targetMeasurements?.height / 2;
      height = contentY + targetCenterY - pointCenter;
    }
    return height;
  }, [targetMeasurements, contentContainerMeasurements, pointMeasurements]);

  const lineStyle = useMemo(() => {
    return point?.alignmentTargetRef ? {height: calcLineHeight()} : styles.line;
  }, [point?.alignmentTargetRef, calcLineHeight]);

  const pointStyle = useMemo(() => {
    const hasHalo = point?.type === PointTypes.HALO;
    const isHollow = point?.type === PointTypes.HOLLOW;
    const hasContent = point?.label || point?.icon;

    const size = hasContent ? CONTENT_POINT_SIZE : POINT_SIZE;
    const pointSize = hasHalo ? size + HALO_WIDTH * 2 : size;
    const pointSizeStyle = {width: pointSize, height: pointSize, borderRadius: pointSize / 2};

    const pointColor = point?.color || getStateColor(point?.state);
    const pointColorStyle = {backgroundColor: pointColor};

    const haloStyle = hasHalo && {borderWidth: HALO_WIDTH, borderColor: Colors.getColorTint(pointColor, HALO_TINT)};
    const hollowStyle = !hasContent && isHollow && 
      {backgroundColor: Colors.white, borderWidth: HOLLO_WIDTH, borderColor: pointColor};
    
    return [styles.point, pointSizeStyle, pointColorStyle, haloStyle, hollowStyle];
  }, [point?.state, point?.type, point?.color, point?.label, point?.icon]);

  const onPointLayout = useCallback((event: LayoutChangeEvent) => {
    const {x, y, width, height} = event.nativeEvent.layout;
    setCircleMeasurements({x, y, width, height});
  }, []);

  const onContentContainerLayout = useCallback((event: LayoutChangeEvent) => {
    const {x, y, width, height} = event.nativeEvent.layout;
    setContentContainerMeasurements({x, y, width, height});
  }, []);

  const renderLine = (line?: LineProps, style?: ViewStyle) => {
    const lineColor = getLineColor(line);
    
    if (line?.type === LineTypes.DASHED) {
      return (
        <Dash 
          dashGap={6}
          dashLength={6}
          dashThickness={2}
          dashColor={lineColor}
          style={[styles.dashedLine, style]}
        />
      );
    }
    return <View style={[styles.fullLine, {backgroundColor: lineColor}, style]}/>;
  };

  const renderTopLine = () => {
    return (
      <>
        {renderStartPoint(topLine)}
        {renderLine(topLine, lineStyle)}
      </>
    );
  };

  const renderBottomLine = () => {
    return (
      <>
        {renderLine(bottomLine, styles.line)}
        {renderStartPoint(bottomLine)}
      </>
    );
  };

  const renderStartPoint = (line?: LineProps) => {
    if (line?.entry) {
      const lineColor = getLineColor(line);
      return <View style={[styles.entryPoint, {backgroundColor: lineColor}]}/>;
    }
  };

  const renderPointContent = () => {
    if (point?.icon) {
      return <Icon source={point?.icon} size={ICON_SIZE} tintColor={Colors.white}/>;
    } else if (point?.label) {
      return <Text white subtext>{point?.label}</Text>;
    }
  };

  const renderPoint = () => {
    return (
      <View center style={pointStyle} onLayout={onPointLayout}>
        {renderPointContent()}
      </View>
    );
    
  };

  const renderIndicator = () => {
    return (
      <View style={styles.indicatorContainer}>
        {renderTopLine()}
        {renderPoint()}
        {renderBottomLine()}
      </View>
    );
  };

  const renderContentContainer = () => {
    return (
      <View style={styles.contentContainer} onLayout={onContentContainerLayout}>
        {renderContent?.(props)}
      </View>
    );
  };

  return (
    <View row style={containerStyle}>
      {renderIndicator()}
      {renderContentContainer()}
    </View>
  );
};

export default Timeline;
Timeline.displayName = 'Timeline';
Timeline.states = StateTypes;
Timeline.lineTypes = LineTypes;
Timeline.pointTypes = PointTypes;


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: Spacings.s5
  },
  contentContainer: {
    flex: 1,
    paddingVertical: CONTENT_CONTAINER_PADDINGS
  },
  indicatorContainer: {
    alignItems: 'center',
    marginRight: Spacings.s2,
    width: 20
  },
  point: {
    marginVertical: POINT_MARGINS
  },
  entryPoint: {
    width: 12,
    height: 2
  },
  fullLine: {
    width: LINE_WIDTH,
    overflow: 'hidden'
  },
  dashedLine: {
    flexDirection: 'column', 
    overflow: 'hidden'
  },
  line: {
    flex: 1
  }
});
