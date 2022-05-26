import moment from 'moment';
import React, {Component} from 'react';
import {StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {DateTimePickerPackage as RNDateTimePicker} from '../../optionalDependencies';
import {Colors} from '../../style';
import Assets from '../../assets';
import {Constants, asBaseComponent, BaseComponentInjectedProps} from '../../commons/new';
import TextField from '../textField';
import {DialogProps} from '../dialog';
import View from '../view';
import Button from '../button';
import ExpandableOverlay, {ExpandableOverlayMethods, RenderCustomOverlayProps} from '../../incubator/expandableOverlay';

const MODES = {
  DATE: 'date',
  TIME: 'time'
};

/*eslint-disable*/
/**
 * @description: Date and Time Picker Component that wraps RNDateTimePicker for date and time modes.
 * @example: https://github.com/wix/react-native-ui-lib/blob/master/demo/src/screens/componentScreens/DateTimePickerScreen.tsx
 * @important: DateTimePicker uses a native library. You MUST add and link the native library to both iOS and Android projects.
 * @extends: TextField, react-native-community/datetimepicker
 * @extendsLink: https://github.com/react-native-community/react-native-datetimepicker#react-native-datetimepicker
 * @gif: https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/DateTimePicker/DateTimePicker_iOS.gif?raw=true, https://github.com/wix/react-native-ui-lib/blob/master/demo/showcase/DateTimePicker/DateTimePicker_Android.gif?raw=true
 */
/*eslint-enable*/

export interface DateTimePickerProps {
  // TODO: extend TextField props
  // ...TextField.propTypes,
  /**
   * The type of picker to display ('date' or 'time')
   */
  mode?: 'date' | 'time';
  /**
   * The initial value to set the picker to. Defaults to device's date / time
   */
  value?: Date;
  /**
   * The onChange callback
   */
  onChange?: (date: Date) => void;
  /**
   * Should this input be editable or disabled
   */
  editable?: boolean;
  /**
   * The minimum date or time value to use
   */
  minimumDate?: Date;
  /**
   * The maximum date or time value to use
   */
  maximumDate?: Date;
  /**
   * The date format for the text display
   */
  dateFormat?: string;
  /**
   * A callback function to format date
   */
  dateFormatter?: (date: Date) => string;
  /**
   * The time format for the text display
   */
  timeFormat?: string;
  /**
   * A callback function to format time
   */
  timeFormatter?: (date: Date) => string;
  /**
   * Allows changing of the locale of the component (iOS only)
   */
  locale?: string;
  /**
   * Allows changing of the time picker to a 24 hour format (Android only)
   */
  is24Hour?: boolean;
  /**
   * The interval at which minutes can be selected. Possible values are: 1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30 (iOS only)
   */
  minuteInterval?: number;
  /**
   * Allows changing of the timeZone of the date picker. By default it uses the device's time zone (iOS only)
   */
  timeZoneOffsetInMinutes?: number;
  /**
   * Props to pass the Dialog component
   */
  dialogProps?: DialogProps;
  /**
   * style to apply to the iOS dialog header
   */
  headerStyle?: StyleProp<ViewStyle>;
  /**
   * Render custom input
   */
  renderInput?: (props: Omit<DateTimePickerProps, 'value'> & {value?: string}) => React.ReactElement;
  /**
   * Override system theme variant (dark or light mode) used by the date picker.
   */
  themeVariant?: 'light' | 'dark';
  /**
   * The component testID
   */
  testID?: string;
}

interface DateTimePickerState {
  prevValue?: Date;
  value?: Date;
}

type DateTimePickerPropsInternal = DateTimePickerProps & BaseComponentInjectedProps;

class DateTimePicker extends Component<DateTimePickerPropsInternal, DateTimePickerState> {
  static displayName = 'DateTimePicker';

  static defaultProps = {
    ...TextField.defaultProps,
    mode: MODES.DATE
  };

  chosenDate?: Date;
  expandable = React.createRef<ExpandableOverlayMethods>();

  constructor(props: DateTimePickerPropsInternal) {
    super(props);
    this.chosenDate = props.value;

    if (!RNDateTimePicker) {
      console.error(`RNUILib DateTimePicker component requires installing "@react-native-community/datetimepicker" dependency`);
    }
  }

  state = {
    prevValue: this.props.value,
    value: this.props.value
  };

  static getDerivedStateFromProps(nextProps: DateTimePickerProps, prevState: DateTimePickerState) {
    if (nextProps.value !== prevState.prevValue) {
      return {
        prevValue: prevState.value,
        value: nextProps.value
      };
    }
    return null;
  }

  handleChange = (event: any = {}, date: Date) => {
    // NOTE: will be called on Android even when there was no actual change
    if (event.type !== 'dismissed' && date !== undefined) {
      this.chosenDate = date;

      if (Constants.isAndroid) {
        this.onDonePressed();
      }
    } else if (event.type === 'dismissed' && Constants.isAndroid) {
      this.toggleExpandableOverlay();
    }
  };

  toggleExpandableOverlay = () => {
    this.expandable.current?.toggleExpandable?.();
  };

  onDonePressed = () => {
    this.toggleExpandableOverlay();
    if (Constants.isIOS && !this.chosenDate) {
      // since handleChange() is not called on iOS when there is no actual change
      this.chosenDate = new Date();
    }

    this.props.onChange?.(this.chosenDate!);
    this.setState({value: this.chosenDate});
  };

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

  getDialogProps = () => {
    const {testID, dialogProps} = this.props;
    return {
      width: '100%',
      height: null,
      bottom: true,
      centerH: true,
      // onDismiss: this.toggleExpandableOverlay,
      containerStyle: styles.dialog,
      testID: `${testID}.dialog`,
      supportedOrientations: [
        'portrait',
        'landscape',
        'landscape-left',
        'landscape-right'
      ] as DialogProps['supportedOrientations'],
      ...dialogProps
    };
  };

  renderIOSExpandableOverlay = () => {
    return (
      <>
        {this.renderHeader()}
        {this.renderDateTimePicker()}
      </>
    );
  };

  renderHeader() {
    // @ts-expect-error
    const {headerStyle, useCustomTheme} = this.props;

    return (
      <View row spread bg-$backgroundDefault paddingH-20 style={[styles.header, headerStyle]}>
        <Button
          link
          iconSource={Assets.icons.x}
          iconStyle={{tintColor: Colors.$iconDefault}}
          onPress={this.toggleExpandableOverlay}
        />
        <Button link iconSource={Assets.icons.check} useCustomTheme={useCustomTheme} onPress={this.onDonePressed}/>
      </View>
    );
  }

  renderAndroidDateTimePicker = ({visible}: RenderCustomOverlayProps) => {
    if (visible) {
      return this.renderDateTimePicker();
    }
  };

  renderDateTimePicker() {
    if (!RNDateTimePicker) {
      return null;
    }

    const {value} = this.state;
    const {mode, minimumDate, maximumDate, locale, is24Hour, minuteInterval, timeZoneOffsetInMinutes, themeVariant} =
      this.props;

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
        display={Constants.isIOS ? 'spinner' : undefined}
        themeVariant={themeVariant}
      />
    );
  }

  render() {
    // @ts-expect-error
    const textInputProps = TextField.extractOwnProps(this.props);
    const {renderInput, editable} = this.props;

    return (
      <>
        <ExpandableOverlay
          ref={this.expandable}
          expandableContent={Constants.isIOS ? this.renderIOSExpandableOverlay() : undefined}
          useDialog
          dialogProps={this.getDialogProps()}
          disabled={editable === false}
          // NOTE: Android picker comes with its own overlay built-in therefor we're not using ExpandableOverlay for it
          renderCustomOverlay={Constants.isAndroid ? this.renderAndroidDateTimePicker : undefined}
        >
          {renderInput ? (
            renderInput({...this.props, value: this.getStringValue()})
          ) : (
            /* @ts-expect-error */
            <TextField
              {...textInputProps}
              expandable={!!textInputProps.renderExpandableInput}
              value={this.getStringValue()}
            />
          )}
        </ExpandableOverlay>
      </>
    );
  }
}

export {DateTimePicker}; // For tests
export default asBaseComponent<DateTimePickerProps>(DateTimePicker);

const styles = StyleSheet.create({
  header: {
    height: 56,
    borderBottomWidth: 1,
    borderBottomColor: Colors.$outlineDefault
  },
  dialog: {
    backgroundColor: Colors.$backgroundDefault,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12
  }
});
