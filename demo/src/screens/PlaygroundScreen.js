import {Navigation} from 'react-native-navigation';
import React, {Component} from 'react';
import {View, TextInput, Text, Button} from 'react-native-ui-lib';//eslint-disable-line

export default class PlaygroundScreen extends Component {

  static id = 'example.Playground';

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    };

    this.updateUsername = this.updateUsername.bind(this);
  }

  updateUsername(username) {
    this.setState({
      username,
    });
  }

  render() {
    const {username} = this.state;

    return (
      <View flex paddingH-25 paddingT-120>
        <View>
          <Text left blue50 text20>Welcome</Text>
        </View>
        <TextInput text50 placeholder="username" dark10 value={username} onChangeText={this.updateUsername}/>
        <TextInput text50 placeholder="password" secureTextEntry dark10/>
        <View marginT-100 center>
          <Button text70 white background-orange30 label="Login"/>
          <Button link text70 orange30 label="Sign Up" marginT-20/>
        </View>
      </View>
    );
  }
}

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 15,
//     backgroundColor: Colors.dark80,
//   },
// });


Navigation.registerComponent('unicorn.PlaygroundScreen', () => PlaygroundScreen);
