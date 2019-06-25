import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {DialogView, View, Dialog, Button, Text, Spacings} from 'react-native-ui-lib'; // eslint-disable-line

export default class DialogViewScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDialogIndex: undefined,
    };

    this.useCases = [
      {text: 'Title', title: 'Title'},
      {text: 'Title, knob and divider', title: 'Title, knob and divider', showKnob: true, showDivider: true},
      {text: 'Title and message', title: 'Title and message', message: 'Some text'},
      {
        text: 'Title, message, knob and divider',
        title: 'Title, message, knob and divider',
        message: 'Some text',
        showKnob: true,
        showDivider: true,
      },
    ];
  }

  renderContent = () => {
    return (
      <View flex spread style={{margin: Spacings.s5}}>
        <View>
          <Text text50>Content</Text>
        </View>
        <View right>
          <Button text60 label="Done" link onPress={() => this.setState({showDialogIndex: undefined})} />
        </View>
      </View>
    );
  };

  render() {
    const {showDialogIndex} = this.state;

    return (
      <View flex bg-dark80 padding-12>
        <Text text30 dark10 marginB-20>
          DialogView
        </Text>
        {_.map(this.useCases, (useCase, index) => {
          return (
            <View key={`use_case_${index}`}>
              <Button
                size={'small'}
                label={useCase.text}
                style={styles.button}
                onPress={() => this.setState({showDialogIndex: index})}
              />
              <Dialog
                useSafeArea
                bottom
                centerH
                width="100%"
                visible={showDialogIndex === index}
                onDismiss={() => this.setState({showDialogIndex: undefined})}
              >
                <DialogView
                  showKnob={useCase.showKnob}
                  title={useCase.title}
                  message={useCase.message}
                  showDivider={useCase.showDivider}
                >
                  {this.renderContent()}
                </DialogView>
              </Dialog>
            </View>
          );
        })}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  button: {
    margin: 5,
    alignSelf: 'flex-start',
  },
});
