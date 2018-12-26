import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {
  Colors,
  Card,
  Constants,
  View,
  Text,
  Button,
  BorderRadiuses,
  TextField,
  RadioGroup,
  RadioButton,
  Modal,
} from 'react-native-ui-lib'; //eslint-disable-line

export default class PlaygroundScreen extends Component {
  // static options(passProps) {
  //   return {
  //     topBar: {
  //       // drawBehind: true,
  //       visible: false,
  //     },
  //   };
  // }

  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  renderRadioButton(value, label) {
    return (
      <View row centerV flex>
        <RadioButton value={value} />
        <Text marginL-5 text80>
          {label}
        </Text>
      </View>
    );
  }

  render() {
    return (
      <View flex padding-20 centerV bg-screen>
        <Text title marginB-20 center>EDIT DETAILS</Text>
        <Card padding-20>
          <View>
            <TextField title="FIRST NAME" />
            <TextField title="LAST NAME" />
            <TextField title="EMAIL ADDRESS" />

            <RadioGroup row marginT-10>
              {this.renderRadioButton('girl', 'Girl')}
              {this.renderRadioButton('boy', 'Boy')}
              {this.renderRadioButton('undefined', 'Undefined')}
            </RadioGroup>
          </View>
        </Card>
        <View marginT-20>
          <Button label="SAVE CHANGES" fullWidth />
        </View>
      </View>
    );

    return (
      <View flex centerV padding-20 bg-screen>
        <View>
          <Text header center marginB-20>
            WELCOME
          </Text>
          <Card padding-20>
            <TextField
              title="EMAIL"
            />
            <TextField title="PASSWORD" secureTextEntry />

            <View centerH>
              <Button label="LOGIN" marginT-20 />
              <Button text80 link label="Forgot your password?" marginT-10 />
            </View>
          </Card>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark80,
  },
});
