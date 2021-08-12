import _ from 'lodash';

interface Style {
  style: any;
}

interface Props {
  props: Style;
}

const findStyle = <T>(key: string, component: Props): T => {
  const flat = _.flatMap(component.props.style) as Array<any | undefined>;
  const color = _.find(flat, key)[key];
  return color;
};

export {findStyle};
