import _ from 'lodash';
import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import {Animated} from 'react-native';
import View from '../view';
import asPanViewConsumer from './asPanViewConsumer';

/**
 * @description: panResponderView component created to making listening to swipe and drag events easier.
 * @notes: Has to be used as a child of a PanningProvider that also has a PanListenerView.
 *         The PanListenerView is the one that sends the drag\swipe events.
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/PanResponderScreen.js
 */
class panResponderView extends PureComponent {
  static displayName = 'panResponderView';
  static propTypes = {
    /**
     * Will be called with the current location ({left, top}) when the pan has ended
     */
    onPanLocationChanged: PropTypes.func,
    /**
     * Ignore panning events while this is true
     */
    ignorePanning: PropTypes.bool,
    /**
     * Allow the view to be animated (send animation via style; default is false)
     */
    isAnimated: PropTypes.bool
  };

  static defaultProps = {
    isAnimated: false
  };

  constructor(props) {
    super(props);

    this.initialLeft = 0;
    this.initialTop = 0;

    this.ref = React.createRef();
  }

  componentDidMount() {
    this.setNativeProps(this.initialLeft, this.initialTop);
  }

  componentDidUpdate(prevProps) {
    const {ignorePanning} = this.props;
    const {isPanning, dragDeltas} = this.props.context; // eslint-disable-line
    const {isPanning: prevIsPanning, dragDeltas: prevDragDeltas} = prevProps.context; // eslint-disable-line

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
    const location = {left: this.left, top: this.top};
    this.initialLeft = this.left;
    this.initialTop = this.top;
    _.invoke(this.props, 'onPanLocationChanged', location);
    _.invoke(this.props.context, 'onPanLocationChanged', location); // eslint-disable-line
  }

  onDrag(deltas) {
    const left = this.initialLeft + (deltas.x ? Math.round(deltas.x) : 0);
    const top = this.initialTop + (deltas.y ? Math.round(deltas.y) : 0);

    this.setNativeProps(left, top);
  }

  setNativeProps(left, top) {
    if (this.ref.current) {
      this.ref.current.setNativeProps({style: {left, top}});
      this.left = left;
      this.top = top;
    }
  }

  render() {
    const {isAnimated, ...others} = this.props;
    const Container = isAnimated ? Animated.View : View;

    return (
      <Container ref={this.ref} pointerEvents={'box-none'} {...others}>
        {this.props.children}
      </Container>
    );
  }
}

export default asPanViewConsumer(panResponderView);
