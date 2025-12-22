import {Assets} from '../Assets';

describe('Assets', () => {
  let assets;

  beforeEach(() => {
    assets = new Assets();
  });

  describe('.loadAssetsGroup(groupName, assets)', () => {
    it('should return the assets object itself', () => {
      expect(assets.loadAssetsGroup('emojis', {})).toBe(assets);
    });

    it('should create nested groups', () => {
      assets.loadAssetsGroup('emojis.ascii', {smile: ':)'});
      expect(assets.emojis.ascii.smile).toBe(':)');
    });

    describe('edge cases', () => {
      it('should throw if group name is not a string', () => {
        expect(() => assets.loadAssetsGroup(42, {})).toThrowErrorMatchingSnapshot();
      });

      it('should throw if assets are not a plain object', () => {
        expect(() => assets.loadAssetsGroup('assets', new class {}())).toThrowErrorMatchingSnapshot();
      });
    });

    describe('when called with empty group name', () => {
      describe('and plain object of assets', () => {
        it('should create root asset groups', () => {
          const emojis = {};
          const icons = {};
          assets.loadAssetsGroup('', {emojis, icons});

          expect(assets.emojis).toBe(emojis);
          expect(assets.icons).toBe(icons);
        });
      });

      describe('and an object with assets getters', () => {
        it('should create lazy root asset groups', () => {
          const emojis = {};
          const heavyIconsModule = {};
          const requireHeavyIcons = jest.fn().mockReturnValue(heavyIconsModule);

          assets.loadAssetsGroup('', {
            emojis,
            get icons() {
              return requireHeavyIcons();
            }
          });

          expect(assets.emojis).toBe(emojis);

          expect(requireHeavyIcons).not.toHaveBeenCalled();
          expect(assets.icons).toBe(heavyIconsModule);
          expect(requireHeavyIcons).toHaveBeenCalled();
        });
      });
    });

    describe('when has a lazy group', () => {
      let iconsModule;

      beforeEach(() => {
        iconsModule = {
          get apply() {
            return './apply.png';
          },
          get back() {
            return './back.png';
          }
        };

        assets.loadAssetsGroup('', {
          get icons() {
            return iconsModule;
          }
        });
      });

      describe('and called with the same group name', () => {
        beforeEach(() => {
          assets.loadAssetsGroup('icons', {
            get back() {
              return './back-dark.png';
            },
            get forward() {
              return './forward-dark.png';
            }
          });
        });

        it('should preserve existing assets upon load', () => {
          expect(assets.icons.apply).toBe('./apply.png');
        });

        it('should overwrite existing assets if they have the same names', () => {
          expect(assets.icons.back).toBe('./back-dark.png');
        });

        it('should append extra assets to the group', () => {
          expect(assets.icons.forward).toBe('./forward-dark.png');
        });
      });
    });
  });
});
