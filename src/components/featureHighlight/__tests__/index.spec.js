import {updateConstants} from '../../../helpers/Constants';
import {testable as FeatureHighlight} from '../';

describe('FeatureHighlight', () => {

  beforeEach(() => {
    mockScreenDimentions();
  });

  describe('getContentPosition', () => {
    it('massage should be placed above element positioned below screen\'s vertical center', () => {
      const uut = new FeatureHighlight({visible: true});
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
      jest.spyOn(FeatureHighlight, 'getDerivedStateFromProps');
      jest.spyOn(FeatureHighlight, 'findTargetNode').mockImplementation(() => 23);

      jest.useFakeTimers();

      // Act
      FeatureHighlight.getDerivedStateFromProps({getTarget: getTargetMock});
      uut.setTargetPosition({getTarget: getTargetMock});

      // Assert
      expect(FeatureHighlight.getDerivedStateFromProps).toHaveBeenCalledWith({getTarget: getTargetMock});
      expect(mockTarget.measureInWindow).not.toBeCalled();
      expect(FeatureHighlight.findTargetNode).toHaveBeenCalledWith(mockTarget);

      jest.runAllTimers();
      
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
