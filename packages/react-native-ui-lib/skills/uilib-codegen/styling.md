# Styling Guide

react-native-ui-lib uses **modifiers** (props) instead of StyleSheet. Use StyleSheet only for transforms and properties without a modifier equivalent.

```typescript
// ✅ Modifiers          // ❌ StyleSheet
<View padding-20 bg-white>   <View style={{padding: 20, backgroundColor: 'white'}}>
```

## Imports

```typescript
import {Colors, Shadows, Spacings, BorderRadiuses, Typography} from 'react-native-ui-lib';
```

---

## Layout

| Modifier | Effect |
|----------|--------|
| `flex` | flex: 1 |
| `flex-N` | flex: N |
| `flexS` | flexShrink |
| `flexG` | flexGrow |
| `center` | center content (both axes) |
| `centerV` | center vertically |
| `centerH` | center horizontally |
| `row` | flexDirection: row |
| `spread` | justifyContent: space-between |
| `left` `right` `top` `bottom` | alignment |
| `abs` | position: absolute |
| `absL` `absT` `absR` `absB` | absolute + align to side |
| `absH` `absV` | absolute + stretch axis |
| `absF` | absolute + fill parent |

### Modifiers vs StyleSheet — when and where

- **Modifiers first:** If a layout behavior can be expressed with a modifier (`flex`, `center`, `row`, `spread`, `padding-s*`, `margin-s*`), use the modifier — not StyleSheet.
- **On the component itself:** Apply modifiers directly on the View/component that needs the behavior.
- **StyleSheet only for:** `transform`, `overflow`, fixed `width`/`height`, `gap` — properties that have no modifier equivalent.
- **Never combine spacing values arithmetically** (e.g., `Spacings.s5 + Spacings.s5`) — use a modifier or fixed dimension instead.

---

## Spacing

`padding-{N}` / `margin-{N}` — literal sizes: 5, 10, 15, 20, 25, 30, 40, 50
`padding-s{X}` / `margin-s{X}` — preset sizes: s1–s10

Sides: `H` (horizontal), `V` (vertical), `T` (top), `B` (bottom), `L` (left), `R` (right)

For gaps between siblings, use `marginT-s*` / `marginB-s*` on children, or `gap` in `StyleSheet`.

```typescript
<View paddingH-s5 marginB-s3>           // modifier with presets
style={{ marginTop: Spacings.s2 }}      // StyleSheet with Spacings constant
itemSpacing={Spacings.s5}               // Spacings as a component prop value
```

### Spacing presets

| Preset | Phone (px) | Tablet (px) |
|--------|------------|-------------|
| s1 | 4 | 6 |
| s2 | 8 | 10 |
| s3 | 12 | 16 |
| s4 | 16 | 20 |
| s5 | 20 | 24 |
| s6 | 24 | 28 |
| s7 | 28 | 32 |
| s8 | 32 | 38 |
| s9 | 36 | 42 |
| s10 | 40 | 48 |

Custom spacing names (e.g. `page`, `card`) can be added via `Spacings.loadSpacings` in your foundation config — see [theming.md](./theming.md). Once loaded, they work as modifiers: `<View paddingH-page>`.

---

## Colors

```typescript
<View bg-primary>              // background modifier
<Text primary>                 // text color modifier
<Text color={Colors.grey30}>   // prop
```

### Design tokens — always prefer over palette colors

All tokens automatically adapt to dark/light mode. Use via modifiers (`<Text $textDefault>`) or `Colors.$tokenName`.

**Rule:** When a `$` token exists for the intent, use it. Fall back to palette colors only when no token fits.

#### Naming convention

`$[property][Semantic][Weight]`

- **Property**: `text`, `background`, `icon`, `outline`
- **Semantic**: `Default`, `Neutral`, `Primary`, `General`, `Success`, `Warning`, `Danger`
- **Weight** (optional): `Light`, `Medium`, `Heavy`

#### Common tokens

| Token | Usage |
|-------|-------|
| `$textDefault` | Primary body text |
| `$textNeutral` | Secondary / subtitle text |
| `$textDisabled` | Disabled text |
| `$textPrimary` | Accent / brand text |
| `$backgroundDefault` | Screen background |
| `$backgroundElevated` | Cards, modals |
| `$backgroundNeutral` | Section / secondary background |
| `$backgroundDisabled` | Disabled state |
| `$iconDefault` | Primary icons |
| `$iconNeutral` | Secondary icons |
| `$iconPrimary` | Accent / brand icons |
| `$outlineDefault` | Borders, dividers |
| `$outlineDisabled` | Disabled borders |

#### Read all available tokens

```bash
cat "$UILIB_PATH/src/style/colors/colorsBase.d.ts"
```

#### Palette colors

`primary`, `secondary`, `white`, `black`, `grey10`–`grey50`, `green30` (success), `red30` (error), `orange30` (warning), `blue30` (info)

Note: `Colors.white` / `Colors.black` are literal and do NOT invert in dark mode. Use `$white` / `$black` tokens for dark-mode-aware white/black.

---

## Border Radius

| Modifier | Pixels |
|----------|--------|
| `br0` | 0 |
| `br10` | 2 |
| `br20` | 4 |
| `br30` | 6 |
| `br40` | 8 |
| `br50` | 10 |
| `br60` | 12 |
| `br70` | 16 |
| `br90` | 24 |
| `br100` | 999 (fully rounded) |

---

## Shadows

| Preset | Intensity | Elevation (Android) |
|--------|-----------|---------------------|
| `sh10` | Light | 2 |
| `sh20` | Medium | 3 |
| `sh30` | Heavy | 4 |

Each preset has `.top` and `.bottom` variants. Dark mode is handled automatically.

```typescript
<View style={Shadows.sh20.bottom}>
```

---

## Typography

### fontSize-to-preset mapping

When you encounter a hardcoded fontSize in a design, map it to the correct preset. If a value is 1px off, round to the nearest preset.

| fontSize | Preset | Weight suffixes |
|----------|--------|-----------------|
| 64px | `text10` | T, L, R, M, BO, H, BL |
| 48px | `text20` | T, L, R, M, BO, H, BL |
| 36px | `text30` | T, L, R, M, BO, H, BL |
| 28px | `text40` | T, L, R, M, BO, H, BL |
| 24px | `text50` | T, L, R, M, BO, H, BL |
| 20px | `text60` | T, L, R, M, BO, H, BL |
| 16px | `text70` | T, L, R, M, BO, H, BL |
| 14px | `text80` | T, L, R, M, BO, H, BL |
| 12px | `text90` | T, L, R, M, BO, H, BL |
| 10px | `text100` | T, L, R, M, BO, H, BL |

Weight suffixes: `T` (Thin), `L` (Light), `R` (Regular), `M` (Medium), `BO` (Bold), `H` (Heavy), `BL` (Black). Example: `text70BO` = 16px Bold.

### Semantic presets (user-defined)

The `text*` presets above are built-in. Semantic names (`heading`, `body`, `caption`, etc.) are **not pre-loaded** — define them via `Typography.loadTypographies` in your foundation config (see [theming.md](./theming.md)):

```typescript
Typography.loadTypographies({
  heading:   {fontSize: 28, fontWeight: '700', lineHeight: 36},
  body:      {fontSize: 16, fontWeight: '400', lineHeight: 24},
  bodySmall: {fontSize: 14, fontWeight: '400', lineHeight: 20},
});
```

Once loaded, use as modifiers:

```typescript
<Text heading $textDefault>Page Title</Text>
<Text bodySmall $textNeutral>Description text</Text>
```

Styles: `italic`, `underline`, `center`, `left`, `right`

---

## DO / DON'T

- **DO** use `Spacings.s*` for all spacing values (`margin: Spacings.s2`, `gap: Spacings.s4`)
- **DO** use `Shadows.sh*` for all shadows (`style={Shadows.sh20.bottom}`)
- **DO** use `BorderRadiuses.br*` or `br*` modifiers for all border radiuses
- **DO** use typography presets as modifiers on `<Text>` instead of hardcoded `fontSize`/`lineHeight`
- **DO** use StyleSheet over inline `style={{}}` when modifiers can't express the property
- **DO** use `$` design tokens for all colors — they cover dark/light mode automatically
- **DON'T** use hardcoded hex colors anywhere — use `$` tokens or palette colors
- **DON'T** use numeric values for spacings — use `Spacings.s*` presets or `margin-s*`/`padding-s*` modifiers
- **DON'T** use hardcoded `fontSize` or `lineHeight` — use the mapping table above
- **DON'T** create custom shadow objects — use `Shadows.sh10/sh20/sh30`
- **DON'T** use hardcoded `borderRadius` — use `BorderRadiuses.br*` or `br*` modifiers
