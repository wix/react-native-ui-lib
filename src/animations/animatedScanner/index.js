import React, {PropTypes} from 'react';
import {View, StyleSheet, Animated} from 'react-native';
import {BaseComponent} from '../../commons';
import {Constants} from '../../helpers';
import {Colors} from '../../style';

// todo: add finisher animation (check icon animation or something)
export default class AnimatedScanner extends BaseComponent {

  static displayName = 'AnimatedScanner';

  static propTypes = {
    /**
     * animated value between 0 and 100
     */
    progress: PropTypes.object,
    /**
     * scanner opacity
     */
    opacity: PropTypes.number,
    /**
     * scanner background color
     */
    backgroundColor: PropTypes.string,
    testID: PropTypes.string,
  };

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  render() {
    const {progress, opacity, backgroundColor} = this.props;
    return (
      <Animated.View
        style={[this.styles.container,
          opacity && {opacity},
          backgroundColor && {backgroundColor},
          {
            right: progress.interpolate({
              inputRange: [0, 5, 55, 100],
              outputRange: [Constants.screenWidth, Constants.screenWidth / 2, Constants.screenWidth / 3, 0],
            }),
          },
        ]}
      >
        {JSON.stringify(progress) !== '100' && <View style={this.styles.scanner}/>}
      </Animated.View>
    );
  }
}

function createStyles() {
  return StyleSheet.create({
    container: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      backgroundColor: Colors.white,
      opacity: 0.9,
    },
    scanner: {
      position: 'absolute',
      top: 0,
      bottom: 0,
      right: 0,
      borderWidth: StyleSheet.hairlineWidth,
      borderColor: Colors.dark50,
    },
  });
}
