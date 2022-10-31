import {Constants} from '../../commons/new';

export interface Data {
  value: number;
  endsWithDecimalSeparator: boolean;
  formattedNumber: string;
  maxLength: number;
}

/**
 * `undefined` is a legitimate result (replace current data with it), while `null`
 * means data should not be set (error state or previous data is already `undefined`)
 */
type ProcessResult = Data | undefined | null;

export interface LocaleOptions {
  locale: string;
  decimalSeparator: string;
}

function formatNumber(value: number, locale: string) {
  return value.toLocaleString(locale);
}

function getDecimalSeparator(locale: string) {
  const formattedNumber = formatNumber(1.1, locale);
  return formattedNumber.replace(/1/g, '');
}

export function generateLocaleOptions(locale: string) {
  return {
    locale,
    decimalSeparator: getDecimalSeparator(locale)
  };
}

export function deriveData(localeOptions: LocaleOptions,
  fractionDigits: number,
  input?: number,
  endsWithDecimalSeparator = false): Data | undefined {
  if (input === undefined) {
    return;
  }

  const value = Number(input.toFixed(fractionDigits));
  let formattedNumber = formatNumber(value, localeOptions.locale);
  if (endsWithDecimalSeparator) {
    formattedNumber += localeOptions.decimalSeparator;
  }

  return {
    value,
    endsWithDecimalSeparator,
    formattedNumber,
    maxLength: formattedNumber.length
  };
}

function isLastCharDecimalSeparator(str: string, localeOptions: LocaleOptions) {
  return str.length > 0 && str.charAt(str.length - 1) === localeOptions.decimalSeparator;
}

function removeLastChar(str: string) {
  return str.substring(0, str.length - 1);
}

function processNewInput(newInput: string, fractionDigits: number, localeOptions: LocaleOptions, currentData?: Data) {
  let newNumber;
  const _isLastCharDecimalSeparator = isLastCharDecimalSeparator(newInput, localeOptions);
  if (_isLastCharDecimalSeparator && fractionDigits === 0) {
    return null;
  }

  if (_isLastCharDecimalSeparator) {
    newNumber = Number(removeLastChar(newInput));
  } else {
    newNumber = Number(newInput);
  }
  if (isNaN(newNumber)) {
    return null;
  }

  const endsWithDecimalSeparator =
    newNumber.toString().length !== newInput.length || (newInput.length === 1 && _isLastCharDecimalSeparator);
  const newData = deriveData(localeOptions, fractionDigits, newNumber, endsWithDecimalSeparator);
  if (newData === undefined || newData?.maxLength === currentData?.maxLength) {
    return null;
  }

  return newData;
}

function processBackspace(fractionDigits: number, localeOptions: LocaleOptions, currentData?: Data): ProcessResult {
  if (!currentData) {
    return null;
  }

  if (currentData?.value === Infinity) {
    return undefined;
  }

  if (currentData.endsWithDecimalSeparator) {
    const newData = deriveData(localeOptions, fractionDigits, currentData.value, false);
    return newData;
  }

  const currentNumberAsString = `${currentData.value}`;
  if (currentNumberAsString.length > 0) {
    const newInput = removeLastChar(currentNumberAsString);
    if (newInput.length === 0) {
      return undefined;
    } else {
      return processNewInput(newInput, fractionDigits, localeOptions, currentData);
    }
  } else {
    return null; // will probably not get here
  }
}

export function processKey(key: string,
  fractionDigits: number,
  localeOptions: LocaleOptions,
  currentData?: Data): ProcessResult {
  let newData;
  if (key === Constants.backspaceKey) {
    newData = processBackspace(fractionDigits, localeOptions, currentData);
  } else {
    const decimalSeparator = currentData?.endsWithDecimalSeparator ? '.' : ''; // this is not a bug, using '.' (en) because Number() only works with en locale
    const newInput = currentData ? `${currentData.value}${decimalSeparator}${key}` : key;
    newData = processNewInput(newInput, fractionDigits, localeOptions, currentData);
  }

  return newData;
}
