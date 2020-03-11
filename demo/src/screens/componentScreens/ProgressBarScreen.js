import React, { Component } from 'react';
import _ from 'lodash';
import {ScrollView} from 'react-native';
import {View, Text, ProgressBar, Colors} from 'react-native-ui-lib';//eslint-disable-line

export default class ProgressBarScreen extends Component {

  state = {
    progresses: [0, 0, 0, 0],
  };

  componentDidMount() {
    this.startProgress(0, 45);
    this.startProgress(1, 25);
    this.startProgress(2, 70);
    this.startProgress(3, 15);
  }

  elements = new Array(4);

  startProgress(index, stepSize) {
    const {progresses} = this.state;
    progresses[index] = Math.min(progresses[index] + stepSize, 100);
    this.setState({
      progresses,
    });

    if (progresses[index] < 100) {
      setTimeout(() => {
        this.startProgress(index, stepSize);
      }, 800);
    }
  }

  render() {
    const {progresses} = this.state;

    return (
      <ScrollView>
        <View flex bg-dark80 spread paddingV-18>
          <View paddingL-18 marginB-18>
            <Text text40 dark10>
              ProgressBar
            </Text>
          </View>
          {_.map(progresses, (value, index) => {
            return (
              <View key={index}>
                <ProgressBar
                  // style={{borderRadius: 10}}
                  ref={element => this.elements[index] = element}
                  progress={value}
                  height={[10, 15, 22, 30][index]}
                  backgroundColor={[Colors.red70, Colors.purple70, Colors.blue70, Colors.green70][index]}
                  progressBackgroundColor={[Colors.red40, Colors.purple40, Colors.blue30, Colors.green40][index]}
                />

                <View bg-dark10 padding-12>
                  <Text white>
                    {this.elements[index] && this.elements[index].getSnippet()}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </ScrollView>
    );
  }
}
