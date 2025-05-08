---
sidebar_position: 2
sidebar_label: Packages
title: "Packages"
# path: "/getting-started/setup"
---

React Native UI Lib offers component-specific packages, allowing you to selectively import only the components you need for your application.

### Benefits of Using Packages
- **Optimized Bundle Size**: Import only the components you need, significantly reducing your application's bundle size and improving performance.
- **Streamlined Setup**: Minimize development overhead by installing and linking only the dependencies required for your specific use case.

### Using Individual Packages
Each component is available as a separate package, allowing for granular imports. Here's how you can import specific components:

```javascript
// Import individual components
import View from 'react-native-ui-lib/view';
import Text from 'react-native-ui-lib/text';

// Import multiple related components
import {
  KeyboardTrackingView,
  KeyboardAwareInsetsView,
  KeyboardRegistry,
  KeyboardAccessoryView,
  KeyboardUtils
} from 'react-native-ui-lib/keyboard';
```

This approach ensures you only include the code you actually use in your application.

