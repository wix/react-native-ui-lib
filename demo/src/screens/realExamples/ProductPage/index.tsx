import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {View, Text, Colors, TouchableOpacity, Image, Button, Carousel, Picker, Dialog} from 'react-native-ui-lib';

const colorOptions = [
  {name: 'Red', color: Colors.red30},
  {name: 'Green', color: Colors.green30},
  {name: 'Blue', color: Colors.blue30},
];

const sizeOptions = [
  {name: 'Small'},
  {name: 'Medium'},
  {name: 'Large'},
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
    colorOption: colorOptions[0],
    sizeOption: sizeOptions[0],
  };
  
  pickOption(opt: any) {
    this.setState({
      colorOption: opt,
      isColor: false
    });
  }
  
  renderDialog = (modalProps: any) => {
    const {visible, children, toggleModal} = modalProps;
    
    return (
      <Dialog
        migrate
        visible={visible}
        onDismiss={() => toggleModal(false)}
        width="90%"
        height="40%"
        bottom
        useSafeArea
        containerStyle={{backgroundColor: Colors.white, borderRadius: 12}}
      >
        <ScrollView>{children}</ScrollView>
      </Dialog>
    );
  };
  
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
  
          <Picker
            marginT-20
            visible={isColor}
            title="Color"
            placeholder={colorOption.name}
            onChange={()=>this.setState({isColor: true})}
            rightIconSource={require('../../../assets/icons/chevronDown.png')}
            // renderPicker={() => {
            //   return (
            //     <View flex marginV-s2 paddingV-s2 style={{borderColor: Colors.dark70, borderBottomWidth: 1}}>
            //       <Text dark30>Color</Text>
            //       <TouchableOpacity row centerV spread>
            //         <View row centerV>
            //           <View style={{width: 14, height: 14, borderRadius: 12, marginRight: 6}} backgroundColor={colorOption.color}/>
            //           <Text dark10 text70>{colorOption.name}</Text>
            //         </View>
            //         <Image source={require('../../../assets/icons/chevronDown.png')}/>
            //       </TouchableOpacity>
            //     </View>
            //   );
            // }}
            renderCustomModal={this.renderDialog}
          >
            {colorOptions.map(option => (
              <TouchableOpacity row centerV onPress={()=> this.pickOption(option)}>
                <View row centerV padding-20>
                  <View style={{width: 14, height: 14, borderRadius: 12, marginRight: 6}} backgroundColor={option.color}/>
                  <Text dark10 text70>{option.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </Picker>
  
          <Picker
            marginT-20
            visible={isSize}
            title="Size"
            placeholder={sizeOption.name}
            onChange={()=>this.setState({isSize: true})}
            rightIconSource={require('../../../assets/icons/chevronDown.png')}
            renderCustomModal={this.renderDialog}
          >
            {sizeOptions.map(option => (
              <TouchableOpacity row centerV onPress={()=> this.setState({sizeOption: option})}>
                <View row centerV padding-20>
                  <Text dark10 text70>{option.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </Picker>
      
          <Button marginV-40 label={'Add to Cart'} />
      
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
