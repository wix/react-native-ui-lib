import React, {Component} from 'react';
import {View, StyleSheet, Alert, ScrollView} from 'react-native';
import {Colors, Typography, TouchableOpacity, Text, FloatingButton} from 'react-native-ui-lib';


export default class FloatingButtonScreen extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      showButton: false
    };
  }

  showButton = () => {
    this.setState({
      showButton: true
    });
  }

  hideButton = () => {
    this.setState({
      showButton: false
    });
  }

  notNow = () => {
    Alert.alert('Not Now!');
    this._hideButton();
  }

  close = () => {
    Alert.alert('Closed.');
    this._hideButton();
  }

  render() {
    return (
      <View style={styles.container}>
        <Text text60 style={{textAlign: 'center'}}>Trigger Floating Button</Text>
        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            style={[styles.triggerButton, {marginRight: 10}]}
            onPress={this.showButton}
          >
            <Text style={styles.triggerButtonText}>Show</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.triggerButton}
            onPress={this.hideButton}
          >
            <Text style={styles.triggerButtonText}>Hide</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView showsVerticalScrollIndicator={false}>
          <View paddingT-20>
            <Text text70 style={{fontWeight: 'bold'}}>Scroll behind a FloatingButton</Text>
            <Text text80 marginT-10 style={{lineHeight: 24}}>
            Lorem Ipsum is simply dummy text of the printing and typesetting industry. 
            Lorem Ipsum has been the industry standard dummy text ever since the 1500s, 
            when an unknown printer took a galley of type and scrambled it to make a type specimen book. 
            It has survived not only five centuries, but also the leap into electronic typesetting, 
            remaining essentially unchanged. 
            It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, 
            and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.
            Contrary to popular belief, Lorem Ipsum is not simply random text. 
            It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.
            </Text>
          </View>
        </ScrollView>

        <FloatingButton
          visible={this.state.showButton}
          button={{label: 'Approve', onPress: this.close}}
          secondaryButton={{label: 'Not now', onPress: this.notNow}}
          // bottomMargin={80}
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
    backgroundColor: Colors.dark80
  },
  buttonsContainer: {
    flexDirection: 'row', 
    justifyContent: 'center', 
    margin: 20
  },
  triggerButton: {
    backgroundColor: Colors.dark10,
    width: 100,
    height: 30,
    borderWidth: 1,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  triggerButtonText: {
    color: Colors.white,
    ...Typography.text60
  }
});
