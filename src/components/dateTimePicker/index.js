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
    timeFormat: PropTypes.string,
    /**
     * Allows changing of the locale of the component (iOS only)
     */
    locale: PropTypes.string,
    /**
     * Allows changing of the time picker to a 24 hour format (Android only)
     */
    is24Hour: PropTypes.bool,
    /**
     * The interval at which minutes can be selected. Possible values are: 1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30 (iOS only)
     */
    minuteInterval: PropTypes.number,
    /**
     * Allows changing of the timeZone of the date picker. By default it uses the device's time zone (iOS only)
     */
    timeZoneOffsetInMinutes: PropTypes.number,
    /**
     * Props to pass the Dialog component
     */
    dialogProps: PropTypes.object
  };

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

  handleChange = (event = {}, date) => {
    if (event.type !== 'dismissed' && date !== undefined) {
      this.chosenDate = date;

      if (Constants.isAndroid) {
        this.onDonePressed();
      }
    }
  };

  toggleExpandableOverlay = callback => {
    this.setState({showExpandableOverlay: !this.state.showExpandableOverlay},
      () => {
        if (_.isFunction(callback)) {
          callback();
        }
      });
  };

  onDonePressed = () =>
    this.toggleExpandableOverlay(() => {
      _.invoke(this.props, 'onChange', this.chosenDate);
      this.setState({chosenDate: this.chosenDate});
    });

  renderExpandableOverlay = () => {
    const {testID, dialogProps} = this.getThemeProps();
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
        supportedOrientations={[
          'portrait',
          'landscape',
          'landscape-left',
          'landscape-right'
        ]} // iOS only
        {...dialogProps}
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
    const {mode, minimumDate, maximumDate, locale, is24Hour, minuteInterval, timeZoneOffsetInMinutes} = this.props;

    if (showExpandableOverlay) {
      return (
        <RNDateTimePicker
          mode={mode}
          value={chosenDate}
          onChange={this.handleChange}
          minimumDate={minimumDate}
          maximumDate={maximumDate}
          locale={locale}
          is24Hour={is24Hour}
          minuteInterval={minuteInterval}
          timeZoneOffsetInMinutes={timeZoneOffsetInMinutes}
        />
      );
    }
  }

  renderExpandable = () => {
    return Constants.isAndroid
      ? this.renderDateTimePicker()
      : this.renderExpandableOverlay();
  };

  render() {
    const {chosenDate} = this.state;
    const {mode, dateFormat, timeFormat} = this.getThemeProps();
    const textInputProps = TextField.extractOwnProps(this.getThemeProps());
    const dateString =
      mode === MODES.DATE
        ? dateFormat
          ? moment(chosenDate).format(dateFormat)
          : chosenDate.toLocaleDateString()
        : timeFormat
          ? moment(chosenDate).format(timeFormat)
          : chosenDate.toLocaleTimeString();

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
