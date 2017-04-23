// import React from 'react';
// import {shallow} from 'enzyme';
import Button from '../index';
import {Colors, Typography, ThemeManager} from '../../../style';

describe('Button', () => {
  describe('getBackgroundColor', () => {
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
      expect(uut.getBackgroundColor()).toEqual(undefined);
    });

    it('should return undefined if this button is link', () => {
      const uut = new Button({'bg-orange30': true, link: true});
      expect(uut.getBackgroundColor()).toEqual(undefined);
    });

    it('should return theme disabled color if button is disabled', () => {
      const uut = new Button({'bg-orange30': true, disabled: true});
      expect(uut.getBackgroundColor()).toEqual(ThemeManager.CTADisabledColor);
    });
  });

  describe('getLabelColor', () => {
    it('should return theme ctaTextColor by default', () => {
      const uut = new Button({});
      expect(uut.getLabelColor()).toEqual(ThemeManager.CTATextColor);
    });

    it('should return dark10 color for link', () => {
      const uut = new Button({link: true});
      expect(uut.getLabelColor()).toEqual(Colors.dark10);
    });

    it('should return dark10 color for outline', () => {
      const uut = new Button({outline: true});
      expect(uut.getLabelColor()).toEqual(Colors.dark10);
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
  });

  describe('getLabelSizeStyle', () => {
    it('should return style for large button', () => {
      const uut = new Button({size: 'large'});
      expect(uut.getLabelSizeStyle()).toEqual({paddingHorizontal: 36});
    });

    it('should return style for medium button', () => {
      const uut = new Button({size: 'medium'});
      expect(uut.getLabelSizeStyle()).toEqual({paddingHorizontal: 24, ...Typography.text80});
    });

    it('should return style for small button', () => {
      const uut = new Button({size: 'small'});
      expect(uut.getLabelSizeStyle()).toEqual({paddingHorizontal: 15, ...Typography.text80});
    });

    it('should have no padding of button is a link', () => {
      const uut = new Button({size: 'medium', link: true});
      expect(uut.getLabelSizeStyle()).toEqual({paddingHorizontal: 0, ...Typography.text80});
    });
  });
});
