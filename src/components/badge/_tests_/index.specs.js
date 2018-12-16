import {Badge} from 'react-native-ui-lib';//eslint-disable-line

describe('Badge Label formatter', () => {
  it('Should return the original label is NaN', () => {
    const uut = new Badge({});
    expect(uut).toBe(false);
  });
