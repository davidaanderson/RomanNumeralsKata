'use strict';

const RomanNumeral = require('../lib/index.js');
const chai = require('chai');
const should = chai.should();

describe('the RomanNumeral class', () => {
    describe('when constructed with a roman numeral', () => {
        it('should raise an exception when greater than 3999', () => {
            should.throw(
                () => new RomanNumeral('MMMM'),
                RangeError,
                'Value 4000 must be between I (1) and MMMCMXCIX (3999)');
        });

        it('should raise an exception when an invalid character is included', () => {
            should.throw(
                () => new RomanNumeral('MMSIX'),
                Error,
                'The Roman Numeral S is not valid'
            );
        });

        it('should accept 1', () => {
            var sut = new RomanNumeral('I');
            sut.toString().should.equal('I');
        });

        it ('should accept 3999', () => {
            var sut = new RomanNumeral('MMMCMXCIX');
            sut.toString().should.equal('MMMCMXCIX');
        });

        it('should be displayed correctly with toString', () => {
            var sut = new RomanNumeral('MMXVII');
            sut.toString().should.equal('MMXVII');
        });
    });

    describe('when displaying an integer', () => {
        it('should convert MMXVII to 2017', () => {
            var sut = new RomanNumeral('MMXVII');
            sut.toInteger().should.equal(2017);
        });
    });

    describe('when parsing an integer', () => {
        it('should raise an exception when less than 1', () => {
            RomanNumeral.parseInteger(0)
                .should
                .throw(RangeError, 'between I (1) and MMMCMXCIX (3999)');
        });

        it ('should raise an exception when greater than 3999', () => {
            RomanNumeral.parseInteger(4000)
                .should
                .throw(RangeError, 'between I (1) and MMMCMXCIX (3999)');
        });

        it('should convert 1 to I', () => {
            var sut = RomanNumeral.parseInteger(1);
            sut.toString().should.equal('I');
        });

        it('should convert 3999 to MMMCMXCIX', () => {
            var sut = RomanNumeral.parseInteger(3999);
            sut.toString().should.equal('MMMCMXCIX');
        });

        it('should convert 2017 to MMXVII', () => {
            var sut = RomanNumeral.parseInteger(2017);
            sut.toString().should.equal('MMXVII');
        });
    });
});
