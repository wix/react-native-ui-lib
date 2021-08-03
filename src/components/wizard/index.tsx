import React, {Component} from 'react';
import {StyleSheet, Platform} from 'react-native';
import View from '../view';
import {asBaseComponent} from '../../commons/new';
import Constants from '../../helpers/Constants';
import Colors from '../../style/colors';
import Shadows from '../../style/shadows';
import WizardStep from './WizardStep';
import {StatesConfig} from './WizardStates';
import {WizardProps, WizardStepProps, WizardStepStates, WizardStepConfig, WizardStepsConfig} from './types';
export {WizardProps, WizardStepProps, WizardStepStates, WizardStepConfig, WizardStepsConfig};

interface State {
  maxWidth: number;
}

/**
 * @description: Wizard Component: a wizard presents a series of steps in  prescribed order
 * that the user needs to complete in order to accomplish a goal (e.g. purchase a product).
 *
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/WizardScreen.tsx
 * @notes: Use Wizard with nested Wizard.Step(s) to achieve the desired result.
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Wizard/Wizard.gif?raw=true
 * @image: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Wizard/WizardPresets.png?raw=true
 */
class Wizard extends Component<WizardProps, State> {
  static displayName = 'Wizard';
  static Step: typeof WizardStep;
  static States: typeof WizardStepStates;

  constructor(props: WizardProps) {
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
    const {activeIndex, activeConfig = StatesConfig.active, testID} = this.props;

    const children = React.Children.map(this.props.children, (child, index) => {
      // @ts-expect-error
      return React.cloneElement(child, {
        testID: `${testID}.step${index}`,
        maxWidth,
        index,
        activeIndex,
        activeConfig,
        onPress: () => {
          this.props.onActiveIndexChanged?.(index);
        }
      });
    });

    return children;
  }

  render() {
    const {testID, containerStyle} = this.props;

    return (
      <View testID={testID} style={[styles.container, containerStyle]}>
        {this.renderChildren()}
      </View>
    );
  }
}

Wizard.Step = WizardStep;
Wizard.States = WizardStepStates;

export default asBaseComponent<WizardProps, typeof Wizard>(Wizard);

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
