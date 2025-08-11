import CurrencyFormat from './index';

describe('CurrencyFormat.format', () => {
    it('formats USD with default options', () => {
        expect(CurrencyFormat.format({
            value: 1234.56,
            options: { format: 'USD', symbol: '$', thousandsSeparator: ',' }
        })).toBe('$1,234.56');
    });

    it('formats KHR with rounding and symbol at end', () => {
        expect(CurrencyFormat.format({
            value: 1234,
            options: { format: 'KHR', symbol: '៛', thousandsSeparator: ',' }
        })).toBe('1,200.00៛');
    });

    it('formats string value with currency symbol', () => {
        expect(CurrencyFormat.format({
            value: "10000",
            options: { format: 'USD', symbol: '$', thousandsSeparator: ',' }
        })).toBe('$10,000.00');
    });

    it('formats with no thousands separator', () => {
        expect(CurrencyFormat.format({
            value: 1234.56,
            options: { format: 'USD', symbol: '$', thousandsSeparator: '' }
        })).toBe('$1234.56');
    });

    it('formats with no symbol', () => {
        expect(CurrencyFormat.format({
            value: 1234.56,
            options: { format: 'USD', thousandsSeparator: ',' }
        })).toBe('1,234.56');
    });

    it('formats negative numbers', () => {
        expect(CurrencyFormat.format({
            value: -1234.56,
            options: { format: 'USD', symbol: '$', thousandsSeparator: ',' }
        })).toBe('$-1,234.56');
    });

    it('formats zero', () => {
        expect(CurrencyFormat.format({
            value: 0,
            options: { format: 'USD', symbol: '$', thousandsSeparator: ',' }
        })).toBe('$0.00');
    });

    it('formats invalid string as 0', () => {
        expect(CurrencyFormat.format({
            value: "abc",
            options: { format: 'USD', symbol: '$', thousandsSeparator: ',' }
        })).toBe('$0.00');
    });

    it('formats with custom precision', () => {
        expect(CurrencyFormat.format({
            value: 1234.5678,
            options: { format: 'USD', symbol: '$', thousandsSeparator: ',', precision: 3 }
        })).toBe('$1,234.568');
    });
});

describe('CurrencyFormat.currency', () => {
    it('formats multiple values', () => {
        const formatter = new CurrencyFormat([
            {
                origin: "140",
                options: { trim: true, currencyFormat: 'KHR', thousandsSeparator: ',', symbol: '៛' }
            },
            {
                origin: "10000",
                options: { trim: true, currencyFormat: 'USD', thousandsSeparator: ',', symbol: '$' }
            }
        ]);
        const result = formatter.currency();
        expect(result[0].formatted).toBe('100.00៛');
        expect(result[1].formatted).toBe('$10,000.00');
    });
});

describe('CurrencyFormat.getDefaultOptions', () => {
    it('returns default options', () => {
        expect(CurrencyFormat.getDefaultOptions()).toEqual({
            trim: false,
            currencyFormat: 'USD',
            thousandsSeparator: ',',
            symbol: ''
        });
    });
});