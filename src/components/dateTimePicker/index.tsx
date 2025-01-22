import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  useImperativeHandle,
  forwardRef,
  ForwardedRef
} from 'react';
import {DimensionValue, StyleProp, StyleSheet, ViewStyle} from 'react-native';
import {DateTimePickerPackage as RNDateTimePicker} from '../../optionalDependencies';
import {useDidUpdate} from '../../hooks';
import {Colors} from '../../style';
import Assets from '../../assets';
import {Constants, asBaseComponent, BaseComponentInjectedProps} from '../../commons/new';
import TextField, {TextFieldProps, TextFieldMethods} from '../textField';
import type {DialogProps} from '../../incubator/dialog';
import View from '../view';
import Button, {ButtonProps} from '../button';
import ExpandableOverlay, {ExpandableOverlayMethods, RenderCustomOverlayProps} from '../../incubator/expandableOverlay';
import useOldApi, {OldApiProps} from './useOldApi';
import {isSameDate, isSameHourAndMinute} from '../../utils/dateUtils';
import {LogService} from 'services';

export type DateTimePickerMode = 'date' | 'time';

export type DateTimePickerProps = OldApiProps &
  Omit<TextFieldProps, 'value' | 'onChange'> & {
    /**
     * The type of picker to display ('date' or 'time')
     */
    mode?: DateTimePickerMode;
    /**
     * The initial value to set the picker to. Defaults to device's date / time
     */
    value?: Date;
    /**
     *  The props to pass to the dialog expandable container
     */
    dialogProps?: DialogProps;
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
     * A callback function to format the time or date
     * @param mode the type of the picker ('date' or 'time')
     * @returns the formatted string to display
     */
    dateTimeFormatter?: (value: Date, mode: DateTimePickerMode) => string;
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
    /**
     * Allows changing the visual display of the picker
     */
    display?: string;
    /**
     * Text color of the wheel picker items
     */
    textColor?: string;
    /**
     * Background color of the wheel picker
     */
    backgroundColor?: string;
    /**
     * Confirm button props
     */
    confirmButtonProps?: ButtonProps;
    /**
     * Cancel button props
     */
    cancelButtonProps?: ButtonProps;
  };

type DateTimePickerPropsInternal = DateTimePickerProps & BaseComponentInjectedProps;

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
const DateTimePicker = forwardRef((props: DateTimePickerPropsInternal, ref: ForwardedRef<any>) => {
  const {
    value: propsValue,
    renderInput,
    editable,
    mode = 'date',
    dateFormat,
    timeFormat,
    dateFormatter,
    timeFormatter,
    dateTimeFormatter,
    minimumDate,
    maximumDate,
    locale,
    is24Hour,
    minuteInterval,
    timeZoneOffsetInMinutes,
    themeVariant = Colors.getScheme(),
    onChange,
    dialogProps,
    textColor = Colors.$textDefault,
    backgroundColor = Colors.$backgroundDefault,
    headerStyle,
    testID,
    display = Constants.isIOS ? 'spinner' : undefined,
    confirmButtonProps,
    cancelButtonProps,
    ...others
  } = props;

  const [value, setValue] = useState(propsValue);
  const chosenDate = useRef(propsValue);
  const expandable = useRef<ExpandableOverlayMethods>();
  const textField = useRef<TextFieldMethods>();

  useImperativeHandle(ref, () => {
    return {
      isValid: () => textField.current?.isValid(),
      validate: () => textField.current?.validate()
    };
  });

  useEffect(() => {
    if (!RNDateTimePicker) {
      // eslint-disable-next-line max-len
      LogService.error(`RNUILib DateTimePicker component requires installing "@react-native-community/datetimepicker" dependency`);
    }
  }, []);

  useDidUpdate(() => {
    setValue(propsValue);
  }, [propsValue]);

  const _dialogProps = useMemo(() => {
    return {
      width: '100%' as DimensionValue,
      height: null,
      bottom: true,
      centerH: true,
      containerStyle: styles.dialog,
      testID: `${testID}.dialog`,
      supportedOrientations: [
        'portrait',
        'landscape',
        'landscape-left',
        'landscape-right'
      ],
      ...dialogProps
    };
  }, [dialogProps, testID]);

  const dateTimePickerStyle = useMemo(() => {
    return {backgroundColor};
  }, [backgroundColor]);

  const {getStringValue: getStringValueOld} = useOldApi({dateFormat, dateFormatter, timeFormat, timeFormatter});

  const getStringValue = () => {
    if (value) {
      if (dateTimeFormatter) {
        return dateTimeFormatter(value, mode);
      } else {
        return getStringValueOld(value, mode);
        // TODO: once we remove the old implementation, add the following:
        // return mode === 'time' ? value.toLocaleTimeString() : value.toLocaleDateString();
      }
    }
  };

  const toggleExpandableOverlay = useCallback(() => {
    expandable.current?.toggleExpandable?.();
  }, []);

  const isValueChanged = useCallback(() => {
    return mode === 'time' ? !isSameHourAndMinute(chosenDate.current, value) : !isSameDate(chosenDate.current, value);
  }, [mode, value]);

  const onDonePressed = useCallback(() => {
    toggleExpandableOverlay();
    if (Constants.isIOS && !chosenDate.current) {
      // since handleChange() is not called on iOS when there is no actual change
      chosenDate.current = new Date();
    }
    if (chosenDate.current && isValueChanged()) {
      onChange?.(chosenDate?.current);
    }
    setValue(chosenDate.current);
  }, [toggleExpandableOverlay, onChange, isValueChanged]);

  const handleChange = useCallback((event: any = {}, date: Date) => {
    // NOTE: will be called on Android even when there was no actual change
    if (event.type !== 'dismissed' && date !== undefined) {
      chosenDate.current = date;

      if (Constants.isAndroid) {
        onDonePressed();
      }
    } else if (event.type === 'dismissed' && Constants.isAndroid) {
      toggleExpandableOverlay();
    }
  },
  [onDonePressed, toggleExpandableOverlay]);

  const renderHeader = () => {
    return (
      <View
        row
        spread
        bg-$backgroundDefault
        backgroundColor={backgroundColor}
        paddingH-20
        style={[styles.header, headerStyle]}
        testID={`${testID}.header`}
      >
        <Button
          link
          iconSource={Assets.internal.icons.x}
          iconStyle={{tintColor: Colors.$iconDefault}}
          testID={`${testID}.cancel`}
          {...cancelButtonProps}
          onPress={toggleExpandableOverlay}
        />
        <Button
          link
          iconSource={Assets.internal.icons.check}
          testID={`${testID}.done`}
          {...confirmButtonProps}
          onPress={onDonePressed}
        />
      </View>
    );
  };

  const renderDateTimePicker = useCallback(() => {
    if (!RNDateTimePicker) {
      return null;
    }

    return (
      <RNDateTimePicker
        mode={mode}
        value={value || new Date()}
        onChange={handleChange}
        minimumDate={minimumDate}
        maximumDate={maximumDate}
        locale={locale}
        is24Hour={is24Hour}
        minuteInterval={minuteInterval}
        timeZoneOffsetInMinutes={timeZoneOffsetInMinutes}
        display={display}
        textColor={textColor}
        style={dateTimePickerStyle}
        themeVariant={themeVariant}
        testID={`${testID}.picker`}
      />
    );
  }, [
    mode,
    value,
    handleChange,
    minimumDate,
    maximumDate,
    locale,
    is24Hour,
    minuteInterval,
    timeZoneOffsetInMinutes,
    themeVariant
  ]);

  const renderIOSExpandableOverlay = () => {
    return (
      <>
        {renderHeader()}
        {renderDateTimePicker()}
      </>
    );
  };

  const renderAndroidDateTimePicker = useCallback(({visible}: RenderCustomOverlayProps) => {
    if (visible) {
      return renderDateTimePicker();
    }
  },
  [renderDateTimePicker]);

  return (
    <>
      <ExpandableOverlay
        // @ts-expect-error
        ref={expandable}
        expandableContent={Constants.isIOS ? renderIOSExpandableOverlay() : undefined}
        useDialog
        dialogProps={_dialogProps}
        disabled={editable === false}
        // NOTE: Android picker comes with its own overlay built-in therefor we're not using ExpandableOverlay for it
        renderCustomOverlay={Constants.isAndroid ? renderAndroidDateTimePicker : undefined}
        testID={`${testID}.overlay`}
      >
        {renderInput ? (
          renderInput({...props, value: getStringValue()})
        ) : (
          <TextField
            {...others}
            // @ts-expect-error
            ref={textField}
            testID={testID}
            editable={editable}
            value={getStringValue()}
          />
        )}
      </ExpandableOverlay>
    </>
  );
});

DateTimePicker.displayName = 'DateTimePicker';
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
