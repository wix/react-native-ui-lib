import React from 'react';
import renderer from 'react-test-renderer';
import Button from '../index';
import {Colors, ThemeManager} from '../../../style';
import {Constants} from '../../../helpers';

describe('Button', () => {
  beforeEach(() => {
    ThemeManager.setComponentTheme('Button', {});
    mockIOS();
  });

  it('should render default button', () => {
    const tree = renderer.create(<Button label="Button"/>).toJSON();
    expect(tree).toMatchSnapshot();
  });

  describe('outline', () => {
    it('should render button with an outline', () => {
      const tree = renderer.create(<Button label="Button" outline/>).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render button with an outlineColor', () => {
      const tree = renderer.create(<Button label="Button" outlineColor={'blue'}/>).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should render button with outline and outlineColor', () => {
      const tree = renderer.create(<Button label="Button" outline outlineColor={'blue'}/>).toJSON();
      expect(tree).toMatchSnapshot();
    });

    ///

    it('should return undefined when link is true, even when outline is true', () => {
      const tree = renderer.create(<Button label="Button" outline link/>).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should return disabled color for outline if button is disabled', () => {
      const tree = renderer.create(<Button label="Button" outline disabled/>).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should return custom borderWidth according to outlineWidth passed', () => {
      const tree = renderer.create(<Button label="Button" outline outlineWidth={3}/>).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('link', () => {
    it('should render button as a link', () => {
      const tree = renderer.create(<Button label="Button" link/>).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('backgroundColor', () => {
    it('should return defined theme backgroundColor', () => {
      ThemeManager.setComponentTheme('Button', {
        backgroundColor: Colors.purple40
      });
      const tree = renderer.create(<Button label="Button"/>).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should return backgroundColor according to prop value', () => {
      const tree = renderer.create(<Button label="Button" backgroundColor={'red'}/>).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should return backgroundColor according to modifier', () => {
      const tree = renderer.create(<Button label="Button" bg-orange30/>).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should return undefined if this button is outline', () => {
      const tree = renderer.create(<Button label="Button" backgroundColor="blue" outline/>).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should return undefined if this button is link', () => {
      const tree = renderer.create(<Button label="Button" bg-orange30 link/>).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should return theme disabled color if button is disabled', () => {
      const tree = renderer.create(<Button label="Button" bg-orange30 disabled/>).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  // describe('activeBackgroundColor', () => {
  //   it('should return undefined by default', () => {
  //     const uut = new Button({});
  //     expect(uut.getActiveBackgroundColor()).toBe(undefined);
  //   });

  //   it('should return value according to getActiveBackgroundColor callback prop', () => {
  //     const getActiveBackgroundColor = () => 'red';
  //     const uut = new Button({getActiveBackgroundColor});
  //     expect(uut.getActiveBackgroundColor()).toBe('red');
  //   });
  // });

  describe('labelColor', () => {
    it('should return Theme linkColor color for link', () => {
      ThemeManager.setComponentTheme('Button', {
        linkColor: Colors.yellow40
      });
      const tree = renderer.create(<Button label="Button" link/>).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should return linkColor color for link', () => {
      const tree = renderer.create(<Button label="Button" link linkColor={Colors.orange50}/>).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should return color according to color modifier', () => {
      const tree = renderer.create(<Button label="Button" red10/>).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should return color according to color prop', () => {
      const tree = renderer.create(<Button label="Button" red30 color="green"/>).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should return disabled text color according to theme for link/outline button', () => {
      const tree = renderer.create(<Button label="Button" color="green" link disabled/>).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should return undefined color if this is an icon button (without label)', () => {
      const tree = renderer.create(<Button iconSource={12}/>).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('label size', () => {
    it('should return style for large button', () => {
      const tree = renderer.create(<Button label="Button" size={'large'}/>).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should return style for medium button', () => {
      const tree = renderer.create(<Button label="Button" size={'medium'}/>).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should return style for small button', () => {
      const tree = renderer.create(<Button label="Button" size={'small'}/>).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should return style for xSmall button', () => {
      const tree = renderer.create(<Button label="Button" size={'xSmall'}/>).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('border radius', () => {
    it('should return given border radius when use plain number', () => {
      const tree = renderer.create(<Button label="Button" borderRadius={12}/>).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should return 0 border radius when border radius prop is 0', () => {
      const tree = renderer.create(<Button label="Button" borderRadius={0}/>).toJSON();
      expect(tree).toMatchSnapshot();
    });

    it('should return 0 border radius when button is full width', () => {
      const tree = renderer.create(<Button label="Button" fullWidth/>).toJSON();
      expect(tree).toMatchSnapshot();
    });
  });

  describe('container size', () => {
    it('should return style for large button', () => {
      expect(renderer.create(<Button label="Button" size="large"/>).toJSON()).toMatchSnapshot();
      expect(renderer.create(<Button label="Button" size="large" outline/>).toJSON()).toMatchSnapshot();
    });

    it('should return style for medium button', () => {
      expect(renderer.create(<Button label="Button" size="medium"/>).toJSON()).toMatchSnapshot();
      expect(renderer.create(<Button label="Button" size="medium" outline/>).toJSON()).toMatchSnapshot();
    });

    it('should return style for small button', () => {
      expect(renderer.create(<Button label="Button" size="small"/>).toJSON()).toMatchSnapshot();
      expect(renderer.create(<Button label="Button" size="small" outline/>).toJSON()).toMatchSnapshot();
    });

    it('should return style for xSmall button', () => {
      expect(renderer.create(<Button label="Button" size="xSmall"/>).toJSON()).toMatchSnapshot();
      expect(renderer.create(<Button label="Button" size="xSmall" outline/>).toJSON()).toMatchSnapshot();
    });

    it('should reduce padding by outlineWidth in case of outline button', () => {
      expect(renderer.create(<Button label="Button" size="large" outline outlineWidth={2}/>).toJSON()).toMatchSnapshot();
    });

    it('should avoid minWidth limitation if avoidMinWidth was sent', () => {
      expect(renderer.create(<Button label="Button" size="medium" avoidMinWidth/>).toJSON()).toMatchSnapshot();
    });

    it('should have no padding of button is a link nor min width', () => {
      expect(renderer.create(<Button label="Button" size="medium" link/>).toJSON()).toMatchSnapshot();
    });

    it('should have no padding of button is an icon button', () => {
      expect(renderer.create(<Button label="Button" size="medium" iconSource={14}/>).toJSON()).toMatchSnapshot();
    });

    it('should have no padding if avoidInnerPadding prop was sent', () => {
      expect(renderer.create(<Button label="Button" size="medium" avoidInnerPadding/>).toJSON()).toMatchSnapshot();
    });

    it('should return style for round button', () => {
      expect(renderer.create(<Button label="Button" round/>).toJSON()).toMatchSnapshot();
    });
  });

  describe('icon', () => {
    it('should return the right spacing according to button size when label exists and icon on the right', () => {
      expect(renderer.create(<Button label="Button" size="large" iconOnRight/>).toJSON()).toMatchSnapshot();
      expect(renderer.create(<Button label="Button" size="medium" iconOnRight/>).toJSON()).toMatchSnapshot();
      expect(renderer.create(<Button label="Button" size="small" iconOnRight/>).toJSON()).toMatchSnapshot();
      expect(renderer.create(<Button label="Button" size="xSmall" iconOnRight/>).toJSON()).toMatchSnapshot();
    });

    it('should apply color on icon', () => {
      expect(renderer.create(<Button iconSource={12} color={'green'}/>).toJSON()).toMatchSnapshot();
      expect(renderer.create(<Button iconSource={12} red30/>).toJSON()).toMatchSnapshot();
    });

    it('should return icon style according to different variations', () => {
      expect(renderer.create(<Button iconSource={12} outline/>).toJSON()).toMatchSnapshot();
      expect(renderer.create(<Button iconSource={12} link/>).toJSON()).toMatchSnapshot();
      expect(renderer.create(<Button iconSource={12} disabled/>).toJSON()).toMatchSnapshot();
    });

    it('should include custom iconStyle provided as a prop', () => {
      expect(renderer.create(<Button iconSource={12} iconStyle={{marginRight: 9, tintColor: 'red'}}/>).toJSON()).toMatchSnapshot();
    });
  });
});

function mockIOS() {
  Constants.isIOS = true;
  Constants.isAndroid = false;
}
