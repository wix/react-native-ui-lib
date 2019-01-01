import _ from 'lodash';
import React, {Component} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Typography, View, Text, MaskedInput} from 'react-native-ui-lib'; //eslint-disable-line

export default class MaskedInputScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      error: '',
    };
  }

  componentDidMount() {
    setTimeout(() => {
      this.minput.focus();
    }, 500);
  }

  renderTimeText(value) {
    const paddedValue = _.padStart(value, 4, '0');
    const hours = paddedValue.substr(0, 2);
    const minutes = paddedValue.substr(2, 2);

    return (
      <Text text20 dark20 center>
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
        <Text text30 dark50>
          -
        </Text>
        <Text text30 dark10={hasValue} dark60={!hasValue}>
          {hasValue ? value : '00'}
        </Text>
        <Text text80 dark60>
          $
        </Text>
      </View>
    );
  }

  render() {
    return (
      <View flex>
        <ScrollView
          contentContainerStyle={styles.container}
          keyboardShouldPersistTaps='always'
        >
          <Text text40 marginB-20>
            Masked Inputs
          </Text>

          <Text text70 marginT-20>
            Time Format
          </Text>
          <MaskedInput
            ref={r => (this.minput = r)}
            renderMaskedText={this.renderTimeText}
            keyboardType={'numeric'}
            maxLength={4}
            value={'15'}
          />

          <Text text70 marginT-40>
            Price/Discount
          </Text>
          <MaskedInput
            renderMaskedText={this.renderPrice}
            keyboardType={'numeric'}
          />
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    padding: 25,
  },
  title: {
    ...Typography.text20,
  },
  header: {
    ...Typography.text60,
    marginVertical: 20,
  },
});
