
import {ViewProps as RNViewProps} from 'react-native';
import {PureBaseComponent} from '../commons';

export interface ViewProps extends RNViewProps {
  useSafeArea?: boolean;
  animated?: boolean;
}

export class View extends PureBaseComponent<ViewProps> {}
