import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {View, Text, ProgressBar, Colors, Spacings} from 'react-native-ui-lib';//eslint-disable-line

export default class ProgressBarScreen extends Component {

  state = {
    progresses: [0, 0, 0, 0]
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
    this.setState({progresses});

    if (progresses[index] < 100) {
      setTimeout(() => {
        this.startProgress(index, stepSize);
      }, 800);
    }
  }

  get customElement() {
    return (
      <View style={{backgroundColor: Colors.green30}}/>
    );
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

          <Text bodyBold style={styles.text}>
            Default
          </Text>
          <ProgressBar
            progress={progresses[0]}
            style={styles.progressBar}
          />

          <Text bodyBold style={styles.text}>
            fullWidth
          </Text>
          <ProgressBar
            progress={progresses[1]}
            style={styles.fullWidthProgressBar}
            fullWidth
          />

          <Text bodyBold style={styles.text}>
            styled
          </Text>
          <ProgressBar
            progress={progresses[2]}
            style={[styles.progressBar, styles.styledProgressBar]}
            progressColor={Colors.purple70}
          />

          <Text bodyBold style={styles.text}>
            Custom Element
          </Text>
          <ProgressBar
            progress={progresses[0]}
            style={styles.progressBar}
            customElement={this.customElement}
          />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  text: {
    paddingTop: 20,
    paddingBottom: 15,
    paddingLeft: 20
  },
  progressBar: {
    marginBottom: 10,
    marginHorizontal: Spacings.s4
  },
  styledProgressBar: {
    backgroundColor: Colors.purple40,
    height: 30
  },
  fullWidthProgressBar: {
    marginBottom: 10
  }
});
