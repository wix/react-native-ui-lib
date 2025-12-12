import React, {Component} from 'react';
import {ScrollView} from 'react-native';
import {View, Text, Icon, Image, Colors, Assets, OverlayTypes} from 'react-native-ui-lib';
import {renderBooleanOption, renderRadioGroup, renderSliderOption} from '../ExampleScreenPresenter';

const IMAGE_URL =
  'https://images.pexels.com/photos/748837/pexels-photo-748837.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260';
const BROKEN_URL = 'file:///Desktop/website/img/cupcake.jpg';
const DEFAULT_SIZE = 100;

const file = Assets.svgs.demo.logo;
const uri = {uri: 'https://www.svgrepo.com/show/530581/cell-phone.svg'};
// const uriWithCss = {uri: ''}; // TODO: find an example
const xml = `
  <svg width="32" height="32" viewBox="0 0 32 32">
    <path
      fill-rule="evenodd"
      clip-rule="evenodd"
      fill="url(#gradient)"
      d="M4 0C1.79086 0 0 1.79086 0 4V28C0 30.2091 1.79086 32 4 32H28C30.2091 32 32 30.2091 32 28V4C32 1.79086 30.2091 0 28 0H4ZM17 6C17 5.44772 17.4477 5 18 5H20C20.5523 5 21 5.44772 21 6V25C21 25.5523 20.5523 26 20 26H18C17.4477 26 17 25.5523 17 25V6ZM12 11C11.4477 11 11 11.4477 11 12V25C11 25.5523 11.4477 26 12 26H14C14.5523 26 15 25.5523 15 25V12C15 11.4477 14.5523 11 14 11H12ZM6 18C5.44772 18 5 18.4477 5 19V25C5 25.5523 5.44772 26 6 26H8C8.55228 26 9 25.5523 9 25V19C9 18.4477 8.55228 18 8 18H6ZM24 14C23.4477 14 23 14.4477 23 15V25C23 25.5523 23.4477 26 24 26H26C26.5523 26 27 25.5523 27 25V15C27 14.4477 26.5523 14 26 14H24Z"
    />
    <defs>
      <linearGradient
        id="gradient"
        x1="0"
        y1="0"
        x2="8.46631"
        y2="37.3364"
        gradient-units="userSpaceOnUse">
        <stop offset="0" stop-color="#FEA267" />
        <stop offset="1" stop-color="#E75A4C" />
      </linearGradient>
    </defs>
  </svg>
`;

enum SizeType {
  None = '',
  Fixed = '50',
  Percentage = '50%'
}

enum SvgType {
  File = 'file',
  Uri = 'uri',
  // UriWithCss = 'use_with_css',
  Xml = 'xml'
}

interface State {
  cover: boolean;
  showOverlayContent: boolean;
  overlayType: 'none' | OverlayTypes['type'];
  overlayIntensity: OverlayTypes['intensity'];
  margin: number;
  showErrorImage: boolean;
  showSvg: boolean;
  svgType: SvgType;
  sizeType: SizeType;
}

class ImageScreen extends Component<{}, State> {
  state = {
    cover: true,
    showOverlayContent: false,
    overlayType: 'none',
    overlayIntensity: Image.overlayIntensityType.LOW,
    margin: 0,
    showErrorImage: false,
    showSvg: false,
    svgType: SvgType.File,
    sizeType: SizeType.None,
    borderRadius: 0
  };

  getSvgSource() {
    const {svgType} = this.state;
    switch (svgType) {
      case SvgType.File:
        return file;
      case SvgType.Uri:
        return uri;
      // case SvgType.UriWithCss:
      //   return uriWithCss;
      case SvgType.Xml:
      default:
        return xml;
    }
  }

  renderOverlayContent() {
    const {cover, overlayType, showOverlayContent} = this.state;
    if (showOverlayContent) {
      if (cover) {
        return (
          <View padding-20 flex bottom={overlayType === Image.overlayTypes.BOTTOM}>
            <View row centerV>
              <Icon
                style={{margin: 5, marginRight: 10}}
                source={Assets.icons.demo.camera}
                tintColor={overlayType !== 'none' ? Colors.white : undefined}
              />
              <Text text30 white={overlayType !== 'none'}>
                Overlay Content
              </Text>
            </View>
          </View>
        );
      } else {
        return <Icon style={{margin: 5}} source={Assets.icons.demo.camera}/>;
      }
    }
  }

  renderImage() {
    const {cover, overlayType, overlayIntensity, margin, showErrorImage, borderRadius} = this.state;
    return (
      <Image
        key={`${overlayType}-${overlayIntensity}`}
        source={{uri: showErrorImage ? BROKEN_URL : IMAGE_URL}}
        errorSource={Assets.images.demo.brokenImage}
        cover={cover}
        overlayType={overlayType !== 'none' ? overlayType : undefined}
        overlayIntensity={overlayIntensity}
        // style={!cover && {width: DEFAULT_SIZE, height: DEFAULT_SIZE}}
        width={!cover ? DEFAULT_SIZE : undefined}
        height={!cover ? DEFAULT_SIZE : undefined}
        customOverlayContent={this.renderOverlayContent()}
        {...{[`margin-${margin}`]: true}}
        borderRadius={borderRadius}
      />
    );
  }

  renderSvgImage() {
    const {sizeType} = this.state;
    const size: any = Number(sizeType) || sizeType;
    const source = this.getSvgSource();
    return (
      <>
        {size ? (
          <Image source={source} width={size} height={size}/>
        ) : (
          <Image source={source}/>
        )}
      </>
    );
  }

  renderOptions() {
    return (
      <>
        {renderBooleanOption.call(this, 'Show as Cover Image', 'cover')}
        {renderBooleanOption.call(this, 'Show Overlay Content', 'showOverlayContent')}
        {renderBooleanOption.call(this, 'Show Error Image', 'showErrorImage')}
        <View row spread>
          {renderRadioGroup.call(this, 'Overlay Type', 'overlayType', {none: 'none', ...Image.overlayTypes})}
          {renderRadioGroup.call(this, 'Overlay Intensity', 'overlayIntensity', Image.overlayIntensityType)}
        </View>
        {renderSliderOption.call(this, 'Margin(margin-XX)', 'margin', {step: 4, min: 0, max: 40})}
        {renderSliderOption.call(this, 'Border Radius', 'borderRadius', {step: 5, min: 0, max: 100})}
      </>
    );
  }

  renderSvgOptions() {
    return (
      <>
        {renderRadioGroup.call(this, 'SVG Type', 'svgType', SvgType, {isRow: true})}
        {renderRadioGroup.call(this, 'Size Type', 'sizeType', SizeType, {isRow: true})}
      </>
    );
  }

  render() {
    const {showSvg} = this.state;
    return (
      <View flex>
        <View centerH height={250}>
          {showSvg ? this.renderSvgImage() : this.renderImage()}
        </View>
        <Text margin-20 text40>
          Image Screen
        </Text>
        <View useSafeArea flex>
          <ScrollView>
            <View padding-20 bottom flex>
              {renderBooleanOption.call(this, 'Show SVG', 'showSvg')}
              {showSvg ? this.renderSvgOptions() : this.renderOptions()}
            </View>
          </ScrollView>
        </View>
      </View>
    );
  }
}

export default ImageScreen;
