import React, {Component, Fragment} from 'react';
import {ScrollView} from 'react-native';
import {View, Text, Button, DynamicFonts} from 'react-native-ui-lib';
import {renderMultipleSegmentOptions} from '../ExampleScreenPresenter';

enum FontLoadingEnum {
  SINGLE_FONT = 'singleFont',
  FONT_FAMILY = 'fontFamily'
}

type State = {
  fontLoadingType: FontLoadingEnum;
  loadedFonts: string[];
};

export default class DynamicFontsScreen extends Component<{}, State> {
  private fontDownloader: InstanceType<typeof DynamicFonts> = new DynamicFonts({debug: true});

  state = {
    fontLoadingType: FontLoadingEnum.SINGLE_FONT,
    loadedFonts: []
  };

  renderSingleFont = () => {
    const {loadedFonts} = this.state;
    return (
      <Fragment>
        <Text style={{fontSize: 24, lineHeight: 28, fontFamily: 'System'}}>{`
System:
ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz
        `}</Text>
        {loadedFonts.length > 0 && (
          <Text marginT-20 style={{fontSize: 24, lineHeight: 28, fontFamily: loadedFonts[0]}}>{`
${loadedFonts}:
ABCDEFGHIJKLMNOPQRSTUVWXYZ abcdefghijklmnopqrstuvwxyz
        `}</Text>
        )}
        <Button
          marginV-20
          label="Load a single font"
          onPress={async () => {
            try {
              const loadedFonts = await this.fontDownloader.getFont({
                fontUri:
                  'https://wixmp-1d257fba8470f1b562a0f5f2.wixmp.com/TypographyKits/fonts/Vollkorn/Vollkorn-Regular.ttf',
                fontName: 'Vollkorn-Regular',
                fontExtension: 'ttf'
              });
              this.setState({loadedFonts: [loadedFonts]});
            } catch (error) {
              console.log('Error!', error);
            }
          }}
        />
      </Fragment>
    );
  };

  renderFontFamily = () => {
    const {loadedFonts} = this.state;
    return (
      <Fragment>
        <Text style={{fontSize: 16, lineHeight: 18, fontFamily: 'System'}}>{`
System:
ABCDEFGH abcdefgh
        `}</Text>
        <ScrollView>
          {loadedFonts?.map(loadedFont => (
            <Text key={loadedFont} style={{fontSize: 16, lineHeight: 18, fontFamily: loadedFont}}>{`
${loadedFont}:
ABCDEFGH abcdefgh
        `}</Text>
          ))}
        </ScrollView>

        <Button
          marginV-20
          label="Load a complete font family"
          onPress={async () => {
            try {
              const loadedFonts = await this.fontDownloader.getFontFamily('https://wixmp-1d257fba8470f1b562a0f5f2.wixmp.com/TypographyKits/fonts/Vollkorn/',
                [
                  'Bold',
                  'BoldItalic',
                  'ExtraBold',
                  'ExtraBoldItalic',
                  'Italic',
                  'Medium',
                  'MediumItalic',
                  'Regular',
                  'SemiBold'
                ],
                'ttf',
                'Vollkorn-');
              this.setState({loadedFonts});
            } catch (error) {
              console.log('Error!', error);
            }
          }}
        />
      </Fragment>
    );
  };

  render() {
    const {fontLoadingType, loadedFonts} = this.state;
    return (
      <View bg-grey80 flex padding-20>
        {renderMultipleSegmentOptions.call(this, 'Font loading:', 'fontLoadingType', [
          {label: 'Single', value: FontLoadingEnum.SINGLE_FONT},
          {label: 'Family', value: FontLoadingEnum.FONT_FAMILY}
        ])}
        <View flex center key={`${loadedFonts}`}>
          {fontLoadingType === FontLoadingEnum.SINGLE_FONT ? this.renderSingleFont() : this.renderFontFamily()}
          {loadedFonts && <Text text80>Loaded fonts: {loadedFonts.map(loadedFont => `${loadedFont} `)}</Text>}
        </View>
      </View>
    );
  }
}
