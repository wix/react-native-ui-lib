import React, {Component} from 'react';
import {View, StyleSheet, Alert, ScrollView} from 'react-native';
import {Colors, Text, FloatingButton, FloatingButtonLayouts} from 'react-native-ui-lib';
import {renderBooleanOption} from '../ExampleScreenPresenter';

interface State {
  showButton: boolean;
  showPrimary: boolean;
  showSecondary: boolean;
  showVertical: boolean;
}

export default class FloatingButtonScreen extends Component<{}, State> {
  state = {
    showButton: true,
    showPrimary: true,
    showSecondary: true,
    showVertical: true,
    fullWidth: false
  };

  notNow = () => {
    Alert.alert('Not Now!');
    this.setState({showButton: false});
  };

  close = () => {
    Alert.alert('Closed.');
    this.setState({showButton: false});
  };

  render() {
    const {showSecondary, showVertical} = this.state;
    return (
      <View style={styles.container}>
        <Text text60 center $textDefault marginB-s4>
          Trigger Floating Button
        </Text>
        {renderBooleanOption.call(this, 'Show Floating Button', 'showButton')}
        {renderBooleanOption.call(this, 'Full Width Button', 'fullWidth')}
        {renderBooleanOption.call(this, 'Show Primary Button', 'showPrimary')}
        {renderBooleanOption.call(this, 'Show Secondary Button', 'showSecondary')}
        {renderBooleanOption.call(this, 'Button Layout Vertical', 'showVertical')}

        <ScrollView showsVerticalScrollIndicator={false}>
          <View paddingT-20>
            <Text text70 $textDefault style={{fontWeight: 'bold'}}>
              Scroll behind a FloatingButton
            </Text>
            <Text text80 $textDefault marginT-10 style={{lineHeight: 24}}>
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the
              industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release
              of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum. Contrary to popular belief, Lorem Ipsum is not
              simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000
              years old. Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been
              the industry standard dummy text ever since the 1500s, when an unknown printer took a galley of type and
              scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release
              of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
              like Aldus PageMaker including versions of Lorem Ipsum. Contrary to popular belief, Lorem Ipsum is not
              simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000
              years old.
            </Text>
          </View>
        </ScrollView>

        <FloatingButton
          visible={this.state.showButton}
          fullWidth={this.state.fullWidth}
          button={
            this.state.showPrimary
              ? {
                label: 'Approve',
                onPress: this.close
              }
              : undefined
          }
          secondaryButton={
            showSecondary
              ? {
                label: 'Not now',
                onPress: this.notNow
              }
              : undefined
          }
          buttonLayout={showVertical ? FloatingButtonLayouts.VERTICAL : FloatingButtonLayouts.HORIZONTAL}
          // bottomMargin={80}
          // hideBackgroundOverlay
          // withoutAnimation
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 30,
    paddingBottom: 0,
    flex: 1,
    backgroundColor: Colors.$backgroundDefault
  }
});
