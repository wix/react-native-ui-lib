import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {
  Colors,
  View,
  Text,
  TextField,
  RadioGroup,
  RadioButton,
  Checkbox,
  Slider,
  ColorPalette
} from 'react-native-ui-lib'; //eslint-disable-line
import {Navigation} from 'react-native-navigation';
import _ from 'lodash';

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
      underlineColor: undefined,
      guidingText: GUIDING_TEXTS.none,
      disabled: false,
      centered: false,
      useHelperText: false,
      titleColor: Colors.blue30,
      error: ERROR_STATES.noError,
      multiline: false,
      typography: 70,
      charCount: 0
    };
  }

  renderColorOption(title, key) {
    const value = this.state[key];
    return (
      <View marginV-s2>
        <Text text70M>{title}</Text>
        <ColorPalette
          value={value}
          colors={['transparent', Colors.blue30, Colors.grey10, Colors.yellow30, Colors.green30, Colors.purple30]}
          onValueChange={value => this.setState({[key]: value === 'transparent' ? undefined : value})}
        />
      </View>
    );
  }

  renderSliderOption(title, key, {min = 0, max = 10, step = 1, initial = 0}) {
    const value = this.state[key];
    return (
      <View marginV-s2>
        <Text marginB-s1 text70M>
          {title}
        </Text>
        <View row centerV>
          <Slider
            testID={key}
            value={initial}
            containerStyle={{flex: 1}}
            minimumValue={min}
            maximumValue={max}
            step={step}
            onValueChange={value => this.setState({[key]: value})}
          />
          <Text marginL-s4 text70>
            text{value}
          </Text>
        </View>
      </View>
    );
  }

  renderRadioGroup(title, key, options) {
    const value = this.state[key];
    return (
      <View marginB-s2>
        <Text text70M marginB-s2>
          {title}
        </Text>
        <RadioGroup initialValue={value} onValueChange={value => this.setState({[key]: value})}>
          {_.map(options, (value, key) => {
            return <RadioButton testID={key} key={key} marginB-s2 label={value} value={options[key]}/>;
          })}
        </RadioGroup>
      </View>
    );
  }

  renderBooleanOption(title, key) {
    const value = this.state[key];
    return (
      <View row centerV spread marginB-s4>
        <Text text70M style={{flex: 1}}>
          {title}
        </Text>
        <Checkbox textID={key} value={value} onValueChange={value => this.setState({[key]: value})}/>
      </View>
    );
  }

  render() {
    const {
      hideUnderline,
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
        <View padding-20>
          <Text marginB-20 text40>
            TextField
          </Text>
          <TextField
            key={centered ? 'centered' : 'not-centered'}
            {...{[`text${typography}`]: true}}
            placeholder={disabled ? 'Disabled' : 'Placeholder'}
            hideUnderline={hideUnderline}
            underlineColor={underlineColor}
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
            {this.renderSliderOption('Typography (modifier)', 'typography', {min: 30, max: 100, step: 10, initial: 70})}
            {this.renderBooleanOption('Multiline', 'multiline')}
            {this.renderBooleanOption('Disabled', 'disabled')}
            {this.renderBooleanOption('Centered', 'centered')}
            {this.renderBooleanOption('Hide Underline', 'hideUnderline')}
            {this.renderColorOption('Underline Color', 'underlineColor')}
            {this.renderRadioGroup('Guiding Text', 'guidingText', GUIDING_TEXTS)}
            {this.renderColorOption('Title Color', 'titleColor')}
            {this.renderSliderOption('Character Counter', 'charCount', {min: 0, max: 150, step: 3})}
            {this.renderRadioGroup('Errors', 'error', ERROR_STATES)}
          </View>
        </ScrollView>
      </View>
    );
  }
}

Navigation.registerComponent('unicorn.components.BasicTextFieldScreen', () => BasicTextFieldScreen);
