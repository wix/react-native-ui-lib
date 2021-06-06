import _ from 'lodash';
import React, {useState, useCallback} from 'react';
import {StyleProp, ViewStyle} from 'react-native';
import PanDismissibleView, {PanDismissibleViewProps} from './panDismissibleView';
import PanListenerView, {PanListenerViewProps} from './panListenerView';
import PanningProvider, {PanAmountsProps, PanningDirections, PanDirectionsProps} from './panningProvider';
import View from '../view';

export interface SwipeToDismissViewProps
  extends Pick<PanDismissibleViewProps, 'onDismiss' | 'threshold'>,
    Pick<PanListenerViewProps, 'isClickable'> {
  /**
   * The content to be rendered inside the dismissible view
   */
  renderContent: (props: any) => JSX.Element;
  /**
   * The directions of the allowed pan.
   * Types: UP, DOWN, LEFT and RIGHT (using PanningDirections).
   */
  panDirections: PanningDirections[];
  /**
   * Additional styling
   */
  style?: StyleProp<ViewStyle>;
}

/**
 * @description: SwipeToDismissView component that allows for easy swipe to dismiss
 * (locks the swipe direction once a swipe has started)
 */
function SwipeToDismissView(props: SwipeToDismissViewProps) {
  const {renderContent, panDirections, style, onDismiss, threshold = {x: 10, y: 10}, isClickable} = props;

  const [directions, setDirections] = useState<PanningDirections[]>(panDirections);
  const [containerStyle, setContainerStyle] = useState<StyleProp<ViewStyle>>({});

  const _setDirections = useCallback((directions: PanDirectionsProps, deltas?: PanAmountsProps, velocities?: PanAmountsProps) => {
    const amount = deltas || velocities;
    let isHorizontal;
    if (directions.x && directions.y) {
      isHorizontal = Math.abs(amount!.x!) > Math.abs(amount!.y!);
    } else {
      isHorizontal = _.isUndefined(amount!.y);
    }

    if (isHorizontal) {
      setDirections(amount!.x! > 0 ? [PanningProvider.Directions.RIGHT] : [PanningProvider.Directions.LEFT]);
      const marginTop: number = deltas?.y ? -deltas.y : 0;
      setContainerStyle({marginTop}); // fix 'jump' when dragging in two directions
    } else {
      setDirections(amount!.y! > 0 ? [PanningProvider.Directions.DOWN] : [PanningProvider.Directions.UP]);
      const marginLeft: number = deltas?.x ? -deltas.x : 0;
      setContainerStyle({marginLeft}); // fix 'jump' when dragging in two directions
    }
  }, []);

  const onDrag = useCallback(({directions, deltas}: {directions: PanDirectionsProps; deltas: PanAmountsProps}) => {
    _setDirections(directions, deltas, undefined);
  }, [_setDirections]);

  const onSwipe = useCallback(({directions, velocities}: {directions: PanDirectionsProps; velocities: PanAmountsProps}) => {
    _setDirections(directions, undefined, velocities);
  }, [_setDirections]);

  const onPanRelease = useCallback(() => {
    setDirections(panDirections);
    setContainerStyle({});
  }, [setDirections, panDirections, setContainerStyle]);

  return (
    <PanningProvider>
      <PanDismissibleView directions={directions} onDismiss={onDismiss} threshold={threshold} style={style}>
        <PanListenerView
          isClickable={isClickable}
          onDrag={onDrag}
          onSwipe={onSwipe}
          onPanRelease={onPanRelease}
          onPanTerminated={onPanRelease}
          directions={directions}
        >
          <View style={containerStyle}>{renderContent(props)}</View>
        </PanListenerView>
      </PanDismissibleView>
    </PanningProvider>
  );
}

SwipeToDismissView.displayName = 'SwipeToDismissView';

export default SwipeToDismissView;
