import {StyleSheet} from 'react-native';
import {fireEvent} from '@testing-library/react-native';

interface Props {
  style: any;
}

interface Component {
  props: Props;
}

const findStyle = <T>(key: string, component: Component): T => {
  return StyleSheet.flatten(component.props.style)[key];
};

const FireOnMomentumScrollEnd = (component: any, {x, y}: {x?: number, y?: number}) => {
  fireEvent(component, 'onMomentumScrollEnd', {nativeEvent: {contentOffset: {x, y}}});
};

export {findStyle, FireOnMomentumScrollEnd};
