import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {View, Button, Incubator} from 'react-native-ui-lib'; //eslint-disable-line
const {TransitionAnimator} = Incubator;
// @ts-ignore
import {renderRadioGroup} from '../ExampleScreenPresenter';

interface State {
  enterLocation: Incubator.TransitionLocation;
  exitLocation: Incubator.TransitionLocation;
  key: number;
}

export default class TransitionAnimatorScreen extends Component<{}, State> {
  private ref = React.createRef<typeof TransitionAnimator>();
  state = {
    enterLocation: 'left' as Incubator.TransitionLocation,
    exitLocation: 'bottom' as Incubator.TransitionLocation,
    key: 1
  };

  onPress = () => {
    this.ref.current?.animateOut();
  };

  //   onAnimationEnd = (type: Incubator.TransitionAnimationEndType) => {
  //     console.warn('Animation complete', type);
  //   };

  render() {
    const {key, enterLocation, exitLocation} = this.state;
    return (
      <View padding-20 bg-grey80 flex>
        {renderRadioGroup.call(this,
          'Enter location',
          'enterLocation',
          {top: 'top', bottom: 'bottom', left: 'left', right: 'right'},
          {isRow: true})}
        {renderRadioGroup.call(this,
          'Exit location',
          'exitLocation',
          {top: 'top', bottom: 'bottom', left: 'left', right: 'right'},
          {isRow: true})}
        <Button label="Refresh" onPress={() => this.setState({key: key + 1})}/>
        <View flex center>
          <TransitionAnimator
            key={`${key}`}
            ref={this.ref}
            enterFrom={enterLocation}
            exitTo={exitLocation}
            // onAnimationEnd={this.onAnimationEnd}
          >
            <Button label="Press to remove" onPress={this.onPress}/>
          </TransitionAnimator>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {}
});
