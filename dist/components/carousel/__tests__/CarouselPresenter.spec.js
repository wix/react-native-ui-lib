var _CarouselPresenter=require('../CarouselPresenter');var uut=_interopRequireWildcard(_CarouselPresenter);function _interopRequireWildcard(obj){if(obj&&obj.__esModule){return obj;}else{var newObj={};if(obj!=null){for(var key in obj){if(Object.prototype.hasOwnProperty.call(obj,key))newObj[key]=obj[key];}}newObj.default=obj;return newObj;}}

describe('Carousel presenter',function(){
it('should getChildrenLength',function(){
expect(uut.getChildrenLength({children:[{},{},{}]})).toBe(3);
expect(uut.getChildrenLength({children:[{}]})).toBe(1);
expect(uut.getChildrenLength({})).toBe(0);
});

it('should calcOffset',function(){
expect(uut.calcOffset({pageWidth:120,children:[{},{},{}]},{currentPage:0})).toBe(120);
expect(uut.calcOffset({pageWidth:120,children:[{},{},{}]},{currentPage:1})).toBe(240);
expect(uut.calcOffset({pageWidth:120,children:[{},{},{}]},{currentPage:2})).toBe(360);
});

it('should calcPageIndex',function(){
expect(uut.calcPageIndex(120,{pageWidth:120,children:[{},{},{}]})).toBe(0);
expect(uut.calcPageIndex(245,{pageWidth:120,children:[{},{},{}]})).toBe(1);
expect(uut.calcPageIndex(481,{pageWidth:120,children:[{},{},{}]})).toBe(0);
expect(uut.calcPageIndex(5,{pageWidth:120,children:[{},{},{}]})).toBe(2);
});

it('should return isOutsideLimits',function(){
expect(uut.isOutOfBounds(120,{pageWidth:120,children:[{},{},{}]})).toBe(false);
expect(uut.isOutOfBounds(1125,{pageWidth:375,children:[{},{},{},{}]})).toBe(false);
expect(uut.isOutOfBounds(0,{pageWidth:120,children:[{},{},{}]})).toBe(true);
expect(uut.isOutOfBounds(481,{pageWidth:120,children:[{},{},{}]})).toBe(true);
expect(uut.isOutOfBounds(1875,{pageWidth:375,children:[{},{},{},{}]})).toBe(true);
});
});