import React, {Component} from 'react';
import {View, Button, Incubator} from 'react-native-ui-lib';
const {TransitionView} = Incubator;
// @ts-ignore
import {renderRadioGroup} from '../ExampleScreenPresenter';

interface State {
  enterDirection: Incubator.Direction;
  exitDirection: Incubator.Direction;
  key: number;
}

export default class TransitionViewScreen extends Component<{}, State> {
  private ref = React.createRef<typeof TransitionView>();
  state = {
    enterDirection: 'left' as Incubator.Direction,
    exitDirection: 'bottom' as Incubator.Direction,
    key: 1
  };

  onPress = () => {
    this.ref.current?.animateOut();
  };

  // onAnimationEnd = (type: Incubator.TransitionViewAnimationType) => {
  //   console.warn('Animation complete', type);
  // };

  render() {
    const {key, enterDirection, exitDirection} = this.state;
    return (
      <View padding-20 bg-grey80 flex>
        {renderRadioGroup.call(this,
          'Enter direction',
          'enterDirection',
          {top: 'top', bottom: 'bottom', left: 'left', right: 'right'},
          {isRow: true})}
        {renderRadioGroup.call(this,
          'Exit direction',
          'exitDirection',
          {top: 'top', bottom: 'bottom', left: 'left', right: 'right'},
          {isRow: true})}
        <Button label="Refresh" onPress={() => this.setState({key: key + 1})}/>
        <View flex center>
          <TransitionView
            key={`${key}`}
            // @ts-expect-error
            ref={this.ref}
            enterFrom={enterDirection}
            exitTo={exitDirection}
            // onAnimationEnd={this.onAnimationEnd}
          >
            <Button label="Press to remove" onPress={this.onPress}/>
          </TransitionView>
        </View>
      </View>
    );
  }
}
