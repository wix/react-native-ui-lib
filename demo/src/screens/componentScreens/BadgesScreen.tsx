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
      <Image source={bell}/>
      <Image source={bell}/>
    </View>
  );

  customElement2 = (
    <View row>
      <Image source={bell}/>
      <Text white text90>
        37
      </Text>
      <Image source={bell}/>
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
              borderColor={Colors.white}
            />
            <Badge labelFormatterLimit={1} size={16} label={'99999999'}/>
          </View>

          <View row spread marginV-20>
            <Badge size={20} label={value.toString()} backgroundColor={Colors.red30}/>
            <Badge
              label={value.toString()}
              backgroundColor={Colors.red30}
              borderWidth={1}
              borderColor={Colors.$outlinePrimary}
            />
            <Badge
              size={16}
              label={value.toString()}
              backgroundColor={Colors.red30}
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
              <Badge containerStyle={{marginLeft: BadgesSpace}} backgroundColor={Colors.green30} size={6}/>
              <Badge containerStyle={{marginLeft: BadgesSpace}} backgroundColor={Colors.red30} size={10}/>
              <Badge containerStyle={{marginLeft: BadgesSpace}} backgroundColor={Colors.blue30} size={14}/>
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
                borderColor={Colors.red30} 
                iconStyle={{tintColor: Colors.red30}}
              />
              <Text $textDefault text80 style={{marginTop: 10}}>
                small(16)
              </Text>
            </View>

            <View center>
              <Badge icon={star} iconStyle={{tintColor: Colors.red30}}/>
              <Text $textDefault text80 style={{marginTop: 10}}>
                default(20)
              </Text>
            </View>

            <View center>
              <Badge size={24} icon={star} iconStyle={{backgroundColor: Colors.red30}}/>
              <Text $textDefault text80 style={{marginTop: 10}}>
                large(24)
              </Text>
            </View>

            <View center>
              <Badge icon={star} borderRadius={6} iconStyle={{backgroundColor: Colors.red30}}/>
              <Text $textDefault text80 style={{marginTop: 10}}>
                border radius
              </Text>
            </View>
          </View>

          <Text row center text50 $textDefault margin-25>
            Counter Icon Badges
          </Text>
          <View row spread marginH-50>
            <Badge marginR-10 label={'9999'} labelFormatterLimit={3} icon={bell} backgroundColor={Colors.red30}/>
            <Badge marginR-10 label={'4'} icon={bell} backgroundColor={Colors.red30}/>
          </View>

          <Text row center text50 $textDefault margin-25>
            Custom Element Badges
          </Text>
          <View row spread marginH-50>
            <Badge marginR-10 label={'17'} customElement={this.customElement1}/>
            <Badge marginR-10 customElement={this.customElement2} backgroundColor={Colors.grey30}/>
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
