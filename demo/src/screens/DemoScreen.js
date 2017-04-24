import React, {Component, PropTypes} from 'react';
import _ from 'lodash';
import {ScrollView, StyleSheet, Switch} from 'react-native';
import {View, TextInput, Text, Badge, Colors} from 'react-native-ui-lib';//eslint-disable-line

export default class DemoScreen extends Component {

  constructor(props) {
    super(props);

    this.state = {
      backgroundColor: Colors.red50,
      label: '12',
    };

    this.updatePropValue = this.updatePropValue.bind(this);
  }

  componentDidMount() {
    this.getComponentProps();
  }

  getComponentProps() {
    const DemoComponent = this.getComponent();
    return DemoComponent.propTypes;
  }

  shouldRenderProp(propId) {
    let shouldRender = true;
    shouldRender = shouldRender && propId !== 'testID';
    if (this.propsToRender) {
      shouldRender = shouldRender && _.includes(this.propsToRender, propId);
    }
    return shouldRender;
  }

  updatePropValue(value, propId, prop) {
    let validValue = value;

    if (prop === PropTypes.number) {
      validValue = isNaN(value) ? undefined : Number(value);
    }

    this.setState({
      [propId]: validValue,
    });
  }


  renderProp(prop, propId) {
    if (!this.shouldRenderProp(propId)) return;

    if (PropTypes.bool === prop) {
      return (
        <View row spread key={propId} paddingV-10>
          <Text test70 dark60>
            {propId}
          </Text>
          <Switch
            value={this.state[propId]}
            onValueChange={value => this.updatePropValue(value, propId, prop)}
          />
        </View>
      );
    }

    // if (_.includes([PropTypes.string, PropTypes.number], prop)) {
    return (
      <View key={propId}>
        <TextInput
          placeholder={propId}
          floatingPlaceholder
          enableError={false}
          value={this.state[propId]}
          onChangeText={text => this.updatePropValue(text, propId, prop)}
          autoCapitalize="none"
        />
      </View>
    );
    // }
  }

  renderComponentSettings() {
    const props = this.getComponentProps();
    return (
      <ScrollView keyboardShouldPersistTaps>
        <View padding-15>
          {_.map(props, (prop, propId) => {
            return this.renderProp(prop, propId);
          })}
        </View>
      </ScrollView>
    );
  }

  // static navigatorButtons = {
  //   rightButtons: [
  //     {
  //       title: 'Search',
  //       id: 'search',
  //     },
  //   ],
  // }
}
