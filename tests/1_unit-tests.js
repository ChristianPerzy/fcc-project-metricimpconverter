const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){
    const conv = {
        gal: ["L", 3.78541],
        L: ["gal", 1 / 3.78541],
        mi: ["km", 1.60934],
        km: ["mi", 1 / 1.60934],
        lbs: ["kg", 0.453592],
        kg: ["lbs", 1 / 0.453592]
    };

    const spellOut = {
        gal: "gallons",
        L: "liters",
        mi: "miles",
        km: "kilometers",
        lbs: "pounds",
        kg: "kilograms"
    }

    const units = Object.keys(spellOut);

    test('whole number', () => {
        assert.equal(convertHandler.getNum("4L"), 4);
    });

    test('decimal number', () => {
        assert.equal(convertHandler.getNum("4.44L"), 4.44);
    });

    test('fractional input', () => {
        assert.equal(convertHandler.getNum("4/4L"), 1);
    });

    test('double fraction', () => {
        assert.throw(() => convertHandler.getNum("4/3/4L"));
    });

    test('default num', () => {
        assert.equal(convertHandler.getNum("L"), 1);
    });

    test('input units', () => {
        for (let unit of units) {
            assert.equal(convertHandler.getUnit(unit),unit, unit + " failed");
        }
    });

    test('invalid units', () => {
        assert.throw(() => convertHandler.getUnit("45h"));
    });

    test('return unit', () => {
        for (let unit of units) {
            assert.equal(convertHandler.getReturnUnit(unit), conv[unit][0], unit + " failed");
        }
    });

    test('spelled out', () => {
        for (let unit of units) {
            assert.equal(convertHandler.spellOutUnit(unit), spellOut[unit], unit + " failed");
        }
    });

    test('gal to L', () => {
        assert.equal(convertHandler.convert(5,"gal"), 18.92705);
    });

    test('L to gal', () => {
        assert.equal(convertHandler.convert(5,"L"), 1.32086);
    });

    test('mi to km', () => {
        assert.equal(convertHandler.convert(5,"mi"), 8.04670);
    });

    test('km to mi', () => {
        assert.equal(convertHandler.convert(5,"km"), 3.10686);
    });

    test('lbs to kg', () => {
        assert.equal(convertHandler.convert(5,"lbs"), 2.26796);
    });

    test('kg to lbs', () => {
        assert.equal(convertHandler.convert(5,"kg"), 11.02312);
    });
});