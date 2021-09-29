let Scheme;
describe('Scheme', () => {
  beforeEach(() => {
    jest.resetModules();
    Scheme = require('../scheme').default;
  });

  describe('initial values', () => {
    it('should initial schemes be empty objects', () => {
      expect(Scheme.schemes).toEqual({dark: {}, light: {}});
    });

    it('should initial current scheme type be "default"', () => {
      expect(Scheme.currentScheme).toBe('default');
    });

    it('should retrieve actual scheme type (defaulting to "light")', () => {
      expect(Scheme.getSchemeType()).toBe('light');
    });
  });

  describe('setScheme', () => {
    it('should initially be light', () => {
      expect(Scheme.getSchemeType()).toBe('light');
    });
    it('should override default scheme', () => {
      Scheme.setScheme('dark');
      expect(Scheme.getSchemeType()).toBe('dark');
    });

    it('should throw on invalid scheme color', () => {
      expect(() => Scheme.setScheme('yellow')).toThrow(`yellow is invalid colorScheme, please use 'light' | 'dark' | 'default'`);
    });
  });

  describe('getScheme/loadScheme', () => {
    beforeEach(() => {
      Scheme.loadSchemes({
        dark: {
          a: 'black',
          b: 'black'
        },
        light: {
          a: 'white',
          b: 'white'
        }
      });
    });

    it('should return scheme by current scheme type (initially by light)', () => {
      expect(Scheme.getScheme()).toEqual({
        a: 'white',
        b: 'white'
      });
    });

    it('should return correct scheme after setScheme has changed scheme type', () => {
      Scheme.setScheme('dark');
      expect(Scheme.getScheme()).toEqual({
        a: 'black',
        b: 'black'
      });
    });

    it('should throw on missing color keys', () => {
      expect(() => Scheme.loadSchemes({
        dark: {
          a: 'black',
          b: 'black'
        },
        light: {
          a: 'white',
          b: 'white',
          c: 'white'
        }
      })).toThrow(`There is a mismatch in scheme keys: c`);
    });
  });

  describe('scheme change listeners', () => {
    it('should register scheme change listener', () => {
      const listener = jest.fn();
      Scheme.addChangeListener(listener);
      expect(listener).not.toHaveBeenCalled();
      Scheme.setScheme('dark');
      expect(listener).toHaveBeenCalledTimes(1);
    });

    it('should unregister scheme change listener', () => {
      const listener = jest.fn();
      Scheme.addChangeListener(listener);
      Scheme.setScheme('dark');
      expect(listener).toHaveBeenCalledTimes(1);
      Scheme.removeChangeListener(listener);
      Scheme.setScheme('light');
      expect(listener).toHaveBeenCalledTimes(1);
    });

    it('should not be triggered if scheme set to the same type', () => {
      const listener = jest.fn();
      Scheme.addChangeListener(listener);
      Scheme.setScheme('dark');
      expect(listener).toHaveBeenCalledTimes(1);
      Scheme.setScheme('dark');
      expect(listener).toHaveBeenCalledTimes(1);
    });
  });
});
