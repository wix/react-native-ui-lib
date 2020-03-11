import _ from 'lodash';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {TabBar, Colors, Typography, View, Text} from 'react-native-ui-lib';

const WEIGHTS = ['Thin', 'Light', 'Default', 'Regular', 'Medium', 'Bold', 'Heavy', 'Black'];

export default class TypographyScreen extends Component {
  static propTypes = {
    color: PropTypes.string
  };

  static defaultProps = {
    color: Colors.dark10
  };

  state = {
    currentPage: 0
  };

  getWeightSuffix(weight) {
    if (weight === 'Default') {
      return '';
    }
    if (['Bold', 'Black'].includes(weight)) {
      return weight.substr(0, 2).toUpperCase();
    } else {
      return weight[0];
    }
  }

  renderPage() {
    const {color} = this.props;
    const {currentPage} = this.state;
    const weight = WEIGHTS[currentPage];
    const weightSuffix = this.getWeightSuffix(weight);
    return (
      <ScrollView>
        <View>
          {_.map([10, 20, 30, 40, 50, 60, 65, 70, 80, 90, 100], fontKey => {
            const modifiers = {};
            const fontName = `text${fontKey}${weightSuffix}`;
            const fontPreset = Typography[fontName];
            if (fontPreset) {
              modifiers[fontName] = true;
              return (
                <View key={fontKey} paddingV-20 centerH style={{borderBottomWidth: 1, borderColor: Colors.dark60}}>
                  <Text style={{color, backgroundColor: Colors.red80}} {...modifiers}>
                    text{fontKey}
                    {weightSuffix}
                  </Text>
                  <Text text80 dark40>
                    fontSize: {fontPreset.fontSize}
                  </Text>
                </View>
              );
            }
          })}
        </View>
      </ScrollView>
    );
  }

  render() {
    const {currentPage} = this.state;
    return (
      <View flex>
        <TabBar selectedIndex={currentPage} onChangeIndex={index => this.setState({currentPage: index})}>
          {_.map(WEIGHTS, weight => (
            <TabBar.Item key={weight} label={weight}/>
          ))}
        </TabBar>
        <View flex>
          {this.renderPage()}
        </View>
      </View>
    );
  }
}
