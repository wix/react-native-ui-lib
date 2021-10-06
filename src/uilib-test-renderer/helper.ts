import _ from 'lodash';

interface Props {
  style: any;
}

interface Component {
  props: Props;
}

const findStyle = <T>(key: string, component: Component): T => {
  const flat = _.flatMap(component.props.style) as Array<any | undefined>;
  const color = _.find(flat, key)[key];
  return color;
};

export {findStyle};
