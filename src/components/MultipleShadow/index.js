import React from 'react';
import {StyleSheet} from 'react-native';
import PropTypes from 'prop-types';
import {BaseComponent} from '../../commons';
import View from '../view';
import {Shadows} from '../../style';

/**
 * @description: A multiple layer for multiple shadow effect for iOS only
 */
export default class MultipleShadow extends BaseComponent {
  static displayName = 'IGNORE';

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
    /**
     * Custom shadow color to be applied on both top and bottom shadows
     */
    shadowColor: PropTypes.string,
    /**
     * card border radius (will be passed to inner Card.Image component)
     */
    borderRadius: PropTypes.number
  };

  static defaultProps = {
    shadowType: 'white40'
  };

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
    const {shadowColor, borderRadius, ...others} = this.props;
    const {topShadow, bottomShadow} = this.getShadowStyles();

    return (
      <View {...others} style={[this.styles.wrapper, {...topShadow}, shadowColor && {shadowColor}, {borderRadius}]}>
        <View
          {...others}
          style={[this.styles.wrapper, {...bottomShadow}, shadowColor && {shadowColor}, {borderRadius}]}
        >
          {this.props.children}
        </View>
      </View>
    );
  }
}

function createStyles() {
  return StyleSheet.create({
    wrapper: {
      flexGrow: 1,
      backgroundColor: 'transparent'
    }
  });
}
