import Button from '../index';
import {Colors, BorderRadiuses, Typography, ThemeManager} from '../../../style';
import {Constants} from '../../../helpers';

describe('Button', () => {
  beforeEach(() => {
    ThemeManager.setComponentTheme('Button', {});
    mockIOS();
  });

  describe('isOutline', () => {
    it('should return false when outline or outlineColor props were not sent', () => {
      const uut = new Button({});
      expect(uut.isOutline).toBe(false);
    });

    it('should return true if either outline or outlineColor props were sent', () => {
      expect(new Button({outline: true}).isOutline).toBe(true);
      expect(new Button({outlineColor: 'blue'}).isOutline).toBe(true);
      expect(new Button({outline: true, outlineColor: 'blue'}).isOutline).toBe(true);
    });
  });

  describe('isFilled', () => {
    it('should return true if button is not a link or outline', () => {
      expect(new Button({}).isFilled).toBe(true);
    });

    it('should return false if button is an outline button', () => {
      expect(new Button({outline: true}).isFilled).toBe(false);
      expect(new Button({outlineColor: 'blue'}).isFilled).toBe(false);
    });

    it('should return false if button is a link', () => {
      expect(new Button({link: true}).isFilled).toBe(false);
    });
  });

  describe('getBackgroundColor', () => {
    it('should return by default blue30 color', () => {
      const uut = new Button({});
      expect(uut.getBackgroundColor()).toEqual(Colors.blue30);
    });

    it('should return defined theme backgroundColor', () => {
      ThemeManager.setComponentTheme('Button', {
        backgroundColor: Colors.purple40
      });
      const uut = new Button({});
      expect(uut.getBackgroundColor()).toEqual(Colors.purple40);
    });

    it('should return backgroundColor according to official prop', () => {
      const uut = new Button({backgroundColor: 'red'});
      expect(uut.getBackgroundColor()).toEqual('red');
    });

    it('should return backgroundColor according to modifier', () => {
      const uut = new Button({'bg-orange30': true});
      expect(uut.getBackgroundColor()).toEqual(Colors.orange30);
    });

    it('should return undefined if this button is outline', () => {
      const uut = new Button({backgroundColor: 'blue', outline: true});
      expect(uut.getBackgroundColor()).toEqual('transparent');
    });

    it('should return undefined if this button is link', () => {
      const uut = new Button({'bg-orange30': true, link: true});
      expect(uut.getBackgroundColor()).toEqual('transparent');
    });

    it('should return theme disabled color if button is disabled', () => {
      const uut = new Button({'bg-orange30': true, disabled: true});
      expect(uut.getBackgroundColor()).toEqual(ThemeManager.CTADisabledColor);
    });
  });

  describe('getActiveBackgroundColor', () => {
    it('should return undefined by default', () => {
      const uut = new Button({});
      expect(uut.getActiveBackgroundColor()).toBe(undefined);
    });

    it('should return value according to getActiveBackgroundColor callback prop', () => {
      const getActiveBackgroundColor = () => 'red';
      const uut = new Button({getActiveBackgroundColor});
      expect(uut.getActiveBackgroundColor()).toBe('red');
    });
  });

  describe('getLabelColor', () => {
    it('should return white color by default', () => {
      const uut = new Button({});
      expect(uut.getLabelColor()).toEqual(Colors.white);
    });

    it('should return blue30 color for link', () => {
      const uut = new Button({link: true});
      expect(uut.getLabelColor()).toEqual(Colors.blue30);
    });

    it('should return Theme linkColor color for link', () => {
      ThemeManager.setComponentTheme('Button', {
        linkColor: Colors.yellow40
      });
      const uut = new Button({link: true});
      expect(uut.getLabelColor()).toEqual(Colors.yellow40);
    });

    it('should return linkColor color for link', () => {
      const uut = new Button({link: true, linkColor: Colors.orange50});
      expect(uut.getLabelColor()).toEqual(Colors.orange50);
    });

    it('should return blue30 color for outline by default or the outlineColor passed', () => {
      let uut = new Button({outline: true});
      expect(uut.getLabelColor()).toEqual(Colors.blue30);
      uut = new Button({outline: true, outlineColor: 'red'});
      expect(uut.getLabelColor()).toEqual('red');
    });

    it('should return color according to color modifier', () => {
      const uut = new Button({red10: true});
      expect(uut.getLabelColor()).toEqual(Colors.red10);
    });

    it('should return color according to color prop', () => {
      const uut = new Button({red10: true, color: 'green'});
      expect(uut.getLabelColor()).toEqual('green');
    });

    it('should return disabled text color according to theme for link/outline button', () => {
      const uut = new Button({red10: true, color: 'green', link: true, disabled: true});
      expect(uut.getLabelColor()).toEqual(ThemeManager.CTADisabledColor);
    });

    it('should return dark10 color if this is an icon button (without label)', () => {
      const uut = new Button({iconSource: 12});
      expect(uut.getLabelColor()).toEqual(Colors.dark10);
    });
  });

  describe('getLabelSizeStyle', () => {
    it('should return style for large button', () => {
      const uut = new Button({size: 'large'});
      expect(uut.getLabelSizeStyle()).toEqual({});
    });

    it('should return style for medium button', () => {
      const uut = new Button({size: 'medium'});
      expect(uut.getLabelSizeStyle()).toEqual({...Typography.text80});
    });

    it('should return style for small button', () => {
      const uut = new Button({size: 'small'});
      expect(uut.getLabelSizeStyle()).toEqual({...Typography.text80});
    });

    it('should return style for xSmall button', () => {
      const uut = new Button({size: Button.sizes.xSmall});
      expect(uut.getLabelSizeStyle()).toEqual({...Typography.text80});
    });
  });

  describe('getOutlineStyle', () => {
    it('should return undefined when outline is false', () => {
      const uut = new Button({outline: false});
      expect(uut.getOutlineStyle()).toEqual(undefined);
    });

    it('should return borderWidth style with default borderColor when outline is true', () => {
      const uut = new Button({outline: true});
      expect(uut.getOutlineStyle()).toEqual({borderWidth: 1, borderColor: Colors.blue30});
    });

    it('should return undefined when link is true, even when outline is true', () => {
      const uut = new Button({outline: true, link: true});
      expect(uut.getOutlineStyle()).toEqual(undefined);
    });

    it('should return outlineColor according to prop', () => {
      const uut = new Button({outline: true, outlineColor: 'red'});
      expect(uut.getOutlineStyle()).toEqual({borderWidth: 1, borderColor: 'red'});
    });

    it('should return outline even if only got outlineColor prop', () => {
      const uut = new Button({outlineColor: 'yellow'});
      expect(uut.getOutlineStyle()).toEqual({borderWidth: 1, borderColor: 'yellow'});
    });

    it('should return disabled color for outline if button is disabled', () => {
      const uut = new Button({disabled: true, outline: true});
      expect(uut.getOutlineStyle()).toEqual({borderWidth: 1, borderColor: Colors.dark70});
    });

    it('should return custom borderWidth according to outlineWidth passed', () => {
      const uut = new Button({outline: true, outlineWidth: 3});
      expect(uut.getOutlineStyle()).toEqual({borderWidth: 3, borderColor: Colors.blue30});
    });
  });

  describe('getBorderRadiusStyle', () => {
    it('should return default border radius - br100 when no border radius sent', () => {
      const uut = new Button({});
      expect(uut.getBorderRadiusStyle()).toEqual({borderRadius: BorderRadiuses.br100});
    });

    it('should return given border radius when use plain number', () => {
      const uut = new Button({borderRadius: 12});
      expect(uut.getBorderRadiusStyle()).toEqual({borderRadius: 12});
    });

    it('should return 0 border radius when button is a link', () => {
      const uut = new Button({link: true});
      expect(uut.getBorderRadiusStyle()).toEqual({borderRadius: 0});
    });

    it('should return 0 border radius when button is full width', () => {
      const uut = new Button({fullWidth: true});
      expect(uut.getBorderRadiusStyle()).toEqual({borderRadius: 0});
    });

    it('should return 0 border radius when border radius prop is 0', () => {
      const uut = new Button({borderRadius: 0});
      expect(uut.getBorderRadiusStyle()).toEqual({borderRadius: 0});
    });
  });

  describe('getContainerSizeStyle', () => {
    it('should return style for large button', () => {
      const uut = new Button({size: 'large'});
      const uut2 = new Button({size: 'large', outline: true});
      expect(uut.getContainerSizeStyle()).toEqual({paddingVertical: 9.5, paddingHorizontal: 20, minWidth: 90});
      expect(uut2.getContainerSizeStyle()).toEqual({paddingVertical: 8.5, paddingHorizontal: 19, minWidth: 90});
    });

    it('should return style for medium button', () => {
      const uut = new Button({size: 'medium'});
      const uut2 = new Button({size: 'medium', outline: true});
      expect(uut.getContainerSizeStyle()).toEqual({paddingVertical: 6.5, paddingHorizontal: 16, minWidth: 77});
      expect(uut2.getContainerSizeStyle()).toEqual({paddingVertical: 5.5, paddingHorizontal: 15, minWidth: 77});
    });

    it('should return style for small button', () => {
      const uut = new Button({size: 'small'});
      const uut2 = new Button({size: 'small', outline: true});
      expect(uut.getContainerSizeStyle()).toEqual({paddingVertical: 4.5, paddingHorizontal: 14, minWidth: 70});
      expect(uut2.getContainerSizeStyle()).toEqual({paddingVertical: 3.5, paddingHorizontal: 13, minWidth: 70});
    });

    it('should return style for xSmall button', () => {
      const uut = new Button({size: Button.sizes.xSmall});
      const uut2 = new Button({size: Button.sizes.xSmall, outline: true});
      expect(uut.getContainerSizeStyle()).toEqual({paddingVertical: 3, paddingHorizontal: 11, minWidth: 66});
      expect(uut2.getContainerSizeStyle()).toEqual({paddingVertical: 2, paddingHorizontal: 10, minWidth: 66});
    });

    it('should reduce padding by outlineWidth in case of outline button', () => {
      const uut = new Button({size: Button.sizes.large, outline: true, outlineWidth: 2});
      expect(uut.getContainerSizeStyle()).toEqual({paddingVertical: 7.5, paddingHorizontal: 18, minWidth: 90});
    });

    it('should avoid minWidth limitation if avoidMinWidth was sent', () => {
      const uut = new Button({size: Button.sizes.medium, avoidMinWidth: true});
      expect(uut.getContainerSizeStyle()).toEqual({paddingVertical: 6.5, paddingHorizontal: 16});
    });

    it('should have no padding of button is a link nor min width', () => {
      const uut = new Button({size: 'medium', link: true});
      expect(uut.getContainerSizeStyle()).toEqual({});
    });

    it('should have no padding of button is an icon button', () => {
      const uut = new Button({size: 'medium', iconSource: 14});
      expect(uut.getContainerSizeStyle()).toEqual({});
    });

    it('should have no padding if avoidInnerPadding prop was sent', () => {
      const uut = new Button({size: 'medium', avoidInnerPadding: true});
      expect(uut.getContainerSizeStyle()).toEqual({minWidth: 77});
    });

    it('should return style for round button', () => {
      const uut = new Button({size: 'xSmall', round: true});
      const uut1 = new Button({size: 'small', round: true});
      const uut2 = new Button({size: 'medium', round: true});
      const uut3 = new Button({size: 'large', round: true});
      uut.state = {
        size: 30
      };
      uut1.state = {
        size: 40
      };
      uut2.state = {
        size: 50
      };
      uut3.state = {
        size: 60
      };
      expect(uut.getContainerSizeStyle()).toEqual({height: 30, width: 30, padding: 3});
      expect(uut1.getContainerSizeStyle()).toEqual({height: 40, width: 40, padding: 4.5});
      expect(uut2.getContainerSizeStyle()).toEqual({height: 50, width: 50, padding: 6.5});
      expect(uut3.getContainerSizeStyle()).toEqual({height: 60, width: 60, padding: 9.5});
    });
  });

  describe('getIconStyle', () => {
    it('should return the right spacing according to button size when label exists', () => {
      let uut = new Button({size: Button.sizes.large});
      expect(uut.getIconStyle()).toEqual([{tintColor: Colors.white, marginRight: 8}, undefined]);
      uut = new Button({size: Button.sizes.medium});
      expect(uut.getIconStyle()).toEqual([{tintColor: Colors.white, marginRight: 8}, undefined]);
      uut = new Button({size: Button.sizes.small});
      expect(uut.getIconStyle()).toEqual([{tintColor: Colors.white, marginRight: 4}, undefined]);
      uut = new Button({size: Button.sizes.xSmall});
      expect(uut.getIconStyle()).toEqual([{tintColor: Colors.white, marginRight: 4}, undefined]);
    });

    it('should return the right spacing according to button size when label exists and icon on the right', () => {
      let uut = new Button({size: Button.sizes.large, iconOnRight: true});
      expect(uut.getIconStyle()).toEqual([{tintColor: Colors.white, marginLeft: 8}, undefined]);
      uut = new Button({size: Button.sizes.medium, iconOnRight: true});
      expect(uut.getIconStyle()).toEqual([{tintColor: Colors.white, marginLeft: 8}, undefined]);
      uut = new Button({size: Button.sizes.small, iconOnRight: true});
      expect(uut.getIconStyle()).toEqual([{tintColor: Colors.white, marginLeft: 4}, undefined]);
      uut = new Button({size: Button.sizes.xSmall, iconOnRight: true});
      expect(uut.getIconStyle()).toEqual([{tintColor: Colors.white, marginLeft: 4}, undefined]);
    });

    it('should return icon style according to button size when label exists', () => {
      let uut = new Button({size: Button.sizes.large, disabled: true, outline: true});
      expect(uut.getIconStyle()).toEqual([{marginRight: 8, tintColor: Colors.dark60}, undefined]);
      uut = new Button({size: Button.sizes.large, disabled: true, link: true});
      expect(uut.getIconStyle()).toEqual([{marginRight: 8, tintColor: Colors.dark60}, undefined]);
      uut = new Button({size: Button.sizes.large, disabled: true});
      expect(uut.getIconStyle()).toEqual([{tintColor: Colors.white, marginRight: 8}, undefined]);
    });

    it('should set tintColor according to getLabelColor logic', () => {
      const uut = new Button({size: Button.sizes.large});
      jest.spyOn(uut, 'getLabelColor');
      uut.getLabelColor.mockReturnValue('red');
      expect(uut.getIconStyle()).toEqual([{marginRight: 8, tintColor: 'red'}, undefined]);
    });

    it('should include custom iconStyle provided as a prop', () => {
      let uut = new Button({size: Button.sizes.large, iconStyle: {marginRight: 9, tintColor: 'red'}});
      expect(uut.getIconStyle()).toEqual([
        {marginRight: 8, tintColor: Colors.white},
        {marginRight: 9, tintColor: 'red'}
      ]);
      uut = new Button({size: Button.sizes.large, iconStyle: 123}); // style can be StyleSheet id
      expect(uut.getIconStyle()).toEqual([{marginRight: 8, tintColor: Colors.white}, 123]);
    });
  });
});

function mockIOS() {
  Constants.isIOS = true;
  Constants.isAndroid = false;
}

// function mockAndroid() {
//   Constants.isIOS = false;
//   Constants.isAndroid = true;
// }
