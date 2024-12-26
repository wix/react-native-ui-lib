---
id: Marquee
title: Marquee
sidebar_label: Marquee
---

Marquee component for sliding text  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/MarqueeScreen.tsx)
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}></div>

### Usage
``` jsx live
<Marquee
  key={`${index}`}
  label={'Hey there'}
  direction={directionHorizontal ? MarqueeDirections.LEFT : MarqueeDirections.RIGHT}
  duration={duration}
  numberOfReps={numOfReps}
  containerStyle={styles.containerStyle}
/>
```
## API
### containerStyle
Custom container style
`ViewProps['style'] ` 

### direction
Marquee direction
`MarqueeDirections ` 

### duration
Marquee animation duration
`number ` 

### label
Marquee label
`string ` 

### labelStyle
Marquee label style
`TextProps['style'] ` 

### numberOfReps
Marquee animation number of repetitions
`number ` 


