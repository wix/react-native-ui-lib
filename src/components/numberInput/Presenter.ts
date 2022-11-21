import {isEmpty} from 'lodash';

export type NumberInputResult =
  | {type: 'valid'; userInput: string; number: number; formattedNumber: string}
  | {type: 'empty'}
  | {type: 'error'; userInput: string};

export const EMPTY: NumberInputResult = {type: 'empty'};

export interface LocaleOptions {
  locale: string;
  decimalSeparator: string;
  thousandSeparator: string;
}

export interface Options {
  localeOptions: LocaleOptions;
  fractionDigits: number;
}

function formatNumber(value: number, options: Options) {
  return value.toLocaleString(options.localeOptions.locale, {maximumFractionDigits: options.fractionDigits});
}

function generateLocaleOptions(locale: string) {
  const options: Options = {
    localeOptions: {
      locale,
      decimalSeparator: '', // fake decimalSeparator, we're creating it now
      thousandSeparator: '' // fake thousandSeparator, we're creating it now
    },
    fractionDigits: 1
  };
  const decimalSeparator = formatNumber(1.1, options).replace(/1/g, '');
  const thousandSeparator = formatNumber(1111, options).replace(/1/g, '');

  return {
    locale,
    decimalSeparator,
    thousandSeparator
  };
}

export function generateOptions(locale: string, fractionDigits: number): Options {
  return {localeOptions: generateLocaleOptions(locale), fractionDigits};
}

export function parseInput(text: string, options: Options): NumberInputResult {
  if (isEmpty(text)) {
    return EMPTY;
  }

  let cleanInput: string = text.replaceAll(options.localeOptions.thousandSeparator, '');
  cleanInput = cleanInput.replaceAll(options.localeOptions.decimalSeparator, '.');
  let number = Number(cleanInput);
  if (isNaN(number)) {
    return {type: 'error', userInput: text};
  }

  number = Number(number.toFixed(options.fractionDigits));
  const formattedNumber = formatNumber(number, options);

  return {type: 'valid', userInput: text, number, formattedNumber};
}

export function getInitialResult(options: Options, initialValue?: number): NumberInputResult {
  if (initialValue === undefined) {
    return EMPTY;
  }

  return parseInput(initialValue.toString(), options);
}
