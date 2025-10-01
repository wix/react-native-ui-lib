import _isUndefined from "lodash/isUndefined";
import React, { Component } from 'react';
import { StyleSheet } from 'react-native';
import View from "../view";
import Text from "../text";
import Image from "../image";
import TouchableOpacity from "../touchableOpacity";
import { asBaseComponent } from "../../commons/new";
import Colors from "../../style/colors";
import BorderRadiuses from "../../style/borderRadiuses";
import Spacings from "../../style/spacings";
import { StatesConfig } from "./WizardStates";

// Includes private props from the Wizard

/**
 * @description: WizardStep Component: a wizard presents a series of steps in  prescribed order
 * that the user needs to complete in order to accomplish a goal (e.g. purchase a product).
 *
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/WizardScreen.tsx
 * @notes: Use Wizard with nested Wizard.Step(s) to achieve the desired result.
 */
class WizardStep extends Component {
  static displayName = 'Wizard.Step';
  static defaultProps = {
    index: 0,
    maxWidth: 0
  };
  getProps() {
    const props = this.props;
    const {
      state,
      activeConfig: propsActiveConfig,
      index,
      activeIndex
    } = props;
    const config = StatesConfig[state];
    const activeConfig = index === activeIndex ? propsActiveConfig : {};
    return {
      ...config,
      ...props,
      ...activeConfig
    };
  }
  getAccessibilityLabel() {
    const {
      index,
      label,
      state
    } = this.props;
    const config = StatesConfig[state];
    const extraInfo = config?.accessibilityInfo || '';
    return `Step ${index + 1}, ${label}, ${extraInfo}`;
  }
  renderCircle(props) {
    const {
      testID,
      index,
      activeIndex,
      onPress,
      indexLabelStyle,
      circleSize,
      color,
      circleColor = color,
      circleBackgroundColor,
      icon,
      enabled
    } = props;
    const hitSlopSize = Spacings.s2;
    return <TouchableOpacity testID={`${testID}.circle`} style={[styles.circle, !!circleSize && {
      width: circleSize,
      height: circleSize
    }, {
      borderColor: circleColor,
      backgroundColor: circleBackgroundColor
    }]} onPress={enabled ? onPress : undefined} hitSlop={{
      top: hitSlopSize,
      bottom: hitSlopSize,
      left: hitSlopSize,
      right: hitSlopSize
    }} disabled={!enabled} accessibilityLabel={this.getAccessibilityLabel()}>
        {index === activeIndex || _isUndefined(icon) ? <Text text80 testID={`${testID}.index`} style={[{
        color
      }, indexLabelStyle]}>
            {index + 1}
          </Text> : <Image testID={`${testID}.image`} source={icon} tintColor={color} />}
      </TouchableOpacity>;
  }
  render() {
    const props = this.getProps();
    const {
      testID,
      label,
      labelStyle,
      index,
      activeIndex,
      maxWidth,
      connectorStyle
    } = props;
    return <View testID={testID} row center flex={index !== activeIndex}>
        {index > activeIndex && <View flex style={[styles.connector, connectorStyle]} />}
        {this.renderCircle(props)}
        {index === activeIndex && <Text text80 testID={`${testID}.label`} numberOfLines={1} style={[styles.label, {
        maxWidth
      }, labelStyle]} accessible={false} recorderTag={'unmask'}>
            {label}
          </Text>}
        {index < activeIndex && <View flex style={[styles.connector, connectorStyle]} />}
      </View>;
  }
}
export default asBaseComponent(WizardStep);
const styles = StyleSheet.create({
  connector: {
    borderWidth: 1,
    borderColor: Colors.$outlineDefault
  },
  circle: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: BorderRadiuses.br100,
    borderWidth: 1
  },
  label: {
    marginHorizontal: 8,
    color: Colors.$textNeutralHeavy
  }
});