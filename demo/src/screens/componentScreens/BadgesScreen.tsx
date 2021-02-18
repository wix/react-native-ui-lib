import React, {Component} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {Colors, View, Badge, Button, Text, Image} from 'react-native-ui-lib'; //eslint-disable-line
const BadgesSpace = 30;
const plusIcon = require('../../assets/icons/chevronUp.png');
const minusIcon = require('../../assets/icons/chevronDown.png');
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

  render() {
    const customElement1 = (
      <View row>
        <Image source={bell}/>
        <Image source={bell}/>
      </View>
    );

    const customElement2 = (
      <View row>
        <Image source={bell}/>
        <Text white text90>
          37
        </Text>
        <Image source={bell}/>
      </View>
    );

    return (
      <ScrollView style={{backgroundColor: Colors.dark70}} contentContainerStyle={styles.container}>
        <Text text50 row center marginB-15>
          Badges
        </Text>
        <View row center style={{alignItems: 'flex-start'}}>
          <View center paddingH-10>
            <Badge size={'default'} label={this.state.value.toString()} backgroundColor={Colors.red30}/>
            <Badge
              label={this.state.value.toString()}
              containerStyle={{marginTop: BadgesSpace}}
              backgroundColor={Colors.red30}
              borderWidth={1}
            />
            <Badge
              size="small"
              label={this.state.value.toString()}
              containerStyle={{marginTop: BadgesSpace}}
              backgroundColor={Colors.red30}
            />
          </View>

          <View center paddingH-10>
            <Badge label={'9999'} labelFormatterLimit={3}/>
            <Badge
              label={'999'}
              labelFormatterLimit={2}
              containerStyle={{marginTop: BadgesSpace}}
              borderWidth={2}
              borderColor={Colors.white}
            />
            <Badge labelFormatterLimit={1} size="small" label={'99999999'} containerStyle={{marginTop: BadgesSpace}}/>
          </View>
        </View>

        <View row paddingT-20 marginB-15>
          <Button
            bg-dark60
            style={{width: 30, height: 30, borderWidth: 1, marginRight: 15}}
            iconSource={minusIcon}
            avoidMinWidth
            onPress={() => this.changeLabelValue(-1)}
            onLongPress={() => this.changeLabelValue(-10)}
          />
          <Button
            bg-dark60
            style={{width: 30, height: 30, borderWidth: 1}}
            iconSource={plusIcon}
            avoidMinWidth
            onPress={() => this.changeLabelValue(1)}
            onLongPress={() => this.changeLabelValue(10)}
          />
        </View>
        <Text center>Press buttons to change red badge value by 1.{'\n'}Long press to change it by 10.</Text>

        <Text text50 row center marginT-40>
          Pimple Badges
        </Text>
        <View row>
          <View
            center
            style={{justifyContent: 'space-around', alignItems: 'flex-start', width: 140, height: 140}}
          >
            <Text text80 row>
              size={'{\'pimpleSmall\'}'}
            </Text>
            <Text text80>size={'{\'pimpleBig\'}'}</Text>
            <Text text80 row>
              size={'{\'pimpleHuge\'}'}
            </Text>
          </View>

          <View center style={{justifyContent: 'space-around', width: 40, height: 140}}>
            <Badge containerStyle={{marginLeft: BadgesSpace}} backgroundColor={Colors.green30} size={'pimpleSmall'}/>
            <Badge containerStyle={{marginLeft: BadgesSpace}} backgroundColor={Colors.red30} size={'pimpleBig'}/>
            <Badge containerStyle={{marginLeft: BadgesSpace}} backgroundColor={Colors.blue30} size={'pimpleHuge'}/>
          </View>
        </View>
        <Text text50 marginB-10 row center marginT-25>
          Icon Badges
        </Text>
        <View row paddingH-15>
          <View style={styles.iconBadgeColumnContainer}>
            <Badge size={'small'} icon={star} borderWidth={1} borderColor={Colors.red30}/>
            <Text text80 style={{marginTop: 10}}>
              small(16)
            </Text>
          </View>

          <View style={styles.iconBadgeColumnContainer}>
            <Badge icon={star} iconStyle={{tintColor: Colors.red30}}/>
            <Text text80 style={{marginTop: 10}}>
              default(20)
            </Text>
          </View>

          <View style={styles.iconBadgeColumnContainer}>
            <Badge size={'large'} icon={star} iconStyle={{backgroundColor: Colors.red30}}/>
            <Text text80 style={{marginTop: 10}}>
              large(24)
            </Text>
          </View>

          <View style={styles.iconBadgeColumnContainer}>
            <Badge icon={star} borderRadius={6} iconStyle={{backgroundColor: Colors.red30}}/>
            <Text text80 style={{marginTop: 10}}>
              border radius
            </Text>
          </View>
        </View>

        <Text text50 marginB-10 row center marginT-25>
          Counter Icon Badges
        </Text>
        <View row paddingH-15>
          <Badge marginR-10 label={'9999'} labelFormatterLimit={3} icon={bell} backgroundColor={Colors.red30}/>
          <Badge marginR-10 label={'4'} icon={bell} backgroundColor={Colors.red30}/>
        </View>

        <Text text50 marginB-10 row center marginT-25>
          Custom Element Badges
        </Text>
        <View row paddingH-15>
          <Badge marginR-10 label={'17'} customElement={customElement1}/>
          <Badge marginR-10 customElement={customElement2} backgroundColor={Colors.grey30}/>
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: Colors.dark70
  },
  iconBadgeColumnContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'column'
  }
});
