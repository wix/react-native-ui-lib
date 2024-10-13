import React, {useState, useRef} from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import {ScrollView, StyleSheet} from 'react-native';
import {Colors, Spacings} from 'react-native-ui-lib/style';
import {View, Text, TouchableOpacity} from 'react-native-ui-lib/core';
import SegmentedControl from 'react-native-ui-lib/segmentedControl';
import Incubator from 'react-native-ui-lib/incubator';

const {Toast} = Incubator;
const SYSTEM_COLORS = ['grey', 'violet', 'blue', 'green', 'red', 'yellow', 'orange'];
const BASE_PALETTE = [1, 5, 10, 20, 30, 40, 50, 60, 70, 80];
const TOKENS_CATEGORIES = ['Background', 'Text', 'Icon', 'Outline', 'System'];

const categorizeTokens = tokens => {
  const categories = {
    Background: [],
    Text: [],
    Icon: [],
    Outline: [],
    System: []
  };

  for (const key in tokens) {
    if (key.startsWith('$background')) {
      categories.Background.push(key);
    } else if (key.startsWith('$text')) {
      categories.Text.push(key);
    } else if (key.startsWith('$icon')) {
      categories.Icon.push(key);
    } else if (key.startsWith('$outline')) {
      categories.Outline.push(key);
    } else if (key.startsWith('$black') || key.startsWith('$white')) {
      categories.System.push(key);
    }
  }

  return categories;
};

const Divider = ({vertical = false}) => (
  <View style={vertical ? styles.verticalDivider : styles.horizontalDivider} bg-$outlineDefault/>
);

export function ColorsTable() {
  const [selectedCategory, setSelectedCategory] = useState('Background');
  const [selectedSegment, setSelectedSegment] = useState(0);
  const [message, setMessage] = useState('');
  const [showToast, setShowToast] = useState(false);

  const scrollViewRef = useRef();

  const TOKENS_ARRAYS = categorizeTokens(Colors);

  const scrollToTop = () => {
    if (scrollViewRef.current) {
      //@ts-ignore
      scrollViewRef.current.scrollTo({x: 0, y: 0, animated: true});
    }
  };

  const CategoriesSegments = TOKENS_CATEGORIES.map((category, index) => ({
    label: category,
    onPress: () => {
      scrollToTop();
      setSelectedCategory(category);
      setSelectedSegment(index);
    }
  }));

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

  const TokenBox = ({token, index, mode, onPress}) => (
    <TouchableOpacity onPress={() => onPress(Colors.getColor(token, mode))} flex marginV-s1>
      <View key={`${token}-${index}-${mode}-container`} center row marginB-3>
        <View
          key={`${token}-${index}-${mode}`}
          br40
          backgroundColor={Colors.getColor(token, mode)}
          style={styles.tokenContainerStyle}
        />
      </View>
    </TouchableOpacity>
  );

  const TokenRow = ({token, index, onTokenPress}) => (
    <>
      <View marginH-s3 row>
        <View flex center row marginB-3>
          <Text flexG $textDefault text70R>
            {token}
          </Text>
        </View>
        <Divider vertical/>
        <TokenBox token={token} index={index} mode="light" onPress={onTokenPress}/>
        <Divider vertical/>
        <TokenBox token={token} index={index} mode="dark" onPress={onTokenPress}/>
      </View>
      <Divider/>
    </>
  );

  const TableHeader = ({columns}) => (
    <View row spread>
      {columns.map(column => (
        <View bg-grey70 flex center key={column}>
          <Text text70BL marginL-10>
            {column}
          </Text>
        </View>
      ))}
    </View>
  );

  const CategoryToken = ({category, tokensArray, onTokenPress, scrollViewRef}) => (
    <View>
      <Text text60 marginT-10 marginB-10 marginL-10>
        {category}
      </Text>
      <TableHeader columns={['Token', 'Light', 'Dark']}/>
      <ScrollView style={{height: 700}} ref={scrollViewRef}>
        {tokensArray[category].map((token, index) => (
          <TokenRow key={token} token={token} index={index} onTokenPress={onTokenPress}/>
        ))}
      </ScrollView>
    </View>
  );

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
        <Toast
          key={`${showToast}-${message}`}
          visible={showToast}
          message={message}
          swipeable
          onDismiss={dismissToast}
          autoDismiss={3000}
        />
      </View>
      <View marginL-10 marginT-10 style={{width: '80%'}}>
        {TOKENS_CATEGORIES.map(category =>
          category === selectedCategory ? (
            <CategoryToken
              key={category}
              category={category}
              tokensArray={TOKENS_ARRAYS}
              onTokenPress={onTokenPress}
              scrollViewRef={scrollViewRef}
            />
          ) : null)}
      </View>
    </View>
  );
}

export function ColorsPalette() {
  const ColorBox = ({color, colorKey, colorName}) => {
    const colorProp = {[`bg-${color}${colorKey}`]: true};
    const textColor = colorKey < 40 ? Colors.white : Colors.black;

    return (
      <View>
        <View center style={styles.colorContainer} {...colorProp}>
          <Text style={{color: textColor}}>{'AAA'}</Text>
        </View>
        <View>
          <Text $textDisabled text80R>
            {`${colorName} ${colorKey}`}
          </Text>
          <Text $textDisabled text80R>
            {Colors[`${color}${colorKey}`]}
          </Text>
        </View>
      </View>
    );
  };

  const ColorTints = ({color}) => {
    const colorName = color.charAt(0).toUpperCase() + color.slice(1);

    return (
      <View row spread marginB-20>
        {BASE_PALETTE.map((colorKey, index) => (
          <ColorBox key={`${colorKey}-${index}`} color={color} colorKey={colorKey} colorName={colorName}/>
        ))}
      </View>
    );
  };

  const ColorSection = ({colors, title}) => (
    <View padding-page>
      <Text text50 marginB-20>
        {title}
      </Text>

      {colors.map((color, index) => (
        <View key={`${color}-${index}`} center>
          <ColorTints color={color}/>
        </View>
      ))}
    </View>
  );

  return (
    <View bg-grey80 flex padding-20 bg-$backgroundDefault>
      <ColorSection colors={SYSTEM_COLORS} title="SYSTEM COLORS"/>
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
    borderColor: Colors.grey60
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
