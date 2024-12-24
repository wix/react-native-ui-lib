---
id: Fader
title: Fader
sidebar_label: Fader
---

import UILivePreview from '@site/src/components/UILivePreview';

A gradient fading overlay to render on top of overflowing content (like scroll component)  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/FaderScreen.tsx)
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}><img style={{maxHeight: '420px'}} src={'https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/Fader/Fader.gif?raw=true'}/>

</div>

### Usage
<UILivePreview code={`<Fader visible={isVisible} position={Fader.position.BOTTOM}/>`}/>

## API
### position
The position of the fader (the image is different)
`START | END | TOP | BOTTOM ` 

### size
change the size of the fade view
`number ` 

### tintColor
Change the tint color of the fade view
`string ` 

### visible
Whether the fader is visible (default is true)
`boolean ` 


