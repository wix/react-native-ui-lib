# Getting Started

## Installation

```bash
npm install react-native-ui-lib
# or
yarn add react-native-ui-lib
```

### Peer dependencies

```bash
npm install react-native-gesture-handler react-native-reanimated react-native-safe-area-context
```

Follow the setup guides for each peer dependency:
- [react-native-gesture-handler](https://docs.swmansion.com/react-native-gesture-handler/docs/fundamentals/installation)
- [react-native-reanimated](https://docs.swmansion.com/react-native-reanimated/docs/fundamentals/getting-started)
- [react-native-safe-area-context](https://github.com/th3rdwave/react-native-safe-area-context#getting-started)

---

## Basic setup

Call your foundation config before rendering any component — typically in your app entry file:

```typescript
// foundationConfig.ts
import {Colors, Typography, Spacings} from 'react-native-ui-lib';

Colors.loadColors({
  primary: '#2364AA',
  secondary: '#81C3D7',
});

Typography.loadTypographies({
  heading: {fontSize: 28, fontWeight: '700', lineHeight: 36},
  body: {fontSize: 16, fontWeight: '400', lineHeight: 24},
});

Spacings.loadSpacings({
  page: 20,
  card: 16,
});
```

```typescript
// App.tsx
import './foundationConfig'; // must be imported before any uilib component
import React from 'react';
import {View, Text} from 'react-native-ui-lib';

export default function App() {
  return (
    <View flex padding-page>
      <Text heading $textDefault>Hello</Text>
    </View>
  );
}
```

See [theming.md](./theming.md) for the full ThemeManager API.

---

## Resources

| Resource | Link |
|----------|------|
| Documentation | https://wix.github.io/react-native-ui-lib/ |
| Figma community file | https://www.figma.com/community/file/1379775092983284111/rnui-library |
| GitHub | https://github.com/wix/react-native-ui-lib |
| Discord | https://discord.gg/2eW4g6Z |
| Demo app | https://expo.dev/@vn.chemgio/rnuilib |

---

## How to activate this skill

From your project root (requires `react-native-ui-lib` to be installed):

```bash
node node_modules/react-native-ui-lib/install-skills.js
```

This copies the `uilib-codegen` skill into `.claude/skills/uilib-codegen/` in your project. Restart Claude Code to activate it.

To make it automatic for your team, add to your `package.json`:

```json
{
  "scripts": {
    "postinstall": "node node_modules/react-native-ui-lib/install-skills.js"
  }
}
```
