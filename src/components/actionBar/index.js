import _pt from "prop-types";
import _ from 'lodash';
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import { Colors, Shadows } from "../../style";
import { asBaseComponent } from "../../commons/new";
import View from "../view";
import Button from "../button";

/**
 * @description: Quick actions bar, each action support Button component props
 * @modifiers: margin, padding
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/ActionBar/ActionBar.gif?raw=true
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ActionBarScreen.tsx
 */
class ActionBar extends Component {
  static propTypes = {
    /**
       * action bar height
       */
    height: _pt.number,

    /**
       * action bar background color
       */
    backgroundColor: _pt.string,

    /**
       * actions for the action bar
       */
    actions: _pt.array.isRequired,

    /**
       * should action be equally centered
       */
    centered: _pt.bool,

    /**
       * use safe area, in case action bar attached to the bottom (default: true)
       */
    useSafeArea: _pt.bool,

    /**
       * keep the action bar position relative instead of it absolute position
       */
    keepRelative: _pt.bool
  };
  static displayName = 'ActionBar';
  static defaultProps = {
    height: 48,
    backgroundColor: Colors.white,
    useSafeArea: true
  };
  styles = createStyles(this.props);

  getAlignment(actionIndex) {
    const {
      actions,
      centered
    } = this.props;
    const first = actionIndex === 0;
    const last = actionIndex === actions.length - 1;
    return {
      left: centered ? false : first,
      center: centered || !first && !last || first && last,
      right: centered ? false : last
    };
  }

  render() {
    const {
      actions,
      centered,
      style,
      useSafeArea,
      keepRelative,
      ...others
    } = this.props;
    return <View useSafeArea={useSafeArea} style={[!keepRelative && this.styles.absoluteContainer]}>
        <View row centerV paddingH-20={!centered} style={[this.styles.container, style]} {...others}>
          {_.map(actions, (action, i) => <View key={i} flex {...this.getAlignment(i)}>
              <Button link size={Button.sizes.medium} primary {...action} />
            </View>)}
        </View>
      </View>;
  }

}

export default asBaseComponent(ActionBar);

function createStyles({
  height,
  backgroundColor
}) {
  return StyleSheet.create({
    container: {
      height
    },
    absoluteContainer: { ...StyleSheet.absoluteFillObject,
      top: undefined,
      backgroundColor,
      ...Shadows.white40.top
    }
  });
}