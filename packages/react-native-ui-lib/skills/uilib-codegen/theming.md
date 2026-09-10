# Theming Guide

react-native-ui-lib uses `ThemeManager` plus static loaders (`Colors`, `Typography`, `Spacings`) to build a fully custom design system. Set everything up once in your foundation config before any component renders.

```typescript
import {Colors, Typography, Spacings, ThemeManager} from 'react-native-ui-lib';
```

---

## Colors

### Load custom palette colors

```typescript
Colors.loadColors({
  primary: '#2364AA',
  secondary: '#81C3D7',
  error: '#E63B2E',
  success: '#ADC76F',
  warning: '#FF963C',
});
```

After loading, use these as modifiers or via `Colors.*`:

```typescript
<View bg-primary>
<Text color={Colors.secondary}>
```

### Override design tokens (dark-mode-aware)

Default `$` tokens are pre-loaded (see `designTokens.ts`). To override them with your brand colors, use `Colors.loadSchemes` for full light/dark control:

```typescript
Colors.loadSchemes({
  light: {
    $textDefault:       '#221D23',
    $backgroundDefault: '#FFFFFF',
    $backgroundNeutral: '#F5F5F5',
    $outlineDefault:    '#E0E0E0',
  },
  dark: {
    $textDefault:       '#FFFFFF',
    $backgroundDefault: '#121212',
    $backgroundNeutral: '#1E1E1E',
    $outlineDefault:    '#333333',
  },
});
```

Alternatively, generate a full token set from a single primary color:

```typescript
Colors.loadDesignTokens({primaryColor: '#2364AA'});
```

### Dark mode

```typescript
// Switch the active color scheme
Colors.setScheme('dark');   // or 'light' or 'default' (system)
```

Read the current scheme:

```typescript
Colors.getScheme(); // 'dark' | 'light' | 'default'
```

---

## Typography

### Load custom presets

```typescript
Typography.loadTypographies({
  heading:        {fontSize: 28, fontWeight: '700', lineHeight: 36},
  subheading:     {fontSize: 22, fontWeight: '600', lineHeight: 30},
  body:           {fontSize: 16, fontWeight: '400', lineHeight: 24},
  bodyMedium:     {fontSize: 16, fontWeight: '500', lineHeight: 24},
  bodySmall:      {fontSize: 14, fontWeight: '400', lineHeight: 20},
  caption:        {fontSize: 12, fontWeight: '400', lineHeight: 16},
});
```

Use as modifiers:

```typescript
<Text heading $textDefault>Page Title</Text>
<Text bodySmall $textNeutral>Subtitle</Text>
```

---

## Spacings

### Load custom spacing values

```typescript
Spacings.loadSpacings({
  page:   20,   // horizontal page margins
  card:   16,   // inner card padding
  s1: 4,
  s2: 8,
  s3: 12,
  s4: 16,
  s5: 20,
});
```

Use as modifiers or constants:

```typescript
<View paddingH-page marginB-s3>
<View style={{gap: Spacings.s4}}>
```

---

## Per-component overrides

`ThemeManager.setComponentTheme` lets you set default props for any component globally — no need to repeat them at every usage site.

```typescript
ThemeManager.setComponentTheme('Button', {
  borderRadius: 8,
  size: 'large',
});

ThemeManager.setComponentTheme('Text', {
  $textDefault: true,
});

ThemeManager.setComponentTheme('Card', {
  elevation: 2,
  borderRadius: 12,
});
```

### Read a component's current theme

```typescript
ThemeManager.getComponentTheme('Button');
```

---

## Full foundation config example

```typescript
// foundationConfig.ts — import this before any react-native-ui-lib component

import {Colors, Typography, Spacings, ThemeManager} from 'react-native-ui-lib';

// 1. Palette
Colors.loadColors({
  primary:   '#2364AA',
  secondary: '#81C3D7',
  error:     '#E63B2E',
  success:   '#ADC76F',
});

// 2. Override design tokens (optional — defaults are pre-loaded)
Colors.loadSchemes({
  light: {
    $textDefault:       Colors.dark10,
    $backgroundDefault: Colors.white,
    $outlineDefault:    Colors.grey50,
  },
  dark: {
    $textDefault:       Colors.white,
    $backgroundDefault: Colors.dark10,
    $outlineDefault:    Colors.grey30,
  },
});

// 3. Typography
Typography.loadTypographies({
  heading:    {fontSize: 28, fontWeight: '700', lineHeight: 36},
  body:       {fontSize: 16, fontWeight: '400', lineHeight: 24},
  bodySmall:  {fontSize: 14, fontWeight: '400', lineHeight: 20},
  caption:    {fontSize: 12, fontWeight: '400', lineHeight: 16},
});

// 4. Spacings
Spacings.loadSpacings({
  page: 20,
  card: 16,
});

// 5. Component defaults
ThemeManager.setComponentTheme('Button', {borderRadius: 8});
```
