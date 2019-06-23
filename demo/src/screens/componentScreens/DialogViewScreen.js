import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet, Alert, FlatList} from 'react-native';
import * as Animatable from 'react-native-animatable';
import {Navigation} from 'react-native-navigation';
import {
  DialogView,
  Colors,
  View,
  Dialog,
  Button,
  Text,
  ListItem,
  AnimatableManager,
  BorderRadiuses,
  ThemeManager,
  Image,
  Spacings,
  Assets,
  ProgressBar,
} from 'react-native-ui-lib'; // eslint-disable-line

const startIcon = require('../../assets/icons/star.png');

export default class DialogViewScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      showDialogIndex: undefined,
    };

    this.useCases = [
      {text: 'Title', title: 'Title'},
      {text: 'Title and message', title: 'Title and message', message: 'Some text'},
      {text: 'Title and icon', title: 'Title and icon', renderRightOfTitle: this.renderIcon},
      {
        text: 'Long text',
        title:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        message:
          'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      },
      {
        text: 'Long text and icon',
        title:
          'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
        message:
          'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
        renderRightOfTitle: this.renderIcon,
      },
      {text: 'Custom title', title: 'Custom title', renderBelowTitle: this.renderBelowTitle},
    ];
  }

  renderIcon = () => {
    return (
      <View center style={{marginRight: Spacings.s5}}>
        <Image source={startIcon} />
      </View>
    );
  };

  renderBelowTitle = () => {
    return (
      <View bg-green80 br60 style={{marginHorizontal: Spacings.s5, marginBottom: Spacings.s2}}>
        <Text marginH-15 marginV-16 text70 green30>
          Render below title
        </Text>
        <ProgressBar
          br60
          marginH-15
          marginB-16
          progress={30}
          height={10}
          backgroundColor={Colors.green30}
          progressBackgroundColor={Colors.green70}
        />
      </View>
    );
  };

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
                  title={useCase.title}
                  message={useCase.message}
                  renderRightOfTitle={useCase.renderRightOfTitle}
                  renderBelowTitle={useCase.renderBelowTitle}
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
