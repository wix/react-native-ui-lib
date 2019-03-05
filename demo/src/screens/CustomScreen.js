import _ from 'lodash';
import React, {Component} from 'react';
import {ActionSheet, Assets} from 'react-native-ui-lib'; //eslint-disable-line


export default class CustomScreen extends Component {
  constructor(props) {
    super(props);
    
    this.state = {};
  }

  onDismiss = () => {
    _.invoke(this.props, 'onDismiss'); // from PassProps
  }

  render() {
    return (
      <ActionSheet
        useModal={false}
        visible
        onDismiss={this.onDismiss}
        title="Action Sheet"
        message="Message of action sheet"
        // cancelButtonIndex={3}
        destructiveButtonIndex={0}
        useNativeIOS={false}
        options={[
          {label: 'option 1', onPress: () => console.warn('option 1')},
          {label: 'option 2', onPress: () => console.warn('option 2')},
          {label: 'option 3', onPress: () => console.warn('option 3')},
          {label: 'cancel', onPress: this.onDismiss}
        ]}
      />
    );
  }
}
