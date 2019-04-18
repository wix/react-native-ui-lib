import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Colors, View, Text, Avatar} from 'react-native-ui-lib'; //eslint-disable-line

export default class PlaygroundScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <View flex bg-dark80 center style={styles.container}>
        <Avatar label={'AZ'} size={20} ribbonLabel={'Label'} backgroundColor={'red'}/>
        <Avatar label={'AZ'} size={28} ribbonLabel={'Label1234567'} backgroundColor={'red'} />
        <Avatar label={'AZ'} size={40} ribbonLabel={'Label'} backgroundColor={'red'}/>
        <Avatar label={'AZ'} size={48} ribbonLabel={'Label'} backgroundColor={'red'}/>
        <Avatar
          label={'AZ'} size={60}
          backgroundColor={'red'}
          ribbonLabel={'Label'}
          ribbonLabelStyle={{color: Colors.violet30}}
          ribbonStyle={{backgroundColor: Colors.green20}}
        />
        <Avatar
          label={'AZ'} size={80}
          backgroundColor={'red'}
          ribbonLabel={'Label'}
          ribbonLabelStyle={{color: Colors.violet30}}
          ribbonStyle={{backgroundColor: Colors.violet80}}
        />
        <Avatar
          label={'AZ'} size={120}
          backgroundColor={'red'}
          ribbonLabel={'Label'}
          ribbonLabelStyle={{color: Colors.violet30}}
          ribbonStyle={{backgroundColor: Colors.violet80}}
        />
        <Avatar label={'AZ'} size={80} backgroundColor={'red'} badgeProps={{size: 'pimpleHuge'}} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {},
});


// ribbonLabel = badgeProps.badgeLabel
// ribbonStyle = badgeProps.labelContainerStyle
// ribbonLabelStyle = badgeProps.labelStyle
