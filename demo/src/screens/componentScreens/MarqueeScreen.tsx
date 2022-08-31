import _ from 'lodash';
import React, {useEffect} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {View, Text, Marquee, MarqueeDirections} from 'react-native-ui-lib';

function MarqueeScreen() {
  return (
    <View>
      <ScrollView>
        <View flex center padding-20>
          <Text h1 marginB-s4 $textDefault>
            Marquee
          </Text>
          <Text h3 marginV-s4 $textDefault>
            Marquee default: ltr
          </Text>
          <View marginT-10 style={{borderWidth: 1, borderColor: 'black'}} width={200}>
            <Marquee direction={MarqueeDirections.RIGHT}>{HorizontalExample()}</Marquee>
          </View>
          <Text h3 marginV-s4 $textDefault>
            Marquee default: rtl
          </Text>
          <View marginT-10 style={{borderWidth: 1, borderColor: 'black'}} width={200}>
            <Marquee direction={MarqueeDirections.LEFT}>{HorizontalExample()}</Marquee>
          </View>
          <Text h3 marginV-s4 $textDefault>
            Marquee default: ttb
          </Text>
          <View marginT-10 style={{borderWidth: 1, borderColor: 'black'}} width={200} height={100}>
            <Marquee direction={MarqueeDirections.UP}>{VerticalExample()}</Marquee>
          </View>
          <Text h3 marginV-s4 $textDefault>
            Marquee default: btt
          </Text>
          <View marginT-10 style={{borderWidth: 1, borderColor: 'black'}} width={200} height={100}>
            <Marquee direction={MarqueeDirections.DOWN}>{VerticalExample()}</Marquee>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const HorizontalExample = () => {
  return (
    <View left style={{alignSelf: 'flex-start'}}>
      <Text>Hey there</Text>
    </View>
  );
};

const VerticalExample = () => {
  return (
    <View center>
      <Text>Hey there</Text>
    </View>
  );
};

export default MarqueeScreen;
