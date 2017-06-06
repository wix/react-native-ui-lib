import React from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {BaseComponent} from '../../commons';
import View from '../view';
import {Shadows} from '../../style';

// todo: add support for shadow modifiers
export default class MultipleShadow extends BaseComponent {

  displayName = 'MultipleShadow';

  static propTypes = {
    /**
     * top shadow style to use
     */
    topShadow: PropTypes.object,
    /**
     * bottom shadow style to use
     */
    bottomShadow: PropTypes.object,
    /**
     * a combination of top and bottom shadow based on shadow presets names
     */
    shadowType: PropTypes.oneOf(Object.keys(Shadows)),
  }

  static defaultProps = {
    shadowType: 'white40',
  }

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  getShadowStyles() {
    const {shadowType} = this.props;
    let {topShadow, bottomShadow} = this.props;

    if (!topShadow && Shadows[shadowType]) {
      topShadow = Shadows[shadowType].top;
    }

    if (!bottomShadow && Shadows[shadowType]) {
      bottomShadow = Shadows[shadowType].bottom;
    }

    return {topShadow, bottomShadow};
  }

  render() {
    const {style, ...others} = this.props;
    const {topShadow, bottomShadow} = this.getShadowStyles();
    return (
      <View {...others} style={[this.styles.wrapper, {...topShadow}, style]}>
        <View {...others} style={[this.styles.wrapper, {...bottomShadow}, style]}>
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
      flexGrow: 1,
    },
  });
}
