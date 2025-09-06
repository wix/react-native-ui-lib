export type NumberInputData = {
    type: 'valid';
    userInput: string;
    number: number;
    formattedNumber: string;
} | {
    type: 'error';
    userInput: string;
};
export interface LocaleOptions {
    locale: string;
    decimalSeparator: string;
    thousandSeparator: string;
}
export interface Options {
    localeOptions: LocaleOptions;
    fractionDigits: number;
}
export declare function generateOptions(locale: string, fractionDigits: number): Options;
export declare function getInitialNumber(propsInitialNumber: number | undefined, options: Options): number;
export declare function parseInput(text: string, options: Options, initialNumber?: number): NumberInputData;
