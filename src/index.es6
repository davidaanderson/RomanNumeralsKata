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

const arabicToRomanMap = {
    1000: 'M',
    900: 'CM',
    500: 'D',
    400: 'CD',
    100: 'C',
    90: 'XC',
    50: 'L',
    40: 'XL',
    10: 'X',
    9: 'IX',
    5: 'V',
    4: 'IV',
    1: 'I'
};

const arabicTokens = [
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
    static _getNextTokenFromRomanNumeral (romanNumeral) {
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

        let nextToken = RomanNumeralTranslator._getNextTokenFromRomanNumeral(romanNumeral);
        let sum = romanToArabicMap[nextToken];
        let remainingString = romanNumeral.substring(nextToken.length);

        sum += RomanNumeralTranslator.romanNumeralToInteger(remainingString);
        return sum;
    }

    static integerToRomanNumeral (integerToParse) {
        let arabicTokenArrayPointer = 0;
        let romanNumeralBeingConstructed = '';

        while (integerToParse > 0) {
            let currentArabicTokenValue = arabicTokens[arabicTokenArrayPointer];
            let remainingIntegerToParse = integerToParse - currentArabicTokenValue;

            if (remainingIntegerToParse < 0) {
                arabicTokenArrayPointer++;
            }
            else {
                romanNumeralBeingConstructed += arabicToRomanMap[currentArabicTokenValue];
                integerToParse = remainingIntegerToParse;
            }
        }

        return romanNumeralBeingConstructed;
    }
}

class RomanNumeral {
    static parseInteger (integer) {
        RomanNumeral._ensureIntegerIsValid(integer);
        var romanNumeralValue = RomanNumeralTranslator.integerToRomanNumeral(integer);
        return new RomanNumeral(romanNumeralValue, integer);
    }

    static parseString (romanNumeral) {
        var arabicValue = RomanNumeralTranslator.romanNumeralToInteger(romanNumeral);
        RomanNumeral._ensureIntegerIsValid(arabicValue);
        return new RomanNumeral(romanNumeral, arabicValue);
    }

    static _ensureIntegerIsValid (integer) {
        if (integer < 1 || integer > 3999) {
            throw new RangeError(`Value ${integer} must be between I (1) and MMMCMXCIX (3999)`);
        }
    }

    constructor (romanNumeral, arabicNumeral) {
        this.romanValue = romanNumeral;
        this.arabicValue = arabicNumeral;
    }

    toString () {
        return this.romanValue;
    }

    toInteger () {
        return this.arabicValue;
    }
}

module.exports = RomanNumeral;
