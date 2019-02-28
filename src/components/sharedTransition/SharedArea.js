import React, {Component} from 'react';
import {LayoutAnimation, StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import _ from 'lodash';
import Modal from '../../screensComponents/modal';
import View from '../view';
import TouchableOpacity from '../touchableOpacity';

import ShareTransitionContext from './ShareTransitionContext';

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

  state = {};

  componentDidUpdate(prevProps, prevState) {
    if (this.state.showDetails !== prevState.showDetails) {
      LayoutAnimation.configureNext({
        ...LayoutAnimation.Presets.easeInEaseOut,
        duration: 200,
      });
    }
  }

  getProviderContextValue() {
    const {showDetails} = this.state;
    return {
      setSource: this.setSource,
      setTarget: this.setTarget,
      showDetails,
    };
  }

  setSource = (itemLayout, data, element) => {
    this.setState(
      {
        itemLayout,
        data,
        element,
      },
      () => {
        setTimeout(() => {
          this.setState({
            showDetails: true,
          });
        }, 200);
      },
    );
  };

  setTarget = itemLayout => {
    this.setState({
      placeholderLayout: itemLayout,
    });
  };

  clearFocusedItem = () => {
    this.setState(
      {
        showDetails: false,
      },
      () => {
        setTimeout(() => {
          this.setState({
            itemLayout: undefined,
          });
        }, 200);
      },
    );
  };

  renderFocusedItem() {
    const {renderDetails} = this.props;
    const {itemLayout, placeholderLayout, data, element, showDetails} = this.state;

    let style;
    if (itemLayout) {
      const detailsReady = showDetails && placeholderLayout;
      style = {
        position: 'absolute',
        width: detailsReady ? placeholderLayout.width : itemLayout.width,
        height: detailsReady ? placeholderLayout.height : itemLayout.height,
        top: detailsReady ? placeholderLayout.y : itemLayout.y,
        left: detailsReady ? placeholderLayout.x : itemLayout.x,
      };
    }

    return (
      <Modal visible={!!itemLayout} animationType="fade" onBackgroundPress={this.clearFocusedItem}>
        <View pointerEvents="box-none" style={[StyleSheet.absoluteFillObject, {opacity: showDetails ? 1 : 0}]}>
          {renderDetails(data)}
        </View>
        {
          <TouchableOpacity activeOpacity={1} onPress={this.clearFocusedItem} style={[style]}>
            {element}
          </TouchableOpacity>
        }
      </Modal>
    );
  }

  render() {
    return (
      <ShareTransitionContext.Provider value={this.getProviderContextValue()}>
        {this.props.children}
        {this.renderFocusedItem()}
      </ShareTransitionContext.Provider>
    );
  }
}

export default SharedArea;
