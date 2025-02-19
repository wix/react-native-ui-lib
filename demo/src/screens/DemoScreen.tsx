import React, {Component} from 'react';
import _ from 'lodash';
import {View, TextField, Text, Colors, ScrollView, Switch} from 'react-native-ui-lib';//eslint-disable-line

interface Props {
  getComponent: () => any; // TODO: Add proper type for the component
}

interface State {
  backgroundColor: string;
  label: string;
  [key: string]: any; // For dynamic props
}

type PropType = 'string' | 'number' | 'boolean';

export default class DemoScreen extends Component<Props, State> {
  private propsToRender?: string[];

  constructor(props: Props) {
    super(props);

    this.state = {
      backgroundColor: Colors.red50,
      label: '12'
    };

    this.updatePropValue = this.updatePropValue.bind(this);
  }

  componentDidMount() {
    this.getComponentProps();
  }

  getComponentProps() {
    this.props.getComponent();
    // Note: Component props should be accessed via type system instead of runtime
    return {};
  }

  shouldRenderProp(propId: string) {
    let shouldRender = true;
    shouldRender = shouldRender && propId !== 'testID';
    if (this.propsToRender) {
      shouldRender = shouldRender && _.includes(this.propsToRender, propId);
    }
    return shouldRender;
  }

  updatePropValue(value: any, propId: string, propType: PropType) {
    let validValue = value;

    if (propType === 'number') {
      validValue = isNaN(value) ? undefined : Number(value);
    }

    this.setState({
      [propId]: validValue
    });
  }

  renderProp(propType: PropType, propId: string) {
    if (!this.shouldRenderProp(propId)) return null;

    if (propType === 'boolean') {
      return (
        <View row spread key={propId} paddingV-10>
          <Text test70 grey60>
            {propId}
          </Text>
          <Switch
            value={this.state[propId]}
            onValueChange={(value: boolean) => this.updatePropValue(value, propId, propType)}
          />
        </View>
      );
    }

    return (
      <View key={propId}>
        <TextField
          placeholder={propId}
          floatingPlaceholder
          enableError={false}
          value={this.state[propId]}
          onChangeText={(text: string) => this.updatePropValue(text, propId, propType)}
          autoCapitalize='none'
        />
      </View>
    );
  }

  renderComponentSettings() {
    const props = this.getComponentProps();
    return (
      <ScrollView keyboardShouldPersistTaps>
        <View padding-15>
          {_.map(props, (propType, propId) => {
            return this.renderProp(propType as PropType, propId);
          })}
        </View>
      </ScrollView>
    );
  }
}
