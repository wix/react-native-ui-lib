import {StyleSheet} from 'react-native';

interface Props {
  style: any;
}

interface Component {
  props: Props;
}

const findStyle = <T>(key: string, component: Component): T => {
  return StyleSheet.flatten(component.props.style)[key];
};

export {findStyle};
