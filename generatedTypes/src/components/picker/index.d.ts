import { Component } from "react";
import PickerItem from "./PickerItem";
import {PickerProps,PickerListProps,PickerSearchStyle,PickerMode,PickerItemProps,PickerItemRenderItemFunc,PickerItemValue,PickerItemLabeledValue} from "./types"
export {PickerProps,PickerListProps,PickerSearchStyle,PickerMode,PickerItemProps,PickerItemRenderItemFunc,PickerItemValue,PickerItemLabeledValue}

declare class Picker extends Component<PickerProps, any> {
  static displayName: string;
  static Item: typeof PickerItem;
  constructor(props: PickerProps);
  componentDidMount(): void;
  componentWillUnmount(): void;
  onOrientationChange: () => void;
  getMaxWidth(): number;
  renderChildren(): React.DetailedReactHTMLElement<any, HTMLElement>[] | null | undefined;
  render(): JSX.Element;
}
declare const _default: React.ComponentClass<PickerProps & {
  useCustomTheme?: boolean | undefined;
}, any> & typeof Picker;
export default _default;