# CurrencyFormat
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fpphatdev%2Fcurrency-format.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fpphatdev%2Fcurrency-format?ref=badge_shield)


A utility for formatting currency values with customizable options.

> **Available exclusively on [JSR](https://jsr.io/)!**

## Installation

```bash
jsr add @pphatdev/currency-format
```

## Usage

### Deno

```typescript
import { CurrencyFormat } from "jsr:@pphatdev/currency-format";

console.log(
  CurrencyFormat.format({
    value: 1234.56,
    options: { format: "USD", symbol: "$", thousandsSeparator: "," }
  })
); // "$1,234.56"
```

### Node

```typescript
import CurrencyFormat from '@pphatdev/currency-format';

CurrencyFormat.format({
  value: 1234.56,
  options: { format: 'USD', symbol: '$', thousandsSeparator: ',' }
});
// => "$1,234.56"
```

### Khmer Riel (KHR) with rounding and symbol at end

```typescript
CurrencyFormat.format({
  value: 1234,
  options: { format: 'KHR', symbol: '៛', thousandsSeparator: ',' }
});
// => "1,200.00៛"
```

### Formatting string values

```typescript
CurrencyFormat.format({
  value: "10000",
  options: { format: 'USD', symbol: '$', thousandsSeparator: ',' }
});
// => "$10,000.00"
```

### No thousands separator

```typescript
CurrencyFormat.format({
  value: 1234.56,
  options: { format: 'USD', symbol: '$', thousandsSeparator: '' }
});
// => "$1234.56"
```

### No symbol

```typescript
CurrencyFormat.format({
  value: 1234.56,
  options: { format: 'USD', thousandsSeparator: ',' }
});
// => "1,234.56"
```

### Negative numbers

```typescript
CurrencyFormat.format({
  value: -1234.56,
  options: { format: 'USD', symbol: '$', thousandsSeparator: ',' }
});
// => "$-1,234.56"
```

### Zero value

```typescript
CurrencyFormat.format({
  value: 0,
  options: { format: 'USD', symbol: '$', thousandsSeparator: ',' }
});
// => "$0.00"
```

### Invalid string as 0

```typescript
CurrencyFormat.format({
  value: "abc",
  options: { format: 'USD', symbol: '$', thousandsSeparator: ',' }
});
// => "$0.00"
```

### Custom precision

```typescript
CurrencyFormat.format({
  value: 1234.5678,
  options: { format: 'USD', symbol: '$', thousandsSeparator: ',', precision: 3 }
});
// => "$1,234.568"
```

### Formatting multiple values

```typescript
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
console.log(result[0].formatted); // "100.00៛"
console.log(result[1].formatted); // "$10,000.00"
```

### Get Default Options

```typescript
CurrencyFormat.getDefaultOptions();
// => { trim: false, currencyFormat: 'USD', thousandsSeparator: ',', symbol: '' }
```


## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fpphatdev%2Fcurrency-format.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Fpphatdev%2Fcurrency-format?ref=badge_large)