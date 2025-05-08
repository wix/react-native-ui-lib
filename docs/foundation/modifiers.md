---
sidebar_position: 4
sidebar_label: Modifiers
title: "Modifiers"
---

Discover the power of our style presets transformed into modifiers.  
**Modifiers** are a powerful tool designed to streamline UI development, making it both efficient and elegant.

## Layout Modifiers
Streamline your layout design with our intuitive alignment properties. These modifiers simplify view positioning without the complexity of manual flex calculations.

### Basic Flex Properties
- `flex` - Apply `flex: 1` to expand a view
- `flex-[value]` - Set a specific flex value
- `flexS` - Enable flex shrink
- `flexG` - Enable flex grow

### Alignment Properties
- `left` - Align content to the left
- `right` - Align content to the right
- `top` - Align content to the top
- `bottom` - Align content to the bottom
- `center` - Center content both horizontally and vertically
- `centerH` - Center content horizontally
- `centerV` - Center content vertically

### Layout Direction
- `row` - Set flex direction to row (default is column)
- `spread` - Distribute content evenly (equivalent to `space-between`)

> Note: Layout modifiers affect the positioning of the View's children elements

```jsx
<View flex left>
  <Button label="Button" />
</View>

<View flex right>
  <Button label="Button" />
</View>

<View flex top>
  <Button label="Button" />
</View>

<View flex bottom>
  <Button label="Button" />
</View>

<View flex center>
  <Button label="Button" />
</View>
```
<img src="https://cloud.githubusercontent.com/assets/1780255/24798566/4de91efc-1b9f-11e7-9974-e06e3daa7c63.png" width="160"/> <img src="https://cloud.githubusercontent.com/assets/1780255/24798569/50dc99a4-1b9f-11e7-8231-fbcbb139a010.png" width="160"/> <img src="https://cloud.githubusercontent.com/assets/1780255/24798571/52766d08-1b9f-11e7-95a3-b2b262e81170.png" width="160"/> <img src="https://cloud.githubusercontent.com/assets/1780255/24798572/545b7abe-1b9f-11e7-9098-409ceee6ff22.png" width="160"/> <img src="https://cloud.githubusercontent.com/assets/1780255/24798575/55e3c4f4-1b9f-11e7-998d-7986a038abb6.png" width="160"/>

## Spacing Modifiers
Enhance your layout consistency with our intuitive spacing modifiers for margins and paddings:

### Padding Modifiers
Apply padding with simple, descriptive modifiers:
- `padding-[value]` - Uniform padding on all sides
- `paddingL-[value]` - Left padding
- `paddingT-[value]` - Top padding
- `paddingR-[value]` - Right padding
- `paddingB-[value]` - Bottom padding
- `paddingH-[value]` - Horizontal padding (left + right)
- `paddingV-[value]` - Vertical padding (top + bottom)

```jsx
<View paddingV-20 paddingH-30>
  {/* Content with vertical padding of 20 and horizontal padding of 30 */}
</View>
```

### Margin Modifiers
Control spacing between elements with margin modifiers:
- `margin-[value]` - Uniform margin on all sides
- `marginL-[value]` - Left margin
- `marginT-[value]` - Top margin
- `marginR-[value]` - Right margin
- `marginB-[value]` - Bottom margin
- `marginH-[value]` - Horizontal margin (left + right)
- `marginV-[value]` - Vertical margin (top + bottom)

```jsx
<View marginT-5 marginB-10>
  {/* Content with top margin of 5 and bottom margin of 10 */}
</View>
```

### Gap Modifiers
Control the spacing between child elements in a container:
- `gap-[value]` - Uniform gap between all children

```jsx
<View row gap-10>
  <Button label="First" />
  <Button label="Second" />
  <Button label="Third" />
</View>
```

These modifiers are particularly useful for creating evenly spaced layouts without manually adding margins to individual elements.

> **Note**: Spacing modifiers can use your app's predefined spacing presets for consistent design. These presets are defined in our `spacings.ts` [file](https://github.com/wix/react-native-ui-lib/blob/master/src/style/spacings.ts) and allow for uniform spacing patterns throughout your application.


```jsx
<View margin-s5 padding-s2>
  {/* Using preset spacing values */}
</View>
```


## Position Modifiers
Easily control component positioning with our absolute position modifiers:

### Basic Positioning
- `abs` - Apply absolute positioning to a component

### Edge Alignment
- `absL` - Position absolutely and align to the left edge
- `absT` - Position absolutely and align to the top edge
- `absR` - Position absolutely and align to the right edge
- `absB` - Position absolutely and align to the bottom edge

### Stretch Options
- `absH` - Position absolutely and stretch horizontally
- `absV` - Position absolutely and stretch vertically
- `absF` - Position absolutely and fill the entire parent container (equivalent to `StyleSheet.absoluteFillObject`)

```jsx
<View absL>
  <Text>Left-aligned absolute content</Text>
</View>

<View absF>
  <Text>Full-screen absolute content</Text>
</View>
```

## Style Modifiers
Enhance your components' visual appearance with our style modifiers:

### Color Modifiers
Apply colors to text and backgrounds:
- `[colorKey]` - Set text color (for Text components)
- `background-[colorKey]` or `bg-[colorKey]` - Set background color

```jsx
<Text blue30>Blue text</Text>
<View bg-grey70>Grey background</View>
<TouchableOpacity bg-red30>Red button</TouchableOpacity>
```

### Typography Modifiers
Control text styling with typography presets:
- `[typographyKey]` - Apply typography presets to text elements

```jsx
<Text text70>Styled text</Text>
<TextInput text80 />
```

### Border Radius Modifiers
Add rounded corners with predefined sizes:
- `br[size]` - Apply border radius (sizes: 10, 20, ..., 60)

```jsx
<View br40>
  <Text>Rounded container</Text>
</View>
```

> **Note**: All style modifiers are based on the [`Colors` & `Typography` presets](/docs/foundation/style).
> You can customize these presets by loading your own design tokens.



Check out [this example](/docs/getting-started/usage) where we use most of these props.
