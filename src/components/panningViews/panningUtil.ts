import {PanGestureHandlerEventPayload} from 'react-native-gesture-handler';
import {Constants} from '../../helpers';

export enum PanningDirections {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right'
}

export enum TranslationLock {
  /**
   * No locking (default).
   */
  NONE = 'none',
  /**
   * Will lock the start location to the drop location.
   * Only when a certain direction is not allowed.
   * Only when dismissible={false}
   */
  DROP = 'drop',
  /**
   * Will lock the start location to the dragged location.
   * Only when a certain direction is not allowed.
   * Only when dismissible={false}
   */
  DRAG = 'drag'
}

export interface Frame {
  x: number;
  y: number;
}

export interface TranslationOptions {
  directionLock?: boolean;
  translationLock: TranslationLock;
  currentTranslation: Frame;
}

export interface PanDismissThreshold {
  /**
   * The (positive) velocity of a drag\swipe past it the view will be dismissed.
   */
  velocity?: number;
  /**
   * The x translation from the start location past it the view will be dismissed.
   */
  x?: number;
  /**
   * The y translation from the start location past it the view will be dismissed.
   */
  y?: number;
}

export function getTranslationClamp(initialTranslation: Frame, options: TranslationOptions) {
  'worklet';
  let clamp;
  switch (options.translationLock) {
    case TranslationLock.DRAG:
      clamp = {x: options.currentTranslation.x, y: options.currentTranslation.y};
      break;
    case TranslationLock.DROP:
      clamp = initialTranslation;
      break;
    case TranslationLock.NONE:
      clamp = {x: 0, y: 0};
      break;
  }

  return clamp;
}

export function getTranslationDirectionClamp(translation: Frame, options: TranslationOptions) {
  'worklet';
  let result = translation;
  if (options.directionLock) {
    if (options.currentTranslation.x !== 0) {
      result = {x: translation.x, y: 0};
    } else if (options.currentTranslation.y !== 0) {
      result = {x: 0, y: translation.y};
    } else if (Math.abs(translation.x) > Math.abs(translation.y)) {
      result = {x: translation.x, y: 0};
    } else {
      result = {x: 0, y: translation.y};
    }
  }

  return result;
}

export function getTranslation(event: PanGestureHandlerEventPayload,
  initialTranslation: Frame,
  directions: PanningDirections[],
  options: TranslationOptions): Frame {
  'worklet';
  const result = {x: 0, y: 0};
  const clamp = getTranslationClamp(initialTranslation, options);
  if (directions?.includes(PanningDirections.LEFT) && directions?.includes(PanningDirections.RIGHT)) {
    result.x = initialTranslation.x + event.translationX;
  } else if (directions?.includes(PanningDirections.LEFT)) {
    result.x = Math.min(clamp.x, initialTranslation.x + event.translationX);
  } else if (directions?.includes(PanningDirections.RIGHT)) {
    result.x = Math.max(clamp.x, initialTranslation.x + event.translationX);
  }

  if (directions?.includes(PanningDirections.UP) && directions?.includes(PanningDirections.DOWN)) {
    result.y = initialTranslation.y + event.translationY;
  } else if (directions?.includes(PanningDirections.UP)) {
    result.y = Math.min(clamp.y, initialTranslation.y + event.translationY);
  } else if (directions?.includes(PanningDirections.DOWN)) {
    result.y = Math.max(clamp.y, initialTranslation.y + event.translationY);
  }

  return getTranslationDirectionClamp(result, options);
}

export const DEFAULT_THRESHOLD: Required<PanDismissThreshold> = {
  velocity: 750,
  x: Constants.screenWidth / 4,
  y: Constants.screenHeight / 4
};

function getVelocityDirectionClamp(event: PanGestureHandlerEventPayload, directions: PanningDirections[]) {
  'worklet';
  let x = 0,
    y = 0;

  if (
    (directions.includes(PanningDirections.LEFT) && event.velocityX < 0) ||
    (directions.includes(PanningDirections.RIGHT) && event.velocityX > 0)
  ) {
    x = event.velocityX;
  }
  if (
    (directions.includes(PanningDirections.UP) && event.velocityY < 0) ||
    (directions.includes(PanningDirections.DOWN) && event.velocityY > 0)
  ) {
    y = event.velocityY;
  }

  return {x, y};
}

function checkThresholds(event: PanGestureHandlerEventPayload,
  directions: PanningDirections[],
  velocity: number,
  threshold: Required<PanDismissThreshold>) {
  'worklet';
  const velocityPassedThreshold = velocity > threshold.velocity;
  const xPassedThreshold =
    (directions.includes(PanningDirections.RIGHT) && event.translationX > threshold.x) ||
    (directions.includes(PanningDirections.LEFT) && -event.translationX > threshold.x);
  const yPassedThreshold =
    (directions.includes(PanningDirections.DOWN) && event.translationY > threshold.y) ||
    (directions.includes(PanningDirections.UP) && -event.translationY > threshold.y);

  return {velocityPassedThreshold, xPassedThreshold, yPassedThreshold};
}

/**
 * Will return undefined if should not dismiss
 */
export function getDismissVelocity(event: PanGestureHandlerEventPayload,
  directions: PanningDirections[],
  options: TranslationOptions,
  threshold?: PanDismissThreshold) {
  'worklet';
  // Sadly using {...DEFAULT_THRESHOLD, ...threshold} is done
  // on the JS thread for some reason, causing an exception
  const _threshold: Required<PanDismissThreshold> = {
    velocity: threshold?.velocity || DEFAULT_THRESHOLD.velocity,
    x: threshold?.x || DEFAULT_THRESHOLD.x,
    y: threshold?.y || DEFAULT_THRESHOLD.y
  };
  const clampedVelocity = getVelocityDirectionClamp(event, directions);
  const velocity = Math.sqrt(Math.pow(clampedVelocity.x, 2) + Math.pow(clampedVelocity.y, 2));
  const {velocityPassedThreshold, xPassedThreshold, yPassedThreshold} = checkThresholds(event,
    directions,
    velocity,
    _threshold);
  if (velocityPassedThreshold || xPassedThreshold || yPassedThreshold) {
    let velocity: Partial<Frame> = {};
    if (velocityPassedThreshold) {
      velocity = {x: event.velocityX, y: event.velocityY};
    } else if (event.translationX && event.translationY) {
      if (Math.abs(event.translationX) > Math.abs(event.translationY)) {
        velocity.x = Math.sign(event.translationX) * _threshold.velocity;
        velocity.y = (_threshold.velocity * event.translationY) / Math.abs(event.translationX);
      } else {
        velocity.y = Math.sign(event.translationY) * _threshold.velocity;
        velocity.x = (_threshold.velocity * event.translationX) / Math.abs(event.translationY);
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
