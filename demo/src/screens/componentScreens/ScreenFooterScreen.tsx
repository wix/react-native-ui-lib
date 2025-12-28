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
  ItemsFit
} from 'react-native-ui-lib';

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

const ScreenFooterScreen = () => {
  const [itemsCount, setItemsCount] = useState(2);
  const [layout, setLayout] = useState<ScreenFooterLayouts>(ScreenFooterLayouts.HORIZONTAL);
  const [background, setBackground] = useState<ScreenFooterBackgrounds>(ScreenFooterBackgrounds.SOLID);
  const [alignment, setAlignment] = useState<FooterAlignment>(FooterAlignment.CENTER);
  const [distribution, setDistribution] = useState<HorizontalItemsDistribution>(HorizontalItemsDistribution.STACK);
  const [itemsFit, setItemsFit] = useState<ItemsFit>(ItemsFit.FIT);

  const isHorizontal = layout === ScreenFooterLayouts.HORIZONTAL;

  const renderFooterItems = useMemo(() => {
    const items = [];
    
    for (let i = 0; i < itemsCount; i++) {
      const isPrimary = i === 0;
      items.push(
        <Button
          key={i}
          label={isPrimary ? 'Primary' : i === 1 ? 'Secondary' : 'Tertiary'}
          size={Button.sizes.large}
          backgroundColor={isPrimary ? Colors.$backgroundPrimaryHeavy : undefined}
          outline={!isPrimary}
          outlineColor={!isPrimary ? Colors.$outlineDefault : undefined}
          style={itemsFit === ItemsFit.STRETCH && !isHorizontal ? {alignSelf: 'stretch'} : undefined}
        />
      );
    }
    
    return items;
  }, [itemsCount, itemsFit, isHorizontal]);

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

        {/* Alignment (for Vertical layout) */}
        {!isHorizontal && (
          <View marginB-s4>
            <Text text70M $textDefault marginB-s2>
              Alignment
            </Text>
            <SegmentedControl
              segments={ALIGNMENT_OPTIONS}
              initialIndex={ALIGNMENT_OPTIONS.findIndex(opt => opt.value === alignment)}
              onChangeIndex={index => setAlignment(ALIGNMENT_OPTIONS[index].value)}
            />
          </View>
        )}

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

