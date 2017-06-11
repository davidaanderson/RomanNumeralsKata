'use strict';

const RomanNumeral = require('../lib/index.js');
const chai = require('chai');
chai.should();

describe('the RomanNumeral class', () => {
    describe('when constructed with a roman numeral', () => {
        it('should be displayed correctly with toString', () => {
            var sut = new RomanNumeral('MMXVII');
            sut.toString().should.equal('MMXVII');
        });
    });
});
