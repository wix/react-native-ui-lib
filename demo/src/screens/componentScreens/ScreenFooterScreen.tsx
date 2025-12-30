import React, {useState, useMemo} from 'react';
import {StyleSheet, ScrollView} from 'react-native';
import {
  View,
  Text,
  Button,
  Colors,
  SegmentedControl,
  ScreenFooter,
  ScreenFooterLayouts,
  ScreenFooterBackgrounds,
  FooterAlignment,
  HorizontalItemsDistribution,
  ItemsFit,
  Switch
} from 'react-native-ui-lib';

enum ButtonType {
  PRIMARY = 'Primary',
  SECONDARY = 'Secondary',
  LINK = 'Link'
}

enum ItemSize {
  SMALL = 'small',
  MEDIUM = 'medium',
  LARGE = 'large'
}

const ITEMS_COUNT_OPTIONS = [
  {label: '1', value: 1},
  {label: '2', value: 2},
  {label: '3', value: 3}
];

const LAYOUT_OPTIONS = [
  {label: 'Horizontal', value: ScreenFooterLayouts.HORIZONTAL},
  {label: 'Vertical', value: ScreenFooterLayouts.VERTICAL}
];

const BACKGROUND_OPTIONS = [
  {label: 'Solid', value: ScreenFooterBackgrounds.SOLID},
  {label: 'Fading', value: ScreenFooterBackgrounds.FADING},
  {label: 'Transparent', value: ScreenFooterBackgrounds.TRANSPARENT}
];

const ALIGNMENT_OPTIONS = [
  {label: 'Start', value: FooterAlignment.START},
  {label: 'Center', value: FooterAlignment.CENTER},
  {label: 'End', value: FooterAlignment.END}
];

const DISTRIBUTION_OPTIONS = [
  {label: 'Stack', value: HorizontalItemsDistribution.STACK},
  {label: 'Spread', value: HorizontalItemsDistribution.SPREAD}
];

const ITEMS_FIT_OPTIONS = [
  {label: 'Fit', value: ItemsFit.FIT},
  {label: 'Stretch', value: ItemsFit.STRETCH},
  {label: 'Fixed', value: ItemsFit.FIXED}
];

const BUTTON_TYPE_OPTIONS = [
  {label: 'Primary', value: ButtonType.PRIMARY},
  {label: 'Secondary', value: ButtonType.SECONDARY},
  {label: 'Link', value: ButtonType.LINK}
];

const SIZE_OPTIONS = [
  {label: 'Small', value: ItemSize.SMALL},
  {label: 'Medium', value: ItemSize.MEDIUM},
  {label: 'Large', value: ItemSize.LARGE}
];

const ScreenFooterScreen = () => {
  const [itemsCount, setItemsCount] = useState(2);
  const [layout, setLayout] = useState<ScreenFooterLayouts>(ScreenFooterLayouts.HORIZONTAL);
  const [background, setBackground] = useState<ScreenFooterBackgrounds>(ScreenFooterBackgrounds.SOLID);
  const [alignment, setAlignment] = useState<FooterAlignment>(FooterAlignment.CENTER);
  const [horizontalAlignment, setHorizontalAlignment] = useState<FooterAlignment>(FooterAlignment.CENTER);
  const [distribution, setDistribution] = useState<HorizontalItemsDistribution>(HorizontalItemsDistribution.STACK);
  const [itemsFit, setItemsFit] = useState<ItemsFit>(ItemsFit.FIT);
  
  const [button1Type, setButton1Type] = useState<ButtonType>(ButtonType.PRIMARY);
  const [button2Type, setButton2Type] = useState<ButtonType>(ButtonType.SECONDARY);
  const [button3Type, setButton3Type] = useState<ButtonType>(ButtonType.LINK);
  const [buttonSize, setButtonSize] = useState<ItemSize>(ItemSize.MEDIUM);
  const [showExtraContent, setShowExtraContent] = useState(false);
  const [extraContentSize, setExtraContentSize] = useState<ItemSize>(ItemSize.MEDIUM);

  const isHorizontal = layout === ScreenFooterLayouts.HORIZONTAL;

  const getButtonSize = (size: ItemSize) => {
    switch (size) {
      case ItemSize.SMALL: return Button.sizes.small;
      case ItemSize.MEDIUM: return Button.sizes.medium;
      case ItemSize.LARGE: return Button.sizes.large;
    }
  };

  const getTextPreset = (size: ItemSize): {main: string; sub: string} => {
    switch (size) {
      case ItemSize.SMALL: return {main: 'text80', sub: 'text100'};
      case ItemSize.MEDIUM: return {main: 'text70', sub: 'text90'};
      case ItemSize.LARGE: return {main: 'text60', sub: 'text80'};
    }
  };

  const getButtonProps = (type: ButtonType) => {
    switch (type) {
      case ButtonType.PRIMARY:
        return {
          backgroundColor: Colors.$backgroundPrimaryHeavy,
          label: 'Primary'
        };
      case ButtonType.SECONDARY:
        return {
          backgroundColor: Colors.$backgroundDefault,
          outline: true,
          outlineColor: Colors.$backgroundPrimaryHeavy,
          label: 'Secondary'
        };
      case ButtonType.LINK:
        return {
          link: true,
          backgroundColor: undefined,
          label: 'Link',
          color: Colors.$backgroundPrimaryHeavy
        };
    }
  };

  const renderFooterItems = useMemo(() => {
    const items = [];
    const textPreset = getTextPreset(extraContentSize);
    
    if (showExtraContent) {
      items.push(
        <View key="extra" centerV marginR-s4={isHorizontal} marginB-s4={!isHorizontal}>
          <Text {...{[textPreset.main]: true}} $textDefault>
            Total: <Text {...{[textPreset.main]: true}} $textDefault style={{fontWeight: 'bold'}}>257$</Text>
          </Text>
          <Text {...{[textPreset.sub]: true}} $textNeutralLight>Prices are not including VAT.</Text>
        </View>
      );
    }

    if (itemsCount >= 1) {
      items.push(
        <Button
          key="btn1"
          size={getButtonSize(buttonSize)}
          style={itemsFit === ItemsFit.STRETCH && !isHorizontal ? {alignSelf: 'stretch'} : undefined}
          {...getButtonProps(button1Type)}
        />
      );
    }

    if (itemsCount >= 2) {
      items.push(
        <Button
          key="btn2"
          size={getButtonSize(buttonSize)}
          style={itemsFit === ItemsFit.STRETCH && !isHorizontal ? {alignSelf: 'stretch'} : undefined}
          {...getButtonProps(button2Type)}
        />
      );
    }

    if (itemsCount >= 3) {
      items.push(
        <Button
          key="btn3"
          size={getButtonSize(buttonSize)}
          style={itemsFit === ItemsFit.STRETCH && !isHorizontal ? {alignSelf: 'stretch'} : undefined}
          {...getButtonProps(button3Type)}
        />
      );
    }
    
    return items;
  }, [itemsCount, itemsFit, isHorizontal, button1Type, button2Type, button3Type, buttonSize, showExtraContent, extraContentSize]);

  return (
    <View flex bg-$backgroundDefault>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Text text60 $textDefault marginB-s4>
          ScreenFooter Configuration
        </Text>

        {/* Layout Selection */}
        <View marginB-s4>
          <Text text70M $textDefault marginB-s2>
            Layout
          </Text>
          <SegmentedControl
            segments={LAYOUT_OPTIONS}
            initialIndex={LAYOUT_OPTIONS.findIndex(opt => opt.value === layout)}
            onChangeIndex={index => setLayout(LAYOUT_OPTIONS[index].value)}
          />
        </View>

        {/* Items Count */}
        <View marginB-s4>
          <Text text70M $textDefault marginB-s2>
            Number of Items
          </Text>
          <SegmentedControl
            segments={ITEMS_COUNT_OPTIONS}
            initialIndex={ITEMS_COUNT_OPTIONS.findIndex(opt => opt.value === itemsCount)}
            onChangeIndex={index => setItemsCount(ITEMS_COUNT_OPTIONS[index].value)}
          />
        </View>

        {/* Extra Content Toggle */}
        <View row spread centerV marginB-s4>
          <Text text70M $textDefault>
            Show Extra Content (Text/Image)
          </Text>
          <Switch value={showExtraContent} onValueChange={setShowExtraContent}/>
        </View>

        {/* Extra Content Size */}
        {showExtraContent && (
          <View marginB-s4>
            <Text text70M $textDefault marginB-s2>
              Extra Content Size
            </Text>
            <SegmentedControl
              segments={SIZE_OPTIONS}
              initialIndex={SIZE_OPTIONS.findIndex(opt => opt.value === extraContentSize)}
              onChangeIndex={index => setExtraContentSize(SIZE_OPTIONS[index].value)}
            />
          </View>
        )}

        {/* Button Size (applies to all buttons) */}
        <View marginB-s4>
          <Text text70M $textDefault marginB-s2>
            Button Size
          </Text>
          <SegmentedControl
            segments={SIZE_OPTIONS}
            initialIndex={SIZE_OPTIONS.findIndex(opt => opt.value === buttonSize)}
            onChangeIndex={index => setButtonSize(SIZE_OPTIONS[index].value)}
          />
        </View>

        {/* Button 1 Type */}
        {itemsCount >= 1 && (
          <View marginB-s4>
            <Text text70M $textDefault marginB-s2>
              Button 1 Type
            </Text>
            <SegmentedControl
              segments={BUTTON_TYPE_OPTIONS}
              initialIndex={BUTTON_TYPE_OPTIONS.findIndex(opt => opt.value === button1Type)}
              onChangeIndex={index => setButton1Type(BUTTON_TYPE_OPTIONS[index].value)}
            />
          </View>
        )}

        {/* Button 2 Type */}
        {itemsCount >= 2 && (
          <View marginB-s4>
            <Text text70M $textDefault marginB-s2>
              Button 2 Type
            </Text>
            <SegmentedControl
              segments={BUTTON_TYPE_OPTIONS}
              initialIndex={BUTTON_TYPE_OPTIONS.findIndex(opt => opt.value === button2Type)}
              onChangeIndex={index => setButton2Type(BUTTON_TYPE_OPTIONS[index].value)}
            />
          </View>
        )}

        {/* Button 3 Type */}
        {itemsCount >= 3 && (
          <View marginB-s4>
            <Text text70M $textDefault marginB-s2>
              Button 3 Type
            </Text>
            <SegmentedControl
              segments={BUTTON_TYPE_OPTIONS}
              initialIndex={BUTTON_TYPE_OPTIONS.findIndex(opt => opt.value === button3Type)}
              onChangeIndex={index => setButton3Type(BUTTON_TYPE_OPTIONS[index].value)}
            />
          </View>
        )}

        {/* Background */}
        <View marginB-s4>
          <Text text70M $textDefault marginB-s2>
            Background
          </Text>
          <SegmentedControl
            segments={BACKGROUND_OPTIONS}
            initialIndex={BACKGROUND_OPTIONS.findIndex(opt => opt.value === background)}
            onChangeIndex={index => setBackground(BACKGROUND_OPTIONS[index].value)}
          />
        </View>

        {/* Alignment (Cross Axis) */}
        <View marginB-s4>
          <Text text70M $textDefault marginB-s2>
            {isHorizontal ? 'Vertical Alignment (Top/Center/Bottom)' : 'Alignment (Left/Center/Right)'}
          </Text>
          <SegmentedControl
            segments={ALIGNMENT_OPTIONS}
            initialIndex={ALIGNMENT_OPTIONS.findIndex(opt => opt.value === alignment)}
            onChangeIndex={index => setAlignment(ALIGNMENT_OPTIONS[index].value)}
          />
        </View>

        {/* Distribution (for Horizontal layout) */}
        {isHorizontal && (
          <View marginB-s4>
            <Text text70M $textDefault marginB-s2>
              Distribution
            </Text>
            <SegmentedControl
              segments={DISTRIBUTION_OPTIONS}
              initialIndex={DISTRIBUTION_OPTIONS.findIndex(opt => opt.value === distribution)}
              onChangeIndex={index => setDistribution(DISTRIBUTION_OPTIONS[index].value)}
            />
          </View>
        )}

        {/* Horizontal Alignment (for Horizontal layout + Stack distribution) */}
        {isHorizontal && distribution === HorizontalItemsDistribution.STACK && (
          <View marginB-s4>
            <Text text70M $textDefault marginB-s2>
              Horizontal Alignment (Left/Center/Right)
            </Text>
            <SegmentedControl
              segments={ALIGNMENT_OPTIONS}
              initialIndex={ALIGNMENT_OPTIONS.findIndex(opt => opt.value === horizontalAlignment)}
              onChangeIndex={index => setHorizontalAlignment(ALIGNMENT_OPTIONS[index].value)}
            />
          </View>
        )}

        {/* Items Fit (for Vertical layout) */}
        {!isHorizontal && (
          <View marginB-s4>
            <Text text70M $textDefault marginB-s2>
              Items Fit
            </Text>
            <SegmentedControl
              segments={ITEMS_FIT_OPTIONS}
              initialIndex={ITEMS_FIT_OPTIONS.findIndex(opt => opt.value === itemsFit)}
              onChangeIndex={index => setItemsFit(ITEMS_FIT_OPTIONS[index].value)}
            />
          </View>
        )}

        {/* Spacer for content */}
        <View marginT-s10>
          <Text text70 $textDefault style={styles.placeholder}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
            incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud 
            exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </Text>
          <Text text70 $textDefault marginT-s4 style={styles.placeholder}>
            Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu 
            fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in 
            culpa qui officia deserunt mollit anim id est laborum.
          </Text>
        </View>
      </ScrollView>

      {/* ScreenFooter Component */}
      <ScreenFooter
        layout={layout}
        backgroundType={background}
        alignment={alignment}
        horizontalAlignment={horizontalAlignment}
        HorizontalItemsDistribution={distribution}
        itemsFit={itemsFit}
        itemWidth={150}
      >
        {renderFooterItems}
      </ScreenFooter>
    </View>
  );
};

const styles = StyleSheet.create({
  scrollContent: {
    padding: 20,
    paddingBottom: 150
  },
  placeholder: {
    lineHeight: 22
  }
});

export default ScreenFooterScreen;

