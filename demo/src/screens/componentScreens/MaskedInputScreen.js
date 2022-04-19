import _ from 'lodash';
import React, {Component} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Typography, View, Text, MaskedInput, Button} from 'react-native-ui-lib'; //eslint-disable-line

export default class MaskedInputScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
      timeValue: '15'
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.minput.focus();
    }, 500);
  }

  clearInputs = () => {
    this.minput.clear();
    this.priceInput.clear();
  };

  renderTimeText(value) {
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

  renderPrice(value) {
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
            ref={r => (this.minput = r)}
            renderMaskedText={this.renderTimeText}
            formatter={value => value?.replace(/\D/g, '')}
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
            ref={r => (this.priceInput = r)}
            renderMaskedText={this.renderPrice}
            formatter={value => value?.replace(/\D/g, '')}
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
  }
});
