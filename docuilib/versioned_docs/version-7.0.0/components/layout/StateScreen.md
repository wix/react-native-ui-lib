---
id: StateScreen
title: StateScreen
sidebar_label: StateScreen
---

Component that shows a full screen for a certain state, like an empty state  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/EmptyStateScreen.tsx)
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}><img style={{maxHeight: '420px'}} src={'https://user-images.githubusercontent.com/33805983/34672894-f262ab84-f488-11e7-83f0-4ee0f0ac34ba.png'}/>

</div>

### Usage
``` jsx live
<StateScreen
  title={'Title'}
  subtitle={'Subtitle'}
  ctaLabel={'Done'}
  imageSource={source}
/>
```
## API
### ctaLabel
Text to to show in the CTA button
`string ` 

### imageSource
The image source that's showing at the top. use an image that was required locally
`ImageURISource ` 

### onCtaPress
Action handler for CTA button
`() => void ` 

### testID
Use to identify the container in tests
`string ` 

### title
To to show as the title
`string ` 


