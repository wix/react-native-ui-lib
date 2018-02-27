import _ from 'lodash';
import React, {Component} from 'react';
import {ScrollView, View, Text, StyleSheet, Dimensions, TouchableOpacity} from 'react-native';
import {Colors, Typography, Toast} from 'react-native-ui-lib';//eslint-disable-line

const {width} = Dimensions.get('window');
const baseColors = ['dark', 'blue', 'cyan', 'green', 'yellow', 'orange', 'red', 'purple', 'violet'];

export default class ColorsScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      key: '',
      color: Colors.white,
      background: Colors.blue40,
      showToast: false,
    };
  }

  onPress(key, value) {
    this.setState({key});
    if (_.includes(key, '60') || _.includes(key, '70') || _.includes(key, '80') || _.includes(key, 'white')) {
      this.setState({color: Colors.dark10});
    } else {
      this.setState({color: Colors.white});
    }
    this.setState({background: value});
    this.setState({showToast: true});
  }

  render() {
    return (
      <View useSafeArea>
        <Toast
          message={this.state.key}
          color={this.state.color}
          backgroundColor={this.state.background}
          allowDismiss
          onDismiss={() => this.setState({showToast: false})}
          visible={this.state.showToast}
        />
        <ScrollView style={{backgroundColor: Colors.dark80}}>
          <View style={styles.pallete}>
            {_.map(Colors, (value, key) => {
              if (!_.isFunction(value)) {
                return (
                  <TouchableOpacity key={key} onPress={() => this.onPress(key, value)}>
                    <View style={[styles.palletEeColor, {backgroundColor: value}]}/>
                  </TouchableOpacity>
                );
              }
            })}
          </View>

          {_.map(baseColors, (baseColor) => {
            const baseColorTints = _.pickBy(Colors, (color, key) => key.includes(baseColor));
            return (
              <View key={baseColor} style={{paddingLeft: 10}}>
                <Text style={[Typography.text60, {marginBottom: 2, color: Colors.dark30}]}>{baseColor}s</Text>
                <ScrollView
                  horizontal
                  contentContainerStyle={{marginBottom: 20}}
                  showsHorizontalScrollIndicator={false}
                >
                  {_.map(baseColorTints, (value, key) => {
                    return (
                      <View key={key} style={[styles.colorBlock, {backgroundColor: value}]}>
                        <Text style={styles.colorBlockLabel}>
                          {key}: {value}
                        </Text>
                      </View>
                    );
                  })}
                </ScrollView>
              </View>
            );
          })}
        </ScrollView>
      </View>
    );
  }
}

const PALLETE_COLOR_MARGIN = 5;
const PALLETE_COLOR_WIDTH = ((width - (2 * 10)) / 8) - (PALLETE_COLOR_MARGIN * 2);
const styles = StyleSheet.create({
  container: {
  },
  pallete: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
  },
  palletEeColor: {
    width: PALLETE_COLOR_WIDTH,
    height: PALLETE_COLOR_WIDTH,
    borderRadius: PALLETE_COLOR_WIDTH / 2,
    margin: PALLETE_COLOR_MARGIN,
  },
  colorBlock: {
    width: width * 0.35,
    height: width * 0.25,
    marginRight: 10,
    justifyContent: 'flex-end',
  },
  colorBlockLabel: {
    backgroundColor: Colors.white,
    opacity: 0.5,
    ...Typography.text90,
    fontWeight: '500',
  },
});
