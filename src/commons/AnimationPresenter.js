import AnimatedComponent from './AnimatedComponent';

export function getAnimationStyle(state, props) {
  const {animationType} = props;
  const {enterProgress} = state;
  const animationStyle = {};
  switch (animationType) {
    case AnimatedComponent.animationTypes.FADE_IN:
      animationStyle.opacity = interpolate(state.enterProgress, [0, 1]);
      break;
    case AnimatedComponent.animationTypes.FADE_IN_DOWN:
      animationStyle.opacity = interpolate(state.enterProgress, [0, 1]);
      animationStyle.transform = [{
        translateY: interpolate(enterProgress, [-5, 0]),
      }];
      break;
    case AnimatedComponent.animationTypes.FADE_IN_UP:
      animationStyle.opacity = interpolate(state.enterProgress, [0, 1]);
      animationStyle.transform = [{
        translateY: interpolate(enterProgress, [5, 0]),
      }];
      break;
    default:
  }

  return animationStyle;
}

function interpolate(animatedValue, outputRange) {
  return animatedValue.interpolate({
    inputRange: [0, 100],
    outputRange,
  });
}
