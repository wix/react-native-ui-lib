import React, {useCallback, useState} from 'react';
import {StyleSheet} from 'react-native';
import {
  View,
  Text,
  Carousel,
  Image,
  BorderRadiuses,
  /* Stepper, */
  Button,
  Picker,
  Colors,
  Spacings
} from 'react-native-ui-lib';
import _ from 'lodash';

const IMAGES = [
  'https://images.pexels.com/photos/2529159/pexels-photo-2529159.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/2529146/pexels-photo-2529146.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/2529158/pexels-photo-2529158.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
];

const COLORS = {
  red: {colorValue: Colors.red30, label: 'Red'},
  black: {colorValue: Colors.black, label: 'Black'},
  green: {colorValue: Colors.green20, label: 'Green'}
};

const SIZES = {
  small: {label: 'Small'},
  medium: {label: 'Medium'},
  large: {label: 'Large'}
};

export default () => {
  const [color, setColor] = useState();
  const [size, setSize] = useState();

  const renderPickerItem = useCallback((item: string) => {
    return (
      <View row centerV style={styles.pickerItem}>
        <View style={{width: 15, height: 15, borderRadius: 8, backgroundColor: COLORS[item].colorValue}}/>
        <Text body marginL-s5>
          {COLORS[item].label}
        </Text>
      </View>
    );
  }, []);

  return (
    <View flex padding-page>
      <Carousel style={styles.carousel} showCounter pageControlPosition={Carousel.pageControlPositions.UNDER} loop>
        {IMAGES.map((image, index) => {
          return (
            <View key={index} style={styles.imageContainer}>
              <Image source={{uri: image}} style={styles.image}/>
            </View>
          );
        })}
      </Carousel>
      <Text h3 marginT-s4>
        Pretty Pretty Shoes
      </Text>
      <Text grey30 text90R marginT-s1>
        SKU: 32551125874
      </Text>

      <View flex>
        {/* <Stepper initialValue={0}/> */}

        <Picker migrate title="Color" placeholder="Pick a color" value={color} onChange={setColor} marginT-s5>
          {_.map(COLORS, (item, value) => (
            <Picker.Item value={value} label={item.label} renderItem={renderPickerItem}/>
          ))}
        </Picker>

        <Picker migrate title="Size" placeholder="Pick a size" value={size} onChange={setSize}>
          {_.map(SIZES, (item, value) => (
            <Picker.Item value={value} label={item.label}/>
          ))}
        </Picker>
      </View>

      <View useSafeArea>
        <Button label="Add to Cart"/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  carousel: {
    borderRadius: BorderRadiuses.br60,
    overflow: 'hidden'
  },
  imageContainer: {
    height: 250
  },
  image: {
    flex: 1
  },
  pickerItem: {
    paddingHorizontal: Spacings.s5,
    paddingVertical: Spacings.s4,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: Colors.grey50
  }
});
