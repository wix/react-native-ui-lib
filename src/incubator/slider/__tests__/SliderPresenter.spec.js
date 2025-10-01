import * as uut from "../SliderPresenter";
const trackWidth = 350;
const minimum = 0;
const maximum = 100;
describe('Slider:Presenter', () => {
  describe('getOffsetForValue', () => {
    it('should return 0 for 0', () => {
      expect(uut.getOffsetForValue(0, trackWidth)).toEqual(0);
    });
    it('should return 350 for 1', () => {
      expect(uut.getOffsetForValue(1, trackWidth)).toEqual(350);
    });
    it('should return 175 for 0.5', () => {
      expect(uut.getOffsetForValue(0.5, trackWidth)).toEqual(175);
    });
    it('should return 175 for 50, when minimumValue = 0 and maximumValue = 100', () => {
      expect(uut.getOffsetForValue(50, trackWidth, minimum, maximum)).toEqual(175);
    });
    it('should return 175 for 60, when minimumValue = 20 and maximumValue = 100', () => {
      expect(uut.getOffsetForValue(60, trackWidth, 20, maximum)).toEqual(175);
    });
    it('should return 175 for 60, when minimumValue = 0 and maximumValue = 80', () => {
      expect(uut.getOffsetForValue(40, trackWidth, minimum, 80)).toEqual(175);
    });
  });
  describe('getValueForOffset', () => {
    it('should return 0 for 0', () => {
      expect(uut.getValueForOffset(0, trackWidth)).toEqual(0);
    });
    it('should return 1 for 350', () => {
      expect(uut.getValueForOffset(350, trackWidth)).toEqual(1);
    });
    it('should return 0.5 for 175', () => {
      expect(uut.getValueForOffset(175, trackWidth)).toEqual(0.5);
    });
    it('should return 50 for 175, when minimumValue = 0 and maximumValue = 100', () => {
      expect(uut.getValueForOffset(175, trackWidth, minimum, maximum)).toEqual(50);
    });
    it('should return 60 for 175, when minimumValue = 0 and maximumValue = 100 and step = 20', () => {
      expect(uut.getValueForOffset(175, trackWidth, minimum, maximum, 20)).toEqual(60);
    });
  });
});