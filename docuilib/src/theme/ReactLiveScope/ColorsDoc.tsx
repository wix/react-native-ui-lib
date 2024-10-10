import _ from 'lodash';
import React, {useState, useRef} from 'react';
import {ScrollView, StyleSheet, Clipboard} from 'react-native';
import {Colors, Spacings} from 'react-native-ui-lib/style';
import {View, Text, TouchableOpacity} from 'react-native-ui-lib/core';
import SegmentedControl from 'react-native-ui-lib/segmentedControl';
import Incubator from 'react-native-ui-lib/incubator';

const {Toast} = Incubator;
const TOKENS_CATEGORIES = ['Background', 'Text', 'Icon', 'Outline', 'System'];
const TOKENS_ARRAYS = {};

export function ColorsTable() {
  const [selectedCategory, setSelectedCategory] = useState('Background');
  const [selectedSegment, setSelectedSegment] = useState(0);
  const [message, setMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const scrollViewRef = useRef();

  const scrollToTop = () => {
    if (scrollViewRef.current) {
      // @ts-ignore
      scrollViewRef.current?.scrollTo({x: 0, y: 0, animated: true});
    }
  };

  const CategoriesSegments = [];
  TOKENS_CATEGORIES.map((category, index) => {
    CategoriesSegments.push({
      label: category,
      onPress: () => {
        scrollToTop();
        setSelectedCategory(category);
        setSelectedSegment(index);
      }
    });
    return (TOKENS_ARRAYS[category] = []);
  });

  for (const key in Colors) {
    // TODO: ts-expect-error is added since the category is already defined in TOKENS_CATEGORIES, remove it once the issue is resolved
    if (key.startsWith('$background')) {
      //@ts-expect-error
      TOKENS_ARRAYS.Background.push(key);
    } else if (key.startsWith('$text')) {
      //@ts-expect-error
      TOKENS_ARRAYS.Text.push(key);
    } else if (key.startsWith('$icon')) {
      //@ts-expect-error
      TOKENS_ARRAYS.Icon.push(key);
    } else if (key.startsWith('$outline')) {
      //@ts-expect-error
      TOKENS_ARRAYS.Outline.push(key);
    } else if (key.startsWith('$black') || key.startsWith('$white')) {
      //@ts-expect-error
      TOKENS_ARRAYS.System.push(key);
    }
  }

  const onTokenPress = value => {
    Clipboard.setString(value);
    const message = `Copied ${value} to clipboard`;
    setMessage(message);
    toggleToastVisibility();
  };

  const toggleToastVisibility = () => {
    setShowToast(!showToast);
  };

  const dismissToast = () => {
    setShowToast(false);
  };

  const renderToast = () => {
    return (
      <Toast
        key={`${showToast}-${message}`}
        visible={showToast}
        position={'bottom'}
        message={message}
        swipeable
        onDismiss={dismissToast}
        autoDismiss={3000}
      />
    );
  };

  const renderDivider = (vertical?: boolean) => {
    return <View style={vertical ? styles.verticalDivider : styles.horizontalDivider} bg-$outlineDefault/>;
  };

  const renderToken = (token, index) => {
    return (
      <>
        <View key={`${token}-${index}`} marginH-s3 row>
          <View key={`${token}-${index}`} flex center row marginB-3>
            <Text flexG $textDefault text70R>
              {token}
            </Text>
          </View>
          {renderDivider(true)}
          <TouchableOpacity onPress={() => onTokenPress(Colors[token])} flex marginV-s1>
            <View key={`${token}-${index}`} center row marginB-3>
              <View
                br40
                marginR-10
                key={`${token}-${index}-light`}
                marginL-10
                backgroundColor={Colors[token]}
                style={styles.tokenContainerStyle}
              />
            </View>
          </TouchableOpacity>
          {renderDivider(true)}
          <TouchableOpacity onPress={() => onTokenPress(Colors.getColor(token, 'dark'))} flex marginV-s1>
            <View key={`${token}-${index}`} center row marginB-3>
              <View
                br40
                marginR-10
                key={`${token}-${index}-dark`}
                marginL-10
                backgroundColor={Colors.getColor(token, 'dark')}
                style={styles.tokenContainerStyle}
              />
            </View>
          </TouchableOpacity>
        </View>
        {renderDivider()}
      </>
    );
  };

  const renderTableHeader = columns => {
    return (
      <View row spread>
        {_.map(columns, column => (
          <View bg-grey70 flex center>
            <Text text70BL marginL-10>
              {column}
            </Text>
          </View>
        ))}
      </View>
    );
  };

  const renderCategoryToken = category => {
    return (
      <View key={category}>
        <Text text60 marginT-10 marginB-10 marginL-10>
          {category}
        </Text>
        {renderTableHeader(['Token', 'Light', 'Dark'])}
        <ScrollView style={{height: 700}} ref={scrollViewRef}>
          {TOKENS_ARRAYS[category].map((token, index) => {
            return renderToken(token, index);
          })}
        </ScrollView>
      </View>
    );
  };

  return (
    <View bg-grey80 flex padding-20 bg-$backgroundDefault>
      <View>
        <Text text50>DESIGN TOKENS</Text>
        <SegmentedControl
          preset="form"
          containerStyle={styles.segmentedControlContainer}
          segments={CategoriesSegments}
          initialIndex={selectedSegment}
        />
        {renderToast()}
      </View>
      <View marginL-10 marginT-10 style={{width: '80%'}}>
        {TOKENS_CATEGORIES.map(category => {
          if (category === selectedCategory) {
            return renderCategoryToken(category);
          }
          return undefined;
        })}
      </View>
    </View>
  );
}

export function ColorsPalette() {
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
  },
  segmentedControlContainer: {
    width: '50%',
    marginVertical: Spacings.s2
  },
  tokenContainerStyle: {
    height: 50,
    width: 100,
    borderWidth: 3,
    borderColor: Colors.grey70
  },
  horizontalDivider: {
    width: '100%',
    height: 2
  },
  verticalDivider: {
    height: '100%',
    width: 2
  }
});
