import React from 'react';
import ListItemPart from 'src/components/listItem/ListItemPart';
import {ListItemProps} from './types';
export {ListItemProps};

declare class ListItem extends Component<ListItemProps, State> {
  static displayName: string;
  static Part: typeof ListItemPart;
  constructor(props: ListItemProps);
  onHideUnderlay(): void;
  onShowUnderlay(): void;
  setPressed(isPressed: boolean): void;
  renderViewContainer: () => JSX.Element;
  renderCustomContainer(Container: React.ComponentType): JSX.Element;
  renderChildren(): React.DetailedReactHTMLElement<any, HTMLElement>[] | null | undefined;
  render(): JSX.Element;
}
declare const _default: React.ComponentClass<
  ListItemProps & {
    useCustomTheme?: boolean | undefined;
  },
  any
> &
  typeof ListItem;
export default _default;
