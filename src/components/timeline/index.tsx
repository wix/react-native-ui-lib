import React, {useCallback, useMemo, useEffect, useState, useRef} from 'react';
import {StyleSheet, MeasureOnSuccessCallback, LayoutChangeEvent} from 'react-native';
import {Colors, Spacings} from '../../style';
import View from '../view';
import Point from './Point';
import Line from './Line';
import {TimelineProps, PointProps, LineProps, StateTypes, PointTypes, LineTypes, Layout} from './types';
export {
  TimelineProps,
  PointProps as TimelinePointProps,
  LineProps as TimelineLineProps,
  StateTypes as TimelineStateTypes,
  PointTypes as TimelinePointTypes,
  LineTypes as TimelineLineTypes
};

const CONTENT_CONTAINER_PADDINGS = Spacings.s2;
const ENTRY_POINT_HEIGHT = 2;


const Timeline = (props: TimelineProps) => {
  const {topLine, bottomLine, point, children} = props;
  const [anchorMeasurements, setAnchorMeasurements] = useState<Layout | undefined>();
  const [contentContainerMeasurements, setContentContainerMeasurements] = useState<Layout | undefined>();
  const [pointMeasurements, setPointMeasurements] = useState<Layout | undefined>();
  const contentContainerRef = useRef<any>();

  const onMeasure: MeasureOnSuccessCallback = (x, y, width, height) => {
    setAnchorMeasurements({x, y, width, height});
  };

  useEffect(() => {
    setTimeout(() => {
      if (point?.anchorRef?.current && contentContainerRef?.current && contentContainerMeasurements) {
        // point.anchorRef.current.measure?.(onMeasure); // Android always returns x, y = 0 (see: https://github.com/facebook/react-native/issues/4753)
        //@ts-expect-error
        point.anchorRef.current.measureLayout?.(contentContainerRef.current, onMeasure);
      } else if (point?.anchorRef === undefined) {
        setAnchorMeasurements(undefined);
      }
    }, 0);
  }, [point?.anchorRef, contentContainerMeasurements]);

  const visibleStyle = useMemo(() => {
    return {opacity: contentContainerMeasurements ? 1 : 0};
  }, [contentContainerMeasurements]);

  const containerStyle = useMemo(() => {
    return [styles.container, visibleStyle];
  }, [visibleStyle]);

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

  const topLineHeight = useMemo(() => {
    let height = 0;
    if (contentContainerMeasurements && pointMeasurements) {
      const pointCenter = pointMeasurements.height / 2;
      const contentY = contentContainerMeasurements.y - CONTENT_CONTAINER_PADDINGS / 2;
      const anchorCenterY = anchorMeasurements ? anchorMeasurements?.y + anchorMeasurements?.height / 2 
        : contentContainerMeasurements.y + contentContainerMeasurements.height / 2;
      const entryPointHeight = topLine?.entry ? ENTRY_POINT_HEIGHT : 0;
      height = contentY + anchorCenterY - pointCenter - entryPointHeight;
    }
    return height;
  }, [anchorMeasurements, contentContainerMeasurements, pointMeasurements, topLine?.entry]);

  const topLineStyle = useMemo(() => {
    return {height: topLineHeight};
  }, [topLineHeight]);


  const onPointLayout = useCallback((event: LayoutChangeEvent) => {
    const {x, y, width, height} = event.nativeEvent.layout;
    setPointMeasurements({x, y, width, height});
  }, []);

  const onContentContainerLayout = useCallback((event: LayoutChangeEvent) => {
    const {x, y, width, height} = event.nativeEvent.layout;
    setContentContainerMeasurements({x, y, width, height});
  }, []);

  const renderTopLine = () => {
    return (
      <Line
        {...topLine}
        top
        style={topLineStyle}
        color={topLine ? topLine?.color || getStateColor(topLine?.state) : undefined}
      />
    );
  };

  const renderBottomLine = () => {
    if (bottomLine) {
      return (
        <Line
          {...bottomLine}
          style={styles.bottomLine}
          color={bottomLine?.color || getStateColor(bottomLine?.state)}
        />
      );
    }
  };

  return (
    <View row style={containerStyle}>
      <View style={styles.timelineContainer}>
        {renderTopLine()}
        <Point {...point} onLayout={onPointLayout} color={point?.color || getStateColor(point?.state)}/>
        {renderBottomLine()}
      </View>
      <View style={styles.contentContainer} onLayout={onContentContainerLayout} ref={contentContainerRef}>
        {children}
      </View>
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
  timelineContainer: {
    alignItems: 'center',
    marginRight: Spacings.s2,
    width: 20
  },
  bottomLine: {
    flex: 1
  }
});
