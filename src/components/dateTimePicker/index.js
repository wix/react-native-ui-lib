import _ from 'lodash';
import PropTypes from 'prop-types';
import moment from 'moment';
import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import {DateTimePickerPackage as RNDateTimePicker} from '../../optionalDependencies';
import {Constants} from '../../helpers';
import {Colors} from '../../style';
import Assets from '../../assets';
import {asBaseComponent} from '../../commons';
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
 * @extends: TextField, react-native-community/datetimepicker
 * @extendsLink: https://github.com/react-native-community/react-native-datetimepicker#react-native-datetimepicker
 */
/*eslint-enable*/

class DateTimePicker extends Component {
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
     * A callback function to format date
     */
    dateFormatter: PropTypes.func,
    /**
     * The time format for the text display
     */
    timeFormat: PropTypes.string,
    /**
     * A callback function to format time
     */
    timeFormatter: PropTypes.func,
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
    dialogProps: PropTypes.object,
    /**
     * style to apply to the iOS dialog header
     */
    headerStyle: PropTypes.oneOfType([PropTypes.object, PropTypes.number]),
    /**
     * Render custom input
     */
    renderInput: PropTypes.elementType
  };

  static defaultProps = {
    ...TextField.defaultProps,
    mode: MODES.DATE
  };

  constructor(props) {
    super(props);

    this.chosenDate = props.value;

    this.state = {
      showExpandableOverlay: false,
      prevValue: props.value,
      value: props.value
    };

    if (!RNDateTimePicker) {
      console.error(`RNUILib DateTimePicker component requires installing "@react-native-community/datetimepicker" dependency`);
    }
  }

  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.value !== prevState.prevValue) {
      return {
        prevValue: prevState.value,
        value: nextProps.value
      };
    }
    return null;
  }

  handleChange = (event = {}, date) => {
    // NOTE: will be called on Android even when there was no actual change
    if (event.type !== 'dismissed' && date !== undefined) {
      this.chosenDate = date;

      if (Constants.isAndroid) {
        this.onDonePressed();
      }
    }
  };

  toggleExpandableOverlay = callback => {
    this.setState({showExpandableOverlay: !this.state.showExpandableOverlay}, () => {
      if (_.isFunction(callback)) {
        callback();
      }
    });
  };

  onToggleExpandableModal = value => {
    this.toggleExpandableOverlay();
    _.invoke(this.props, 'onToggleExpandableModal', value);
  };

  onDonePressed = () =>
    this.toggleExpandableOverlay(() => {
      if (Constants.isIOS && !this.chosenDate) {
        // since handleChange() is not called on iOS when there is no actual change
        this.chosenDate = new Date();
      }

      _.invoke(this.props, 'onChange', this.chosenDate);
      this.setState({value: this.chosenDate});
    });

  getStringValue = () => {
    const {value} = this.state;
    const {mode, dateFormat, timeFormat, dateFormatter, timeFormatter} = this.props;
    if (value) {
      switch (mode) {
        case MODES.DATE:
          return dateFormatter
            ? dateFormatter(value)
            : dateFormat
              ? moment(value).format(dateFormat)
              : value.toLocaleDateString();
        case MODES.TIME:
          return timeFormatter
            ? timeFormatter(value)
            : timeFormat
              ? moment(value).format(timeFormat)
              : value.toLocaleTimeString();
      }
    }
  };

  renderExpandableOverlay = () => {
    const {testID, dialogProps} = this.props;
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
        containerStyle={styles.dialog}
        testID={`${testID}.dialog`}
        supportedOrientations={['portrait', 'landscape', 'landscape-left', 'landscape-right']} // iOS only
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
    const {useCustomTheme, headerStyle} = this.props;

    return (
      <View row spread bg-white paddingH-20 style={[styles.header, headerStyle]}>
        <Button
          link
          iconSource={Assets.icons.x}
          iconStyle={{tintColor: Colors.dark10}}
          onPress={this.toggleExpandableOverlay}
        />
        <Button link iconSource={Assets.icons.check} useCustomTheme={useCustomTheme} onPress={this.onDonePressed}/>
      </View>
    );
  }

  renderDateTimePicker() {
    if (!RNDateTimePicker) {
      return null;
    }

    const {value, showExpandableOverlay} = this.state;
    const {mode, minimumDate, maximumDate, locale, is24Hour, minuteInterval, timeZoneOffsetInMinutes} = this.props;

    if (showExpandableOverlay) {
      return (
        <RNDateTimePicker
          mode={mode}
          value={value || new Date()}
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
    return Constants.isAndroid ? this.renderDateTimePicker() : this.renderExpandableOverlay();
  };

  render() {
    const textInputProps = TextField.extractOwnProps(this.props);

    return (
      <TextField
        {...textInputProps}
        value={this.getStringValue()}
        expandable
        renderExpandable={this.renderExpandable}
        onToggleExpandableModal={this.onToggleExpandableModal}
      />
    );
  }
}

export {DateTimePicker}; // For tests
export default asBaseComponent(DateTimePicker);


const styles = StyleSheet.create({
  header: {
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: Colors.dark80
  },
  dialog: {
    backgroundColor: Colors.white,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
  }
});
