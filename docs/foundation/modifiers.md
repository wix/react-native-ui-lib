---
sidebar_position: 4
sidebar_label: Modifiers
title: "Modifiers"
---

As you have probably noticed already, we translate our style presets into modifiers.  
**Modifiers** help you create a stunning UI easily and quickly.

**[!IMPORTANT]**  
Make sure to use modifiers only on UILib components, as some modifiers can cause issues on Android when used on React Native components directly.

## Layout Modifiers
Use our alignment properties to quickly position the content of your view without getting confused calculating all those flex rules.
- flex - apply `flex:1` on a view 
- flex-[value] - When you want to control the flex value
- flexS - FlexShrink 
- flexG - FlexGrow
- left
- top
- right
- bottom
- row - change direction to row (default is column)
- center
- centerH - center content horizontally
- centerV - center content vertically
- spread - spread content (similar to `space-between`)

! Notice that the layout modifiers affect the View's children

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
It's always important to use your margins and paddings correctly, and that's also easier to do with modifiers:

- padding-[value] - will add padding to all corners (e.g. padding-30 will add 30 pt of padding)
- paddingL-[value] - Left padding
- paddingT-[value] - Top padding
- paddingR-[value] - Right padding
- paddingB-[value] - Bottom padding
- paddingH-[value] - Horizontal padding
- paddingV-[value] - Vertical padding
```jsx
<View paddingV-20 paddingH-30>...</View>
```

- margin-[value]
- marginL-[value] - Left margin
- marginT-[value] - Top margin
- marginR-[value] - Right margin
- marginB-[value] - Bottom margin
- marginH-[value] - Horizontal margin
- marginV-[value] - Vertical margin

```jsx
<View marginT-5 marginB-10>...</View>
```

! padding and margin modifiers can also take [Spacing](https://github.com/wix/react-native-ui-lib/blob/master/src/style/spacings.ts) constants. 
```jsx
<View margin-s5 padding-s2>...</View>
```
## Position Modifiers
Use the position modifiers to quickly set an absolute position for your views.
- `abs` will set the absolute position on your View
- `absL`, `absT`, `absR`, `absB` - set the absolute position and align to Left, Top, Right, Bottom accordingly
- `absH` and `absV` - position absolute and stretch horizontally or vertically
- `absF` will set the absolute position and fill the parent view (similar to StyleSheet.absoluteFillObject)

## Styling Modifiers
The last type of modifiers is for styling your components

- [colorKey] - Controls the color of text components
- background-[colorKey] (or bg-[colorKey]) - Background color 

```jsx
<Text blue30>...</Text>
<View bg-grey70>...</View>
<TouchableOpacity bg-red30/>
```

- [typographyKey] - Controls the typography of text components 
```jsx
<Text text70>...</Text>
<TextInput text80/>
```

- br[borderRadiusKey] - Set the border radius for the view (e.g. `br10`, `br20`, .., `br60`)
```jsx
<View br40>...</View>
```


! all styling modifiers are based on our [`Colors` & `Typography` presets](/docs/foundation/style).  
You can load your own presets and use them as modifiers. 



Check out [this example](/docs/getting-started/usage) where we use most of these props.
