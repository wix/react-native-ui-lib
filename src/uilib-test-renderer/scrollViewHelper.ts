import {fireEvent} from '@testing-library/react-native';

const fireOnMomentumScrollEnd = (component: any, {x, y}: {x?: number; y?: number}) => {
  fireEvent(component, 'onMomentumScrollEnd', getNativeEvent({x, y}));
};

const getNativeEvent = ({x, y}: {x?: number; y?: number}) => {
  return {nativeEvent: {contentOffset: {x, y}}};
};

export {fireOnMomentumScrollEnd};
