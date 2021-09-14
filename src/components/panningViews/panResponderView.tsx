import React, {PureComponent} from 'react';
import View, {ViewProps} from '../view';
import asPanViewConsumer from './asPanViewConsumer';
import {PanLocationProps, PanAmountsProps} from './panningProvider';

export interface PanResponderViewProps extends ViewProps {
    /**
     * Will be called with the current location ({left, top}) when the pan has ended
     */
    onPanLocationChanged?: (location: PanLocationProps) => void;
    /**
     * Ignore panning events while this is true
     */
    ignorePanning?: boolean;
    /**
     * Allow the view to be animated (send animation via style; default is false)
     */
    isAnimated?: boolean;
}

interface PanResponderProps {
  isPanning: boolean;
  dragDeltas: PanAmountsProps;
}

interface Props extends PanResponderViewProps {
  context: PanResponderProps;
}

/**
 * @description: panResponderView component created to making listening to swipe and drag events easier.
 * @notes: Has to be used as a child of a PanningProvider that also has a PanListenerView.
 *         The PanListenerView is the one that sends the drag\swipe events.
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/PanResponderScreen.tsx
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/PanResponderView/PanResponderView.gif?raw=true
 */
class PanResponderView extends PureComponent<Props> {
  static displayName = 'PanResponderView';

  static defaultProps = {
    isAnimated: false
  };

  private left?: number;
  private top?: number;
  private initialLeft = 0;
  private initialTop = 0;
  private ref = React.createRef<any>();

  componentDidMount() {
    this.setNativeProps(this.initialLeft, this.initialTop);
  }

  componentDidUpdate(prevProps: Props) {
    const {ignorePanning} = this.props;
    const {isPanning, dragDeltas} = this.props.context;
    const {isPanning: prevIsPanning, dragDeltas: prevDragDeltas} = prevProps.context;

    if (!ignorePanning && !isPanning && prevIsPanning) {
      this.onPanEnd();
    }

    if (
      !ignorePanning &&
      isPanning &&
      (dragDeltas.x || dragDeltas.y) &&
      (dragDeltas.x !== prevDragDeltas.x || dragDeltas.y !== prevDragDeltas.y)
    ) {
      this.onDrag(dragDeltas);
    }
  }

  onPanEnd() {
    const location: PanLocationProps = {left: this.left, top: this.top};
    this.initialLeft = this.left || this.initialLeft;
    this.initialTop = this.top || this.initialTop;
    this.props.onPanLocationChanged?.(location);
    //@ts-expect-error
    this.props.context.onPanLocationChanged?.(location);
  }

  onDrag(deltas: PanAmountsProps) {
    const left = this.initialLeft + (deltas.x ? Math.round(deltas.x) : 0);
    const top = this.initialTop + (deltas.y ? Math.round(deltas.y) : 0);

    this.setNativeProps(left, top);
  }

  setNativeProps(left: number, top: number) {
    if (this.ref.current) {
      this.ref.current.setNativeProps({style: {left, top}});
      this.left = left;
      this.top = top;
    }
  }

  render() {
    const {isAnimated, ...others} = this.props;

    return (
      <View animated={isAnimated} ref={this.ref} pointerEvents={'box-none'} {...others}>
        {this.props.children}
      </View>
    );
  }
}

export default asPanViewConsumer<PanResponderViewProps>(PanResponderView);
