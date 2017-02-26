import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import {Stepper} from 'react-native-ui-lib';//eslint-disable-line

export default class FormScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      itemsCount: 1,
    };
  }

  render() {
    return (
      <View style={styles.container}>
        <Stepper
          containerStyle={{marginLeft: 15, marginRight: 15}}
          label={this.state.itemsCount === 1 ? 'Item' : 'Items'}
          min={1}
          max={5}
          onValueChange={count => this.setState({itemsCount: count})}
          initialValue={1}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
