import React, {Component} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {View, Text, ProgressBar, Colors, Spacings, BorderRadiuses} from 'react-native-ui-lib';//eslint-disable-line


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

  startProgress(index: number, stepSize: number) {
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
      <View style={{backgroundColor: Colors.green30, borderWidth: 0.5, borderRadius: 4}}/>
    );
  }

  render() {
    const {progresses} = this.state;

    return (
      <ScrollView>
        <View flex bg-$backgroundNeutralLight spread paddingV-18>
          <View paddingL-18 marginB-18>
            <Text $textDefault text40>
              ProgressBar
            </Text>
          </View>

          <Text $textDefault text70 style={styles.text}>
            Default
          </Text>
          <ProgressBar
            progress={progresses[0]}
            style={styles.progressBar}
          />

          <Text $textDefault text70 style={styles.text}>
            FullWidth
          </Text>
          <ProgressBar
            progress={progresses[1]}
            style={styles.fullWidthProgressBar}
            fullWidth
          />

          <Text $textDefault text70 style={styles.text}>
            Styled
          </Text>
          <ProgressBar
            progress={progresses[2]}
            style={[styles.progressBar, styles.styledProgressBar]}
            progressColor={Colors.purple70}
          />

          <Text $textDefault text70 style={styles.text}>
            Custom Element
          </Text>
          <ProgressBar
            progress={progresses[0]}
            style={styles.progressBar}
            customElement={this.customElement}
          />

          <Text $textDefault text70 style={styles.text}>
            Custom Border Radius 0
          </Text>
          <ProgressBar
            progress={progresses[3]}
            style={styles.progressBar}
            borderRadius={BorderRadiuses.br0}
            progressColor={Colors.blue50}
          />

         <Text $textDefault text70 style={styles.text}>
            Custom Border Radius 10
          </Text>
          <ProgressBar
            progress={progresses[3]}
            style={styles.progressBar}
            borderRadius={BorderRadiuses.br10}
            progressColor={Colors.red20}
          />

          <Text $textDefault text70 style={styles.text}>
            Custom Border Radius 0 for FullWidth
          </Text>
          <ProgressBar
            progress={progresses[3]}
            style={styles.fullWidthProgressBar}
            borderRadius={BorderRadiuses.br0}
            progressColor={Colors.blue50}
            fullWidth
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
