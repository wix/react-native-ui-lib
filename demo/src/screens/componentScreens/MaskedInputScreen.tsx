import _ from 'lodash';
import React, {Component} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Typography, View, Text, MaskedInput, Button, Colors} from 'react-native-ui-lib'; //eslint-disable-line

export default class MaskedInputScreen extends Component {
  minInput = React.createRef<any>();
  priceInput = React.createRef<any>();
  pinCodeInput = React.createRef<any>();
  state = {
    error: '',
    timeValue: '15'
  };

  componentDidMount() {
    setTimeout(() => {
      this.minInput.current.focus();
    }, 500);
  }

  clearInputs = () => {
    this.minInput.current.clear();
    this.priceInput.current.clear();
    this.pinCodeInput.current.clear();
  };

  renderTimeText(value: string) {
    const paddedValue = _.padStart(value, 4, '0');
    const hours = paddedValue.substr(0, 2);
    const minutes = paddedValue.substr(2, 2);

    return (
      <Text text20 grey20 center>
        {hours}
        <Text red10>h</Text>
        {minutes}
        <Text red10>m</Text>
      </Text>
    );
  }

  renderPrice(value: string) {
    const hasValue = Boolean(value && value.length > 0);
    return (
      <View row center>
        <Text text30 grey50>
          -
        </Text>
        <Text text30 grey10={hasValue} grey60={!hasValue}>
          {hasValue ? value : '00'}
        </Text>
        <Text text80 grey60>
          $
        </Text>
      </View>
    );
  }

  renderPINCode = (value = '') => {
    return (
      <View row centerH>
        {_.times(4, i => {
          return (
            <View key={i} marginR-s3 center style={styles.pinCodeSquare}>
              <Text h1>{value[i]}</Text>
            </View>
          );
        })}
      </View>
    );
  };

  render() {
    const {timeValue} = this.state;

    return (
      <View flex>
        <ScrollView contentContainerStyle={styles.container} keyboardShouldPersistTaps="always">
          <Text text40 marginB-20>
            Masked Inputs
          </Text>

          <Text text70 marginT-20>
            Time Format
          </Text>
          <MaskedInput
            migrate
            ref={this.minInput}
            renderMaskedText={this.renderTimeText}
            formatter={(value: string) => value?.replace(/\D/g, '')}
            keyboardType={'numeric'}
            maxLength={4}
            initialValue={timeValue}
            // onChangeText={value => this.setState({timeValue: value})}
          />

          <Text text70 marginT-40>
            Price/Discount
          </Text>
          <MaskedInput
            migrate
            ref={this.priceInput}
            renderMaskedText={this.renderPrice}
            formatter={(value: string) => value?.replace(/\D/g, '')}
            keyboardType={'numeric'}
          />

          <Text text70 marginT-s5 marginB-s4>
            PIN Code
          </Text>
          <MaskedInput
            migrate
            maxLength={4}
            ref={this.pinCodeInput}
            renderMaskedText={this.renderPINCode}
            formatter={(value: string) => value?.replace(/\D/g, '')}
            keyboardType={'numeric'}
          />

          <View centerH marginT-100>
            <Button label="Clear All" onPress={this.clearInputs}/>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 25
  },
  title: {
    ...Typography.text20
  },
  header: {
    ...Typography.text60,
    marginVertical: 20
  },
  pinCodeSquare: {
    width: 50,
    height: 70,
    borderWidth: 2,
    borderColor: Colors.grey30,
    borderRadius: 4
  }
});
