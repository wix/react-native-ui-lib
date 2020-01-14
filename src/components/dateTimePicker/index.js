import _ from 'lodash';
import PropTypes from 'prop-types';
import moment from 'moment';
import React from 'react';
import {StyleSheet} from 'react-native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import {Constants} from '../../helpers';
import {Colors} from '../../style';
import Assets from '../../assets';
import {BaseComponent} from '../../commons';
import {TextField} from '../inputs';
import Dialog from '../dialog';
import View from '../view';
import Button from '../button';


const MODES = {
  DATE: 'date',
  TIME: 'time'
};

/*eslint-disable*/
/**
 * @description: Date and Time Picker Component that wraps RNDateTimePicker for date and time modes.
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/DateTimePickerScreen.js
 * @important: DateTimePicker uses a native library. You MUST add and link the native library to both iOS and Android projects.
 * @extends: @react-native-community/datetimepicker
 * @extendslink: https://github.com/react-native-community/react-native-datetimepicker#react-native-datetimepicker
 */
/*eslint-enable*/

class DateTimePicker extends BaseComponent {
  static displayName = 'DateTimePicker';
  static propTypes = {
    ...TextField.propTypes,
    /**
     * The type of picker to display ('date' or 'time')
     */
    mode: PropTypes.oneOf(Object.values(MODES)),
    /**
     * The initial value to set the picker to. Defaults to device's date / time
     */
    value: PropTypes.instanceOf(Date),
    /**
     * The onChange callback
     * NOTE: on Android called only after pressing 'Ok' button, on iOS called on every change in wheel picker
     */
    onChange: PropTypes.func,
    /**
     * The minimum date or time value to use
     */
    minimumDate: PropTypes.instanceOf(Date),
    /**
     * The maximum date or time value to use
     */
    maximumDate: PropTypes.instanceOf(Date),
    /**
     * The date format for the text display
     */
    dateFormat: PropTypes.string,
    /**
     * The time format for the text display
     */
    timeFormat: PropTypes.string
  }

  static defaultProps = {
    ...TextField.defaultProps,
    mode: MODES.DATE
  };

  constructor(props) {
    super(props);

    const initialValue = props.value || new Date();
    this.chosenDate = initialValue;

    this.state = {
      showExpandableOverlay: false,
      chosenDate: initialValue
    };
  }

  generateStyles() {
    this.styles = createStyles(this.props);
  }

  setDate = (event, date) => {
    if (date !== undefined) {
      this.chosenDate = date;

      if (Constants.isAndroid) {
        this.setState({chosenDate: this.chosenDate, showExpandableOverlay: false});
      }
    }

    _.invoke(this.props, 'onChange');
  }

  toggleExpandableOverlay = (callback) => {
    this.setState({showExpandableOverlay: !this.state.showExpandableOverlay}, () => {
      if (_.isFunction(callback)) {
        callback();
      }
    });
  };

  onDonePressed = () => {
    this.toggleExpandableOverlay(() => this.setState({chosenDate: this.chosenDate}));
  }

  renderExpandableOverlay = () => {
    const {testID} = this.getThemeProps();
    const {showExpandableOverlay} = this.state;

    return (
      <Dialog
        migrate
        visible={showExpandableOverlay}
        width="100%"
        height={null}
        bottom
        centerH
        onDismiss={this.toggleExpandableOverlay}
        containerStyle={this.styles.dialog}
        testID={`${testID}.dialog`}
        supportedOrientations={['portrait', 'landscape', 'landscape-left', 'landscape-right']} // iOS only
      >
        <View useSafeArea>
          {this.renderHeader()}
          {this.renderDateTimePicker()}
        </View>
      </Dialog>
    );
  };

  renderHeader() {
    const {useCustomTheme} = this.props;

    return (
      <View row spread bg-white paddingH-20 style={this.styles.header}>
        <Button
          link
          iconSource={Assets.icons.x}
          iconStyle={{tintColor: Colors.dark10}}
          onPress={this.toggleExpandableOverlay}
        />
        <Button
          useCustomTheme={useCustomTheme}
          link
          iconSource={Assets.icons.check}
          onPress={this.onDonePressed}
        />
      </View>
    );
  }

  renderDateTimePicker() {
    const {chosenDate, showExpandableOverlay} = this.state;
    const {mode, minimumDate, maximumDate} = this.props;

    if (showExpandableOverlay) {
      return (
        <RNDateTimePicker 
          mode={mode}
          value={chosenDate}
          onChange={this.setDate} 
          minimumDate={minimumDate}
          maximumDate={maximumDate}
        />
      );
    }
  }

  renderExpandable = () => {    
    return Constants.isAndroid ? this.renderDateTimePicker() : this.renderExpandableOverlay();
  }

  render() {
    const {chosenDate} = this.state;
    const {mode, dateFormat, timeFormat} = this.getThemeProps();
    const textInputProps = TextField.extractOwnProps(this.getThemeProps());
    const dateString = mode === MODES.DATE ? 
      (dateFormat ? moment(chosenDate).format(dateFormat) : chosenDate.toLocaleDateString()) : 
      (timeFormat ? moment(chosenDate).format(timeFormat) : chosenDate.toLocaleTimeString());
    
    return (
      <TextField 
        {...textInputProps} 
        value={dateString}
        expandable
        renderExpandable={this.renderExpandable}
        onToggleExpandableModal={this.toggleExpandableOverlay}
      />
    );
  }
}

export default DateTimePicker;

function createStyles(props) {
  const borderRadius = 12;

  const styles = StyleSheet.create({
    header: {
      height: 56,
      borderBottomWidth: 1,
      borderBottomColor: Colors.dark80
    },
    dialog: {
      backgroundColor: Colors.white,
      borderTopLeftRadius: borderRadius,
      borderTopRightRadius: borderRadius
    }
  });

  return styles;
}
