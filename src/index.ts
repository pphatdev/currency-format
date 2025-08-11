/**
 * @name CurrencyFormat
 * @description Formatting numbers as currency with options for precision, thousands separator, and currency symbol.
 * @version 0.1.2
 * @author pphatdev <pphat.kits.@gmail.com>
 * @license MIT
 *
 * @example
 * const formatter = new CurrencyFormat([{
 *      origin: "140",
 *      options: { trim: true, currencyFormat: 'USD', thousandsSeparator: ',', symbol: '$' }
 *  },]);
 * console.log(formatter.currency());
 * @returns // [{ origin: "140", options: { trim: true, currencyFormat: 'USD', thousandsSeparator: ',', symbol: '$' }, formatted: "$140.00" }]
 */

export interface CurrencyFormatOptions {
    trim?: boolean;
    currencyFormat?: 'USD' | 'KHR' | undefined | Uppercase<string>;
    thousandsSeparator?: string;
    symbol?: string;
}

export interface ValueParams {
    origin: string | number;
    options: CurrencyFormatOptions;
}

export interface FormatOptions {
    precision?: number;
    thousandsSeparator?: string;
    symbol?: string;
    format?: CurrencyFormatOptions['currencyFormat'];
}

export interface FormatParams {
    value: string | number;
    options: FormatOptions;
}


export interface formattedResult extends ValueParams {
    formatted: string;
}

/**
 * CurrencyFormat class for formatting currency values.
 * Formatting numbers as currency with options for precision, thousands separator, and currency symbol.
 */
export class CurrencyFormat {

    values: ValueParams[];

    constructor(values: ValueParams[] = []) {
        this.values = values;
    }

    /**
     * Get the default formatting options.
     * @returns {Object} The default formatting options.
     */
    static getDefaultOptions(): object {
        return CurrencyFormat.defaultOptions;
    }

    /**
     * The default formatting options.
     */
    static readonly defaultOptions: CurrencyFormatOptions = {
        trim: false,
        currencyFormat: 'USD',
        thousandsSeparator: ',',
        symbol: ''
    };


    /**
     * Format a number as currency.
     * @param {FormatParams} param - The parameters for formatting.
     * @returns {string} The formatted currency string.
     */
    static format(param: FormatParams): string {

        const { value: number, options } = param;
        const { precision = 2, thousandsSeparator = ",", symbol = "", format = "USD" } = options;

        let formatted: number = number as number;

        // check number type
        if (typeof number === "string") {
            formatted = parseFloat(String(number).replace(/[^\d.-]/g, ''));
            if (isNaN(formatted)) {
                formatted = 0;
            }
        }

        const amount = format === "KHR"
            ? Math.round(formatted / 100) * 100
            : formatted;

        const factor = Math.pow(10, precision);
        const round = Math.round((amount + 0.00000000000001) * factor) / factor;
        let formattedNumber = round.toFixed(precision);

        if (thousandsSeparator) {
            formattedNumber = formattedNumber.replace(/\B(?=(\d{3})+(?!\d))/g, thousandsSeparator);
        }

        if (String(format) === "KHR" && symbol === "៛") {
            return formattedNumber + symbol;
        }

        return symbol + formattedNumber;
    }


    /**
     * Format values as currency.
     * @returns {formattedResult[]} An array of formatted results.
     **/
    currency = (): formattedResult[] => this.values.map(value => {
        return {
            ...value,
            formatted: CurrencyFormat.format({
                value: value.origin,
                options: {
                    precision: 2,
                    format: value.options.currencyFormat,
                    thousandsSeparator: value.options.thousandsSeparator,
                    symbol: value.options.symbol
                }
            })
        }
    });
}


export const {
    /**
     * Format a number as currency.
     * @param {FormatParams} param - The parameters for formatting.
     * @param {string} param.value - The value to format.
     * @param {FormatOptions} param.options - The formatting options.
     * @param {number} [param.options.precision] - The number of decimal places to include.
     * @param {string} [param.options.thousandsSeparator] - The character to use as the thousands separator.
     * @param {string} [param.options.symbol] - The currency symbol to prepend.
     * @param {('USD' | 'KHR')} [param.options.format] - The currency format to use.
     * @returns {string} The formatted currency string.
    */
    format,

    /**
     * Get the default formatting options.
     * @returns {Object} The default formatting options.
    */
    getDefaultOptions,

    /**
     * The default formatting options.
     * @type {CurrencyFormatOptions}
    */
    defaultOptions
} = CurrencyFormat;


if (typeof window !== "undefined") {
    (window as any).CurrencyFormat = CurrencyFormat;
}

if (typeof (globalThis as any).Deno !== "undefined") {
    (globalThis as any).CurrencyFormat = CurrencyFormat;
}

export default CurrencyFormat;