import usePresenter from "../usePresenter";
import { renderHook } from '@testing-library/react-hooks';
import { DEFAULT_ITEM_SPACINGS, DEFAULT_NUM_COLUMNS } from "../../gridList/useGridLayout";
import { Constants } from "../../../commons/new";
describe('SortableGridList presenter tests', () => {
  const makeSUT = ({
    numOfColumns = DEFAULT_NUM_COLUMNS,
    itemSpacing = DEFAULT_ITEM_SPACINGS
  }) => {
    const itemSize = Constants.screenWidth / numOfColumns;
    return renderHook(() => usePresenter(numOfColumns, itemSize, itemSpacing));
  };
  describe('ltr', () => {
    it('getTranslationByOrderChange', () => {
      let sut = makeSUT({});
      expect(sut.result.current.getTranslationByOrderChange(0, 0)).toEqual({
        x: 0,
        y: 0
      });
      expect(sut.result.current.getTranslationByOrderChange(5, 1)).toEqual({
        x: 16,
        y: 16
      });
      expect(sut.result.current.getTranslationByOrderChange(2, 1)).toEqual({
        x: 16,
        y: 0
      });
      expect(sut.result.current.getTranslationByOrderChange(1, 2)).toEqual({
        x: -16,
        y: 0
      });
      sut = makeSUT({
        numOfColumns: 5
      });
      expect(sut.result.current.getTranslationByOrderChange(0, 0)).toEqual({
        x: 0,
        y: 0
      });
      expect(sut.result.current.getTranslationByOrderChange(5, 1)).toEqual({
        x: -16,
        y: 16
      });
      expect(sut.result.current.getTranslationByOrderChange(2, 1)).toEqual({
        x: 16,
        y: 0
      });
      expect(sut.result.current.getTranslationByOrderChange(1, 2)).toEqual({
        x: -16,
        y: 0
      });
      sut = makeSUT({
        itemSpacing: 30
      });
      expect(sut.result.current.getTranslationByOrderChange(0, 0)).toEqual({
        x: 0,
        y: 0
      });
      expect(sut.result.current.getTranslationByOrderChange(5, 1)).toEqual({
        x: 30,
        y: 30
      });
      expect(sut.result.current.getTranslationByOrderChange(2, 1)).toEqual({
        x: 30,
        y: 0
      });
      expect(sut.result.current.getTranslationByOrderChange(1, 2)).toEqual({
        x: -30,
        y: 0
      });
      sut = makeSUT({
        numOfColumns: 5,
        itemSpacing: 30
      });
      expect(sut.result.current.getTranslationByOrderChange(0, 0)).toEqual({
        x: 0,
        y: 0
      });
      expect(sut.result.current.getTranslationByOrderChange(5, 1)).toEqual({
        x: -30,
        y: 30
      });
      expect(sut.result.current.getTranslationByOrderChange(2, 1)).toEqual({
        x: 30,
        y: 0
      });
      expect(sut.result.current.getTranslationByOrderChange(1, 2)).toEqual({
        x: -30,
        y: 0
      });
    });
    it('getOrderByPosition', () => {
      let sut = makeSUT({});
      expect(sut.result.current.getOrderByPosition(0, 0)).toEqual(0);
      expect(sut.result.current.getOrderByPosition(200, 200)).toEqual(4);
      expect(sut.result.current.getOrderByPosition(0, 200)).toEqual(3);
      expect(sut.result.current.getOrderByPosition(200, 0)).toEqual(1);
      sut = makeSUT({
        numOfColumns: 5
      });
      expect(sut.result.current.getOrderByPosition(0, 0)).toEqual(0);
      expect(sut.result.current.getOrderByPosition(200, 200)).toEqual(6);
      expect(sut.result.current.getOrderByPosition(0, 200)).toEqual(5);
      expect(sut.result.current.getOrderByPosition(200, 0)).toEqual(1);
      sut = makeSUT({
        itemSpacing: 30
      });
      expect(sut.result.current.getOrderByPosition(0, 0)).toEqual(0);
      expect(sut.result.current.getOrderByPosition(200, 200)).toEqual(4);
      expect(sut.result.current.getOrderByPosition(0, 200)).toEqual(3);
      expect(sut.result.current.getOrderByPosition(200, 0)).toEqual(1);
      sut = makeSUT({
        numOfColumns: 5,
        itemSpacing: 30
      });
      expect(sut.result.current.getOrderByPosition(0, 0)).toEqual(0);
      expect(sut.result.current.getOrderByPosition(200, 200)).toEqual(6);
      expect(sut.result.current.getOrderByPosition(0, 200)).toEqual(5);
      expect(sut.result.current.getOrderByPosition(200, 0)).toEqual(1);
    });
  });
  describe('rtl', () => {
    beforeAll(() => Constants.isRTL = true);
    afterAll(() => Constants.isRTL = false);
    it('getTranslationByOrderChange', () => {
      let sut = makeSUT({});
      expect(sut.result.current.getTranslationByOrderChange(0, 0)).toEqual({
        x: -0,
        y: 0
      });
      expect(sut.result.current.getTranslationByOrderChange(5, 1)).toEqual({
        x: -16,
        y: 16
      });
      expect(sut.result.current.getTranslationByOrderChange(2, 1)).toEqual({
        x: -16,
        y: 0
      });
      expect(sut.result.current.getTranslationByOrderChange(1, 2)).toEqual({
        x: 16,
        y: 0
      });
      sut = makeSUT({
        numOfColumns: 5
      });
      expect(sut.result.current.getTranslationByOrderChange(0, 0)).toEqual({
        x: -0,
        y: 0
      });
      expect(sut.result.current.getTranslationByOrderChange(5, 1)).toEqual({
        x: 16,
        y: 16
      });
      expect(sut.result.current.getTranslationByOrderChange(2, 1)).toEqual({
        x: -16,
        y: 0
      });
      expect(sut.result.current.getTranslationByOrderChange(1, 2)).toEqual({
        x: 16,
        y: 0
      });
      sut = makeSUT({
        itemSpacing: 30
      });
      expect(sut.result.current.getTranslationByOrderChange(0, 0)).toEqual({
        x: -0,
        y: 0
      });
      expect(sut.result.current.getTranslationByOrderChange(5, 1)).toEqual({
        x: -30,
        y: 30
      });
      expect(sut.result.current.getTranslationByOrderChange(2, 1)).toEqual({
        x: -30,
        y: 0
      });
      expect(sut.result.current.getTranslationByOrderChange(1, 2)).toEqual({
        x: 30,
        y: 0
      });
      sut = makeSUT({
        numOfColumns: 5,
        itemSpacing: 30
      });
      expect(sut.result.current.getTranslationByOrderChange(0, 0)).toEqual({
        x: -0,
        y: 0
      });
      expect(sut.result.current.getTranslationByOrderChange(5, 1)).toEqual({
        x: 30,
        y: 30
      });
      expect(sut.result.current.getTranslationByOrderChange(2, 1)).toEqual({
        x: -30,
        y: 0
      });
      expect(sut.result.current.getTranslationByOrderChange(1, 2)).toEqual({
        x: 30,
        y: 0
      });
    });
    it('getOrderByPosition', () => {
      let sut = makeSUT({});
      expect(sut.result.current.getOrderByPosition(0, 0)).toEqual(0);
      expect(sut.result.current.getOrderByPosition(-200, 200)).toEqual(4);
      expect(sut.result.current.getOrderByPosition(0, 200)).toEqual(3);
      expect(sut.result.current.getOrderByPosition(-200, 0)).toEqual(1);
      sut = makeSUT({
        numOfColumns: 5
      });
      expect(sut.result.current.getOrderByPosition(0, 0)).toEqual(0);
      expect(sut.result.current.getOrderByPosition(-200, 200)).toEqual(6);
      expect(sut.result.current.getOrderByPosition(0, 200)).toEqual(5);
      expect(sut.result.current.getOrderByPosition(-200, 0)).toEqual(1);
      sut = makeSUT({
        itemSpacing: 30
      });
      expect(sut.result.current.getOrderByPosition(0, 0)).toEqual(0);
      expect(sut.result.current.getOrderByPosition(-200, 200)).toEqual(4);
      expect(sut.result.current.getOrderByPosition(0, 200)).toEqual(3);
      expect(sut.result.current.getOrderByPosition(-200, 0)).toEqual(1);
      sut = makeSUT({
        numOfColumns: 5,
        itemSpacing: 30
      });
      expect(sut.result.current.getOrderByPosition(0, 0)).toEqual(0);
      expect(sut.result.current.getOrderByPosition(-200, 200)).toEqual(6);
      expect(sut.result.current.getOrderByPosition(0, 200)).toEqual(5);
      expect(sut.result.current.getOrderByPosition(-200, 0)).toEqual(1);
    });
  });
});