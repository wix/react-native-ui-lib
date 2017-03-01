import React from 'react';
import {shallow} from 'enzyme';
import Picker from '../../../../src/components/picker';

describe('components/PickerPresenter', () => {
  let uut;
  beforeEach(() => {
    uut = shallow(<Picker selectedValue="value"/>);
    uut = new Picker({selectedValue: 'value'});
  });

  it('should initialise state with selectedValue', () => {
    expect(uut.state.selectedValue).toBe('value');
    expect(uut.state.showModal).toBe(false);
  });

  // it('should togglePickerModal change showModal in state', async () => {
  //   expect(uut.state.showModal).toBe(false);
  //   await uut.togglePickerModal(true);
  //   expect(uut.state.showModal).toBe(true);
  // });
});
