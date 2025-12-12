import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {Assets, View, Text, Icon, Colors, Image, Button, Carousel, Picker, PickerValue} from 'react-native-ui-lib';
import _ from 'lodash';

const colorOptions = [
  {label: 'Red', value: 'red', color: Colors.red30},
  {label: 'Green', value: 'green', color: Colors.green30},
  {label: 'Blue', value: 'blue', color: Colors.blue30}
];

const sizeOptions = [
  {label: 'S', value: 's'},
  {label: 'M', value: 'm'},
  {label: 'L', value: 'l'}
];

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
          <Icon
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
          <Text text80 grey40 marginV-s1>
            SKU: 1234567890
          </Text>
          <Text text50L marginV-s2>
            $55.00
          </Text>

          <View marginT-s2>
            <Picker
              value={selectedColor}
              onChange={(value: PickerValue) => this.setState({selectedColor: value})}
              trailingAccessory={
                <Icon
                  {...{
                    width: 24,
                    height: 24,
                    backgroundColor: colorOptions[_.findIndex(colorOptions, {value: selectedColor})].color,
                    borderRadius: 12
                  }}
                />
              }
              items={colorOptions}
            />

            <Picker
              value={selectedSize}
              onChange={(value: PickerValue) => this.setState({selectedSize: value})}
              items={sizeOptions}
            />
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
