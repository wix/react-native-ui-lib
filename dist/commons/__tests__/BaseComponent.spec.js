

var _BaseComponent=require('../BaseComponent');var _BaseComponent2=_interopRequireDefault(_BaseComponent);
var _style=require('../../style');function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}

describe('BaseComponent',function(){
describe('background modifiers',function(){
it('should return color value according to background-?? prop that was sent',function(){
var uut=new _BaseComponent2.default({'background-red30':true});
expect(uut.extractBackgroundColorValue()).toBe(_style.Colors.red30);
uut=new _BaseComponent2.default({'bg-red30':true});
expect(uut.extractBackgroundColorValue()).toBe(_style.Colors.red30);
});

it('should return undefined value for unfamiliar color const',function(){
var uut=new _BaseComponent2.default({'background-uknown30':true});
expect(uut.extractBackgroundColorValue()).toBe(undefined);
});
});

describe('paddings modifiers',function(){
it('should return paddings values  according to padding?-?? prop that was sent',function(){
var uut=new _BaseComponent2.default({
'padding-25':true,
'paddingL-15':true,
'paddingT-10':true,
'paddingR-20':true,
'paddingB-15':true,
'paddingH-20':true,
'paddingV-15':true});

expect(uut.extractPaddingValues()).toEqual({
padding:25,
paddingLeft:15,
paddingTop:10,
paddingRight:20,
paddingBottom:15,
paddingHorizontal:20,
paddingVertical:15});

});

it('should ignore unfamiliar paddings keys',function(){
var uut=new _BaseComponent2.default({'paddings-25':true});
expect(uut.extractPaddingValues()).toEqual({});
});

it('should ignore non numeric padding values',function(){
var uut=new _BaseComponent2.default({'padding-2a5':true});
expect(uut.extractPaddingValues()).toEqual({});
});
});

describe('margins modifiers',function(){
it('should return margins values according to margin?-?? prop that was sent',function(){
var uut=new _BaseComponent2.default({
'margin-25':true,
'marginL-15':true,
'marginT-10':true,
'marginR-20':true,
'marginB-15':true,
'marginH-20':true,
'marginV-15':true});

expect(uut.extractMarginValues()).toEqual({
margin:25,
marginLeft:15,
marginTop:10,
marginRight:20,
marginBottom:15,
marginHorizontal:20,
marginVertical:15});

});

it('should ignore unfamiliar margin keys',function(){
var uut=new _BaseComponent2.default({'margins-25':true});
expect(uut.extractMarginValues()).toEqual({});
});

it('should ignore non numeric margin values',function(){
var uut=new _BaseComponent2.default({'margin-2a5':true});
expect(uut.extractMarginValues()).toEqual({});
});
});

describe('alignments modifiers',function(){
it('should return prop alignment for a row view',function(){
var uut=new _BaseComponent2.default({row:true,left:true});
expect(uut.extractAlignmentsValues()).toEqual({flexDirection:'row',justifyContent:'flex-start'});
uut=new _BaseComponent2.default({row:true,right:true});
expect(uut.extractAlignmentsValues()).toEqual({flexDirection:'row',justifyContent:'flex-end'});
uut=new _BaseComponent2.default({row:true,top:true});
expect(uut.extractAlignmentsValues()).toEqual({flexDirection:'row',alignItems:'flex-start'});
uut=new _BaseComponent2.default({row:true,bottom:true});
expect(uut.extractAlignmentsValues()).toEqual({flexDirection:'row',alignItems:'flex-end'});
uut=new _BaseComponent2.default({row:true,centerH:true});
expect(uut.extractAlignmentsValues()).toEqual({flexDirection:'row',justifyContent:'center'});
uut=new _BaseComponent2.default({row:true,centerV:true});
expect(uut.extractAlignmentsValues()).toEqual({flexDirection:'row',alignItems:'center'});
});

it('should return prop alignment for a column view (default)',function(){
var uut=new _BaseComponent2.default({left:true});
expect(uut.extractAlignmentsValues()).toEqual({alignItems:'flex-start'});
uut=new _BaseComponent2.default({right:true});
expect(uut.extractAlignmentsValues()).toEqual({alignItems:'flex-end'});
uut=new _BaseComponent2.default({top:true});
expect(uut.extractAlignmentsValues()).toEqual({justifyContent:'flex-start'});
uut=new _BaseComponent2.default({bottom:true});
expect(uut.extractAlignmentsValues()).toEqual({justifyContent:'flex-end'});
uut=new _BaseComponent2.default({centerH:true});
expect(uut.extractAlignmentsValues()).toEqual({alignItems:'center'});
uut=new _BaseComponent2.default({centerV:true});
expect(uut.extractAlignmentsValues()).toEqual({justifyContent:'center'});
});

it('should return center alignment for both axis',function(){
var uut=new _BaseComponent2.default({center:true});
expect(uut.extractAlignmentsValues()).toEqual({justifyContent:'center',alignItems:'center'});
uut=new _BaseComponent2.default({row:true,center:true});
expect(uut.extractAlignmentsValues()).
toEqual({flexDirection:'row',justifyContent:'center',alignItems:'center'});
});
});

describe('flex modifiers',function(){
it('should return flex value according to flex-? prop',function(){
var uut=new _BaseComponent2.default({'flex-2':true});
expect(uut.extractFlexValue()).toEqual(2);
uut=new _BaseComponent2.default({'flex-0':true});
expect(uut.extractFlexValue()).toEqual(0);
uut=new _BaseComponent2.default({});
expect(uut.extractFlexValue()).toEqual(undefined);
});

it('should return 1 flex value according when only flex sent',function(){
var uut=new _BaseComponent2.default({flex:true});
expect(uut.extractFlexValue()).toEqual(1);
uut=new _BaseComponent2.default({'flex-':true});
expect(uut.extractFlexValue()).toEqual(1);
});

it('should ignore non numeric values',function(){
var uut=new _BaseComponent2.default({'flex-1a2':true});
expect(uut.extractFlexValue()).toEqual(undefined);
});
});
});