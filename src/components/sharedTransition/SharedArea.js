import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import Animated, {Easing} from 'react-native-reanimated';
import PropTypes from 'prop-types';
import _ from 'lodash';
import TouchableOpacity from '../touchableOpacity';
import {Colors} from '../../style';
import ShareTransitionContext from './ShareTransitionContext';

class SharedArea extends Component {
  displayName = 'IGNORE';
  static propTypes = {
    /**
     * render details screen
     */
    renderDetails: PropTypes.elementType
  };

  static defaultProps = {
    renderDetails: _.noop
  };

  state = {};
  transition = new Animated.Value(0);

  getProviderContextValue() {
    const {showDetails} = this.state;
    return {
      setSharedData: this.setSharedData,
      setSource: this.setSource,
      setTarget: this.setTarget,
      showDetails
    };
  }

  getOverlayStyle() {
    return {
      ...StyleSheet.absoluteFillObject,
      backgroundColor: Colors.white,
      opacity: Animated.interpolate(this.transition, {inputRange: [0, 1], outputRange: [0, 1]})
    };
  }

  getDetailsStyle() {
    return {
      ...StyleSheet.absoluteFillObject,
      opacity: Animated.interpolate(this.transition, {inputRange: [90, 100], outputRange: [0, 1]})
    };
  }

  getElementStyle() {
    const {sourceLayout, targetLayout} = this.state;
    if (sourceLayout && this.transition) {
      return {
        position: 'absolute',
        width: Animated.interpolate(this.transition, {
          inputRange: [0, 100],
          outputRange: [sourceLayout.width, targetLayout.width]
        }),
        height: Animated.interpolate(this.transition, {
          inputRange: [0, 100],
          outputRange: [sourceLayout.height, targetLayout.height]
        }),
        top: Animated.interpolate(this.transition, {
          inputRange: [0, 100],
          outputRange: [sourceLayout.y, targetLayout.y]
        }),
        left: Animated.interpolate(this.transition, {
          inputRange: [0, 100],
          outputRange: [sourceLayout.x, targetLayout.x]
        })
      };
    }
  }

  setSharedData = data => {
    this.setState({
      data
    });
  };

  setSource = (sourceLayout, element) => {
    this.setState({
      sourceLayout,
      element,
      showDetails: true
    },
    () => {
      this.startTransition(true);
    },);
  };

  setTarget = targetLayout => {
    this.setState({
      targetLayout
    });
  };

  clearSource = () => {
    this.startTransition(false, () => {
      this.setState({
        showDetails: false,
        data: undefined,
        sourceLayout: undefined,
        element: undefined
      });
    });
  };

  startTransition(show, onAnimationEnd) {
    Animated.timing(this.transition, {
      toValue: show ? 100 : 0,
      duration: 600,
      easing: Easing.bezier(0.19, 1, 0.22, 1),
      useNativeDriver: false
    }).start(onAnimationEnd);
  }

  renderDetailsOverlay() {
    const {renderDetails} = this.props;
    const {data, element} = this.state;

    return (
      <Animated.View pointerEvents={data ? 'auto' : 'none'} style={this.getOverlayStyle()}>
        <Animated.View pointerEvents="box-none" style={this.getDetailsStyle()}>
          {renderDetails(data)}
        </Animated.View>

        <Animated.View style={this.getElementStyle()}>
          <TouchableOpacity activeOpacity={1} onPress={this.clearSource} /* _style={[style]} */ style={{flex: 1}}>
            {element}
          </TouchableOpacity>
        </Animated.View>
      </Animated.View>
    );
  }

  render() {
    return (
      <ShareTransitionContext.Provider value={this.getProviderContextValue()}>
        {this.props.children}
        {this.renderDetailsOverlay()}
      </ShareTransitionContext.Provider>
    );
  }
}

export default SharedArea;
