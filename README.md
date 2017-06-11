# Roman Numerals Code Kata

NPM package to translate:

* roman numeral and arabic integer
* arabic integer and roman numeral

## Usage

Create a roman numeral from a string representation.

`let romanNumeral = RomanNumeral.parseString('MMXVII');`

Create a roman numeral from an arabic integer.

`let romanNumeral = RomanNumeral.parseInteger(2017);`

### Methods

#### Constructor

Constructs a `RomanNumeral` object using the given values. No parsing of the given values take place.

`new RomanNumeral('MMXVII', 2017);`

#### toString()

Displays a roman numeral as a string.

```javascript
let romanNumeral = new RomanNumeral('MMXVII', 2017);
romanNumeral.toString(); // "MMXVII"
```

#### toInteger()

Displays an integer representation of a roman numeral.

```javascript
let romanNumeral = new RomanNumeral('MMXVII', 2017);
romanNumeral.toInteger(); // "2017"
```