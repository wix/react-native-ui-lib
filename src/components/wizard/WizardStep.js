import _ from 'lodash';
import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet} from 'react-native';
import View from '../view';
import Text from '../text';
import Image from '../image';
import TouchableOpacity from '../touchableOpacity';
import {PureBaseComponent} from '../../commons';
import Colors from '../../style/colors';
import BorderRadiuses from '../../style/borderRadiuses';
import Spacings from '../../style/spacings';

/**
 * @description: WizardStep Component: a wizard presents a series of steps in  prescribed order
 * that the user needs to complete in order to accomplish a goal (e.g. purchase a product).
 *
 * @example: https://github.com/wix-private/wix-react-native-ui-lib/blob/master/example/screens/components/WizardScreen.js
 * @guidelines: https://zpl.io/aXmAkdg
 * @notes: Use Wizard with nested Wizard.Step(s) to achieve the desired result.
 */
export default class WizardStep extends PureBaseComponent {
  static displayName = 'Wizard.Step';

  static propTypes = {
    /**
     * The label of the item
     */
    label: PropTypes.string,
    /**
     * Additional styles for the label
     */
    labelStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    /**
     * Additional styles for the index's label
     */
    indexLabelStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    /**
     * Additional styles for the connector
     */
    connectorStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number, PropTypes.array]),
    /**
     * The configuration of this step;
     * ('Wizard.Step.states.' default configurations are: 'ENABLED', 'DISABLED', 'COMPLETED', 'ERROR' or 'SKIPPED')
     * includes: color of the step index (or of the icon, when provided),
     * the color of the circle, textStyle (when no icon is provided),
     * an icon and whether the state is not clickable
     */
    state: PropTypes.shape({
      color: PropTypes.string,
      circleColor: PropTypes.string,
      icon: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
      notClickable: PropTypes.bool
    })
  };

  renderCircle() {
    const {testID, index, state, onPress, indexLabelStyle} = this.getThemeProps();
    const {color, circleColor, icon, notClickable} = state;
    const hitSlopSize = Spacings.s2;

    return (
      <TouchableOpacity
        testID={`${testID}.circle`}
        style={[styles.circle, {borderColor: circleColor}]}
        onPress={notClickable ? undefined : onPress}
        hitSlop={{top: hitSlopSize, bottom: hitSlopSize, left: hitSlopSize, right: hitSlopSize}}
        disabled={notClickable}
      >
        {_.isUndefined(icon) ? (
          <Text text80 testID={`${testID}.index`} style={[{color}, indexLabelStyle]}>
            {index + 1}
          </Text>
        ) : (
          <Image testID={`${testID}.image`} source={icon} tintColor={color}/>
        )}
      </TouchableOpacity>
    );
  }

  render() {
    const {testID, label, labelStyle, index, activeIndex, maxWidth, connectorStyle} = this.getThemeProps();

    return (
      <View testID={testID} row center flex={index !== activeIndex}>
        {index > activeIndex && <View flex style={[styles.connector, connectorStyle]}/>}
        {this.renderCircle()}
        {index === activeIndex && (
          <Text text80 testID={`${testID}.label`} numberOfLines={1} style={[styles.label, {maxWidth}, labelStyle]}>
            {label}
          </Text>
        )}
        {index < activeIndex && <View flex style={[styles.connector, connectorStyle]}/>}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  connector: {
    borderWidth: 1,
    borderColor: Colors.dark60
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
    color: Colors.dark20
  }
});
