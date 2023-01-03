import React, {Component} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Colors, View, Badge, Text, Image, Stepper} from 'react-native-ui-lib'; //eslint-disable-line

const BadgesSpace = 30;
const star = require('../../assets/icons/star.png');
const bell = require('../../assets/icons/bell.png');

export default class BadgesScreen extends Component {
  state = {
    value: 42
  };

  changeLabelValue(value: number) {
    const currValue = this.state.value;
    const newValue = currValue + value;
    if (newValue >= 1) {
      this.setState({value: newValue});
    }
  }

  customElement1 = (
    <View row>
      <Image tintColor={Colors.$iconDefaultLight} source={bell}/>
      <Image tintColor={Colors.$iconDefaultLight} source={bell}/>
    </View>
  );

  customElement2 = (
    <View row>
      <Image tintColor={Colors.$iconSuccessLight} source={bell}/>
      <Text $textSuccessLight text90>
        37
      </Text>
      <Image tintColor={Colors.$iconSuccessLight} source={bell}/>
    </View>
  );

  onValueChange = (value: number, _?: string) => {
    this.setState({value});
  };

  render() {
    const {value} = this.state;

    return (
      <View flex>
        <Text h1 $textDefault margin-20>
          Badges
        </Text>

        <ScrollView contentContainerStyle={styles.container} showsVerticalScrollIndicator={false}>
          <View row spread>
            <Badge label={'9999'} labelFormatterLimit={3}/>
            <Badge
              label={'999'}
              labelFormatterLimit={2}
              borderWidth={2}
              borderColor={Colors.$outlineInverted}
            />
            <Badge labelFormatterLimit={1} size={16} label={'99999999'}/>
          </View>

          <View row spread marginV-20>
            <Badge size={20} label={value.toString()} backgroundColor={Colors.$backgroundDangerHeavy}/>
            <Badge
              label={value.toString()}
              backgroundColor={Colors.$backgroundDangerHeavy}
              borderWidth={1}
              borderColor={Colors.$outlinePrimary}
            />
            <Badge
              size={16}
              label={value.toString()}
              backgroundColor={Colors.$backgroundDangerHeavy}
            />
          </View>
          <View center>
            <Stepper onValueChange={this.onValueChange} value={value} maxValue={100} minValue={1}/>
          </View>
          <Text center $textDefault marginT-10>Press buttons to change red badge value by 1.{'\n'}Long press to change it by 10.</Text>

          <Text row center text50 $textDefault marginT-40 >
            Pimple Badges
          </Text>
          <View row>
            <View center style={{justifyContent: 'space-around', alignItems: 'flex-start', width: 140, height: 140}}>
              <Text row text80 $textDefault>
                size={'{6}'}
              </Text>
              <Text text80 $textDefault>size={'{10}'}</Text>
              <Text row text80 $textDefault>
                size={'{14}'}
              </Text>
            </View>
            <View center style={{justifyContent: 'space-around', width: 40, height: 140}}>
              <Badge containerStyle={{marginLeft: BadgesSpace}} backgroundColor={Colors.$backgroundSuccessHeavy} size={6}/>
              <Badge containerStyle={{marginLeft: BadgesSpace}} backgroundColor={Colors.$backgroundDangerHeavy} size={10}/>
              <Badge containerStyle={{marginLeft: BadgesSpace}} backgroundColor={Colors.$backgroundGeneralHeavy} size={14}/>
            </View>
          </View>

          <Text row center text50 $textDefault margin-25>
            Icon Badges
          </Text>
          <View row spread>
            <View center>
              <Badge 
                size={16} 
                icon={star} 
                borderWidth={1} 
                borderColor={Colors.$outlineDanger} 
                iconStyle={{tintColor: Colors.$iconDangerLight}}
              />
              <Text $textDefault text80 style={{marginTop: 10}}>
                small(16)
              </Text>
            </View>

            <View center>
              <Badge icon={star} iconStyle={{tintColor: Colors.$iconDangerLight}}/>
              <Text $textDefault text80 style={{marginTop: 10}}>
                default(20)
              </Text>
            </View>

            <View center>
              <Badge size={24} icon={star} iconStyle={{backgroundColor: Colors.$iconDangerLight}}/>
              <Text $textDefault text80 style={{marginTop: 10}}>
                large(24)
              </Text>
            </View>

            <View center>
              <Badge icon={star} borderRadius={6} iconStyle={{backgroundColor: Colors.$iconDangerLight}}/>
              <Text $textDefault text80 style={{marginTop: 10}}>
                border radius
              </Text>
            </View>
          </View>

          <Text row center text50 $textDefault margin-25>
            Counter Icon Badges
          </Text>
          <View row spread marginH-50>
            <Badge marginR-10 label={'9999'} labelFormatterLimit={3} icon={bell} backgroundColor={Colors.$backgroundDangerHeavy}/>
            <Badge marginR-10 label={'4'} icon={bell} backgroundColor={Colors.$backgroundDangerHeavy}/>
          </View>

          <Text row center text50 $textDefault margin-25>
            Custom Element Badges
          </Text>
          <View row spread marginH-50>
            <Badge marginR-10 label={'17'} customElement={this.customElement1}/>
            <Badge marginR-10 customElement={this.customElement2} backgroundColor={Colors.$backgroundDisabled}/>
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  }
});
