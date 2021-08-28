import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {Assets, View, Text, Colors, Image, Button, Carousel, Picker} from 'react-native-ui-lib';
import _ from 'lodash';

const colorOptions: {[key: string]: {name: string; color: string}} = {
  red: {name: 'Red', color: Colors.red30},
  green: {name: 'Green', color: Colors.green30},
  blue: {name: 'Blue', color: Colors.blue30}
};

const sizeOptions = {
  s: {name: 'Small'},
  m: {name: 'Medium'},
  l: {name: 'Large'}
};

const images = [
  'https://images.pexels.com/photos/3297502/pexels-photo-3297502.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/3496994/pexels-photo-3496994.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/3323694/pexels-photo-3323694.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260',
  'https://images.pexels.com/photos/3350141/pexels-photo-3350141.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/3127161/pexels-photo-3127161.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/2872767/pexels-photo-2872767.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/3271010/pexels-photo-3271010.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
  'https://images.pexels.com/photos/3206153/pexels-photo-3206153.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500'
];

class Product extends Component {
  state = {
    isColor: false,
    isSize: false,
    selectedColor: 'red',
    selectedSize: 's'
  };

  render() {
    const {selectedColor, selectedSize} = this.state;

    return (
      <ScrollView>
        <View>
          <Image
            style={{position: 'absolute', top: 10, right: 10, zIndex: 100, tintColor: Colors.white}}
            source={Assets.icons.demo.share}
          />
          <Carousel
            containerStyle={{height: 200}}
            pageControlProps={{size: 6, limitShownPages: true, color: Colors.white, inactiveColor: Colors.grey50}}
            pageControlPosition={Carousel.pageControlPositions.OVER}
          >
            {images.map((image, i) => {
              return (
                <View flex centerV key={i}>
                  <Image overlayType={Image.overlayTypes.BOTTOM} style={{flex: 1}} source={{uri: image}}/>
                </View>
              );
            })}
          </Carousel>
        </View>

        <View paddingH-page>
          <View row centerV>
            <Text text40M marginT-s7>
              New Product
            </Text>
          </View>
          <Text text80 dark40 marginV-s1>
            SKU: 1234567890
          </Text>
          <Text text50L marginV-s2>
            $55.00
          </Text>

          <View marginT-s2>
            <Picker
              migrate
              value={selectedColor}
              onChange={(value: string) => this.setState({selectedColor: value})}
              rightIconSource={{}}
              rightIconStyle={{
                width: 24,
                height: 24,
                backgroundColor: colorOptions[selectedColor].color,
                borderRadius: 12
              }}
            >
              {_.map(colorOptions, (colorOption, colorKey) => {
                return <Picker.Item key={colorKey} value={colorKey} label={colorOption.name}/>;
              })}
            </Picker>
            <Picker migrate value={selectedSize} onChange={(value: string) => this.setState({selectedSize: value})}>
              {_.map(sizeOptions, (sizeOption, sizeKey) => {
                return <Picker.Item key={sizeKey} value={sizeKey} label={sizeOption.name}/>;
              })}
            </Picker>
          </View>

          <Button label={'Add to Cart'}/>
        </View>
        <Text marginL-page marginT-s5 text60M>
          Recommended for You
        </Text>
        <ScrollView
          style={{height: 200, marginVertical: 20, marginLeft: 20}}
          horizontal
          showsHorizontalScrollIndicator={false}
        >
          {images.map((image, index) => (
            <Image key={index} width={160} style={{marginRight: 10}} source={{uri: image}}/>
          ))}
        </ScrollView>
      </ScrollView>
    );
  }
}

export default Product;
