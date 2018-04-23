import PropTypes from 'prop-types';
import React from 'react';
import {StyleSheet, View, Button} from 'react-native';
import {BaseComponent} from '../../commons';

export default class FlowComponent extends BaseComponent {
  static displayName = 'FlowComponent';

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

FlowComponent.propTypes = {
  /**
  * Text to show inside the button
  */
  label: PropTypes.string,
  /**
  * color of the cube
  */
  color: PropTypes.string,
};

FlowComponent.defaultProps = {
  label: 'Click',
  color: 'green',
};

const styles = StyleSheet.create({
  cube: {
    height: 100,
    width: 100,
    marginTop: 200,
    borderWidth: 1,
  },
});
