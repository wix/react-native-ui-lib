import FeatureHighlight from '../index';
import {Constants} from '../../../helpers';

describe('FeatureHighlight', () => {
  beforeEach(() => {
    mockScreenDimentions();
  });

  describe('getContentPositionStyle', () => {
    it('massage should be placed above element positioned below screen\'s vertical center', () => {
      const uut = new FeatureHighlight({});
      uut.state = {
        targetPosition: {left: 0, top: 500, width: 80, height: 80},
        viewHeight: 200,
      };
      console.log('INBAL screenHeight', Constants.screenHeight);
      expect(uut.getContentPositionStyle()).toEqual({top: 300});
    });
    it('massage should be placed below element positioned above screen\'s vertical center', () => {
      const uut = new FeatureHighlight({});
      uut.state = {
        targetPosition: {left: 0, top: 200, width: 80, height: 80},
        viewHeight: 200,
      };
      console.log('INBAL screenHeight', Constants.screenHeight);
      expect(uut.getContentPositionStyle()).toEqual({top: 280});
    });
  });
});

function mockScreenDimentions() {
  // iPhone 8
  Constants.screenWidth = 375;
  Constants.screenHeight = 667;
}
