import React, {useState, useRef} from 'react';
import Clipboard from '@react-native-clipboard/clipboard';
import {ScrollView, StyleSheet} from 'react-native';
import {Colors, Incubator, SegmentedControl, Spacings, Text, TouchableOpacity, View} from 'react-native-ui-lib';

const {Toast} = Incubator;
const SOLID_COLORS = ['black', 'white', 'dark'];
const SYSTEM_COLORS = ['grey', 'violet', 'blue', 'green', 'red', 'yellow', 'orange'];
const TOKENS_CATEGORIES = ['All', 'Background', 'Text', 'Icon', 'Outline', 'System'];
const BASE_PALETTE = [1, 5, 10, 20, 30, 40, 50, 60, 70, 80];

const categorizeTokens = tokens => {
  const categories = {
    All: [],
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

  categories.All = [
    ...categories.Background,
    ...categories.Text,
    ...categories.Icon,
    ...categories.Outline,
    ...categories.System
  ];

  return categories;
};

const VerticalDivider = () => <View style={styles.verticalDivider} bg-$outlineDefault/>;

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

  const onTokenPress = ({token, value}) => {
    Clipboard.setString(token);
    const message = `Copied ${token} to clipboard\nHex: ${value}`;
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
    <TouchableOpacity onPress={() => onPress({token, value: Colors.getColor(token, mode)})} flex marginV-s1>
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
    <View row style={styles.colorContainerBorder}>
      <View flex centerV row marginH-s2>
        <Text $textDefault text70R>
          {token}
        </Text>
      </View>
      <VerticalDivider/>
      <TokenBox token={token} index={index} mode="light" onPress={onTokenPress}/>
      <VerticalDivider/>
      <TokenBox token={token} index={index} mode="dark" onPress={onTokenPress}/>
    </View>
  );

  const TableHeader = ({columns}) => (
    <View row>
      {columns.map(column => (
        <View center bg-grey70 flex key={column}>
          <Text text70BL marginL-10>
            {column}
          </Text>
        </View>
      ))}
    </View>
  );

  const CategoryToken = ({category, tokensArray, onTokenPress, scrollViewRef}) => (
    <View>
      <TableHeader columns={['Token', 'Light Mode', 'Dark Mode']}/>
      <ScrollView style={styles.scrollViewContainer} ref={scrollViewRef}>
        {tokensArray[category].map((token, index) => (
          <TokenRow key={token} token={token} index={index} onTokenPress={onTokenPress}/>
        ))}
      </ScrollView>
    </View>
  );

  return (
    <View flex marginV-40>
      <View>
        <SegmentedControl
          preset="form"
          containerStyle={styles.segmentedControlContainer}
          segments={CategoriesSegments}
          initialIndex={selectedSegment}
        />
      </View>
      <View>
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
      <Toast
        key={`${showToast}-${message}`}
        visible={showToast}
        message={message}
        swipeable
        onDismiss={dismissToast}
        autoDismiss={3000}
      />
    </View>
  );
}

export function ColorsPalette() {
  const ColorBox = ({color, colorKey, colorName}) => {
    const isSolidColor = SOLID_COLORS.includes(colorName);
    const colorKeyString = colorKey !== undefined ? colorKey.toString() : '';
    const colorProp = {[`bg-${color}${colorKeyString}`]: true};
    const textColor = (isSolidColor ? Colors.isDark(color) : colorKey < 40) ? Colors.white : Colors.black;

    return (
      <View>
        <View center style={[styles.colorContainer, isSolidColor && styles.colorContainerBorder]} {...colorProp}>
          <Text style={{color: textColor}}>{'AAA'}</Text>
        </View>
        <View>
          <Text $textNeutralHeavy text80R>
            {`${colorName} ${colorKeyString}`}
          </Text>
          <Text $textNeutralHeavy text80R>
            {Colors[`${color}${colorKeyString}`]}
          </Text>
        </View>
      </View>
    );
  };

  const ColorTints = ({color}) => {
    const colorName = color.charAt(0).toUpperCase() + color.slice(1);
    return (
      <View row marginB-20 padding-page>
        {BASE_PALETTE.map((colorKey, index) => (
          <ColorBox key={`${colorKey}-${index}`} color={color} colorKey={colorKey} colorName={colorName}/>
        ))}
      </View>
    );
  };

  const ColorSection = ({colors}) => (
    <View bg-$backgroundNeutralLight padding-20>
      {colors.map((color, index) => (
        <View key={`${color}-${index}`}>
          <ColorTints color={color}/>
        </View>
      ))}
      <View key={`black-white-dark`} row marginB-20>
        {SOLID_COLORS.map(color => (
          <ColorBox key={color} color={color} colorName={color}/>
        ))}
      </View>
    </View>
  );

  return (
    <View flex>
      <Text body marginB-s4>
        Base Palette
      </Text>
      <ColorSection colors={SYSTEM_COLORS}/>
    </View>
  );
}

const styles = StyleSheet.create({
  colorContainer: {
    height: 90,
    width: 90
  },
  colorContainerBorder: {
    borderWidth: 1,
    borderColor: Colors.$outlineDefault
  },
  scrollViewContainer: {
    maxHeight: 700
  },
  segmentedControlContainer: {
    marginTop: Spacings.s1,
    marginBottom: Spacings.s4
  },
  tokenContainerStyle: {
    height: 50,
    width: 100,
    borderWidth: 3,
    borderColor: Colors.grey60
  },
  verticalDivider: {
    height: 'auto',
    width: 1
  }
});
