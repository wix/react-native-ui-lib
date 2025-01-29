import {Constants} from '../../../commons/new';
import {
  PanningDirectionsEnum,
  DEFAULT_THRESHOLD,
  getTranslation,
  getDismissVelocity,
  getTranslationDirectionClamp
} from '../panningUtil';

describe('panningUtil', () => {
  let directions;
  beforeEach(() => {
    directions = [
      PanningDirectionsEnum.UP,
      PanningDirectionsEnum.DOWN,
      PanningDirectionsEnum.LEFT,
      PanningDirectionsEnum.RIGHT
    ];
  });

  describe('getTranslation', () => {
    let initialTranslation;
    function runAllDirections(currentTranslation) {
      describe('All directions', () => {
        describe('Start at origin', () => {
          beforeEach(() => {
            initialTranslation = {x: 0, y: 0};
          });

          it('Negative event', () => {
            const event = {translationX: -1, translationY: -1};
            const result = getTranslation(event, initialTranslation, directions, {
              currentTranslation
            });
            expect(result.x).toEqual(-1);
            expect(result.y).toEqual(-1);
          });

          it('No movement event', () => {
            const event = {translationX: 0, translationY: 0};
            const result = getTranslation(event, initialTranslation, directions, {
              currentTranslation
            });
            expect(result.x).toEqual(0);
            expect(result.y).toEqual(0);
          });

          it('Positive event', () => {
            const event = {translationX: 1, translationY: 1};
            const result = getTranslation(event, initialTranslation, directions, {
              currentTranslation
            });
            expect(result.x).toEqual(1);
            expect(result.y).toEqual(1);
          });
        });

        describe('Start at negative', () => {
          beforeEach(() => {
            initialTranslation = {x: -1, y: -1};
          });

          it('Negative event', () => {
            const event = {translationX: -1, translationY: -1};
            const result = getTranslation(event, initialTranslation, directions, {
              currentTranslation
            });
            expect(result.x).toEqual(-2);
            expect(result.y).toEqual(-2);
          });

          it('No movement event', () => {
            const event = {translationX: 0, translationY: 0};
            const result = getTranslation(event, initialTranslation, directions, {
              currentTranslation
            });
            expect(result.x).toEqual(-1);
            expect(result.y).toEqual(-1);
          });

          it('Positive event', () => {
            const event = {translationX: 1, translationY: 1};
            const result = getTranslation(event, initialTranslation, directions, {
              currentTranslation
            });
            expect(result.x).toEqual(0);
            expect(result.y).toEqual(0);
          });
        });

        describe('Start at positive', () => {
          beforeEach(() => {
            initialTranslation = {x: 1, y: 1};
          });

          it('Negative event', () => {
            const event = {translationX: -1, translationY: -1};
            const result = getTranslation(event, initialTranslation, directions, {
              currentTranslation
            });
            expect(result.x).toEqual(0);
            expect(result.y).toEqual(0);
          });

          it('No movement event', () => {
            const event = {translationX: 0, translationY: 0};
            const result = getTranslation(event, initialTranslation, directions, {
              currentTranslation
            });
            expect(result.x).toEqual(1);
            expect(result.y).toEqual(1);
          });

          it('Positive event', () => {
            const event = {translationX: 1, translationY: 1};
            const result = getTranslation(event, initialTranslation, directions, {
              currentTranslation
            });
            expect(result.x).toEqual(2);
            expect(result.y).toEqual(2);
          });
        });
      });
    }

    runAllDirections({x: -1, y: -1});
    runAllDirections({x: 0, y: 0});
    runAllDirections({x: 1, y: 1});

    describe('Down and right', () => {
      beforeEach(() => {
        directions = [PanningDirectionsEnum.DOWN, PanningDirectionsEnum.RIGHT];
      });

      describe('Start at origin', () => {
        beforeEach(() => {
          initialTranslation = {x: 0, y: 0};
        });

        it('Negative event', () => {
          const event = {translationX: -1, translationY: -1};
          const result = getTranslation(event, initialTranslation, directions, {
            currentTranslation: {x: 0, y: 0}
          });
          expect(result.x).toEqual(0);
          expect(result.y).toEqual(0);
        });

        it('No movement event', () => {
          const event = {translationX: 0, translationY: 0};
          const result = getTranslation(event, initialTranslation, directions, {
            currentTranslation: {x: 0, y: 0}
          });
          expect(result.x).toEqual(0);
          expect(result.y).toEqual(0);
        });

        it('Positive event', () => {
          const event = {translationX: 1, translationY: 1};
          const result = getTranslation(event, initialTranslation, directions, {
            currentTranslation: {x: 0, y: 0}
          });
          expect(result.x).toEqual(1);
          expect(result.y).toEqual(1);
        });
      });

      describe('Start at positive', () => {
        beforeEach(() => {
          initialTranslation = {x: 1, y: 1};
        });

        it('Negative event', () => {
          const event = {translationX: -1, translationY: -1};
          const result = getTranslation(event, initialTranslation, directions, {
            currentTranslation: {x: 1, y: 1}
          });
          expect(result.x).toEqual(0);
          expect(result.y).toEqual(0);
        });

        it('No movement event', () => {
          const event = {translationX: 0, translationY: 0};
          const result = getTranslation(event, initialTranslation, directions, {
            currentTranslation: {x: 1, y: 1}
          });
          expect(result.x).toEqual(1);
          expect(result.y).toEqual(1);
        });

        it('Positive event', () => {
          const event = {translationX: 1, translationY: 1};
          const result = getTranslation(event, initialTranslation, directions, {
            currentTranslation: {x: 1, y: 1}
          });
          expect(result.x).toEqual(2);
          expect(result.y).toEqual(2);
        });
      });
    });

    describe('Up and left', () => {
      beforeEach(() => {
        directions = [PanningDirectionsEnum.UP, PanningDirectionsEnum.LEFT];
      });

      describe('Start at origin', () => {
        beforeEach(() => {
          initialTranslation = {x: 0, y: 0};
        });

        it('Negative event', () => {
          const event = {translationX: -1, translationY: -1};
          const result = getTranslation(event, initialTranslation, directions, {
            currentTranslation: {x: 0, y: 0}
          });
          expect(result.x).toEqual(-1);
          expect(result.y).toEqual(-1);
        });

        it('No movement event', () => {
          const event = {translationX: 0, translationY: 0};
          const result = getTranslation(event, initialTranslation, directions, {
            currentTranslation: {x: 0, y: 0}
          });
          expect(result.x).toEqual(0);
          expect(result.y).toEqual(0);
        });

        it('Positive event', () => {
          const event = {translationX: 1, translationY: 1};
          const result = getTranslation(event, initialTranslation, directions, {
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
            currentTranslation: {x: -1, y: -1}
          });
          expect(result.x).toEqual(-2);
          expect(result.y).toEqual(-2);
        });

        it('No movement event', () => {
          const event = {translationX: 0, translationY: 0};
          const result = getTranslation(event, initialTranslation, directions, {
            currentTranslation: {x: -1, y: -1}
          });
          expect(result.x).toEqual(-1);
          expect(result.y).toEqual(-1);
        });

        it('Positive event', () => {
          const event = {translationX: 1, translationY: 1};
          const result = getTranslation(event, initialTranslation, directions, {
            currentTranslation: {x: -1, y: -1}
          });
          expect(result.x).toEqual(0);
          expect(result.y).toEqual(0);
        });
      });
    });
  });

  describe('getDismissVelocity', () => {
    function getOptions(event) {
      return {
        directionLock: false,
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

  describe('getDirectionClamp', () => {
    function testGetDirectionClamp() {
      describe('No lock', () => {
        it('Regular', () => {
          const translation = {x: 0, y: 0};
          const options = {
            directionLock: false,
            currentTranslation: {x: 0, y: 0}
          };

          const result = getTranslationDirectionClamp(translation, options);
          expect(result).toEqual(translation);
        });

        it('Translated', () => {
          const translation = {x: 10, y: 10};
          const options = {
            directionLock: false,
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
            currentTranslation: {x: 0, y: 0}
          };

          const result = getTranslationDirectionClamp(translation, options);
          expect(result).toEqual({x: 10, y: 0});
        });

        it('initial y', () => {
          const translation = {x: 0, y: 10};
          const options = {
            directionLock: true,
            currentTranslation: {x: 0, y: 0}
          };

          const result = getTranslationDirectionClamp(translation, options);
          expect(result).toEqual({x: 0, y: 10});
        });

        it('x positive', () => {
          const translation = {x: 20, y: 10};
          const options = {
            directionLock: true,
            currentTranslation: {x: 10, y: 0}
          };

          const result = getTranslationDirectionClamp(translation, options);
          expect(result).toEqual({x: 20, y: 0});
        });

        it('x negative', () => {
          const translation = {x: -20, y: 10};
          const options = {
            directionLock: true,
            currentTranslation: {x: -10, y: 0}
          };

          const result = getTranslationDirectionClamp(translation, options);
          expect(result).toEqual({x: -20, y: 0});
        });

        it('y positive', () => {
          const translation = {x: 10, y: 20};
          const options = {
            directionLock: true,
            currentTranslation: {x: 0, y: 10}
          };

          const result = getTranslationDirectionClamp(translation, options);
          expect(result).toEqual({x: 0, y: 20});
        });

        it('y negative', () => {
          const translation = {x: 10, y: -20};
          const options = {
            directionLock: true,
            currentTranslation: {x: 0, y: -10}
          };

          const result = getTranslationDirectionClamp(translation, options);
          expect(result).toEqual({x: 0, y: -20});
        });
      });
    }

    testGetDirectionClamp();
  });
});
