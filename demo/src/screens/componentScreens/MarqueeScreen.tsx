import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {Marquee, MarqueeDirections, Text, View, Spacings} from 'react-native-ui-lib';
import {renderBooleanOption, renderMultipleSegmentOptions} from '../ExampleScreenPresenter';

export default class MarqueeScreen extends Component<{}> {
  state = {
    duration: 5000,
    directionHorizontal: true,
    directionVertical: true,
    numOfReps: -1
  };

  renderHorizontalSection = () => {
    const {directionHorizontal, numOfReps, duration} = this.state;
    return (
      <View marginV-s3 center>
        <Text h2 marginB-s2 $textDefault>
          Horizontal
        </Text>
        <Text h3 marginV-s2 $textDefault>
          Marquee: {directionHorizontal ? MarqueeDirections.LEFT : MarqueeDirections.RIGHT}
        </Text>
        <Marquee
          key={`${directionHorizontal}-${duration}-${numOfReps}`}
          label={'Hey there, this is the new Marquee component from UILIB!'}
          direction={directionHorizontal ? MarqueeDirections.LEFT : MarqueeDirections.RIGHT}
          duration={duration}
          numberOfReps={numOfReps}
          containerStyle={[styles.containerHorizontal, styles.horizontal]}
        />
      </View>
    );
  };

  renderVerticalSection = () => {
    const {directionVertical, numOfReps, duration} = this.state;
    return (
      <View marginV-s3 center>
        <Text h2 marginB-s2 $textDefault>
          Vertical
        </Text>
        <Text h3 marginV-s2 $textDefault>
          Marquee: {directionVertical ? MarqueeDirections.UP : MarqueeDirections.DOWN}
        </Text>
        <Marquee
          label={
            'Hey there, this is the new Marquee! Hey there, this is the new Marquee! Hey there, this is the new Marquee! Hey there, this is the new Marquee!'
          }
          labelStyle={styles.label}
          key={`${directionVertical}-${duration}-${numOfReps}`}
          direction={directionVertical ? MarqueeDirections.UP : MarqueeDirections.DOWN}
          duration={duration}
          numberOfReps={numOfReps}
          containerStyle={[styles.containerHorizontal, styles.vertical]}
        />
      </View>
    );
  };

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text h1 center margin-20 $textDefault>
          Marquee
        </Text>
        <View>
          {renderMultipleSegmentOptions.call(this, 'Duration (optional)', 'duration', [
            {label: '3000', value: 3000},
            {label: '5000', value: 5000},
            {label: '10000', value: 10000}
          ])}
          {renderMultipleSegmentOptions.call(this, 'Number Of Reps', 'numOfReps', [
            {label: 'Infinite', value: -1},
            {label: '1', value: 1},
            {label: '3', value: 3},
            {label: '5', value: 5}
          ])}
          <View marginV-s2>
            {renderBooleanOption.call(this, 'Direction Horizontal: Left To Right/Right To Left', 'directionHorizontal')}
            {renderBooleanOption.call(this, 'Direction Vertical:  Bottom To Up/Up To Bottom', 'directionVertical')}
          </View>
        </View>
        {this.renderHorizontalSection()}
        {this.renderVerticalSection()}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
  },
  containerHorizontal: {
    borderWidth: 1,
    borderColor: 'black',
    marginVertical: Spacings.s2
  },
  horizontal: {width: 200},
  vertical: {width: 250, height: 100, alignItems: 'center'},
  containerVertical: {borderWidth: 1, borderColor: 'black', marginVertical: Spacings.s2},
  label: {alignSelf: 'center'}
});
