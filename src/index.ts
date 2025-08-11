/**
 * @name CurrencyFormat
 * @description Formatting numbers as currency with options for precision, thousands separator, and currency symbol.
 * @version 1.0.0
 * @author pphatdev <pphat.kits.@gmail.com>
 * @license MIT
 *
 * @example
 * const formatter = new CurrencyFormat([
 *     {
 *         origin: "140",
 *         options: { trim: true, currencyFormat: 'KHR', thousandsSeparator: ',', symbol: '៛' }
 *     },
 *     {
 *         origin: "10000",
 *         options: { trim: true, currencyFormat: 'USD', thousandsSeparator: ',', symbol: '$' }
 *     }
 * ]);
 * console.log(formatter.currency());
 */

export interface CurrencyFormatOptions {
    trim?: boolean;
    currencyFormat?: 'USD' | 'KHR' | undefined;
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
    format?: 'USD' | 'KHR';
}

export interface FormatParams {
    value: string | number;
    options: FormatOptions;
}


export interface formattedResult extends ValueParams {
    formatted: string;
}


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

        let formatted: number = 0;

        // check number type
        if (typeof number === "string") {
            formatted = parseFloat(String(number).replace(/[^\d.-]/g, ''));
        }

        const amount = format === "KHR"
            ? Math.round(formatted / 100) * 100
            : formatted;

        const round = Math.round((amount + 0.00000000000001) * 100) / 100;

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

if (typeof window !== "undefined") {
    (window as any).CurrencyFormat = CurrencyFormat;
}

export default CurrencyFormat;