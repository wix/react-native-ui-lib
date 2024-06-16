import _ from 'lodash';
import React, {Component} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {
  Colors,
  Spacings,
  Assets,
  View,
  Text,
  TouchableOpacity,
  Icon,
  Button,
  TextField,
  Incubator,
  ColorPalette,
  ColorPickerDialog
} from 'react-native-ui-lib';
import {renderBooleanOption} from '../ExampleScreenPresenter';

const {Toast} = Incubator;

const SYSTEM_COLORS = ['grey', 'violet', 'blue', 'green', 'red', 'yellow', 'orange'];
const INITIAL_COLOR = Colors.white;
const BASE_PALETTE = ['1', '5', '10', '20', '30', '40', '50', '60', '70', '80'];
const TOKENS_CATEGORIES = ['Background', 'Text', 'Icon', 'Outline', 'System'];
const TOKENS_ARRAYS = {};
TOKENS_CATEGORIES.map(category => (TOKENS_ARRAYS[category] = []));

for (const key in Colors) {
  if (key.startsWith('$background')) {
    TOKENS_ARRAYS.Background.push(key);
  } else if (key.startsWith('$text')) {
    TOKENS_ARRAYS.Text.push(key);
  } else if (key.startsWith('$icon')) {
    TOKENS_ARRAYS.Icon.push(key);
  } else if (key.startsWith('$outline')) {
    TOKENS_ARRAYS.Outline.push(key);
  } else if (key.startsWith('$black') || key.startsWith('$white')) {
    TOKENS_ARRAYS.System.push(key);
  }
}

class ColorsScreen extends Component {
  state = {
    selectedColor: INITIAL_COLOR,
    searchValue: '',
    filteredTokens: [],
    showToast: false,
    message: undefined,
    currentColor: Colors.$textPrimary,
    showPicker: false,
    isDefaultOptions: false,
    adjustLightness: false,
    adjustSaturation: false,
    addDarkestTints: true,
    avoidReverseOnDark: true
  };

  scrollViewRef = React.createRef();
  searchRef = React.createRef();

  scrollToTop = () => {
    this?.scrollViewRef?.current?.scrollTo({x: 0, y: 0, animated: true});
  };

  toggleToastVisibility = () => {
    this.setState({showToast: true});
  };

  dismissToast = () => {
    this.setState({showToast: false});
  };

  onTokenPress = value => {
    const {extraColors = []} = this.props;
    const systemColorName = Colors.getSystemColorByHex(Colors[value].toString(), [
      ...SYSTEM_COLORS,
      ...extraColors,
      'white',
      'black'
    ]);
    const message = systemColorName
      ? `${value}\n ${Colors[value].toString()}\n ${systemColorName}`
      : `${value}\n ${Colors[value].toString()}`;
    this.setState({
      message
    });
    this.toggleToastVisibility();
  };

  onChangeText = _.throttle(searchValue => {
    this.setState({searchValue}, () => {
      this.filterTokens();
    });
  },
  500,
  {leading: false, trailing: true});

  filterToken = token => token.toString().toLowerCase().includes(this.state.searchValue.toLowerCase());

  filterTokens = () => {
    const {searchValue} = this.state;
    const filteredTokens = [];
    if (!searchValue) {
      this.scrollToTop();
    } else {
      for (category of TOKENS_CATEGORIES) {
        const categoryTokens = TOKENS_ARRAYS[category].filter(token => {
          return this.filterToken(token) && token.toString();
        });
        filteredTokens.push(...categoryTokens);
      }
    }
    this.setState({filteredTokens});
    this.scrollToTop();
  };

  updateSearch = _.throttle(searchValue => {
    this.setState({searchValue});
  }, 800);

  clearSearch = () => {
    this.updateSearch(undefined);
    this.searchRef?.clear();
  };

  closeSearchBox = () => {
    this.searchRef?.blur();
  };

  onSearchBoxBlur = () => {
    this.closeSearchBox();
  };

  renderSearch = () => {
    const {searchValue} = this.state;
    return (
      <TextField
        migrate
        preset={null}
        ref={r => (this.searchRef = r)}
        placeholder="Search tokens by category"
        onChangeText={this.onChangeText}
        onBlur={this.onSearchBoxBlur}
        containerStyle={styles.searchContainer}
        fieldStyle={styles.searchField}
        enableErrors={false}
        hideUnderline
        floatingPlaceholder={false}
        text70
        leadingAccessory={
          <View>
            <Icon marginR-s2 tintColor={Colors.$iconDefault} source={Assets.icons.demo.search}/>
          </View>
        }
        trailingAccessory={
          searchValue ? (
            <Button link marginR-5 iconSource={Assets.icons.demo.close} $iconDefault onPress={this.clearSearch}/>
          ) : undefined
        }
      />
    );
  };

  renderToast = () => {
    const {showToast, message} = this.state;

    return (
      <Toast
        key={`${showToast}-${message}`}
        visible={showToast}
        position={'bottom'}
        message={message}
        preset={'general'}
        swipeable
        onDismiss={this.dismissToast}
        autoDismiss={3000}
      />
    );
  };

  renderTints(color) {
    const colorName = color.charAt(0).toUpperCase() + color.slice(1);
    return (
      <View row spread marginB-20>
        {BASE_PALETTE.map((colorKey, index) => {
          const colorProp = {[`bg-${color}${colorKey}`]: true};
          const textColor = colorKey < 40 ? Colors.white : Colors.black;
          return (
            <View key={`${colorKey}-${index}`}>
              <View key={`${colorKey}-${index}`} center height={80} width={80} {...colorProp}>
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
  }

  renderColors(colors, title) {
    return (
      <View padding-page>
        <Text text50 marginB-20>
          {title}
        </Text>

        {_.map(colors, (color, index) => {
          return (
            <View key={`${color}-${index}`}>
              <ScrollView horizontal showsHorizontalScrollIndicator={false}>
                {this.renderTints(color)}
              </ScrollView>
            </View>
          );
        })}
      </View>
    );
  }

  renderDesignTokens() {
    const {searchValue, filteredTokens} = this.state;
    return (
      <View>
        <Text text50 marginT-20 marginL-20>
          DESIGN TOKENS
        </Text>
        <View marginL-10 marginT-10>
          {searchValue ? (
            filteredTokens.length ? (
              filteredTokens.map(token => {
                return this.renderToken(token);
              })
            ) : (
              <Text marginL-10>No Results!</Text>
            )
          ) : (
            TOKENS_CATEGORIES.map(category => {
              return this.renderCategoryToken(category);
            })
          )}
        </View>
      </View>
    );
  }

  renderCategoryToken(category) {
    return (
      <View key={category}>
        <Text text60 marginT-10 marginB-10 marginL-10>
          {category}
        </Text>
        {TOKENS_ARRAYS[category].map((token, index) => {
          return this.renderToken(token, index);
        })}
      </View>
    );
  }

  renderToken(token, index) {
    return (
      <View key={`${token}-${index}`} marginH-10 marginV-3>
        <TouchableOpacity onPress={() => this.onTokenPress(token)}>
          <View key={`${token}-${index}`} flex center row marginB-3>
            <Text flexG $textDefault text70R>
              {token}
            </Text>
            <View
              br40
              marginR-10
              key={`${token}-${index}-light`}
              marginL-10
              style={{
                height: 50,
                width: 100,
                backgroundColor: Colors[token],
                borderWidth: 3,
                borderColor: Colors.grey70
              }}
            />
          </View>
        </TouchableOpacity>
      </View>
    );
  }

  /** Color Palette */

  showColorPicker = () => {
    this.setState({showPicker: true});
  };

  onValueChange = color => {
    this.setState({currentColor: color});
  };

  onSubmit = color => {
    this.setState({currentColor: color});
  };

  onDismiss = () => {
    this.setState({showPicker: false});
  };

  setDefaultOptions = () => {
    const designKitsOptions = {
      adjustLightness: false,
      adjustSaturation: false,
      addDarkestTints: true,
      avoidReverseOnDark: true
    };
    const defaultOptions = {
      adjustLightness: true,
      adjustSaturation: true,
      addDarkestTints: false,
      avoidReverseOnDark: false
    };
    if (this.state.isDefaultOptions) {
      this.setState({...designKitsOptions, isDefaultOptions: false});
    } else {
      this.setState({...defaultOptions, isDefaultOptions: true});
    }
  };

  renderColorPicker = () => {
    const {showPicker, currentColor} = this.state;
    return (
      <ColorPickerDialog
        visible={showPicker}
        initialColor={currentColor}
        key={currentColor}
        onDismiss={this.onDismiss}
        onSubmit={this.onSubmit}
      />
    );
  };

  renderOptions = () => {
    return (
      <View padding-20>
        {renderBooleanOption.call(this, 'adjustLightness', 'adjustLightness')}
        {renderBooleanOption.call(this, 'adjustSaturation', 'adjustSaturation')}
        {renderBooleanOption.call(this, 'addDarkestTints', 'addDarkestTints')}
        {renderBooleanOption.call(this, 'avoidReverseOnDark', 'avoidReverseOnDark')}
        <Button
          label={this.state.isDefaultOptions ? 'Reset example' : 'Set defaults'}
          onPress={this.setDefaultOptions}
        />
      </View>
    );
  };

  renderColorPalette = () => {
    const {currentColor, adjustLightness, adjustSaturation, addDarkestTints, avoidReverseOnDark} = this.state;
    const paletteOptions = {adjustLightness, adjustSaturation, addDarkestTints, avoidReverseOnDark};
    const palette = Colors.generateColorPalette(currentColor, paletteOptions);
    return (
      <View margin-12 br40 style={{borderWidth: 1}}>
        {this.renderOptions()}
        <View center row>
          <TouchableOpacity
            marginH-10
            style={[styles.colorBox, {backgroundColor: currentColor}]}
            onPress={this.showColorPicker}
          />
          <ColorPalette
            colors={palette}
            value={currentColor}
            swatchStyle={styles.swatchStyle}
            containerStyle={{marginLeft: -10}}
            onValueChange={this.onValueChange}
          />
        </View>
      </View>
    );
  };

  renderColorPaletteExample = () => {
    return (
      <>
        <Text text50 marginL-20>
          Generate Color Palette
        </Text>
        {this.renderColorPalette()}
        {this.renderColorPicker()}
      </>
    );
  };

  render() {
    return (
      <>
        {this.renderSearch()}
        <ScrollView ref={this.scrollViewRef}>
          {this.renderDesignTokens()}
          {this.renderColors(SYSTEM_COLORS, 'SYSTEM COLORS')}
          {this.renderColorPaletteExample()}
        </ScrollView>
        {this.renderToast()}
      </>
    );
  }
}

const styles = StyleSheet.create({
  searchContainer: {
    padding: Spacings.s1,
    paddingBottom: 0
  },
  searchField: {
    padding: Spacings.s3,
    borderRadius: 8
  },
  colorBox: {
    width: 60,
    height: 60,
    borderWidth: 1,
    borderRadius: 30
  },
  swatchStyle: {
    width: 18,
    height: 40,
    borderRadius: 10,
    marginLeft: 4,
    marginRight: 4
  }
});

export default ColorsScreen;
