import _ from 'lodash';
import React from 'react';
import {StyleSheet} from 'react-native';
import {
  Checkbox,
  Switch,
  ColorPalette,
  Colors,
  RadioButton,
  RadioGroup,
  Slider,
  SegmentedControl,
  SegmentedControlItemProps,
  Text,
  TextProps,
  View
} from 'react-native-ui-lib';

interface RadioGroupOptions {
  isRow?: boolean;
  afterValueChanged?: () => void;
  useValueAsLabel?: boolean;
}

interface BooleanGroupOptions {
  spread?: boolean;
  afterValueChanged?: () => void;
  state?: boolean;
  setState?: React.Dispatch<React.SetStateAction<boolean>>;
}

interface SegmentsExtraOptions {
  state?: string;
  setState?: React.Dispatch<React.SetStateAction<any /** no suitable solution for enum */>>;
}

export function renderHeader(title: string, others?: TextProps) {
  return (
    <Text text30 $textDefault {...others}>
      {title}
    </Text>
  );
}

export function renderBooleanOption(title: string,
  key: string,
  {spread, afterValueChanged, state, setState}: BooleanGroupOptions = {spread: true}) {
  // @ts-ignore
  const value = state ?? this.state[key];
  return (
    <View row centerV spread={spread} marginB-s4 key={key}>
      <Text $textDefault flex={spread} marginR-s4={!spread}>
        {title}
      </Text>
      <Switch
        key={key}
        testID={key}
        value={value}
        onValueChange={value => {
          if (setState) {
            setState(value);
          } else {
            // @ts-ignore
            this.setState({[key]: value}, afterValueChanged);
          }
        }}
      />
    </View>
  );
}

export function renderBooleanGroup(title: string, options: string[]) {
  return (
    <View marginB-s2>
      <Text text70M $textDefault marginB-s2>
        {title}
      </Text>
      <View row style={styles.rowWrap}>
        {_.map(options, key => {
          // @ts-ignore
          const value = this.state[key];
          return (
            <View spread centerH row key={key}>
              <Checkbox
                marginR-s2
                key={key}
                testID={key}
                value={value}
                // @ts-ignore
                onValueChange={value => this.setState({[key]: value})}
              />
              <Text text70 marginR-s3 $textDefault marginB-s2>
                {key}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

export function renderRadioGroup(title: string,
  key: string,
  options: object,
  {isRow, afterValueChanged, useValueAsLabel}: RadioGroupOptions = {}) {
  // @ts-ignore
  const value = this.state[key];
  return (
    <View marginB-s2>
      {!_.isUndefined(title) && (
        <Text text70M $textDefault marginB-s2>
          {title}
        </Text>
      )}
      <RadioGroup
        row={isRow}
        style={isRow && styles.rowWrap}
        initialValue={value}
        // @ts-ignore
        onValueChange={value => this.setState({[key]: value}, afterValueChanged)}
      >
        {_.map(options, (value, key) => {
          return (
            <RadioButton
              testID={key}
              key={key}
              marginB-s2
              marginR-s2={isRow}
              label={useValueAsLabel ? value : key}
              value={value}
            />
          );
        })}
      </RadioGroup>
    </View>
  );
}

export function renderColorOption(title: string,
  key: string,
  colors = ['transparent', Colors.blue30, Colors.grey10, Colors.yellow30, Colors.green30, Colors.purple30]) {
  // @ts-ignore
  const value = this.state[key];
  return (
    <View marginV-s2>
      <Text text70M $textDefault>
        {title}
      </Text>
      <ColorPalette
        value={value}
        colors={colors}
        // @ts-ignore
        onValueChange={value => this.setState({[key]: value === 'transparent' ? undefined : value})}
      />
    </View>
  );
}

export function renderSliderOption(title: string,
  key: string,
  {min = 0, max = 10, step = 1, initial = 0, sliderText = ''}) {
  // @ts-ignore
  const value = this.state[key] || initial;
  return (
    <View marginV-s2>
      <Text marginB-s1 text70M $textDefault>
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
          // @ts-ignore
          onValueChange={value => this.setState({[key]: value})}
        />
        <Text marginL-s4 text70 $textDefault style={styles.text}>
          {sliderText}
          {value}
        </Text>
      </View>
    </View>
  );
}

export function renderMultipleSegmentOptions(title: string,
  key: string,
  options: (SegmentedControlItemProps & {value: any})[],
  {state, setState}: SegmentsExtraOptions = {}) {
  // @ts-ignore
  const value = state ?? this.state[key];
  const index = _.findIndex(options, {value});

  return (
    <View row centerV spread marginB-s4 key={key}>
      {!!title && (
        <Text $textDefault marginR-s2>
          {title}
        </Text>
      )}
      <SegmentedControl
        initialIndex={index}
        segments={options}
        // @ts-ignore
        onChangeIndex={index => {
          const value = options[index].value;
          if (setState) {
            setState(value);
          } else {
            // @ts-ignore
            this.setState({[key]: value});
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  rowWrap: {
    flexWrap: 'wrap'
  },
  text: {
    width: 30
  }
});
