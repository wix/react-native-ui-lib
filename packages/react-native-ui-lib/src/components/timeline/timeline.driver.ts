import {useComponentDriver, ComponentProps} from '../../testkit/new/Component.driver';
import {LineDriver} from './line.driver';
import {PointDriver} from './point.driver';

export const TimelineDriver = (props: ComponentProps) => {
  const driver = useComponentDriver(props);

  const pointDriver = PointDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.point`
  });

  const topLineDriver = LineDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.topLine`
  });
  const bottomLineDriver = LineDriver({
    renderTree: props.renderTree,
    testID: `${props.testID}.bottomLine`
  });

  const getPoint = () => {
    return {...pointDriver.getPoint()};
  };

  const getTopLine = () => {
    return {...topLineDriver.getLine()};
  };

  const getBottomLine = () => {
    return {...bottomLineDriver.getLine()};
  };

  return {
    ...driver,
    getPoint,
    getTopLine,
    getBottomLine
  };
};
