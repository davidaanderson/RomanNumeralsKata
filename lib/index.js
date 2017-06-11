'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var romanToArabicMap = {
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

var arabicToRomanMap = {
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

var arabicTokens = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];

var RomanNumeralTranslator = function () {
    function RomanNumeralTranslator() {
        _classCallCheck(this, RomanNumeralTranslator);
    }

    _createClass(RomanNumeralTranslator, null, [{
        key: '_getNextTokenFromRomanNumeral',
        value: function _getNextTokenFromRomanNumeral(romanNumeral) {
            if (romanNumeral === '') {
                return '';
            }

            if (romanNumeral.length === 1) {
                return romanNumeral;
            }

            var substractiveToken = romanNumeral.substring(0, 2);
            var standardToken = romanNumeral.substring(0, 1);

            if (romanToArabicMap.hasOwnProperty(substractiveToken)) {
                return substractiveToken;
            }

            if (romanToArabicMap.hasOwnProperty(standardToken)) {
                return standardToken;
            }

            throw Error('The Roman Numeral ' + standardToken + ' is not valid');
        }
    }, {
        key: 'romanNumeralToInteger',
        value: function romanNumeralToInteger(romanNumeral) {

            if (romanNumeral === '') {
                return 0;
            }

            var nextToken = RomanNumeralTranslator._getNextTokenFromRomanNumeral(romanNumeral);
            var sum = romanToArabicMap[nextToken];
            var remainingString = romanNumeral.substring(nextToken.length);

            sum += RomanNumeralTranslator.romanNumeralToInteger(remainingString);
            return sum;
        }
    }, {
        key: 'integerToRomanNumeral',
        value: function integerToRomanNumeral(integerToParse) {
            var arabicTokenArrayPointer = 0;
            var romanNumeralBeingConstructed = '';

            while (integerToParse > 0) {
                var currentArabicTokenValue = arabicTokens[arabicTokenArrayPointer];
                var remainingIntegerToParse = integerToParse - currentArabicTokenValue;

                if (remainingIntegerToParse < 0) {
                    arabicTokenArrayPointer++;
                } else {
                    romanNumeralBeingConstructed += arabicToRomanMap[currentArabicTokenValue];
                    integerToParse = remainingIntegerToParse;
                }
            }

            return romanNumeralBeingConstructed;
        }
    }]);

    return RomanNumeralTranslator;
}();

var RomanNumeral = function () {
    _createClass(RomanNumeral, null, [{
        key: 'parseInteger',
        value: function parseInteger(integer) {
            RomanNumeral._ensureIntegerIsValid(integer);
            var romanNumeralValue = RomanNumeralTranslator.integerToRomanNumeral(integer);
            return new RomanNumeral(romanNumeralValue, integer);
        }
    }, {
        key: 'parseString',
        value: function parseString(romanNumeral) {
            var arabicValue = RomanNumeralTranslator.romanNumeralToInteger(romanNumeral);
            RomanNumeral._ensureIntegerIsValid(arabicValue);
            return new RomanNumeral(romanNumeral, arabicValue);
        }
    }, {
        key: '_ensureIntegerIsValid',
        value: function _ensureIntegerIsValid(integer) {
            if (integer < 1 || integer > 3999) {
                throw new RangeError('Value ' + integer + ' must be between I (1) and MMMCMXCIX (3999)');
            }
        }
    }]);

    function RomanNumeral(romanNumeral, arabicNumeral) {
        _classCallCheck(this, RomanNumeral);

        this.romanValue = romanNumeral;
        this.arabicValue = arabicNumeral;
    }

    _createClass(RomanNumeral, [{
        key: 'toString',
        value: function toString() {
            return this.romanValue;
        }
    }, {
        key: 'toInteger',
        value: function toInteger() {
            return this.arabicValue;
        }
    }]);

    return RomanNumeral;
}();

module.exports = RomanNumeral;