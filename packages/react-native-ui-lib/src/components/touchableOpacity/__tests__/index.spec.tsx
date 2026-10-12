import React from 'react';
import {render, screen, userEvent} from '@testing-library/react-native';
import TouchableOpacity from '../index';

const TEST_ID = 'touchable_opacity_test_id';
const LONG_PRESS_DURATION = 600;

describe('TouchableOpacity', () => {
  beforeEach(() => {
    jest.useFakeTimers({legacyFakeTimers: false});
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  const setup = () => userEvent.setup({advanceTimers: jest.advanceTimersByTime});

  describe('without onLongPress', () => {
    it('should call onPress when pressed', async () => {
      const onPress = jest.fn();
      render(<TouchableOpacity testID={TEST_ID} onPress={onPress}/>);

      await setup().press(screen.getByTestId(TEST_ID));

      expect(onPress).toHaveBeenCalledTimes(1);
    });

    it('should call onPress when held for longer than the long press delay', async () => {
      const onPress = jest.fn();
      render(<TouchableOpacity testID={TEST_ID} onPress={onPress}/>);

      await setup().longPress(screen.getByTestId(TEST_ID), {duration: LONG_PRESS_DURATION});

      expect(onPress).toHaveBeenCalledTimes(1);
    });
  });

  describe('with onLongPress', () => {
    it('should call onLongPress and not onPress when held for longer than the long press delay', async () => {
      const onPress = jest.fn();
      const onLongPress = jest.fn();
      render(<TouchableOpacity testID={TEST_ID} onPress={onPress} onLongPress={onLongPress}/>);

      await setup().longPress(screen.getByTestId(TEST_ID), {duration: LONG_PRESS_DURATION});

      expect(onLongPress).toHaveBeenCalledTimes(1);
      expect(onPress).not.toHaveBeenCalled();
    });

    it('should call onPress and not onLongPress when pressed briefly', async () => {
      const onPress = jest.fn();
      const onLongPress = jest.fn();
      render(<TouchableOpacity testID={TEST_ID} onPress={onPress} onLongPress={onLongPress}/>);

      await setup().press(screen.getByTestId(TEST_ID));

      expect(onPress).toHaveBeenCalledTimes(1);
      expect(onLongPress).not.toHaveBeenCalled();
    });
  });
});
