import React from 'react';
import {ViewPropTypes} from 'react-native';
import PropTypes from 'prop-types';
import {BaseComponent} from '../../commons';
import View from '../../components/view';
import AnimatedScanner from '../animatedScanner';
import {Colors} from '../../style';

/**
 * @description: Animated progress bar
 * @gif:https://media.giphy.com/media/3o752o08oY0oCvOxR6/giphy.gif
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/animationScreens/ProgressBarScreen.js
 * @extends: AnimatedScanner
 * @extendsLink: https://wix-private.github.io/wix-react-native-ui-lib/docs/public/AnimatedScanner/
 */
export default class ProgressBar extends BaseComponent {
  static displayName = 'ProgressBar';
  static propTypes = {
    ...AnimatedScanner.propTypes,
    /**
     * height of the progress bar
     */
    height: PropTypes.number,
    /**
     * background color of the component
     */
    backgroundColor: PropTypes.string,
    /**
     * the progress background color
     */
    progressBackgroundColor: PropTypes.string,
    /**
     * the progress bar container style
     */
    containerStyle: ViewPropTypes.style
  };

  static defaultProps = {
    backgroundColor: Colors.dark60,
    progressBackgroundColor: Colors.dark10
  };

  render() {
    const {height, backgroundColor, progressBackgroundColor, containerStyle, style} = this.props;
    const animatedScannerProps = AnimatedScanner.extractOwnProps(this.props);
    const modifiers = this.extractModifierProps();

    return (
      <View height={height} {...modifiers} style={[{backgroundColor}, containerStyle]}>
        <AnimatedScanner
          {...animatedScannerProps}
          backgroundColor={progressBackgroundColor}
          hideScannerLine
          style={style}
        />
      </View>
    );
  }
}
