import _ from 'lodash';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {View, Text, Card, Button, ScrollBar} from 'react-native-ui-lib'; //eslint-disable-line

export default class PlaygroundScreen extends Component {
  state = {};
  focus = ({index}) => {
    this.setState({selectedIndex: index});
  };

  render() {
    const {selectedIndex} = this.state;
    return (
      <View bg-dark80 flex>
        <ScrollBar height={40} ref={r => (this.scrollbar = r)} focusIndex={selectedIndex}>
          {[
            'januar',
            'februar',
            'march',
            'april',
            'may',
            'june',
            'july',
            'august',
            'september',
            'october',
            'november',
            'december'
          ].map((item, index) => {
            return <Button key={item} index={index} label={item} size="small" onPress={this.focus}/>;
          })}
        </ScrollBar>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {}
});
