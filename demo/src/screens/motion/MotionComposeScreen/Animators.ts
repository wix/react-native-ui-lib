import {SharedValue, useSharedValue} from 'react-native-reanimated';
import {createAnimation, type AnimationSpecs} from 'react-native-motion-lib'; 
import {useEffect} from 'react';

export type WorkletStyleModifier = (style: { [key: string]: any }) => void;

export abstract class Animator {
  protected initialValue: number;
  protected targetValue: number;
  protected animatedValue: SharedValue<number>;
  
  constructor(state: [number, number]) {
    console.warn('Animator', this.constructor.name);
    const [initialValue, targetValue] = state;
    this.initialValue = initialValue;
    this.targetValue = targetValue;

    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      console.warn('initial value changed', this.constructor.name, initialValue);
      this.initialValue = initialValue;
    }, [initialValue]);
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      console.warn('target value changed', this.constructor.name, targetValue);
      this.targetValue = targetValue;
    }, [targetValue]);
  }

  animate(animationProps: AnimationSpecs): void {
    console.warn('animate', this.constructor.name, this.targetValue);
    if (this.animatedValue === undefined) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      this.animatedValue = useSharedValue(this.targetValue);
    }
    this.animatedValue.value = createAnimation(animationProps, this.targetValue);
  }

  deanimate(animationProps: AnimationSpecs): void {
    console.warn('deanimate', this.constructor.name, this.initialValue);
    if (this.animatedValue === undefined) {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      this.animatedValue = useSharedValue(this.initialValue);
    }
    
    this.animatedValue.value = createAnimation(animationProps, this.initialValue);
  }

  // Returns a worklet function that can be used in useAnimatedStyle
  abstract getWorkletStyleModifier(): WorkletStyleModifier;
}
  
export class ScaleAnimator extends Animator {
  override getWorkletStyleModifier(): WorkletStyleModifier {
    const animatedValue = this.animatedValue;
    return (style: { [key: string]: any }) => {
      'worklet';
      style.transform.push({scale: animatedValue.value});
    };
  }
}

export class TranslationXAnimator extends Animator {
  override getWorkletStyleModifier(): WorkletStyleModifier {
    const animatedValue = this.animatedValue;
    return (style: { [key: string]: any }) => {
      'worklet';
      style.transform.push({translateX: animatedValue.value});
    };
  }

}

export class TranslationYAnimator extends Animator {
  override getWorkletStyleModifier(): WorkletStyleModifier {
    const animatedValue = this.animatedValue;
    return (style: { [key: string]: any }) => {
      'worklet';
      style.transform.push({translateY: animatedValue.value});
    };
  }

}

export class RotationZAnimator extends Animator {
  override getWorkletStyleModifier(): WorkletStyleModifier {
    const animatedValue = this.animatedValue;
    return (style: { [key: string]: any }) => {
      'worklet';
      style.transform.push({rotate: `${animatedValue.value}deg`});
    };
  }

}

export class OpacityAnimator extends Animator {
  override getWorkletStyleModifier(): WorkletStyleModifier {
    const animatedValue = this.animatedValue;
    return (style: { [key: string]: any }) => {
      'worklet';
      style.opacity = animatedValue.value;
    };
  }
}
