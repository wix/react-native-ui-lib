import _pt from "prop-types";
import _ from 'lodash';
import React, { PureComponent } from 'react';
import View from "../view";
import asPanViewConsumer from "./asPanViewConsumer";

/**
 * @description: panResponderView component created to making listening to swipe and drag events easier.
 * @notes: Has to be used as a child of a PanningProvider that also has a PanListenerView.
 *         The PanListenerView is the one that sends the drag\swipe events.
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/PanResponderScreen.tsx
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/PanResponderView/PanResponderView.gif?raw=true
 */
class PanResponderView extends PureComponent {
  static propTypes = {
    /**
         * Will be called with the current location ({left, top}) when the pan has ended
         */
    onPanLocationChanged: _pt.func,

    /**
         * Ignore panning events while this is true
         */
    ignorePanning: _pt.bool,

    /**
         * Allow the view to be animated (send animation via style; default is false)
         */
    isAnimated: _pt.bool,
    context: _pt.shape({
      isPanning: _pt.bool.isRequired
    }).isRequired
  };
  static displayName = 'PanResponderView';
  static defaultProps = {
    isAnimated: false
  };
  initialLeft = 0;
  initialTop = 0;
  ref = React.createRef();

  componentDidMount() {
    this.setNativeProps(this.initialLeft, this.initialTop);
  }

  componentDidUpdate(prevProps) {
    const {
      ignorePanning
    } = this.props;
    const {
      isPanning,
      dragDeltas
    } = this.props.context;
    const {
      isPanning: prevIsPanning,
      dragDeltas: prevDragDeltas
    } = prevProps.context;

    if (!ignorePanning && !isPanning && prevIsPanning) {
      this.onPanEnd();
    }

    if (!ignorePanning && isPanning && (dragDeltas.x || dragDeltas.y) && (dragDeltas.x !== prevDragDeltas.x || dragDeltas.y !== prevDragDeltas.y)) {
      this.onDrag(dragDeltas);
    }
  }

  onPanEnd() {
    const location = {
      left: this.left,
      top: this.top
    };
    this.initialLeft = this.left || this.initialLeft;
    this.initialTop = this.top || this.initialTop;

    _.invoke(this.props, 'onPanLocationChanged', location);

    _.invoke(this.props.context, 'onPanLocationChanged', location);
  }

  onDrag(deltas) {
    const left = this.initialLeft + (deltas.x ? Math.round(deltas.x) : 0);
    const top = this.initialTop + (deltas.y ? Math.round(deltas.y) : 0);
    this.setNativeProps(left, top);
  }

  setNativeProps(left, top) {
    if (this.ref.current) {
      this.ref.current.setNativeProps({
        style: {
          left,
          top
        }
      });
      this.left = left;
      this.top = top;
    }
  }

  render() {
    const {
      isAnimated,
      ...others
    } = this.props;
    return <View animated={isAnimated} ref={this.ref} pointerEvents={'box-none'} {...others}>
        {this.props.children}
      </View>;
  }

}

export default asPanViewConsumer(PanResponderView);