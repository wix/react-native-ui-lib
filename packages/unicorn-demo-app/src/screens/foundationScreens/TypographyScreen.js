import _ from 'lodash';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {TabController, Colors, Typography, View, Text} from 'react-native-ui-lib';

const WEIGHTS = ['Thin', 'Light', 'Default', 'Regular', 'Medium', 'Bold', 'Heavy', 'Black'];

export default class TypographyScreen extends Component {
  static propTypes = {
    color: PropTypes.string
  };

  static defaultProps = {
    color: Colors.grey10
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

  renderPage(index = 0) {
    const {color} = this.props;
    const weight = WEIGHTS[index];
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
                <View key={fontKey} paddingV-20 centerH style={{borderBottomWidth: 1, borderColor: Colors.grey60}}>
                  <Text style={{color, backgroundColor: Colors.red80}} {...modifiers}>
                    text{fontKey}
                    {weightSuffix}
                  </Text>
                  <Text text80 grey40>
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

  renderPages() {
    return (
      <View flex>
        {_.map(WEIGHTS, (item, index) => {
          return (
            <TabController.TabPage key={`${item.title}_page`} index={index}>
              {this.renderPage(index)}
            </TabController.TabPage>
          );
        })}
      </View>
    );
  }

  render() {
    return (
      <TabController items={WEIGHTS.map(item => ({label: item, key: item}))}>
        <TabController.TabBar activeBackgroundColor={Colors.blue70}/>
        {this.renderPages()}
      </TabController>
    );
  }
}
