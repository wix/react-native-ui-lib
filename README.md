<p align="center">
     <img src="https://user-images.githubusercontent.com/1780255/105469025-56759000-5ca0-11eb-993d-3568c1fd54f4.png" height="250px" style="display:block"/>
</p>
<p align="center">UI Toolset & Components Library for React Native</p>
<p align="center">
     <img src="https://user-images.githubusercontent.com/1780255/105469340-bec47180-5ca0-11eb-8986-3eb986f884d9.jpg"/>
</p>


---
[![Build Status](https://travis-ci.org/wix/react-native-ui-lib.svg?branch=master)](https://travis-ci.org/wix/react-native-ui-lib)
[![npm](https://img.shields.io/npm/v/react-native-ui-lib.svg)](https://www.npmjs.com/package/react-native-ui-lib)
[![NPM Downloads](https://img.shields.io/npm/dm/react-native-ui-lib.svg?style=flat)](https://www.npmjs.com/package/react-native-ui-lib)
 <a href="https://twitter.com/rnuilib"><img src="https://img.shields.io/twitter/follow/rnuilib.svg?style=flat&colorA=1DA1F2&colorB=20303C&label=Follow%20us%20on%20Twitter" alt="Follow on Twitter"></a>


Check out our [Docs](https://wix.github.io/react-native-ui-lib/). <br>
Our [Discord Channel](https://discord.gg/2eW4g6Z)

Download our Expo demo app <br>
<img height="120" src="https://user-images.githubusercontent.com/1780255/76164023-f2171400-6153-11ea-962d-d57b64a08a80.png"> <br>
(You will need the Expo App)


## Installing

See setup instructions [here](https://wix.github.io/react-native-ui-lib/getting-started/setup).

#### New Major Version 5.0
See [breaking changes](https://wix.github.io/react-native-ui-lib/getting-started/v5)

#### For React Native >= 0.60.0
please use `react-native-ui-lib`

#### For React Native < 0.60.0
please use `react-native-ui-lib@^3.0.0`

## Create your own Design System in 3 easy steps

### Step 1
Load your foundations and presets (colors, typography, spacings, etc...)

```
// FoundationConfig.js

import {Colors, Typography, Spacings} from 'react-native-ui-lib';

Colors.loadColors({
  primaryColor: '#2364AA',
  secondaryColor: '#81C3D7',
  textColor: '##221D23',
  errorColor: '#E63B2E',
  successColor: '#ADC76F',
  warnColor: '##FF963C'
});

Typography.loadTypographies({
  heading: {fontSize: 36, fontWeight: '600'},
  subheading: {fontSize: 28, fontWeight: '500'},
  body: {fontSize: 18, fontWeight: '400'},
});

Spacings.loadSpacings({
  page: 20,
  card: 12,
  gridGutter: 16
});

```

### Step 2
Set default configurations to your components

```
// ComponentsConfig.js

import {ThemeManager} from 'react-native-ui-lib';

// with plain object
ThemeManager.setComponentTheme('Card', {
  borderRadius: 8
});

// with a dynamic function
ThemeManager.setComponentTheme('Button', (props, context) => {
  // 'square' is not an original Button prop, but a custom prop that can
  // be used to create different variations of buttons in your app
  if (props.square) {
    return {
      borderRadius: 0
    };
  }
});
```

### Step 3
Use it all together. 
Your configurations will be applied on uilib components so you can use them easily with [modifiers](https://wix.github.io/react-native-ui-lib/foundation/modifiers). 

```
// MyScreen.js

import React, {Component} from 'react';
import {View, Text, Card, Button} from 'react-native-ui-lib';

class MyScreen extends Component {
  render() {
    return (
      <View flex padding-page>
        <Text heading marginB-s4>My Screen</Text>
        <Card height={100} center padding-card marginB-s4>
          <Text body>This is an example card </Text>
        </Card>
        
        <Button label="Button" body bg-primaryColor square></Button>
      </View>
    );
  }
}
```

