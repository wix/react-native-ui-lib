import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {Constants, Colors, View, Avatar, Text, Hint, Button, RadioGroup, RadioButton, Switch} from 'react-native-ui-lib'; //eslint-disable-line

export default class HintsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      useShortMessage: false,
      showBottomHint: false,
      targetPosition: 'flex-start'
      // useSideTip: undefined
    };
  }

  componentDidMount() {}

  toggleHintPosition = () => {
    this.setState({
      showBottomHint: !this.state.showBottomHint
    });
  };

  renderRadioButton(value, label) {
    return (
      <View row centerV marginR-10>
        <RadioButton value={value} />
        <Text marginL-5>{label}</Text>
      </View>
    );
  }

  render() {
    const {showBottomHint, targetPosition, useShortMessage, useSideTip} = this.state;
    const message = useShortMessage
      ? 'Add other cool and useful stuff'
      : 'Add other cool and useful stuff through adding apps to your visitors to enjoy.';

    return (
      <View flex>
        <View flex centerV padding-20>
          <Hint
            message={message}
            position={showBottomHint ? Hint.positions.BOTTOM : Hint.positions.TOP}
            useSideTip={useSideTip}
            key={targetPosition}
            borderRadius={0}
          >
            <View style={{alignSelf: targetPosition}}>
              <Button label="Press Me" />
            </View>
          </Hint>
        </View>

        <View padding-20>
          <RadioGroup
            row
            centerV
            marginB-20
            value={targetPosition}
            onValueChange={value => this.setState({targetPosition: value})}
          >
            <Text marginR-10>Button Position:</Text>
            {this.renderRadioButton('flex-start', 'Left')}
            {this.renderRadioButton('center', 'Center')}
            {this.renderRadioButton('flex-end', 'Right')}
          </RadioGroup>

          <RadioGroup row centerV marginB-20 value={useSideTip} onValueChange={value => this.setState({useSideTip: value})}>
            <Text marginR-10>Tip:</Text>
            {this.renderRadioButton(null, 'Default')}
            {this.renderRadioButton(true, 'Side Tip')}
            {this.renderRadioButton(false, 'Middle Tip')}
          </RadioGroup>

          <View row centerV marginV-10>
            <Switch value={showBottomHint} onValueChange={this.toggleHintPosition} />
            <Text marginL-10>Toggle Hint Position</Text>
          </View>

          <View row centerV marginV-10>
            <Switch value={useShortMessage} onValueChange={() => this.setState({useShortMessage: !useShortMessage})} />
            <Text marginL-10>Toggle Message</Text>
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.dark80
  },
  page: {
    width: Constants.screenWidth,
    flex: 1,
    padding: 20
  }
});
