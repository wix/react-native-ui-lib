import {updateConstants} from '../../../helpers/Constants';

describe('FeatureHighlight', () => {
  let FeatureHighlight;

  beforeEach(() => {
    mockScreenDimentions();
    FeatureHighlight = require('../index').default;
  });

  describe('getContentPosition', () => {
    it('massage should be placed above element positioned below screen\'s vertical center', () => {
      const uut = new FeatureHighlight({});
      uut.state = {
        contentTopPosition: 0
      };
      uut.targetPosition = {left: 0, top: 500, width: 80, height: 80};
      uut.didLayout = true;
      expect(uut.getContentPosition()).toEqual(218);
    });
    it('massage should be placed below element positioned above screen\'s vertical center', () => {
      const uut = new FeatureHighlight({minimumRectSize: {width: 56, height: 56}, innerPadding: 10});
      uut.state = {
        contentTopPosition: 0
      };
      uut.targetPosition = {left: 0, top: 200, width: 20, height: 20};
      uut.didLayout = true;
      expect(uut.getContentPosition()).toEqual(243);
    });
    it('massage should be placed below element positioned above screen\'s vertical center', () => {
      const uut = new FeatureHighlight({minimumRectSize: {width: 56, height: 56}, innerPadding: 10});
      uut.state = {
        contentTopPosition: 0
      };
      uut.targetPosition = {left: 0, top: 200, width: 80, height: 80};
      uut.didLayout = true;
      expect(uut.getContentPosition()).toEqual(290);
    });
  });

  describe('setTargetPosition', () => {
    it('targetPosition should be equal to component position', () => {
      // Arrange
      const mockTarget = {measureInWindow: jest.fn()};
      const getTargetMock = jest.fn();
      getTargetMock.mockReturnValue(mockTarget);
      const uut = new FeatureHighlight({getTarget: getTargetMock});
      jest.spyOn(uut, 'findTargetNode').mockImplementation(() => 23);
      jest.spyOn(uut, 'setState').mockImplementation(() => {});
      jest.useFakeTimers();

      // Act
      uut.setTargetPosition();

      // Assert
      expect(uut.findTargetNode).toHaveBeenCalledWith(mockTarget);
      expect(uut.setState).toHaveBeenCalledWith({node: 23});

      expect(mockTarget.measureInWindow).not.toBeCalled();
      // expect(setTimeout).toHaveBeenCalledTimes(0);
      jest.runAllTimers();
      // jest.advanceTimersByTime(0); // available in Jest 21
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(mockTarget.measureInWindow).toBeCalled();
    });
  });

  describe('setTargetPosition', () => {
    it('targetPosition should be equal to component position', () => {
      // Arrange
      const mockTarget = {measureInWindow: jest.fn()};
      const getTargetMock = jest.fn();
      getTargetMock.mockReturnValue(mockTarget);
      const uut = new FeatureHighlight({getTarget: getTargetMock});
      jest.spyOn(uut, 'findTargetNode').mockImplementation(() => 23);
      jest.spyOn(uut, 'setState').mockImplementation(() => {});
      jest.useFakeTimers();

      // Act
      uut.setTargetPosition();

      // Assert
      expect(uut.findTargetNode).toHaveBeenCalledWith(mockTarget);
      expect(uut.setState).toHaveBeenCalledWith({node: 23});

      expect(mockTarget.measureInWindow).not.toBeCalled();
      // expect(setTimeout).toHaveBeenCalledTimes(0);
      jest.runAllTimers();
      // jest.advanceTimersByTime(0); // available in Jest 21
      expect(setTimeout).toHaveBeenCalledTimes(1);
      expect(mockTarget.measureInWindow).toBeCalled();
    });
  });
});

function mockScreenDimentions() {
  // iPhone 8
  const dimensions = {
    screen: {height: 667, width: 375},
    window: {height: 1000, width: 1000}
  };
  updateConstants(dimensions);
}
