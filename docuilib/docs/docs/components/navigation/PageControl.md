---
id: PageControl
title: PageControl
sidebar_label: PageControl
---

import UILivePreview from '@site/src/components/UILivePreview';

Page indicator, typically used in paged scroll-views  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/PageControlScreen.tsx)
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}><img style={{maxHeight: '420px'}} src={'https://user-images.githubusercontent.com/1780255/107114259-2e278d00-686d-11eb-866c-59f3d410d6c3.gif'}/>

</div>

### Usage
<UILivePreview code={`<PageControl numOfPages={5} currentPage={0}/>`}/>

## API
### color
Color of the selected page dot and, if inactiveColor not passed, the border of the not selected pages
`string ` 

### containerStyle
Additional styles for the top container
`ViewStyle ` 

### currentPage
Zero-based index of the current page
`number ` 

### enlargeActive
Whether to enlarge the active page indicator. Irrelevant when limitShownPages is in effect.
`boolean ` 

### inactiveColor
Color of the unselected page dots and the border of the not selected pages
`string ` 

### limitShownPages
Limit the number of page indicators shown.\enlargeActive prop is disabled in this state, when set to true there will be maximum of 7 shown.\Only relevant when numOfPages > 5.
`boolean ` 

### numOfPages
Total number of pages
`number ` 

### onPagePress
Action handler for clicking on a page indicator
`(index: number) => void ` 

### size
The size of the page indicator.\When setting limitShownPages the medium sized will be 2/3 of size and the small will be 1/3 of size.\An alternative is to send an array [smallSize, mediumSize, largeSize].
`number | [number, number, number] ` 

### spacing
The space between the siblings page indicators
`number ` 

### testID
Used to identify the pageControl in tests
`string ` 


