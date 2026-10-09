// Compile-time check of the modifier prop typings, run by `yarn build:dev`.
// It lives outside the package so that it is not published.
import type {PositionModifiers} from '../packages/react-native-ui-lib/src/commons/modifiers';
import type {ViewProps} from '../packages/react-native-ui-lib/src/components/view';

export const positionModifiers: PositionModifiers = {abs: true};
export const viewProps: ViewProps = {abs: true};
