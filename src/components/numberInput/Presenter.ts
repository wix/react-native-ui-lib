export type NumberInputData =
  | {type: 'valid'; userInput: string; number: number; formattedNumber: string}
  | {type: 'error'; userInput: string};

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
  return value.toLocaleString(options.localeOptions.locale, {
    maximumFractionDigits: options.fractionDigits,
    minimumFractionDigits: options.fractionDigits
  });
}

function generateLocaleOptions(locale: string) {
  const options: Omit<Options, 'fractionDigits'> = {
    localeOptions: {
      locale,
      decimalSeparator: '', // fake decimalSeparator, we're creating it now
      thousandSeparator: '' // fake thousandSeparator, we're creating it now
    }
  };
  const decimalOptions: Options = {...options, fractionDigits: 1};
  const thousandOptions: Options = {...options, fractionDigits: 0};

  const decimalSeparator = formatNumber(1.1, decimalOptions).replace(/1/g, '');
  const thousandSeparator = formatNumber(1111, thousandOptions).replace(/1/g, '');

  return {
    locale,
    decimalSeparator,
    thousandSeparator
  };
}

export function generateOptions(locale: string, fractionDigits: number): Options {
  return {localeOptions: generateLocaleOptions(locale), fractionDigits};
}

function factor(options: Options): number {
  return Math.pow(10, options.fractionDigits);
}

export function getInitialNumber(propsInitialNumber = 0, options: Options) {
  return Number((propsInitialNumber * factor(options)).toFixed(0));
}

export function parseInput(text: string, options: Options, initialNumber?: number): NumberInputData {
  let cleanInput: string = text.replaceAll(options.localeOptions.thousandSeparator, '');
  cleanInput = cleanInput.replaceAll(options.localeOptions.decimalSeparator, initialNumber ? '.' : '');
  let number = Number(cleanInput);
  if (isNaN(number)) {
    return {type: 'error', userInput: text};
  }

  number = Number(number.toFixed(options.fractionDigits));
  if (options.fractionDigits > 0) {
    number /= factor(options);
  }

  const formattedNumber = formatNumber(number, options);
  return {type: 'valid', userInput: initialNumber ? `${initialNumber}` : cleanInput, number, formattedNumber};
}
