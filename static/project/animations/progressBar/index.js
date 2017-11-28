import React from 'react';
import PropTypes from 'prop-types';
import {BaseComponent} from '../../commons';
import View from '../../components/view';
import AnimatedScanner from '../animatedScanner';
import {Colors} from '../../style';

/**
 * @description: Animated progress bar
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
  }

  static defaultProps = {
    backgroundColor: Colors.dark60,
    progressBackgroundColor: Colors.dark10,
  }

  render() {
    const {height, backgroundColor, progressBackgroundColor} = this.props;
    const animatedScannerProps = AnimatedScanner.extractOwnProps(this.props);
    const modifiers = this.extractModifierProps();

    return (
      <View height={height} {...modifiers} style={{backgroundColor}}>
        <AnimatedScanner {...animatedScannerProps} backgroundColor={progressBackgroundColor} hideScannerLine/>
      </View>
    );
  }
}
