import _ from 'lodash';
import {duration} from 'moment';
import React, {Component} from 'react';
import {View, Text, Marquee, MarqueeDirections} from 'react-native-ui-lib';
import {renderBooleanOption, renderMultipleSegmentOptions} from '../ExampleScreenPresenter';

interface State {
  duration: number;
  directionHorizontal: boolean;
  directionVertical: boolean;
  numOfReps: number;
}
export default class MarqueeScreen extends Component<{}, State> {
  state = {
    duration: 3000,
    directionHorizontal: true,
    directionVertical: true,
    numOfReps: -1
  };

  HorizontalSection = () => {
    const {directionHorizontal, numOfReps, duration} = this.state;
    return (
      <View marginV-s3 center>
        <Text h2 marginB-s2 $textDefault>
          Horizontal
        </Text>
        <Text h3 marginV-s2 $textDefault>
          Marquee: {directionHorizontal ? MarqueeDirections.RIGHT : MarqueeDirections.LEFT}
        </Text>
        <View marginV-s2 style={{borderWidth: 1, borderColor: 'black'}} width={200}>
          <Marquee
            key={`${directionHorizontal}-${duration}-${numOfReps}`}
            direction={directionHorizontal ? MarqueeDirections.RIGHT : MarqueeDirections.LEFT}
            duration={duration}
            numberOfReps={numOfReps}
          >
            {this.HorizontalExample()}
          </Marquee>
        </View>
      </View>
    );
  };

  VerticalSection = () => {
    const {directionVertical, numOfReps, duration} = this.state;
    return (
      <View marginV-s3 center>
        <Text h2 marginB-s2 $textDefault>
          Vertical
        </Text>
        <Text h3 marginV-s2 $textDefault>
          Marquee: {directionVertical ? MarqueeDirections.UP : MarqueeDirections.DOWN}
        </Text>
        <View marginV-s4 style={{borderWidth: 1, borderColor: 'black'}} width={200} height={70}>
          <Marquee
            key={`${directionVertical}-${duration}-${numOfReps}`}
            direction={directionVertical ? MarqueeDirections.UP : MarqueeDirections.DOWN}
            duration={duration}
            numberOfReps={numOfReps}
          >
            {this.VerticalExample()}
          </Marquee>
        </View>
      </View>
    );
  };

  HorizontalExample = () => {
    return (
      <View left style={{alignSelf: 'flex-start'}}>
        <Text>Hey there</Text>
      </View>
    );
  };

  VerticalExample = () => {
    return (
      <View center>
        <Text>Hey there</Text>
      </View>
    );
  };

  render() {
    return (
      <View flex padding-page>
        <Text h1 center margin-20 $textDefault>
          Marquee
        </Text>
        <View>
          {renderMultipleSegmentOptions.call(this, 'Duration', 'duration', [
            {label: '500', value: 500},
            {label: '1000', value: 1000},
            {label: '3000', value: 3000},
            {label: '5000', value: 5000}
          ])}
          {renderMultipleSegmentOptions.call(this, 'Number Of Reps', 'numOfReps', [
            {label: 'Infinite', value: -1},
            {label: '1', value: 1},
            {label: '3', value: 3},
            {label: '5', value: 5}
          ])}
          <View marginV-s2>
            {renderBooleanOption.call(this, 'Direction Horizontal: Right To Left/Left To Right', 'directionHorizontal')}
            {renderBooleanOption.call(this, 'Direction Vertical:  Bottom To Up/Up To Bottom', 'directionVertical')}
          </View>
        </View>
        {this.HorizontalSection()}
        {this.VerticalSection()}
      </View>
    );
  }
}
