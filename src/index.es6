'use strict';

const romanToArabicMap = {
    'IV': 4,
    'IX': 9,
    'XL': 40,
    'XC': 90,
    'CD': 400,
    'CM': 900,
    'I': 1,
    'V': 5,
    'X': 10,
    'L': 50,
    'C': 100,
    'D': 500,
    'M': 1000
};

const arabicToRomanMap = [
    1000,
    900,
    500,
    400,
    100,
    90,
    50,
    40,
    10,
    9,
    5,
    4,
    1
];

class RomanNumeralTranslator {
    static _getNextToken (romanNumeral) {
        if (romanNumeral === '') {
            return '';
        }

        if (romanNumeral.length === 1) {
            return romanNumeral;
        }

        let substractiveToken = romanNumeral.substring(0, 2);
        let standardToken = romanNumeral.substring(0, 1);

        if (romanToArabicMap.hasOwnProperty(substractiveToken)) {
            return substractiveToken;
        }

        if (romanToArabicMap.hasOwnProperty(standardToken)) {
            return standardToken;
        }

        throw Error(`The Roman Numeral ${standardToken} is not valid`);
    }

    static romanNumeralToInteger (romanNumeral) {

        if (romanNumeral === '') {
            return 0;
        }

        let nextToken = RomanNumeralTranslator._getNextToken(romanNumeral);
        let sum = romanToArabicMap[nextToken];
        let remainingString = romanNumeral.substring(nextToken.length);

        sum += RomanNumeralTranslator.romanNumeralToInteger(remainingString);
        return sum;
    }

    static integerToRomanNumeral (integer) {

    }
}

class RomanNumeral {
    static parseInteger (integer) {
        throw 'Not Implemented';
    }

    constructor (romanNumeral) {
        this.romanValue = romanNumeral;

        var arabicValue = RomanNumeralTranslator.romanNumeralToInteger(romanNumeral);
        this._ensureIntegerIsValid(arabicValue);

        this.arabicValue = arabicValue;
    }

    _ensureIntegerIsValid (integer) {
        if (integer < 1 || integer > 3999) {
            throw new RangeError(`Value ${integer} must be between I (1) and MMMCMXCIX (3999)`);
        }
    }

    toString () {
        return this.romanValue;
    }

    toInteger () {
        throw 'Not Implemented';
    }
}

module.exports = RomanNumeral;
