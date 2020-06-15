import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {Colors, View, Text, TextField, Slider, ColorPalette} from 'react-native-ui-lib'; //eslint-disable-line

import {
  renderBooleanOption,
  renderRadioGroup,
  renderSliderOption,
  renderColorOption
} from '../../ExampleScreenPresenter';

const ERROR_STATES = {
  noError: 'No Error',
  bottomError: 'Bottom Error',
  topError: 'Top Error'
};

const GUIDING_TEXTS = {
  none: 'None',
  useTitle: 'Title',
  floatingPlaceholder: 'Floating Placeholder'
};

export default class BasicTextFieldScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hideUnderline: false,
      withPrefix: false,
      underlineColor: undefined,
      guidingText: GUIDING_TEXTS.none,
      disabled: false,
      centered: false,
      useHelperText: false,
      titleColor: undefined,
      error: ERROR_STATES.noError,
      multiline: false,
      typography: 70,
      charCount: 0
    };
  }

  render() {
    const {
      hideUnderline,
      withPrefix,
      underlineColor,
      guidingText,
      titleColor,
      disabled,
      centered,
      useHelperText,
      multiline,
      charCount,
      typography,
      error
    } = this.state;

    return (
      <View flex>
        <View paddingH-20 paddingT-40>
          <TextField
            key={centered ? 'centered' : 'not-centered'}
            {...{[`text${typography}`]: true}}
            placeholder={disabled ? 'Disabled' : 'Placeholder'}
            hideUnderline={hideUnderline}
            underlineColor={underlineColor}
            prefix={withPrefix ? 'prefix://' : undefined}
            title={guidingText === GUIDING_TEXTS.useTitle ? 'Title' : undefined}
            titleColor={titleColor}
            floatingPlaceholder={guidingText === GUIDING_TEXTS.floatingPlaceholder}
            helperText={useHelperText ? 'Helper Text' : undefined}
            editable={!disabled}
            centered={centered}
            multiline={multiline}
            maxLength={charCount > 0 ? charCount : undefined}
            showCharacterCounter={charCount > 0}
            error={error !== ERROR_STATES.noError ? 'Custom error message' : undefined}
            useTopErrors={error === ERROR_STATES.topError}
          />
        </View>
        <View paddingT-s1 bg-grey50/>
        <ScrollView keyboardShouldPersistTaps="always">
          <View padding-20>
            <Text text50M marginB-s4>
              Options
            </Text>
            {renderSliderOption.call(this, 'Typography (modifier)', 'typography', {
              min: 30,
              max: 100,
              step: 10,
              initial: 70,
              sliderText: 'text'
            })}
            {renderBooleanOption.call(this, 'Multiline', 'multiline')}
            {renderBooleanOption.call(this, 'Disabled', 'disabled')}
            {renderBooleanOption.call(this, 'Centered', 'centered')}
            {renderBooleanOption.call(this, 'Hide Underline', 'hideUnderline')}
            {renderBooleanOption.call(this, 'With Prefix', 'withPrefix')}
            {renderColorOption.call(this, 'Underline Color', 'underlineColor')}
            {renderRadioGroup.call(this, 'Guiding Text', 'guidingText', GUIDING_TEXTS)}
            {renderColorOption.call(this, 'Title Color', 'titleColor')}
            {renderSliderOption.call(this, 'Character Counter', 'charCount', {min: 0, max: 150, step: 3})}
            {renderRadioGroup.call(this, 'Errors', 'error', ERROR_STATES)}
          </View>
        </ScrollView>
      </View>
    );
  }
}

