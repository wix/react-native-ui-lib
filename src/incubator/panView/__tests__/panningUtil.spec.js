import {Constants} from '../../../helpers';
import {
  PanningDirections,
  DEFAULT_THRESHOLD,
  getTranslation,
  TranslationLock,
  getDismissVelocity,
  getTranslationClamp,
  getTranslationDirectionClamp
} from '../panningUtil';

describe('panningUtil', () => {
  let directions;
  beforeEach(() => {
    directions = [PanningDirections.UP, PanningDirections.DOWN, PanningDirections.LEFT, PanningDirections.RIGHT];
  });

  describe('getTranslation', () => {
    let initialTranslation;
    function runAllDirections(translationLock, currentTranslation) {
      describe('All directions', () => {
        describe('Start at origin', () => {
          beforeEach(() => {
            initialTranslation = {x: 0, y: 0};
          });

          it('Negative event', () => {
            const event = {translationX: -1, translationY: -1};
            const result = getTranslation(event, initialTranslation, directions, {
              translationLock,
              currentTranslation
            });
            expect(result.x).toEqual(event.translationX);
            expect(result.y).toEqual(event.translationY);
          });

          it('No movement event', () => {
            const event = {translationX: 0, translationY: 0};
            const result = getTranslation(event, initialTranslation, directions, {
              translationLock,
              currentTranslation
            });
            expect(result.x).toEqual(event.translationX);
            expect(result.y).toEqual(event.translationY);
          });

          it('Positive event', () => {
            const event = {translationX: 1, translationY: 1};
            const result = getTranslation(event, initialTranslation, directions, {
              translationLock,
              currentTranslation
            });
            expect(result.x).toEqual(event.translationX);
            expect(result.y).toEqual(event.translationY);
          });
        });

        describe('Start at negative', () => {
          beforeEach(() => {
            initialTranslation = {x: -1, y: -1};
          });

          it('Negative event', () => {
            const event = {translationX: -1, translationY: -1};
            const result = getTranslation(event, initialTranslation, directions, {
              translationLock,
              currentTranslation
            });
            expect(result.x).toEqual(event.translationX + initialTranslation.x);
            expect(result.y).toEqual(event.translationY + initialTranslation.y);
          });

          it('No movement event', () => {
            const event = {translationX: 0, translationY: 0};
            const result = getTranslation(event, initialTranslation, directions, {
              translationLock,
              currentTranslation
            });
            expect(result.x).toEqual(event.translationX + initialTranslation.x);
            expect(result.y).toEqual(event.translationY + initialTranslation.y);
          });

          it('Positive event', () => {
            const event = {translationX: 1, translationY: 1};
            const result = getTranslation(event, initialTranslation, directions, {
              translationLock,
              currentTranslation
            });
            expect(result.x).toEqual(event.translationX + initialTranslation.x);
            expect(result.y).toEqual(event.translationY + initialTranslation.y);
          });
        });

        describe('Start at positive', () => {
          beforeEach(() => {
            initialTranslation = {x: 1, y: 1};
          });

          it('Negative event', () => {
            const event = {translationX: -1, translationY: -1};
            const result = getTranslation(event, initialTranslation, directions, {
              translationLock,
              currentTranslation
            });
            expect(result.x).toEqual(event.translationX + initialTranslation.x);
            expect(result.y).toEqual(event.translationY + initialTranslation.y);
          });

          it('No movement event', () => {
            const event = {translationX: 0, translationY: 0};
            const result = getTranslation(event, initialTranslation, directions, {
              translationLock,
              currentTranslation
            });
            expect(result.x).toEqual(event.translationX + initialTranslation.x);
            expect(result.y).toEqual(event.translationY + initialTranslation.y);
          });

          it('Positive event', () => {
            const event = {translationX: 1, translationY: 1};
            const result = getTranslation(event, initialTranslation, directions, {
              translationLock,
              currentTranslation
            });
            expect(result.x).toEqual(event.translationX + initialTranslation.x);
            expect(result.y).toEqual(event.translationY + initialTranslation.y);
          });
        });
      });
    }

    runAllDirections(TranslationLock.NONE, {x: 0, y: 0});
    runAllDirections(TranslationLock.DROP, {x: 0, y: 0});
    runAllDirections(TranslationLock.DRAG, {x: -1, y: -1});
    runAllDirections(TranslationLock.DRAG, {x: 0, y: 0});
    runAllDirections(TranslationLock.DRAG, {x: 1, y: 1});

    describe('Down and right', () => {
      beforeEach(() => {
        directions = [PanningDirections.DOWN, PanningDirections.RIGHT];
      });

      describe('Start at origin', () => {
        beforeEach(() => {
          initialTranslation = {x: 0, y: 0};
        });

        it('Negative event', () => {
          const event = {translationX: -1, translationY: -1};
          const result = getTranslation(event, initialTranslation, directions, {
            translationLock: TranslationLock.NONE,
            currentTranslation: {x: 0, y: 0}
          });
          expect(result.x).toEqual(0);
          expect(result.y).toEqual(0);
        });

        it('No movement event', () => {
          const event = {translationX: 0, translationY: 0};
          const result = getTranslation(event, initialTranslation, directions, {
            translationLock: TranslationLock.NONE,
            currentTranslation: {x: 0, y: 0}
          });
          expect(result.x).toEqual(event.translationX);
          expect(result.y).toEqual(event.translationY);
        });

        it('Positive event', () => {
          const event = {translationX: 1, translationY: 1};
          const result = getTranslation(event, initialTranslation, directions, {
            translationLock: TranslationLock.NONE,
            currentTranslation: {x: 0, y: 0}
          });
          expect(result.x).toEqual(event.translationX);
          expect(result.y).toEqual(event.translationY);
        });
      });

      describe('Start at positive', () => {
        beforeEach(() => {
          initialTranslation = {x: 1, y: 1};
        });

        it('Negative event', () => {
          const event = {translationX: -1, translationY: -1};
          const result = getTranslation(event, initialTranslation, directions, {
            translationLock: TranslationLock.NONE,
            currentTranslation: {x: 0, y: 0}
          });
          expect(result.x).toEqual(event.translationX + initialTranslation.x);
          expect(result.y).toEqual(event.translationY + initialTranslation.y);
        });

        it('No movement event', () => {
          const event = {translationX: 0, translationY: 0};
          const result = getTranslation(event, initialTranslation, directions, {
            translationLock: TranslationLock.NONE,
            currentTranslation: {x: 0, y: 0}
          });
          expect(result.x).toEqual(event.translationX + initialTranslation.x);
          expect(result.y).toEqual(event.translationY + initialTranslation.y);
        });

        it('Positive event', () => {
          const event = {translationX: 1, translationY: 1};
          const result = getTranslation(event, initialTranslation, directions, {
            translationLock: TranslationLock.NONE,
            currentTranslation: {x: 0, y: 0}
          });
          expect(result.x).toEqual(event.translationX + initialTranslation.x);
          expect(result.y).toEqual(event.translationY + initialTranslation.y);
        });
      });
    });

    describe('Up and left', () => {
      beforeEach(() => {
        directions = [PanningDirections.UP, PanningDirections.LEFT];
      });

      describe('Start at origin', () => {
        beforeEach(() => {
          initialTranslation = {x: 0, y: 0};
        });

        it('Negative event', () => {
          const event = {translationX: -1, translationY: -1};
          const result = getTranslation(event, initialTranslation, directions, {
            translationLock: TranslationLock.NONE,
            currentTranslation: {x: 0, y: 0}
          });
          expect(result.x).toEqual(event.translationX);
          expect(result.y).toEqual(event.translationY);
        });

        it('No movement event', () => {
          const event = {translationX: 0, translationY: 0};
          const result = getTranslation(event, initialTranslation, directions, {
            translationLock: TranslationLock.NONE,
            currentTranslation: {x: 0, y: 0}
          });
          expect(result.x).toEqual(event.translationX);
          expect(result.y).toEqual(event.translationY);
        });

        it('Positive event', () => {
          const event = {translationX: 1, translationY: 1};
          const result = getTranslation(event, initialTranslation, directions, {
            translationLock: TranslationLock.NONE,
            currentTranslation: {x: 0, y: 0}
          });
          expect(result.x).toEqual(0);
          expect(result.y).toEqual(0);
        });
      });

      describe('Start at negative', () => {
        beforeEach(() => {
          initialTranslation = {x: -1, y: -1};
        });

        it('Negative event', () => {
          const event = {translationX: -1, translationY: -1};
          const result = getTranslation(event, initialTranslation, directions, {
            translationLock: TranslationLock.NONE,
            currentTranslation: {x: 0, y: 0}
          });
          expect(result.x).toEqual(event.translationX + initialTranslation.x);
          expect(result.y).toEqual(event.translationY + initialTranslation.y);
        });

        it('No movement event', () => {
          const event = {translationX: 0, translationY: 0};
          const result = getTranslation(event, initialTranslation, directions, {
            translationLock: TranslationLock.NONE,
            currentTranslation: {x: 0, y: 0}
          });
          expect(result.x).toEqual(event.translationX + initialTranslation.x);
          expect(result.y).toEqual(event.translationY + initialTranslation.y);
        });

        it('Positive event', () => {
          const event = {translationX: 1, translationY: 1};
          const result = getTranslation(event, initialTranslation, directions, {
            translationLock: TranslationLock.NONE,
            currentTranslation: {x: 0, y: 0}
          });
          expect(result.x).toEqual(event.translationX + initialTranslation.x);
          expect(result.y).toEqual(event.translationY + initialTranslation.y);
        });
      });
    });

    describe('Lock', () => {
      describe('Down and right', () => {
        it('lockOnDrop', () => {
          directions = [PanningDirections.DOWN, PanningDirections.RIGHT];
          initialTranslation = {x: 0, y: 0};
          let event = {translationX: 1, translationY: 1};
          let result = getTranslation(event, initialTranslation, directions, {
            translationLock: TranslationLock.DROP,
            currentTranslation: {x: 0, y: 0}
          });
          expect(result.x).toEqual(1);
          expect(result.y).toEqual(1);
          event = {translationX: -1, translationY: -1};
          result = getTranslation(event, initialTranslation, directions, {
            translationLock: TranslationLock.DROP,
            currentTranslation: {x: 0, y: 0}
          });
          expect(result.x).toEqual(0);
          expect(result.y).toEqual(0);
          event = {translationX: 1, translationY: 1};
          result = getTranslation(event, initialTranslation, directions, {
            translationLock: TranslationLock.DROP,
            currentTranslation: {x: 0, y: 0}
          });
          expect(result.x).toEqual(1);
          expect(result.y).toEqual(1);
          initialTranslation = result; // drop
          event = {translationX: -1, translationY: -1};
          result = getTranslation(event, initialTranslation, directions, {
            translationLock: TranslationLock.DROP,
            currentTranslation: {x: 0, y: 0}
          });
          expect(result.x).toEqual(1);
          expect(result.y).toEqual(1);
        });

        it('lockOnDrag', () => {
          directions = [PanningDirections.DOWN, PanningDirections.RIGHT];
          initialTranslation = {x: 0, y: 0};
          let event = {translationX: 1, translationY: 1};
          let result = getTranslation(event, initialTranslation, directions, {
            translationLock: TranslationLock.DRAG,
            currentTranslation: {x: 0, y: 0}
          });
          expect(result.x).toEqual(1);
          expect(result.y).toEqual(1);
          event = {translationX: -1, translationY: -1};
          result = getTranslation(event, initialTranslation, directions, {
            translationLock: TranslationLock.DRAG,
            currentTranslation: {x: 1, y: 1}
          });
          expect(result.x).toEqual(1);
          expect(result.y).toEqual(1);
          event = {translationX: 1, translationY: 1};
          result = getTranslation(event, initialTranslation, directions, {
            translationLock: TranslationLock.DRAG,
            currentTranslation: {x: 1, y: 1}
          });
          expect(result.x).toEqual(1);
          expect(result.y).toEqual(1);
          event = {translationX: -1, translationY: -1};
          result = getTranslation(event, initialTranslation, directions, {
            translationLock: TranslationLock.DRAG,
            currentTranslation: {x: 1, y: 1}
          });
          expect(result.x).toEqual(1);
          expect(result.y).toEqual(1);
          event = {translationX: 2, translationY: 2};
          result = getTranslation(event, initialTranslation, directions, {
            translationLock: TranslationLock.DRAG,
            currentTranslation: {x: 1, y: 1}
          });
          expect(result.x).toEqual(2);
          expect(result.y).toEqual(2);
        });
      });

      describe('Up and left', () => {
        it('lockOnDrop', () => {
          directions = [PanningDirections.UP, PanningDirections.LEFT];
          initialTranslation = {x: 0, y: 0};
          let event = {translationX: -1, translationY: -1};
          let result = getTranslation(event, initialTranslation, directions, {
            translationLock: TranslationLock.DROP,
            currentTranslation: {x: 0, y: 0}
          });
          expect(result.x).toEqual(-1);
          expect(result.y).toEqual(-1);
          event = {translationX: 1, translationY: 1};
          result = getTranslation(event, initialTranslation, directions, {
            translationLock: TranslationLock.DROP,
            currentTranslation: {x: 0, y: 0}
          });
          expect(result.x).toEqual(0);
          expect(result.y).toEqual(0);
          event = {translationX: -1, translationY: -1};
          result = getTranslation(event, initialTranslation, directions, {
            translationLock: TranslationLock.DROP,
            currentTranslation: {x: 0, y: 0}
          });
          expect(result.x).toEqual(-1);
          expect(result.y).toEqual(-1);
          initialTranslation = result; // drop
          event = {translationX: 1, translationY: 1};
          result = getTranslation(event, initialTranslation, directions, {
            translationLock: TranslationLock.DROP,
            currentTranslation: {x: 0, y: 0}
          });
          expect(result.x).toEqual(-1);
          expect(result.y).toEqual(-1);
        });

        it('lockOnDrag', () => {
          directions = [PanningDirections.UP, PanningDirections.LEFT];
          initialTranslation = {x: 0, y: 0};
          let event = {translationX: -1, translationY: -1};
          let result = getTranslation(event, initialTranslation, directions, {
            translationLock: TranslationLock.DRAG,
            currentTranslation: {x: 0, y: 0}
          });
          expect(result.x).toEqual(-1);
          expect(result.y).toEqual(-1);
          event = {translationX: 1, translationY: 1};
          result = getTranslation(event, initialTranslation, directions, {
            translationLock: TranslationLock.DRAG,
            currentTranslation: {x: -1, y: -1}
          });
          expect(result.x).toEqual(-1);
          expect(result.y).toEqual(-1);
          event = {translationX: -1, translationY: -1};
          result = getTranslation(event, initialTranslation, directions, {
            translationLock: TranslationLock.DRAG,
            currentTranslation: {x: -1, y: -1}
          });
          expect(result.x).toEqual(-1);
          expect(result.y).toEqual(-1);
          event = {translationX: 1, translationY: 1};
          result = getTranslation(event, initialTranslation, directions, {
            translationLock: TranslationLock.DRAG,
            currentTranslation: {x: -1, y: -1}
          });
          expect(result.x).toEqual(-1);
          expect(result.y).toEqual(-1);
          event = {translationX: -2, translationY: -2};
          result = getTranslation(event, initialTranslation, directions, {
            translationLock: TranslationLock.DRAG,
            currentTranslation: {x: -1, y: -1}
          });
          expect(result.x).toEqual(-2);
          expect(result.y).toEqual(-2);
        });
      });
    });
  });

  describe('getDismissVelocity', () => {
    function getOptions(event) {
      return {
        directionLock: false,
        translationLock: false,
        currentTranslation: {
          x: event.translationX + event.velocityX * 0.1,
          y: event.translationY + event.velocityY * 0.1
        }
      };
    }
    describe('Event velocity', () => {
      function runEventVelocity(threshold) {
        describe('General tests', () => {
          it('Not greater than threshold', () => {
            const event = {
              translationX: 0,
              translationY: 0,
              velocityX: 0,
              velocityY: 0
            };

            const velocity = getDismissVelocity(event, directions, getOptions(event), threshold);
            expect(velocity).toEqual(undefined);
          });

          it('Greater than threshold (x)', () => {
            const event = {
              translationX: 0,
              translationY: 0,
              velocityX: 900,
              velocityY: 0
            };

            const velocity = getDismissVelocity(event, directions, getOptions(event), threshold);
            expect(velocity).toEqual({x: 900, y: 0});
          });

          it('Greater than threshold (y)', () => {
            const event = {
              translationX: 0,
              translationY: 0,
              velocityX: 0,
              velocityY: 900
            };

            const velocity = getDismissVelocity(event, directions, getOptions(event), threshold);
            expect(velocity).toEqual({x: 0, y: 900});
          });

          it('Greater than threshold (combined)', () => {
            const event = {
              translationX: 0,
              translationY: 0,
              velocityX: 531,
              velocityY: 531
            };

            const velocity = getDismissVelocity(event, directions, getOptions(event), threshold);
            expect(velocity).toEqual({x: 531, y: 531});
          });

          it('Not greater than threshold (combined)', () => {
            const event = {
              translationX: 0,
              translationY: 0,
              velocityX: 530,
              velocityY: 530
            };

            const velocity = getDismissVelocity(event, directions, getOptions(event), threshold);
            expect(velocity).toEqual(undefined);
          });
        });
      }

      runEventVelocity();
      runEventVelocity(DEFAULT_THRESHOLD);
      runEventVelocity({});

      it('Different threshold (larger, x)', () => {
        const event = {
          translationX: 0,
          translationY: 0,
          velocityX: 900,
          velocityY: 0
        };

        const velocity = getDismissVelocity(event, directions, getOptions(event), {velocity: 900});
        expect(velocity).toEqual(undefined);
      });

      it('Different threshold (larger, y)', () => {
        const event = {
          translationX: 0,
          translationY: 0,
          velocityX: 0,
          velocityY: 900
        };

        const velocity = getDismissVelocity(event, directions, getOptions(event), {velocity: 900});
        expect(velocity).toEqual(undefined);
      });

      it('Different threshold (smaller, x)', () => {
        const event = {
          translationX: 0,
          translationY: 0,
          velocityX: 900,
          velocityY: 0
        };

        const velocity = getDismissVelocity(event, directions, getOptions(event), {velocity: 500});
        expect(velocity).toEqual({x: 900, y: 0});
      });

      it('Different threshold (smaller, y)', () => {
        const event = {
          translationX: 0,
          translationY: 0,
          velocityX: 0,
          velocityY: 900
        };

        const velocity = getDismissVelocity(event, directions, getOptions(event), {velocity: 500});
        expect(velocity).toEqual({x: 0, y: 900});
      });
    });

    describe('Event translation', () => {
      function runEventTranslation(threshold) {
        describe('General tests', () => {
          const largeVelocity = threshold?.velocity || DEFAULT_THRESHOLD.velocity;
          const smallVelocity = (largeVelocity * (Constants.screenWidth * 0.9)) / (Constants.screenHeight * 0.9);
          it('Not greater than threshold', () => {
            const event = {
              translationX: 0,
              translationY: 0,
              velocityX: 0,
              velocityY: 0
            };

            const velocity = getDismissVelocity(event, directions, getOptions(event), threshold);
            expect(velocity).toEqual(undefined);
          });

          it('Greater than threshold (x)', () => {
            const event = {
              translationX: Constants.screenWidth * 0.9,
              translationY: 0,
              velocityX: 0,
              velocityY: 0
            };

            const velocity = getDismissVelocity(event, directions, getOptions(event), threshold);
            expect(velocity).toEqual({x: DEFAULT_THRESHOLD.velocity});
          });

          it('Greater than threshold (negative, x)', () => {
            const event = {
              translationX: -Constants.screenWidth * 0.9,
              translationY: 0,
              velocityX: 0,
              velocityY: 0
            };

            const velocity = getDismissVelocity(event, directions, getOptions(event), threshold);
            expect(velocity).toEqual({x: -DEFAULT_THRESHOLD.velocity});
          });

          it('Greater than threshold (y)', () => {
            const event = {
              translationX: 0,
              translationY: Constants.screenHeight * 0.9,
              velocityX: 0,
              velocityY: 0
            };

            const velocity = getDismissVelocity(event, directions, getOptions(event), threshold);
            expect(velocity).toEqual({y: DEFAULT_THRESHOLD.velocity});
          });

          it('Greater than threshold (negative, y)', () => {
            const event = {
              translationX: 0,
              translationY: -Constants.screenHeight * 0.9,
              velocityX: 0,
              velocityY: 0
            };

            const velocity = getDismissVelocity(event, directions, getOptions(event), threshold);
            expect(velocity).toEqual({y: -DEFAULT_THRESHOLD.velocity});
          });

          it('Greater than threshold (combined)', () => {
            const event = {
              translationX: Constants.screenWidth * 0.9,
              translationY: Constants.screenHeight * 0.9,
              velocityX: 0,
              velocityY: 0
            };

            const velocity = getDismissVelocity(event, directions, getOptions(event), threshold);
            expect(velocity).toEqual({x: smallVelocity, y: largeVelocity});
          });

          it('Greater than threshold (negative, combined)', () => {
            const event = {
              translationX: -Constants.screenWidth * 0.9,
              translationY: -Constants.screenHeight * 0.9,
              velocityX: 0,
              velocityY: 0
            };

            const velocity = getDismissVelocity(event, directions, getOptions(event), threshold);
            expect(velocity).toEqual({x: -smallVelocity, y: -largeVelocity});
          });

          it('Not greater than threshold (combined)', () => {
            const event = {
              translationX: Constants.screenWidth / 5,
              translationY: Constants.screenHeight / 5,
              velocityX: 0,
              velocityY: 0
            };

            const velocity = getDismissVelocity(event, directions, getOptions(event), threshold);
            expect(velocity).toEqual(undefined);
          });

          it('Not greater than threshold (negative, combined)', () => {
            const event = {
              translationX: -Constants.screenWidth / 5,
              translationY: -Constants.screenHeight / 5,
              velocityX: 0,
              velocityY: 0
            };

            const velocity = getDismissVelocity(event, directions, getOptions(event), threshold);
            expect(velocity).toEqual(undefined);
          });
        });
      }

      runEventTranslation();
      runEventTranslation(DEFAULT_THRESHOLD);
      runEventTranslation({});

      it('Different threshold (larger, x)', () => {
        const event = {
          translationX: Constants.screenWidth * 0.9,
          translationY: 0,
          velocityX: 0,
          velocityY: 0
        };

        const velocity = getDismissVelocity(event, directions, getOptions(event), {x: Constants.screenWidth * 0.95});
        expect(velocity).toEqual(undefined);
      });

      it('Different threshold (larger, negative, x)', () => {
        const event = {
          translationX: -Constants.screenWidth * 0.9,
          translationY: 0,
          velocityX: 0,
          velocityY: 0
        };

        const velocity = getDismissVelocity(event, directions, getOptions(event), {x: Constants.screenWidth * 0.95});
        expect(velocity).toEqual(undefined);
      });

      it('Different threshold (larger, y)', () => {
        const event = {
          translationX: 0,
          translationY: Constants.screenHeight * 0.9,
          velocityX: 0,
          velocityY: 0
        };

        const velocity = getDismissVelocity(event, directions, getOptions(event), {y: Constants.screenHeight * 0.95});
        expect(velocity).toEqual(undefined);
      });

      it('Different threshold (larger, negative, y)', () => {
        const event = {
          translationX: 0,
          translationY: -Constants.screenHeight * 0.9,
          velocityX: 0,
          velocityY: 0
        };

        const velocity = getDismissVelocity(event, directions, getOptions(event), {y: Constants.screenHeight * 0.95});
        expect(velocity).toEqual(undefined);
      });

      it('Different threshold (smaller, x)', () => {
        const event = {
          translationX: Constants.screenWidth * 0.15,
          translationY: 0,
          velocityX: 0,
          velocityY: 0
        };

        const velocity = getDismissVelocity(event, directions, getOptions(event), {x: Constants.screenWidth / 10});
        expect(velocity).toEqual({x: DEFAULT_THRESHOLD.velocity});
      });

      it('Different threshold (smaller, y)', () => {
        const event = {
          translationX: 0,
          translationY: Constants.screenWidth * 0.15,
          velocityX: 0,
          velocityY: 0
        };

        const velocity = getDismissVelocity(event, directions, getOptions(event), {y: Constants.screenWidth / 10});
        expect(velocity).toEqual({y: DEFAULT_THRESHOLD.velocity});
      });
    });
  });

  describe('getTranslationClamp', () => {
    function testGetTranslationClamp(directionLock) {
      describe('None', () => {
        it('Regular', () => {
          const initialTranslation = {x: 0, y: 0};
          const currentTranslation = {x: 0, y: 0};
          const result = getTranslationClamp(initialTranslation, {
            directionLock,
            translationLock: TranslationLock.NONE,
            currentTranslation
          });
          expect(result).toEqual({x: 0, y: 0});
        });

        it('Different initial', () => {
          const initialTranslation = {x: 10, y: 10};
          const currentTranslation = {x: 0, y: 0};
          const result = getTranslationClamp(initialTranslation, {
            directionLock,
            translationLock: TranslationLock.NONE,
            currentTranslation
          });
          expect(result).toEqual({x: 0, y: 0});
        });

        it('Different current', () => {
          const initialTranslation = {x: 0, y: 0};
          const currentTranslation = {x: 10, y: 10};
          const result = getTranslationClamp(initialTranslation, {
            directionLock,
            translationLock: TranslationLock.NONE,
            currentTranslation
          });
          expect(result).toEqual({x: 0, y: 0});
        });
      });

      describe('Drag', () => {
        it('Regular', () => {
          const initialTranslation = {x: 0, y: 0};
          const currentTranslation = {x: 0, y: 0};
          const result = getTranslationClamp(initialTranslation, {
            directionLock,
            translationLock: TranslationLock.DRAG,
            currentTranslation
          });
          expect(result).toEqual(currentTranslation);
        });

        it('Different initial', () => {
          const initialTranslation = {x: 10, y: 10};
          const currentTranslation = {x: 0, y: 0};
          const result = getTranslationClamp(initialTranslation, {
            directionLock,
            translationLock: TranslationLock.DRAG,
            currentTranslation
          });
          expect(result).toEqual(currentTranslation);
        });

        it('Different current', () => {
          const initialTranslation = {x: 0, y: 0};
          const currentTranslation = {x: 10, y: 10};
          const result = getTranslationClamp(initialTranslation, {
            directionLock,
            translationLock: TranslationLock.DRAG,
            currentTranslation
          });
          expect(result).toEqual(currentTranslation);
        });
      });

      describe('Drop', () => {
        it('Regular', () => {
          const initialTranslation = {x: 0, y: 0};
          const currentTranslation = {x: 0, y: 0};
          const result = getTranslationClamp(initialTranslation, {
            directionLock,
            translationLock: TranslationLock.DROP,
            currentTranslation
          });
          expect(result).toEqual(initialTranslation);
        });

        it('Different initial', () => {
          const initialTranslation = {x: 10, y: 10};
          const currentTranslation = {x: 0, y: 0};
          const result = getTranslationClamp(initialTranslation, {
            directionLock,
            translationLock: TranslationLock.DROP,
            currentTranslation
          });
          expect(result).toEqual(initialTranslation);
        });

        it('Different current', () => {
          const initialTranslation = {x: 0, y: 0};
          const currentTranslation = {x: 10, y: 10};
          const result = getTranslationClamp(initialTranslation, {
            directionLock,
            translationLock: TranslationLock.DROP,
            currentTranslation
          });
          expect(result).toEqual(initialTranslation);
        });
      });
    }

    testGetTranslationClamp(false);
    testGetTranslationClamp(true);
  });

  describe('getDirectionClamp', () => {
    function testGetDirectionClamp(translationLock) {
      describe('No lock', () => {
        it('Regular', () => {
          const translation = {x: 0, y: 0};
          const options = {
            directionLock: false,
            translationLock,
            currentTranslation: {x: 0, y: 0}
          };

          const result = getTranslationDirectionClamp(translation, options);
          expect(result).toEqual(translation);
        });

        it('Translated', () => {
          const translation = {x: 10, y: 10};
          const options = {
            directionLock: false,
            translationLock,
            currentTranslation: {x: 0, y: 0}
          };

          const result = getTranslationDirectionClamp(translation, options);
          expect(result).toEqual(translation);
        });
      });

      describe('Lock', () => {
        it('initial x', () => {
          const translation = {x: 10, y: 0};
          const options = {
            directionLock: true,
            translationLock,
            currentTranslation: {x: 0, y: 0}
          };

          const result = getTranslationDirectionClamp(translation, options);
          expect(result).toEqual({x: 10, y: 0});
        });

        it('initial y', () => {
          const translation = {x: 0, y: 10};
          const options = {
            directionLock: true,
            translationLock,
            currentTranslation: {x: 0, y: 0}
          };

          const result = getTranslationDirectionClamp(translation, options);
          expect(result).toEqual({x: 0, y: 10});
        });

        it('x positive', () => {
          const translation = {x: 20, y: 10};
          const options = {
            directionLock: true,
            translationLock,
            currentTranslation: {x: 10, y: 0}
          };

          const result = getTranslationDirectionClamp(translation, options);
          expect(result).toEqual({x: 20, y: 0});
        });

        it('x negative', () => {
          const translation = {x: -20, y: 10};
          const options = {
            directionLock: true,
            translationLock,
            currentTranslation: {x: -10, y: 0}
          };

          const result = getTranslationDirectionClamp(translation, options);
          expect(result).toEqual({x: -20, y: 0});
        });

        it('y positive', () => {
          const translation = {x: 10, y: 20};
          const options = {
            directionLock: true,
            translationLock,
            currentTranslation: {x: 0, y: 10}
          };

          const result = getTranslationDirectionClamp(translation, options);
          expect(result).toEqual({x: 0, y: 20});
        });

        it('y negative', () => {
          const translation = {x: 10, y: -20};
          const options = {
            directionLock: true,
            translationLock,
            currentTranslation: {x: 0, y: -10}
          };

          const result = getTranslationDirectionClamp(translation, options);
          expect(result).toEqual({x: 0, y: -20});
        });
      });
    }

    testGetDirectionClamp(TranslationLock.NONE);
    testGetDirectionClamp(TranslationLock.DRAG);
    testGetDirectionClamp(TranslationLock.DROP);
  });
});
