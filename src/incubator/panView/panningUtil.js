import { Constants } from "../../commons/new";
export let PanningDirectionsEnum = /*#__PURE__*/function (PanningDirectionsEnum) {
  PanningDirectionsEnum["UP"] = "up";
  PanningDirectionsEnum["DOWN"] = "down";
  PanningDirectionsEnum["LEFT"] = "left";
  PanningDirectionsEnum["RIGHT"] = "right";
  return PanningDirectionsEnum;
}({});
export function getTranslationDirectionClamp(translation, options) {
  'worklet';

  let result = translation;
  if (options.directionLock) {
    if (options.currentTranslation.x !== 0) {
      result = {
        x: translation.x,
        y: 0
      };
    } else if (options.currentTranslation.y !== 0) {
      result = {
        x: 0,
        y: translation.y
      };
    } else if (Math.abs(translation.x) > Math.abs(translation.y)) {
      result = {
        x: translation.x,
        y: 0
      };
    } else {
      result = {
        x: 0,
        y: translation.y
      };
    }
  }
  return result;
}
export function getTranslation(event, initialTranslation, directions, options) {
  'worklet';

  const result = {
    x: 0,
    y: 0
  };
  if (directions?.includes(PanningDirectionsEnum.LEFT) && directions?.includes(PanningDirectionsEnum.RIGHT)) {
    result.x = initialTranslation.x + event.translationX;
  } else if (directions?.includes(PanningDirectionsEnum.LEFT)) {
    result.x = Math.min(0, initialTranslation.x + event.translationX);
  } else if (directions?.includes(PanningDirectionsEnum.RIGHT)) {
    result.x = Math.max(0, initialTranslation.x + event.translationX);
  }
  if (directions?.includes(PanningDirectionsEnum.UP) && directions?.includes(PanningDirectionsEnum.DOWN)) {
    result.y = initialTranslation.y + event.translationY;
  } else if (directions?.includes(PanningDirectionsEnum.UP)) {
    result.y = Math.min(0, initialTranslation.y + event.translationY);
  } else if (directions?.includes(PanningDirectionsEnum.DOWN)) {
    result.y = Math.max(0, initialTranslation.y + event.translationY);
  }
  return getTranslationDirectionClamp(result, options);
}
export const DEFAULT_THRESHOLD = {
  velocity: 750,
  x: Constants.screenWidth / 4,
  y: Constants.screenHeight / 4
};
function getVelocityDirectionClamp(event, directions) {
  'worklet';

  let x = 0,
    y = 0;
  if (directions.includes(PanningDirectionsEnum.LEFT) && event.velocityX < 0 || directions.includes(PanningDirectionsEnum.RIGHT) && event.velocityX > 0) {
    x = event.velocityX;
  }
  if (directions.includes(PanningDirectionsEnum.UP) && event.velocityY < 0 || directions.includes(PanningDirectionsEnum.DOWN) && event.velocityY > 0) {
    y = event.velocityY;
  }
  return {
    x,
    y
  };
}
function checkThresholds(directions, velocity, threshold, options) {
  'worklet';

  const velocityPassedThreshold = velocity > threshold.velocity;
  const xPassedThreshold = directions.includes(PanningDirectionsEnum.RIGHT) && options.currentTranslation.x > threshold.x || directions.includes(PanningDirectionsEnum.LEFT) && -options.currentTranslation.x > threshold.x;
  const yPassedThreshold = directions.includes(PanningDirectionsEnum.DOWN) && options.currentTranslation.y > threshold.y || directions.includes(PanningDirectionsEnum.UP) && -options.currentTranslation.y > threshold.y;
  return {
    velocityPassedThreshold,
    xPassedThreshold,
    yPassedThreshold
  };
}

/**
 * Will return undefined if should not dismiss
 */
export function getDismissVelocity(event, directions, options, threshold) {
  'worklet';

  const _threshold = Object.assign({}, DEFAULT_THRESHOLD, threshold);
  const clampedVelocity = getVelocityDirectionClamp(event, directions);
  const velocity = Math.sqrt(Math.pow(clampedVelocity.x, 2) + Math.pow(clampedVelocity.y, 2));
  const {
    velocityPassedThreshold,
    xPassedThreshold,
    yPassedThreshold
  } = checkThresholds(directions, velocity, _threshold, options);
  if (velocityPassedThreshold || xPassedThreshold || yPassedThreshold) {
    let velocity = {};
    if (velocityPassedThreshold) {
      velocity = {
        x: event.velocityX,
        y: event.velocityY
      };
    } else if (event.translationX && event.translationY) {
      if (Math.abs(event.translationX) > Math.abs(event.translationY)) {
        velocity.x = Math.sign(event.translationX) * _threshold.velocity;
        velocity.y = _threshold.velocity * event.translationY / Math.abs(event.translationX);
      } else {
        velocity.y = Math.sign(event.translationY) * _threshold.velocity;
        velocity.x = _threshold.velocity * event.translationX / Math.abs(event.translationY);
      }
    } else if (event.translationX) {
      velocity.x = Math.sign(event.translationX) * _threshold.velocity;
    } else {
      velocity.y = Math.sign(event.translationY) * _threshold.velocity;
    }
    if (options.directionLock) {
      if (options.currentTranslation.x !== 0) {
        velocity.y = 0;
      } else if (options.currentTranslation.y !== 0) {
        velocity.x = 0;
      }
    }
    return velocity;
  }
}