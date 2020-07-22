import React, {Component} from 'react';
import {View, Text, Image, Colors} from 'react-native-ui-lib';
import {renderBooleanOption, renderRadioGroup, renderSliderOption} from '../ExampleScreenPresenter';

import cameraIcon from '../../assets/icons/cameraSelected.png';

const IMAGE_URL =
  'https://images.pexels.com/photos/748837/pexels-photo-748837.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260';

const DEFAULT_SIZE = 100;
class ImageScreen extends Component {
  state = {
    cover: true,
    showOverlayContent: false,
    overlayType: 'none',
    margin: 0
  };

  renderOverlayContent() {
    const {cover, overlayType, showOverlayContent} = this.state;
    if (showOverlayContent) {
      if (cover) {
        return (
          <View padding-20 flex bottom={overlayType === Image.overlayTypes.BOTTOM}>
            <View row centerV>
              <Image
                style={{margin: 5, marginRight: 10}}
                source={cameraIcon}
                tintColor={overlayType !== 'none' ? Colors.white : undefined}
              />
              <Text text30 white={overlayType !== 'none'}>
                Overlay Content
              </Text>
            </View>
          </View>
        );
      } else {
        return <Image style={{margin: 5}} source={cameraIcon}/>;
      }
    }
  }

  render() {
    const {cover, overlayType, margin} = this.state;

    return (
      <View flex>
        <View centerH height={250}>
          <Image
            source={{uri: IMAGE_URL}}
            cover={cover}
            overlayType={overlayType !== 'none' ? overlayType : undefined}
            style={!cover && {width: DEFAULT_SIZE, height: DEFAULT_SIZE}}
            customOverlayContent={this.renderOverlayContent()}
            {...{[`margin-${margin}`]: true}}
          />
        </View>
        <View height={2} bg-grey60/>
        <View useSafeArea flex>
          <View padding-20 bottom flex>
            <View flex>
              {renderBooleanOption.call(this, 'Show as Cover Image', 'cover')}
              {renderBooleanOption.call(this, 'Show Overlay Content', 'showOverlayContent')}
              {renderRadioGroup.call(this, 'Overlay Type', 'overlayType', {none: 'none', ...Image.overlayTypes})}
              {renderSliderOption.call(this, 'Margin(margin-XX)', 'margin', {step: 4, min: 0, max: 40})}
            </View>
            <Text text40>Image Screen</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default ImageScreen;
