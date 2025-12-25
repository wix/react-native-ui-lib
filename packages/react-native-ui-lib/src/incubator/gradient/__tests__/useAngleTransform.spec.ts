import {_forTesting} from '../useAngleTransform';
const {getStartEndFromAngle} = _forTesting;

describe('useAngleTransform', () => {
  it('getStartEndFromAngle - default', () => {
    expect(getStartEndFromAngle()).toEqual({start: {x: 0.5, y: 1.0}, end: {x: 0.5, y: 0.0}});
  });

  it('getStartEndFromAngle - 0', () => {
    expect(getStartEndFromAngle(0)).toEqual({start: {x: 0.5, y: 1.0}, end: {x: 0.5, y: 0.0}});
  });

  it('getStartEndFromAngle - 45', () => {
    expect(getStartEndFromAngle(45)).toEqual({start: {x: 0.0, y: 1.0}, end: {x: 1.0, y: 0.0}});
  });

  it('getStartEndFromAngle - 90', () => {
    expect(getStartEndFromAngle(90)).toEqual({start: {x: 0.0, y: 0.5}, end: {x: 1.0, y: 0.5}});
  });

  it('getStartEndFromAngle - 135', () => {
    expect(getStartEndFromAngle(135)).toEqual({start: {x: 0.0, y: 0.0}, end: {x: 1.0, y: 1.0}});
  });

  it('getStartEndFromAngle - 180', () => {
    expect(getStartEndFromAngle(180)).toEqual({start: {x: 0.5, y: 0.0}, end: {x: 0.5, y: 1.0}});
  });

  it('getStartEndFromAngle - 225', () => {
    expect(getStartEndFromAngle(225)).toEqual({start: {x: 1.0, y: 0.0}, end: {x: 0.0, y: 1.0}});
  });

  it('getStartEndFromAngle - 270', () => {
    expect(getStartEndFromAngle(270)).toEqual({start: {x: 1.0, y: 0.5}, end: {x: 0.0, y: 0.5}});
  });

  it('getStartEndFromAngle - 315', () => {
    expect(getStartEndFromAngle(315)).toEqual({start: {x: 1.0, y: 1.0}, end: {x: 0.0, y: 0.0}});
  });

  it('getStartEndFromAngle - 360', () => {
    expect(getStartEndFromAngle(360)).toEqual({start: {x: 0.5, y: 1.0}, end: {x: 0.5, y: 0.0}});
  });
});
