import React, {Component} from 'react';
import {LayoutAnimation, StyleSheet, Animated} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import TouchableOpacity from '../touchableOpacity';
import {Colors} from '../../style';
import {Constants} from '../../helpers';
import ShareTransitionContext from './ShareTransitionContext';

const DETAILS_TRANSITION_DURATION = 250;
const ELEMENT_TRANSITION_BASE_DURATION = Constants.isIOS ? 600 : 400;

class SharedArea extends Component {
  static propTypes = {
    /**
     * render details screen
     */
    renderDetails: PropTypes.func,
  };

  static defaultProps = {
    renderDetails: _.noop,
  };

  state = {
    detailsOverlayAnimation: new Animated.Value(0),
    detailsAnimation: new Animated.Value(0),
  };

  componentDidUpdate(prevProps, prevState) {
    if (this.state.data !== prevState.data) {
      this.animateDetailsOverlay();
    }

    if (this.state.showDetails !== prevState.showDetails) {
      this.animateDetails();
    }

    if (this.state.showDetails !== prevState.showDetails) {
      LayoutAnimation.configureNext({
        ...LayoutAnimation.Presets.easeInEaseOut,
        duration: this.getTransitionDuration(),
      });
    }
  }

  getProviderContextValue() {
    const {showDetails} = this.state;
    return {
      setSharedData: this.setSharedData,
      setSource: this.setSource,
      setTarget: this.setTarget,
      showDetails,
    };
  }

  getTransitionDuration() {
    const {sourceLayout, targetLayout} = this.state;
    if (sourceLayout && targetLayout) {
      const transitionDistance = Math.sqrt(
        (targetLayout.x - sourceLayout.x) ** 2 + (targetLayout.y - sourceLayout.y) ** 2,
      );
      const screenSize = Math.sqrt(Constants.screenHeight ** 2 + Constants.screenWidth ** 2);

      return Math.round((transitionDistance / screenSize) * ELEMENT_TRANSITION_BASE_DURATION);
    }

    return ELEMENT_TRANSITION_BASE_DURATION;
  }

  setSharedData = data => {
    this.setState({
      data,
    });
  };

  setSource = (sourceLayout, element) => {
    this.setState(
      {
        sourceLayout,
        element,
      },
      () => {
        setTimeout(() => {
          this.setState({
            showDetails: true,
          });
        }, DETAILS_TRANSITION_DURATION);
      },
    );
  };

  setTarget = targetLayout => {
    this.setState({
      targetLayout,
    });
  };

  clearSource = () => {
    this.setState(
      {
        showDetails: false,
      },
      () => {
        setTimeout(() => {
          this.setState({
            data: undefined,
            sourceLayout: undefined,
            element: undefined,
          });
        }, DETAILS_TRANSITION_DURATION);
      },
    );
  };

  animateDetailsOverlay() {
    const {detailsOverlayAnimation, data} = this.state;
    Animated.timing(detailsOverlayAnimation, {
      toValue: Number(!!data),
      duration: DETAILS_TRANSITION_DURATION,
      useNativeDriver: true,
    }).start();
  }

  animateDetails = () => {
    const {detailsAnimation, showDetails} = this.state;
    Animated.timing(detailsAnimation, {
      toValue: Number(!!showDetails),
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  renderDetailsOverlay() {
    const {renderDetails} = this.props;
    const {
      sourceLayout,
      targetLayout,
      data,
      element,
      showDetails,
      detailsOverlayAnimation,
      detailsAnimation,
    } = this.state;

    let style;
    if (sourceLayout) {
      const detailsReady = showDetails && targetLayout;

      style = {
        position: 'absolute',
        width: detailsReady ? targetLayout.width : sourceLayout.width,
        height: detailsReady ? targetLayout.height : sourceLayout.height,
        top: detailsReady ? targetLayout.y : sourceLayout.y,
        left: detailsReady ? targetLayout.x : sourceLayout.x,
      };
    }

    return (
      <Animated.View
        pointerEvents={data ? 'auto' : 'none'}
        style={[
          StyleSheet.absoluteFillObject,

          {
            opacity: detailsOverlayAnimation,
            backgroundColor: Colors.white,
          },
        ]}
      >
        <Animated.View pointerEvents="box-none" style={[StyleSheet.absoluteFillObject, {opacity: detailsAnimation}]}>
          {renderDetails(data)}
        </Animated.View>

        <TouchableOpacity activeOpacity={1} onPress={this.clearSource} style={[style]}>
          {element}
        </TouchableOpacity>
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
