import _ from 'lodash';
import React from 'react';
import {StyleSheet} from 'react-native';
import {Colors} from 'react-native-ui-lib/style';
import {View, Text} from 'react-native-ui-lib/core';

export default function ColorsPalette() {
  const SYSTEM_COLORS = ['grey', 'violet', 'blue', 'green', 'red', 'yellow', 'orange'];
  const BASE_PALETTE = ['1', '5', '10', '20', '30', '40', '50', '60', '70', '80'];

  const renderTints = color => {
    const colorName = color.charAt(0).toUpperCase() + color.slice(1);
    return (
      <View row spread marginB-20>
        {BASE_PALETTE.map((colorKey, index) => {
          const colorProp = {[`bg-${color}${colorKey}`]: true};
          const textColor = colorKey < 40 ? Colors.white : Colors.black;
          return (
            <View key={`${colorKey}-${index}`}>
              <View key={`${colorKey}-${index}`} center style={styles.colorContainer} {...colorProp}>
                <Text style={{color: textColor}}>{'AAA'}</Text>
              </View>
              <View>
                <Text $textDisabled text80R>
                  {colorName + ' ' + colorKey}
                </Text>
                <Text $textDisabled text80R>
                  {Colors[`${color}${colorKey}`]}
                </Text>
              </View>
            </View>
          );
        })}
      </View>
    );
  };

  const renderColors = (colors, title) => {
    return (
      <View padding-page>
        <Text text50 marginB-20>
          {title}
        </Text>

        {_.map(colors, (color, index) => {
          return (
            <View key={`${color}-${index}`} center>
              {renderTints(color)}
            </View>
          );
        })}
      </View>
    );
  };

  return (
    <View bg-grey80 flex padding-20 bg-$backgroundDefault>
      {renderColors(SYSTEM_COLORS, 'SYSTEM COLORS')}
    </View>
  );
}

const styles = StyleSheet.create({
  colorContainer: {
    height: 90,
    width: 90
  }
});
