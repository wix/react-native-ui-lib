import usePresenter from '../usePresenter';
import {renderHook} from '@testing-library/react-hooks';

describe('WheelPicker presenter tests', () => {
  
  const makeSUT = ({selectedValue, items = makeItems(9), children, itemHeight = 10, preferredNumVisibleRows = 20}) => {
    return renderHook(() =>
      usePresenter({
        selectedValue,
        items,
        children,
        itemHeight,
        preferredNumVisibleRows
      }));
  };

  const makeItems = (count, stringValue) => {
    const items = [];
    while (count >= items.length) {
      const someData = stringValue ? (stringValue + items.length) : items.length;
      const item = {value: someData, label: someData};
      items.push(item);
    }
    return items;
  };

  it('expect height of the content-view to be itemHeight * preferredNumVisibleRows', () => {
    let sut = makeSUT({items: makeItems(44), itemHeight: 10, preferredNumVisibleRows: 5});
    expect(sut.result.current.height).toEqual(50);
    
    sut = makeSUT({items: makeItems(10), itemHeight: 20, preferredNumVisibleRows: 3});
    expect(sut.result.current.height).toEqual(60);
    
    sut = makeSUT({items: makeItems(10), itemHeight: 0, preferredNumVisibleRows: 0});
    expect(sut.result.current.height).toEqual(0);
  });

  it('Expect to find items by their string types', () => {
    let sut = makeSUT({items: makeItems(15, 'a'), selectedValue: 'a2'});
    expect(sut.result.current.index).toEqual(2);

    sut = makeSUT({items: makeItems(100, 'bbb'), selectedValue: 'bbb71'});
    expect(sut.result.current.index).toEqual(71);

    // no data found
    sut = makeSUT({items: makeItems(10, 'b'), selectedValue: '$$$'});
    expect(sut.result.current.index).toEqual(-1);
  });

  it('Expect to find items by their number types', () => {
    let sut = makeSUT({items: makeItems(11), selectedValue: 0});
    expect(sut.result.current.index).toEqual(0);

    sut = makeSUT({items: makeItems(8), selectedValue: 4});
    expect(sut.result.current.index).toEqual(4);

    sut = makeSUT({items: makeItems(18), selectedValue: 18});
    expect(sut.result.current.index).toEqual(18);
    
    sut = makeSUT({items: makeItems(18), selectedValue: 99});
    expect(sut.result.current.index).toEqual(-1);

    sut = makeSUT({items: makeItems(0), selectedValue: 99});
    expect(sut.result.current.index).toEqual(-1);
    
    sut = makeSUT({items: makeItems(0), selectedValue: 0});
    expect(sut.result.current.index).toEqual(0);
  });

  it('Expect to find items by their object of {value, label} types', () => {
    const {result} = makeSUT({items: makeItems(15, 'b'), selectedValue: {value: 'b6', label: 'abc'}});
    expect(result.current.index).toEqual(6);
  });

  it('Expect component to be controlled and not change by offset', () => {
    const {result} = makeSUT({selectedValue: 2, itemHeight: 100});
    
    let offset = 300;
    expect(result.current.shouldControlComponent(offset)).toEqual(true);
    
    offset = 200;
    expect(result.current.shouldControlComponent(offset)).toEqual(false);
  });

  it('Expect getRowItemAtOffset to return the right row for offset', () => {
    let sut = makeSUT({selectedValue: 2, itemHeight: 100});
    
    let offset = 300;
    expect(sut.result.current.getRowItemAtOffset(offset).value).toEqual(3);

    sut = makeSUT({selectedValue: 0, itemHeight: 100});
    offset = 0;
    expect(sut.result.current.getRowItemAtOffset(offset).value).toEqual(0);
  });
});
