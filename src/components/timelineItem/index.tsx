import React, {useCallback, useMemo} from 'react';
import {StyleSheet, ImageRequireSource, LayoutChangeEvent} from 'react-native';
// import Dash from 'react-native-dash';
import {Colors} from '../../style';
import View from '../view';
import Icon from '../icon';
import Text from '../text';


const POINT_SIZE = 12;
const HALO_WIDTH = 4;
const HALO_TINT = 70;
const HOLLO_WIDTH = 2;
const CONTENT_POINT_SIZE = 20;
const ICON_SIZE = 12;

export enum StateTypes {
  CURRENT = 'current',
  NEXT = 'next',
  ERROR = 'error',
  SUCCESS = 'success'
}

export enum LineTypes {
  FULL = 'full',
  DASHED = 'dashed'
}

export enum PointTypes {
  FULL = 'full',
  HOLLOW = 'hollow',
  HALO = 'halo'
}

export enum AlignmentType {
  CENTER = 'center',
  TOP = 'top'
}

export type LineProps = {
  type?: LineTypes;
  color?: string;
}

export type PointProps = {
  type?: PointTypes;
  color?: string;
  icon?: ImageRequireSource;
  label?: number;
  alignment?: AlignmentType;
}

export type TimelineItemProps = {
  state?: StateTypes;
  topLine?: LineProps;
  bottomLine?: LineProps;
  point?: PointProps;
  renderHeader?: () => JSX.Element;
  renderContent?: () => JSX.Element;
};

const TimelineItem = (props: TimelineItemProps) => {
  const {state = StateTypes.CURRENT, topLine, bottomLine, point, renderHeader, renderContent} = props;

  const getStateColor = useCallback(() => {
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
  }, [state]);

  const renderLine = (type?: LineTypes, color?: string) => {
    const lineColor = color || getStateColor();
    if (type === LineTypes.DASHED) {
      // return (
      //   <Dash 
      //     dashGap={6}
      //     dashLength={6}
      //     dashThickness={2}
      //     dashColor={lineColor}
      //     style={{flex: 1, flexDirection: 'column'}}
      //   />
      // );
      return <View style={{flex: 1, width: 2, backgroundColor: lineColor}}/>;
    }
    return <View style={{flex: 1, width: 2, backgroundColor: lineColor}}/>;
  };

  const renderTopLine = () => {
    return renderLine(topLine?.type, topLine?.color);
  };

  const renderBottomLine = () => {
    return renderLine(bottomLine?.type, bottomLine?.color);
  };

  const pointStyle = useMemo(() => {
    const hasHalo = point?.type === PointTypes.HALO;
    const isHollow = point?.type === PointTypes.HOLLOW;
    const hasContent = point?.label || point?.icon;

    const size = hasContent ? CONTENT_POINT_SIZE : POINT_SIZE;
    const pointSize = hasHalo ? size + HALO_WIDTH * 2 : size;
    const pointSizeStyle = {width: pointSize, height: pointSize, borderRadius: pointSize / 2};

    const pointColor = point?.color || getStateColor();
    const pointColorStyle = {backgroundColor: pointColor};

    const haloStyle = hasHalo && {borderWidth: HALO_WIDTH, borderColor: Colors.getColorTint(pointColor, HALO_TINT)};
    const hollowStyle = !hasContent && isHollow && 
      {backgroundColor: Colors.white, borderWidth: HOLLO_WIDTH, borderColor: pointColor};
    
    return [styles.point, pointSizeStyle, pointColorStyle, haloStyle, hollowStyle];
  }, [point?.type, point?.color, point?.label, point?.icon, getStateColor]);

  const renderPoint = () => {
    if (point?.icon) {
      return (
        <View center style={pointStyle}>
          <Icon source={point?.icon} size={ICON_SIZE} tintColor={Colors.white}/>
        </View>
      );
    }
    if (point?.label) {
      return (
        <View center style={pointStyle}>
          <Text white subtext>{point?.label}</Text>
        </View>
      );
    }
    return <View style={pointStyle}/>;
  };

  const onHeaderLayout = useCallback((nativeEvent: LayoutChangeEvent) => {
      
  }, []);

  const onLayout = useCallback((nativeEvent: LayoutChangeEvent) => {
      
  }, []);

  const _renderHeader = () => {
    return (
      <View onLayout={onHeaderLayout}>
        {renderHeader?.()}
      </View>
    );
  };

  const _renderContent = () => {
    return (
      <View onLayout={onLayout}>
        {renderContent?.()}
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

  const renderItem = () => {
    return (
      <View style={styles.contentContainer}>
        {_renderHeader()}
        {_renderContent()}
      </View>
    );
  };

  return (
    <View row style={styles.container}>
      {renderIndicator()}
      {renderItem()}
    </View>
  );
};

export default TimelineItem;
TimelineItem.displayName = 'TimelineItem';
TimelineItem.states = StateTypes;
TimelineItem.lineTypes = LineTypes;
TimelineItem.pointTypes = PointTypes;


const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    borderWidth: 1
  },
  contentContainer: {
    flex: 1,
    paddingVertical: 8
  },
  indicatorContainer: {
    alignItems: 'center',
    marginRight: 8,
    width: 20
  },
  point: {
    marginVertical: 4
  }
});
