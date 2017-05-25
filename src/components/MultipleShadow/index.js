import React from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {BaseComponent} from '../../commons';
import View from '../view';
import {Shadows} from '../../style';

// todo: add support for shadow modifiers
export default class MultipleShadow extends BaseComponent {

  static propTypes = {
    topShadow: PropTypes.object,
    bottomShadow: PropTypes.object,
  }

  static defaultProps = {
    topShadow: Shadows.white40.top,
    bottomShadow: Shadows.white40.bottom,
  }

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  render() {
    const {topShadow, bottomShadow} = this.props;
    return (
      <View style={[this.styles.wrapper, {...topShadow}]}>
        <View style={[this.styles.wrapper, {...bottomShadow}]}>
          {this.props.children}
        </View>
      </View>
    );
  }
}

function createStyles() {
  return StyleSheet.create({
    wrapper: {
      backgroundColor: 'transparent',
    },
  });
}
