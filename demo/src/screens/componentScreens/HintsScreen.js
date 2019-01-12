import React, {Component} from 'react';
import {BorderRadiuses, View, Text, Hint, Button, RadioGroup, RadioButton, Switch, Assets} from 'react-native-ui-lib'; //eslint-disable-line

export default class HintsScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showHint: true,
      useShortMessage: false,
      showBottomHint: false,
      showIcon: false,
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
    const {showHint, showBottomHint, showIcon, targetPosition, useShortMessage, useSideTip} = this.state;
    const message = useShortMessage
      ? 'Add other cool and useful stuff'
      : 'Add other cool and useful stuff through adding apps to your visitors to enjoy.';

    return (
      <View flex>
        <View flex padding-20 paddingT-110 bg-dark80>
          <Hint
            visible={showHint}
            // color={Colors.orange30}
            message={message}
            // messageStyle={{color: 'red'}}
            icon={showIcon ? Assets.icons.settings : undefined}
            // iconStyle={{tintColor: 'red'}}
            // distance={15}
            position={showBottomHint ? Hint.positions.BOTTOM : Hint.positions.TOP}
            useSideTip={useSideTip}
            key={targetPosition}
            borderRadius={BorderRadiuses.br40}
          >
            <Button
              label={showHint ? 'Hide' : 'Show'}
              onPress={() => this.setState({showHint: !showHint})}
              style={{alignSelf: targetPosition}}
              // style={{alignSelf: targetPosition, marginLeft: 30}}
              // style={{alignSelf: targetPosition, position: 'absolute', top: 160, left: 100}}
            />
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
            {this.renderRadioButton(undefined, 'Default')}
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

          <View row centerV marginV-10>
            <Switch value={showIcon} onValueChange={showIcon => this.setState({showIcon})} />
            <Text marginL-10>Toggle Icon</Text>
          </View>
        </View>
      </View>
    );
  }
}
