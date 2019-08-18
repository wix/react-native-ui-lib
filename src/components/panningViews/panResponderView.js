import _ from 'lodash';
import PropTypes from 'prop-types';
import React, {PureComponent} from 'react';
import {Animated} from 'react-native';
import View from '../view';
import asPanViewConsumer from './asPanViewConsumer';
import PanningProvider from './panningProvider';

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
     * The directions of the allowed pan (default allows all directions)
     * Types: UP, DOWN, LEFT and RIGHT (using PanningProvider.Directions.###)
     */
    directions: PropTypes.arrayOf(PropTypes.oneOf(Object.values(PanningProvider.Directions))),
    /**
     * The location ({left, top} of the top-left corner)
     */
    location: PropTypes.shape({left: PropTypes.number, top: PropTypes.number}),
    /**
     * Will be called with the current location ({left, top}) when the pan has ended
     */
    onPanLocationChanged: PropTypes.func,
    /**
     * Ignore panning events while this is true
     */
    ignorePanning: PropTypes.bool,
  };

  constructor(props) {
    super(props);

    const {location} = props;
    this.initialLeft = _.get(location, 'left', 0);
    this.initialTop = _.get(location, 'top', 0);

    this.ref = React.createRef();
  }

  componentDidMount() {
    this.setNativeProps(this.initialLeft, this.initialTop);
  }

  componentDidUpdate(prevProps) {
    const {location, ignorePanning} = this.props;
    const {isPanning, dragDeltas} = this.props.context; // eslint-disable-line
    const {location: prevLocation} = prevProps;
    const {
      isPanning: prevIsPanning,
      dragDeltas: prevDragDeltas,
    } = prevProps.context; // eslint-disable-line

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

    if (location !== prevLocation) {
      this.left = location.left;
      this.top = location.top;
      this.initialLeft = this.left;
      this.initialTop = this.top;
      this.setNativeProps(this.left, this.top);
    }
  }

  onPanEnd() {
    const location = {left: this.left, top: this.top};
    _.invoke(this.props, 'onPanLocationChanged', location);
    _.invoke(this.props.context, 'onPanLocationChanged', location); // eslint-disable-line
  }

  onDrag(deltas) {
    const left = this.initialLeft + (deltas.x ? Math.round(deltas.x) : 0);
    const top = this.initialTop + (deltas.y ? Math.round(deltas.y) : 0);
    
    this.setNativeProps(left, top);
  };

  setNativeProps(left, top) {
    if (this.ref.current) {
      this.ref.current.setNativeProps({style: {left, top}});
      this.left = left;
      this.top = top;
    }
  };

  render() {
    const {style} = this.props;

    return (
      <View
        ref={this.ref}
        style={style}
        onLayout={this.onLayout}
      >
        {this.props.children}
      </View>
    );
  }
}

export default asPanViewConsumer(panResponderView);
