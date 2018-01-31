import React, {Component} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Colors, View, Badge, Button, Text} from 'react-native-ui-lib';//eslint-disable-line

const BadgesSpace = 30;

export default class BadgesScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: 10,
    };
  }

  changeLabelValue(value) {
    const currValue = this.state.value;
    const newValue = currValue + value;
    if (newValue >= 1) {
      this.setState({ value: newValue});
    }
  }

  render() {
    return (
      <ScrollView contentContainerStyle={styles.container}>
        <View row>
          <Badge label={'1'} containerStyle={{marginRight: BadgesSpace}} />
          <Badge
            label={this.state.value.toString()}
            containerStyle={{marginRight: BadgesSpace}}
            backgroundColor={Colors.red40}
          />
          <Badge label={'272'} containerStyle={{marginRight: BadgesSpace}} />
        </View>

        <View row marginT-20>
          <Badge size="small" label={'1'} containerStyle={{marginRight: BadgesSpace}} />
          <Badge
            size="small"
            label={this.state.value.toString()}
            containerStyle={{marginRight: BadgesSpace}}
            backgroundColor={Colors.red40}
          />
          <Badge size="small" label={'272'} containerStyle={{marginRight: BadgesSpace}} />
        </View>

        <View row marginT-50 marginB-15>
          <Button
            label={'+'} bg-dark60 text40 dark10 style={{marginRight: 15, width: 40, height: 40}}
            avoidMinWidth
            borderRadius={999}
            onPress={() => this.changeLabelValue(1)}
            onLongPress={() => this.changeLabelValue(10)}
          />
          <Button
            label={'-'} bg-dark60 text40 dark10 style={{marginRight: BadgesSpace, width: 40, height: 40}}
            avoidMinWidth
            borderRadius={999}
            onPress={() => this.changeLabelValue(-1)}
            onLongPress={() => this.changeLabelValue(-10)}
          />
        </View>
        <Text center>Press buttons to change red badge value by 1. Long press to change it by 10.</Text>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 25,
  },
});
