import {StyleSheet} from 'react-native';

interface Props {
  style?: any;
}

interface Component {
  props: Props;
}

const findStyle = <T>(key: string, component: Component): T => {
  const style = component?.props?.style;
  if (style) {
    return StyleSheet.flatten(style)[key];
  }
  return style;
};

export {findStyle};
