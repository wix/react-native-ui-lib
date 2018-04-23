// @flow
import * as React from 'react';
import {StyleSheet, View, Button} from 'react-native';
import {BaseComponent} from '../../commons';

type Props = {
  /**
  * Text to show inside the button
  */
  label: string,
  /**
  * color of the cube
  */
  color?: string,
};

type State = {
  count: number,
};

export default class FlowComponentTyped extends BaseComponent<Props, State> {
  static displayName = 'FlowComponent';
  static defaultProps = {
    label: 'Click',
    color: 'green',
  };

  // constructor(props) {
  //   super(props);
  // }

  onPress = () => {
    console.log('UILib - onPress');
  }

  render() {
    const {label, color} = this.props;

    return (
      <View style={{alignItems: 'center'}}>
        <View style={[styles.cube, {backgroundColor: color}]}>
          <Button title={label} onPress={this.onPress} color={'white'}/>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  cube: {
    height: 100,
    width: 100,
    marginTop: 200,
    borderWidth: 1,
  },
});
