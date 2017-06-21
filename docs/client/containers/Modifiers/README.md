# Modifiers
Modifiers are a great way to quickly generate beautiful layout.

Different components support different modifiers. Using modifiers you can apply styling to your component <br/>
without the hassle of creating StyleSheets and being familiar with all the styling rules (e.g. flex).

## Layout
Whether you want your content to be align to left, right, top or bottom. <br/>
No need to remember the direction flow, or what justify-content means! <br/>
Use these props: <br/>
**row, flex, left, top, right, bottom, row, center, centerH (Horizontal Center), centerV (Vertical Center)**

So for instance, the following example:
```
<View flex>
  <View flex-3 left centerV style={{backgroundColor: '#B2E0FA'}}>
    <Text>ALIGNED TO LEFT</Text>
  </View>
  <View flex-2 center style={{backgroundColor: '#B1E9E9'}}>
    <Text>ALIGNED TO CENTER</Text>
  </View>
  <View flex-3 right centerV style={{backgroundColor: '#F7A997'}}>
    <Text>ALIGNED TO RIGHT</Text>
  </View>
</View>
```

Will generate this layout.. 

<img height="300" src="/assets/images/modifiers-example1.png" alt=""/>

Or we can change the layout to something like this...
```
<View flex row>
  <View flex-3 top centerH style={{backgroundColor: '#B2E0FA'}}>
    <Text text40>ALIGNED TO TOP</Text>
  </View>
  <View flex-2 center style={{backgroundColor: '#B1E9E9'}}>
    <Text text40>ALIGNED TO CENTER</Text>
  </View>
  <View flex-3 bottom centerH style={{backgroundColor: '#F7A997'}}>
    <Text text40>ALIGNED TO BOTTOM</Text>
  </View>
</View>
```
<img className="screenshot" height="300" src="/assets/images/modifiers-example2.png" alt=""/>

So what do we have here? <br/>
- **row** - will apply our view a row (horizontal) layout
- **flex** - will apply our view a flex behavior layout

## Spacing

## Colors

## Typography