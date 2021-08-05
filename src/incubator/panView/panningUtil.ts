import {PanGestureHandlerEventPayload} from 'react-native-gesture-handler';
import {Constants} from '../../helpers';

export enum PanViewDirections {
  UP = 'up',
  DOWN = 'down',
  LEFT = 'left',
  RIGHT = 'right'
}

export interface Frame {
  x: number;
  y: number;
}

export interface TranslationOptions {
  directionLock?: boolean;
  currentTranslation: Frame;
}

export interface PanViewDismissThreshold {
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
  directions: PanViewDirections[],
  options: TranslationOptions): Frame {
  'worklet';
  const result = {x: 0, y: 0};
  if (directions?.includes(PanViewDirections.LEFT) && directions?.includes(PanViewDirections.RIGHT)) {
    result.x = initialTranslation.x + event.translationX;
  } else if (directions?.includes(PanViewDirections.LEFT)) {
    result.x = Math.min(initialTranslation.x, initialTranslation.x + event.translationX);
  } else if (directions?.includes(PanViewDirections.RIGHT)) {
    result.x = Math.max(initialTranslation.x, initialTranslation.x + event.translationX);
  }

  if (directions?.includes(PanViewDirections.UP) && directions?.includes(PanViewDirections.DOWN)) {
    result.y = initialTranslation.y + event.translationY;
  } else if (directions?.includes(PanViewDirections.UP)) {
    result.y = Math.min(initialTranslation.y, initialTranslation.y + event.translationY);
  } else if (directions?.includes(PanViewDirections.DOWN)) {
    result.y = Math.max(initialTranslation.y, initialTranslation.y + event.translationY);
  }

  return getTranslationDirectionClamp(result, options);
}

export const DEFAULT_THRESHOLD: Required<PanViewDismissThreshold> = {
  velocity: 750,
  x: Constants.screenWidth / 4,
  y: Constants.screenHeight / 4
};

function getVelocityDirectionClamp(event: PanGestureHandlerEventPayload, directions: PanViewDirections[]) {
  'worklet';
  let x = 0,
    y = 0;

  if (
    (directions.includes(PanViewDirections.LEFT) && event.velocityX < 0) ||
    (directions.includes(PanViewDirections.RIGHT) && event.velocityX > 0)
  ) {
    x = event.velocityX;
  }
  if (
    (directions.includes(PanViewDirections.UP) && event.velocityY < 0) ||
    (directions.includes(PanViewDirections.DOWN) && event.velocityY > 0)
  ) {
    y = event.velocityY;
  }

  return {x, y};
}

function checkThresholds(event: PanGestureHandlerEventPayload,
  directions: PanViewDirections[],
  velocity: number,
  threshold: Required<PanViewDismissThreshold>) {
  'worklet';
  const velocityPassedThreshold = velocity > threshold.velocity;
  const xPassedThreshold =
    (directions.includes(PanViewDirections.RIGHT) && event.translationX > threshold.x) ||
    (directions.includes(PanViewDirections.LEFT) && -event.translationX > threshold.x);
  const yPassedThreshold =
    (directions.includes(PanViewDirections.DOWN) && event.translationY > threshold.y) ||
    (directions.includes(PanViewDirections.UP) && -event.translationY > threshold.y);

  return {velocityPassedThreshold, xPassedThreshold, yPassedThreshold};
}

/**
 * Will return undefined if should not dismiss
 */
export function getDismissVelocity(event: PanGestureHandlerEventPayload,
  directions: PanViewDirections[],
  options: TranslationOptions,
  threshold?: PanViewDismissThreshold) {
  'worklet';
  const _threshold: Required<PanViewDismissThreshold> = Object.assign({}, DEFAULT_THRESHOLD, threshold);
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
