import _ from 'lodash';
import React, {useEffect} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {View, Text, Marquee, MarqueeDirections} from 'react-native-ui-lib';

function MarqueeScreen() {
  return (
    <View>
      <ScrollView>
        <View flex center padding-20>
          <Text h1 marginB-s3 $textDefault>
            Marquee
          </Text>
          <Text h3 marginV-s3 $textDefault>
            Marquee horizontal {'(default)'}: Left To Right
          </Text>
          <View marginV-s4 style={{borderWidth: 1, borderColor: 'black'}} width={200}>
            <Marquee direction={MarqueeDirections.RIGHT}>{HorizontalExample()}</Marquee>
          </View>
          <Text h3 marginV-s3 $textDefault>
            Marquee horizontal: Right To Left
          </Text>
          <View marginV-s4 style={{borderWidth: 1, borderColor: 'black'}} width={200}>
            <Marquee direction={MarqueeDirections.LEFT}>{HorizontalExample()}</Marquee>
          </View>
          <Text h3 marginV-s3 $textDefault>
            Marquee vertical: Top To Bottom
          </Text>
          <View marginV-s4 style={{borderWidth: 1, borderColor: 'black'}} width={200} height={100}>
            <Marquee direction={MarqueeDirections.UP}>{VerticalExample()}</Marquee>
          </View>
          <Text h3 marginV-s3 $textDefault>
            Marquee vertical: Bottom To Top
          </Text>
          <View marginV-s4 style={{borderWidth: 1, borderColor: 'black'}} width={200} height={100}>
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
