// import React from 'react';
// import {shallow} from 'enzyme';
import BaseComponent from '../BaseComponent';
import {Colors} from '../../style';

describe('BaseComponent', () => {
  describe('background modifiers', () => {
    it('should return color value according to background-?? prop that was sent', () => {
      let uut = new BaseComponent({'background-red30': true});
      expect(uut.extractBackgroundColorValue()).toBe(Colors.red30);
      uut = new BaseComponent({'bg-red30': true});
      expect(uut.extractBackgroundColorValue()).toBe(Colors.red30);
    });

    it('should return undefined value for unfamiliar color const', () => {
      const uut = new BaseComponent({'background-uknown30': true});
      expect(uut.extractBackgroundColorValue()).toBe(undefined);
    });
  });

  describe('paddings modifiers', () => {
    it('should return paddings values  according to padding?-?? prop that was sent', () => {
      const uut = new BaseComponent({
        'padding-25': true,
        'paddingL-15': true,
        'paddingT-10': true,
        'paddingR-20': true,
        'paddingB-15': true,
        'paddingH-20': true,
        'paddingV-15': true,
      });
      expect(uut.extractPaddingValues()).toEqual({
        padding: 25,
        paddingLeft: 15,
        paddingTop: 10,
        paddingRight: 20,
        paddingBottom: 15,
        paddingHorizontal: 20,
        paddingVertical: 15,
      });
    });

    it('should ignore unfamiliar paddings keys', () => {
      const uut = new BaseComponent({'paddings-25': true});
      expect(uut.extractPaddingValues()).toEqual({});
    });

    it('should ignore non numeric padding values', () => {
      const uut = new BaseComponent({'padding-2a5': true});
      expect(uut.extractPaddingValues()).toEqual({});
    });
  });

  describe('margins modifiers', () => {
    it('should return margins values according to margin?-?? prop that was sent', () => {
      const uut = new BaseComponent({
        'margin-25': true,
        'marginL-15': true,
        'marginT-10': true,
        'marginR-20': true,
        'marginB-15': true,
        'marginH-20': true,
        'marginV-15': true,
      });
      expect(uut.extractMarginValues()).toEqual({
        margin: 25,
        marginLeft: 15,
        marginTop: 10,
        marginRight: 20,
        marginBottom: 15,
        marginHorizontal: 20,
        marginVertical: 15,
      });
    });

    it('should ignore unfamiliar margin keys', () => {
      const uut = new BaseComponent({'margins-25': true});
      expect(uut.extractMarginValues()).toEqual({});
    });

    it('should ignore non numeric margin values', () => {
      const uut = new BaseComponent({'margin-2a5': true});
      expect(uut.extractMarginValues()).toEqual({});
    });
  });

  describe('alignments modifiers', () => {
    it('should return prop alignment for a row view', () => {
      let uut = new BaseComponent({row: true, left: true});
      expect(uut.extractAlignmentsValues()).toEqual({flexDirection: 'row', justifyContent: 'flex-start'});
      uut = new BaseComponent({row: true, right: true});
      expect(uut.extractAlignmentsValues()).toEqual({flexDirection: 'row', justifyContent: 'flex-end'});
      uut = new BaseComponent({row: true, top: true});
      expect(uut.extractAlignmentsValues()).toEqual({flexDirection: 'row', alignItems: 'flex-start'});
      uut = new BaseComponent({row: true, bottom: true});
      expect(uut.extractAlignmentsValues()).toEqual({flexDirection: 'row', alignItems: 'flex-end'});
      uut = new BaseComponent({row: true, centerH: true});
      expect(uut.extractAlignmentsValues()).toEqual({flexDirection: 'row', justifyContent: 'center'});
      uut = new BaseComponent({row: true, centerV: true});
      expect(uut.extractAlignmentsValues()).toEqual({flexDirection: 'row', alignItems: 'center'});
    });

    it('should return prop alignment for a column view (default)', () => {
      let uut = new BaseComponent({left: true});
      expect(uut.extractAlignmentsValues()).toEqual({alignItems: 'flex-start'});
      uut = new BaseComponent({right: true});
      expect(uut.extractAlignmentsValues()).toEqual({alignItems: 'flex-end'});
      uut = new BaseComponent({top: true});
      expect(uut.extractAlignmentsValues()).toEqual({justifyContent: 'flex-start'});
      uut = new BaseComponent({bottom: true});
      expect(uut.extractAlignmentsValues()).toEqual({justifyContent: 'flex-end'});
      uut = new BaseComponent({centerH: true});
      expect(uut.extractAlignmentsValues()).toEqual({alignItems: 'center'});
      uut = new BaseComponent({centerV: true});
      expect(uut.extractAlignmentsValues()).toEqual({justifyContent: 'center'});
    });

    it('should return center alignment for both axis', () => {
      let uut = new BaseComponent({center: true});
      expect(uut.extractAlignmentsValues()).toEqual({justifyContent: 'center', alignItems: 'center'});
      uut = new BaseComponent({row: true, center: true});
      expect(uut.extractAlignmentsValues())
        .toEqual({flexDirection: 'row', justifyContent: 'center', alignItems: 'center'});
    });
  });

  describe('flex modifiers', () => {
    it('should return flex value according to flex-? prop', () => {
      let uut = new BaseComponent({'flex-2': true});
      expect(uut.extractFlexValue()).toEqual(2);
      uut = new BaseComponent({'flex-0': true});
      expect(uut.extractFlexValue()).toEqual(0);
      uut = new BaseComponent({});
      expect(uut.extractFlexValue()).toEqual(undefined);
    });

    it('should return 1 flex value according when only flex sent', () => {
      let uut = new BaseComponent({flex: true});
      expect(uut.extractFlexValue()).toEqual(1);
      uut = new BaseComponent({'flex-': true});
      expect(uut.extractFlexValue()).toEqual(1);
    });

    it('should ignore non numeric values', () => {
      const uut = new BaseComponent({'flex-1a2': true});
      expect(uut.extractFlexValue()).toEqual(undefined);
    });
  });
});
