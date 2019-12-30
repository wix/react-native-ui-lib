import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, Platform} from 'react-native';
import View from '../view';
import {BaseComponent} from '../../commons';
import Constants from '../../helpers/Constants';
import Colors from '../../style/colors';
import Shadows from '../../style/shadows';
import WizardStep from './WizardStep';
import {States, StatesConfig} from './WizardStates';

/**
 * @description: Wizard Component: a wizard presents a series of steps in  prescribed order
 * that the user needs to complete in order to accomplish a goal (e.g. purchase a product).
 *
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/WizardScreen.js
 * @notes: Use Wizard with nested Wizard.Step(s) to achieve the desired result.
 */
export default class Wizard extends BaseComponent {
  static displayName = 'Wizard';

  static propTypes = {
    /**
     * The active step's index
     */
    activeIndex: PropTypes.number,
    /**
     * The configuration of the active step (see Wizard.Step.propTypes)
     */
    activeConfig: PropTypes.shape(WizardStep.propTypes),
    /**
     * Callback that is called when the active step is changed (i.e. a step was clicked on).
     * The new activeIndex will be the input of the callback.
     */
    onActiveIndexChanged: PropTypes.func
  };

  constructor(props) {
    super(props);

    this.state = {
      maxWidth: this.getMaxWidth()
    };
  }

  componentDidMount() {
    Constants.addDimensionsEventListener(this.onOrientationChange);
  }

  componentWillUnmount() {
    Constants.removeDimensionsEventListener(this.onOrientationChange);
  }

  onOrientationChange = () => {
    const maxWidth = this.getMaxWidth();
    if (this.state.maxWidth !== maxWidth) {
      this.setState({maxWidth});
    }
  };

  getMaxWidth() {
    if (Constants.isTablet) {
      if (Constants.isLandscape) {
        return Constants.screenWidth * 0.2;
      } else {
        return Constants.screenWidth * 0.26;
      }
    } else {
      return Constants.screenWidth * 0.4;
    }
  }

  renderChildren() {
    const {maxWidth} = this.state;
    const {activeIndex, activeConfig = StatesConfig.active, testID} = this.getThemeProps();

    const children = React.Children.map(this.props.children, (child, index) => {
      return React.cloneElement(child, {
        testID: `${testID}.step${index}`,
        maxWidth,
        index,
        activeIndex,
        activeConfig,
        onPress: () => {
          _.invoke(this.props, 'onActiveIndexChanged', index);
        }
      });
    });

    return children;
  }

  render() {
    const {testID, containerStyle} = this.getThemeProps();

    return (
      <View testID={testID} style={[styles.container, containerStyle]}>
        {this.renderChildren()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.white,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    ...Platform.select({
      ios: {
        ...Shadows.white30.bottom
      },
      android: {
        elevation: 2
      }
    })
  }
});

Wizard.Step = WizardStep;
Wizard.States = States;
