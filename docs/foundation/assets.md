---
sidebar_position: 3
sidebar_label: Assets
title: "Assets"
---

Assets are fundamental building blocks in UI systems, encompassing icons, placeholders, and illustrations that enhance the user interface. The Assets system allows you to efficiently manage and render these resources using the _Image_ component.

```javascript
import {Assets, Image} from 'react-native-ui-lib';

// Load a simple asset group
Assets.loadAssetsGroup('icons', {
  icon1: require('icon1.png'),
  icon2: require('icon2.png'),
  icon3: require('icon3.png'),
});

// Load nested asset groups for better organization
Assets.loadAssetsGroup('illustrations.placeholders', {
  emptyCart: require('emptyCart.png'),
  emptyProduct: require('emptyProduct.png'),
});
Assets.loadAssetsGroup('illustrations.emptyStates.', {
  noMessages: require('noMessages.png'),
  noContacts: require('noContacts.png'),
});
```

Render assets in your components:
```jsx
// Using the Image component with asset references
<Image assetName="icon1"/> // icons is the default assetGroup
<Image assetName="emptyCart" assetGroup="illustrations.placeholders"/>

// Direct asset reference
<Image source={Assets.icons.icon1}/>
```
