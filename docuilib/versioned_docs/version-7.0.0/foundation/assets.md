---
sidebar_position: 3
sidebar_label: Assets
title: "Assets"
---

Assets are a big part of the whole UI system, whether it's an icon, placeholder or an illustration, we use them everywhere.  
Load groups of assets and easily render them with the _Image_ component.

```javascript
import {Assets, Image} from 'react-native-ui-lib';

Assets.loadAssetsGroup('icons', {
  icon1: require('icon1.png'),
  icon2: require('icon2.png'),
  icon3: require('icon3.png'),
});

// or as a nested group to create your own hierarchy
Assets.loadAssetsGroup('illustrations.placeholders', {
  emptyCart: require('emptyCart.png'),
  emptyProduct: require('emptyProduct.png'),
});
Assets.loadAssetsGroup('illustrations.emptyStates.', {
  noMessages: require('noMessages.png'),
  noContacts: require('noContacts.png'),
});

```

And use them like this
```jsx
// Use them with the Image component (our Image component)
<Image assetName="icon1"/> // default assetGroup is "icons"
<Image assetName="emptyCart" assetGroup="illustrations.placeholders"/>

// The old fashion way will work as well
<Image source={Assets.icons.icon1}/>
```