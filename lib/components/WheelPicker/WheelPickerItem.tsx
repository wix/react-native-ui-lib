import React, {Component} from 'react'; //eslint-disable-line
import PropTypes from 'prop-types';

export default class WheelPickerItem extends Component {
  static displayName = 'WheelPicker.Item';
  // eslint-disable-line react/no-multi-comp
  static propTypes = {
    /**
     * the picker item value
     */
    value: PropTypes.PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    /**
     * the picker item display label
     */
    label: PropTypes.string,
  };

  render() {
    // These items don't get rendered directly.
    return null;
  }
}
