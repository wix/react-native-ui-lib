import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {View, Text, Colors, TouchableOpacity, Image, ActionSheet, Button, Carousel} from 'react-native-ui-lib';

const colorOptions = {
  red: {name: 'Red', color: Colors.red30},
  green: {name: 'Green', color: Colors.green30},
  blue: {name: 'Blue', color: Colors.blue30},
};

const sizeOptions = {
  s: {name: 'Small'},
  m: {name: 'Medium'},
  l: {name: 'Large'},
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
    colorOption: colorOptions.red,
    sizeOption: sizeOptions.s,
  };
  
  pickOption(opt: any) {
    this.setState({
      colorOption: opt
    });
  }
  
  render() {
    const {isColor, colorOption, isSize, sizeOption} = this.state;
    
    return (
      <ScrollView>
        <View>
          <Image
            style={{position: 'absolute', top: 10, right: 10, zIndex: 100, tintColor: Colors.white}}
            source={require('../../../assets/icons/share.png')}/>
          <Carousel
            containerStyle={{height: 200}}
            pageControlProps={{size: 6}}
            pageControlPosition={Carousel.pageControlPositions.OVER}
          >
            {images.map((image, i) => {
              return (
                <View flex centerV key={i}>
                  <Image
                    overlayType={Image.overlayTypes.BOTTOM}
                    style={{flex: 1}}
                    source={{uri: image}}
                  />
                </View>
              );
            })}
          </Carousel>
        </View>
    
        <View paddingH-page>
          <View row centerV>
            <Text text40M marginT-s7>New Product</Text>
          </View>
          <Text text80 dark40 marginV-s1>SKU: 1234567890</Text>
          <Text text50L marginV-s2>$55.00</Text>
      
          <View marginV-s2 paddingV-s2 style={{borderColor: Colors.dark70, borderBottomWidth: 1}}>
            <Text dark30>Color</Text>
            <TouchableOpacity row centerV spread onPress={()=> this.setState({isColor: true})}>
              <View row centerV>
                <View style={{width: 14, height: 14, borderRadius: 12, marginRight: 6}} backgroundColor={colorOption.color}/>
                <Text dark10 text70>{colorOption.name}</Text>
              </View>
              <Image source={require('../../../assets/icons/chevronDown.png')}/>
            </TouchableOpacity>
          </View>
          <ActionSheet
            title={'Select a Color'}
            options={[
              {label: colorOptions.red.name, onPress: () => this.pickOption(colorOptions.red)},
              {label: colorOptions.green.name, onPress: () => this.pickOption(colorOptions.green)},
              {label: colorOptions.blue.name, onPress: () => this.pickOption(colorOptions.blue)},
            ]}
            visible={isColor}
            onDismiss={()=> this.setState({isColor: false})}
          />
      
          <View marginV-s2 paddingV-s2 style={{borderColor: Colors.dark70, borderBottomWidth: 1}}>
            <Text dark30>Size</Text>
            <TouchableOpacity row centerV spread onPress={()=> this.setState({isSize: true})}>
              <View row centerV>
                <Text dark10 text70>{sizeOption.name}</Text>
              </View>
              <Image source={require('../../../assets/icons/chevronDown.png')}/>
            </TouchableOpacity>
          </View>
          <ActionSheet
            title={'Select a Size'}
            options={[
              {label: sizeOptions.s.name, onPress: () => this.pickOption(sizeOptions.s)},
              {label: sizeOptions.m.name, onPress: () => this.pickOption(sizeOptions.m)},
              {label: sizeOptions.l.name, onPress: () => this.pickOption(sizeOptions.l)},
            ]}
            visible={isSize}
            onDismiss={()=> this.setState({isSize: false})}
          />
      
          <Button style={{marginVertical: 40}} label={'Add to Cart'} />
      
          <Text text60M>Recommended for You</Text>
        </View>
        <ScrollView style={{height: 200, marginVertical: 20, marginLeft: 20}} horizontal showsHorizontalScrollIndicator={false}>
          {
            images.map((image) => (
              <Image
                width={160}
                style={{marginRight: 10}}
                source={{uri: image}}
              />
            ))
          }
        </ScrollView>
      </ScrollView>
    );
  }
}

export default Product;