import React from 'react';
import {SafeAreaView, Text} from 'react-native';
import {render} from '@testing-library/react-native';
import {Constants} from '../../../commons/new';
import Toast from '../index';

const renderHiddenToastWithAttachment = () =>
  render(<Toast visible={false} testID="toast" renderAttachment={() => <Text testID="attachment">Attachment</Text>}/>);

describe('Toast attachment with Liquid Glass', () => {
  let liquidGlass: jest.SpyInstance;

  beforeEach(() => {
    liquidGlass = jest.spyOn(Constants, 'isLiquidGlass', 'get').mockReturnValue(true);
  });

  afterEach(() => {
    liquidGlass.mockRestore();
  });

  it('should keep the hidden attachment inside the safe area', () => {
    const {UNSAFE_queryByType, getByTestId} = renderHiddenToastWithAttachment();
    expect(getByTestId('attachment')).toBeTruthy();
    expect(UNSAFE_queryByType(SafeAreaView)).toBeTruthy();
  });

  it('should render the hidden attachment in a plain view when Liquid Glass is off', () => {
    liquidGlass.mockReturnValue(false);
    const {UNSAFE_queryByType, getByTestId} = renderHiddenToastWithAttachment();
    expect(getByTestId('attachment')).toBeTruthy();
    expect(UNSAFE_queryByType(SafeAreaView)).toBeNull();
  });
});
