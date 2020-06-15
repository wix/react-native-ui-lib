import _ from 'lodash';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Checkbox, Switch, ColorPalette, Colors, RadioButton, RadioGroup, Slider, Text, View} from 'react-native-ui-lib';

export function renderHeader(title, others) {
  return (
    <Text text30 grey10 {...others}>
      {title}
    </Text>
  );
}

export function renderBooleanOption(title, key) {
  const value = this.state[key];
  return (
    <View row centerV spread marginB-s4 key={key}>
      <Text text70 style={{flex: 1}}>
        {title}
      </Text>
      <Switch
        useCustomTheme
        key={key}
        textID={key}
        value={value}
        onValueChange={value => this.setState({[key]: value})}
      />
    </View>
  );
}

export function renderBooleanGroup(title, options) {
  return (
    <View marginB-s2>
      <Text text70M marginB-s2>
        {title}
      </Text>
      <View row style={styles.rowWrap}>
        {_.map(options, key => {
          const value = this.state[key];
          return (
            <View spread centerH row key={key}>
              <Checkbox
                marginR-s2
                useCustomTheme
                key={key}
                textID={key}
                value={value}
                onValueChange={value => this.setState({[key]: value})}
              />
              <Text text70 marginR-s3 marginB-s2>
                {key}
              </Text>
            </View>
          );
        })}
      </View>
    </View>
  );
}

export function renderRadioGroup(title, key, options, {isRow, afterValueChanged, useValueAsLabel} = {}) {
  const value = this.state[key];
  return (
    <View marginB-s2>
      {!_.isUndefined(title) && <Text text70M marginB-s2>
        {title}
      </Text>}
      <RadioGroup
        row={isRow}
        style={isRow && styles.rowWrap}
        initialValue={value}
        onValueChange={value => this.setState({[key]: value}, afterValueChanged)}
      >
        {_.map(options, (value, key) => {
          return (
            <RadioButton
              useCustomTheme
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

export function renderColorOption(title,
  key,
  colors = ['transparent', Colors.blue30, Colors.grey10, Colors.yellow30, Colors.green30, Colors.purple30]) {
  const value = this.state[key];
  return (
    <View marginV-s2>
      <Text text70M>{title}</Text>
      <ColorPalette
        value={value}
        colors={colors}
        onValueChange={value => this.setState({[key]: value === 'transparent' ? undefined : value})}
      />
    </View>
  );
}

export function renderSliderOption(title, key, {min = 0, max = 10, step = 1, initial = 0, sliderText = '', afterValueChanged}) {
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
          onValueChange={value => this.setState({[key]: value}, afterValueChanged)}
        />
        <Text marginL-s4 text70>
          {sliderText}
          {value}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  rowWrap: {
    flexWrap: 'wrap'
  }
});
