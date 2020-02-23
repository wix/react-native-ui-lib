import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {View, Text} from 'react-native-ui-lib';
import _ from 'lodash';
import {renderBooleanOption, renderRadioGroup, renderSliderOption, renderColorOption} from '../ExampleScreenPresenter';

const ALIGNMENTS = {
  top: 'top',
  bottom: 'bottom',
  left: 'left',
  right: 'right',
  center: 'center',
  centerv: 'centerV',
  centerh: 'centerH',
  spread: 'spread',
  none: null
};

const POSITIONS = {
  absolute: 'abs',
  'absolute Fill': 'absF',
  'absolute Left': 'absL',
  'absolute Right': 'absR',
  'absolute Vertical': 'absV',
  'absolute Horizontal': 'absH',
  none: null
};

class ViewScreen extends Component {
  state = {
    useRow: false,
    shouldFlex: false,
    borderRadius: 20,
    padding: 0,
    margin: 0,
    alignment: null,
    position: null
  };

  render() {
    const {useRow, shouldFlex, borderRadius, padding, margin, alignment, position} = this.state;
    const childOptions = {
      flex: shouldFlex,
      width: shouldFlex || _.includes(['absF', 'absH'], position) ? undefined : 50,
      height: shouldFlex || _.includes(['absF', 'absV'], position) ? undefined : 50,
      [position]: true
    };
    const parentOptions = {
      row: useRow,
      [`br${borderRadius}`]: true,
      [`padding-${padding}`]: true,
      [`margin-${margin}`]: true,
      [alignment]: true
    };

    return (
      <View flex>
        <View padding-s5>
          <Text text40>View</Text>

          <View key={JSON.stringify(parentOptions)} bg-purple40 height={200} {...parentOptions}>
            <View bg-blue40 {...childOptions}/>
            <View width={40} height={40} bg-yellow20/>
          </View>
        </View>
        <ScrollView>
          <View padding-s5>
            <View height={2} bg-grey60 marginB-20/>
            {renderBooleanOption.call(this, 'Row (parent)', 'useRow')}
            {renderBooleanOption.call(this, 'Flex (child)', 'shouldFlex')}
            {renderSliderOption.call(this, 'BorderRadius(brXX)', 'borderRadius', {step: 10, min: 0, max: 60})}
            {renderSliderOption.call(this, 'Padding(padding-XX)', 'padding', {step: 4, min: 0, max: 40})}
            {renderSliderOption.call(this, 'Margin(margin-XX)', 'margin', {step: 4, min: 0, max: 40})}
            {renderRadioGroup.call(this, 'Alignment (parent)', 'alignment', ALIGNMENTS)}
            {renderRadioGroup.call(this, 'Position (child)', 'position', POSITIONS)}
          </View>
        </ScrollView>
      </View>
    );
  }
}

export default ViewScreen;
