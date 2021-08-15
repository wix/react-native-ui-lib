import {Component} from 'react';

type WheelPickerItemProps = {
  /**
   * the picker item value
   */
  value: string | number;
  /**
   * the picker item display label
   */
  label: string;
};

export default class WheelPickerItem extends Component<WheelPickerItemProps> {
  static displayName = 'WheelPicker.Item';

  render() {
    // These items don't get rendered directly.
    return null;
  }
}
