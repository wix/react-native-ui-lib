import React, {useCallback} from 'react';
import {StyleSheet, ImageRequireSource, LayoutChangeEvent} from 'react-native';
import {Colors} from '../../style';
import View from '../view';

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

export type LineProps = {
  type?: LineTypes;
  color?: string;
}

export enum AlignmentType {
  CENTER = 'center',
  TOP = 'top'
}

export type PointProps = {
  color?: string;
  label?: number;
  icon?: ImageRequireSource;
  showHalo?: boolean;
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

  const getStateColor = () => {
    switch (state) {
      case StateTypes.CURRENT:
        return Colors.$backgroundPrimaryHeavy;
      case StateTypes.NEXT:
        return Colors.$backgroundNeutralIdle;
      case StateTypes.ERROR:
        return Colors.$backgroundDangerHeavy;
      case StateTypes.SUCCESS:
        return Colors.$backgroundSuccess;
      default: 
        return Colors.$backgroundPrimaryHeavy;
    }
  };

  const renderLine = (type?: LineTypes, color?: string) => {
    return (
      <View style={{flex: 1, width: 2, backgroundColor: color || getStateColor()}}/>
    );
  };

  const renderTopLine = () => {
    return renderLine(topLine?.type, topLine?.color);
  };

  const renderBottomLine = () => {
    return renderLine(bottomLine?.type, bottomLine?.color);
  };

  const renderPoint = () => {
    return (
      <View style={[styles.point, {backgroundColor: point?.color || getStateColor()}]}/>
    );
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
TimelineItem.displayName = "TimelineItem";
TimelineItem.states = StateTypes;

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
    width: 12,
    height: 12,
    borderRadius: 6,
    marginVertical: 4
  }
});
