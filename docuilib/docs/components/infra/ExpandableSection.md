---
id: ExpandableSection
title: ExpandableSection
sidebar_label: ExpandableSection
---

import UILivePreview from '@site/src/components/UILivePreview';

Component to render expanded section below or above the SectionHeader  
[(code example)](https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/ExpandableSectionScreen.tsx)
<div style={{display: 'flex', flexDirection: 'row', overflowX: 'auto', maxHeight: '500px', alignItems: 'center'}}><img style={{maxHeight: '420px'}} src={'https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/ExpandableSection/ExpandableSection.gif?raw=true'}/>

</div>

### Usage
<UILivePreview code={`<ExpandableSection
 top
 expanded={false}
 sectionHeader={<Text grey10 text60>The section header</Text>}
 onPress={() => console.log('pressed')}
>`}/>

## API
### children
The expandable's children
`React.ReactNode ` 

### expanded
Should the ExpandableSection be expanded
`boolean ` 

### minHeight
Set a minimum height for the expandableSection. If the children height is less than the minHeight, the expandableSection will collapse to that height. If the children height is greater than the minHeight, the expandableSection will result with only the children rendered (sectionHeader will not be rendered)
`number ` 

### onPress
Called when pressing the header of the ExpandableSection
`() => void ` 

### sectionHeader
Header element
`JSX.Element ` 

### testID
testing identifier
`string ` 

### top
Should it open above the 'sectionHeader'
`boolean ` 


