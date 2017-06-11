'use strict';

const RomanNumeral = require('../lib/index.js');
const chai = require('chai');
const should = chai.should();

describe('the RomanNumeral class', () => {
    describe('when parsing a string', () => {
        it('should raise an exception when greater than 3999', () => {
            should.throw(
                () => RomanNumeral.parseString('MMMM'),
                RangeError,
                'Value 4000 must be between I (1) and MMMCMXCIX (3999)');
        });

        it('should raise an exception when an invalid character is included', () => {
            should.throw(
                () => RomanNumeral.parseString('MMSIX'),
                Error,
                'The Roman Numeral S is not valid'
            );
        });

        it('should accept 1', () => {
            var sut = RomanNumeral.parseString('I');
            sut.toString().should.equal('I');
            sut.toInteger().should.equal(1);
        });

        it('should accept 3999', () => {
            var sut = RomanNumeral.parseString('MMMCMXCIX');
            sut.toString().should.equal('MMMCMXCIX');
            sut.toInteger().should.equal(3999);
        });

        it('should accept roman numerals that do not use substractive notation', () => {
            var sut = RomanNumeral.parseString('MDCCCCX');
            sut.should.be.instanceOf(RomanNumeral);
            sut.toInteger().should.equal(1910);
        });
    });

    describe('when displaying an integer', () => {
        it('should display value passed into constructor', () => {
            var sut = new RomanNumeral('MMXVII', 2017);
            sut.toInteger().should.equal(2017);
        });
    });

    describe('when displaying a string', () => {
        it('should display value passed into constructor', () => {
            var sut = new RomanNumeral('MMXVII', 2017);
            sut.toString().should.equal('MMXVII');
        });
    });

    describe('when parsing an integer', () => {
        it('should raise an exception when less than 1', () => {
            should.throw(
                () => RomanNumeral.parseInteger(0),
                RangeError,
                'between I (1) and MMMCMXCIX (3999)');
        });

        it ('should raise an exception when greater than 3999', () => {
            should.throw(
                () => RomanNumeral.parseInteger(4000),
                RangeError,
                'between I (1) and MMMCMXCIX (3999)');
        });

        it('should convert 1 to I', () => {
            var sut = RomanNumeral.parseInteger(1);
            sut.should.be.instanceOf(RomanNumeral);
            sut.toString().should.equal('I');
        });

        it('should convert 3999 to MMMCMXCIX', () => {
            var sut = RomanNumeral.parseInteger(3999);
            sut.should.be.instanceOf(RomanNumeral);
            sut.toString().should.equal('MMMCMXCIX');
        });

        it('should convert 2017 to MMXVII', () => {
            var sut = RomanNumeral.parseInteger(2017);
            sut.should.be.instanceOf(RomanNumeral);
            sut.toString().should.equal('MMXVII');
        });

        it('should prefer subtractive notation to standard notation', () => {
            var sut = RomanNumeral.parseInteger(1910);
            sut.should.be.instanceOf(RomanNumeral);
            sut.toString().should.not.equal('MDCCCCX');
            sut.toString().should.equal('MCMX');
        });
    });
});
