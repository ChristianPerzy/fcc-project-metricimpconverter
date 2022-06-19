function ConvertHandler() {
  this.conversion = {
    gal: ["L", 3.78541],
    L: ["gal", 1 / 3.78541],
    mi: ["km", 1.60934],
    km: ["mi", 1 / 1.60934],
    lbs: ["kg", 0.453592],
    kg: ["lbs", 1 / 0.453592]
  };

  this.spellOut = {
    gal: "gallons",
    L: "liters",
    mi: "miles",
    km: "kilometers",
    lbs: "pounds",
    kg: "kilograms"
  };
  
  this.getNum = function(input) {
    let split = input.search(/[a-zA-Z]/);
    let num = input.slice(0, split);
    if (num === "") return 1;

    if (!/^(\d+(\.\d+|)(\/\d+(\.\d+|)|)|)$/.test(num)) {
      throw new Error("invalid number");
    }

    let frac = num.split("/");
    if (frac.length == 2) {
      return Number(frac[0]) / Number(frac[1]);
    } else {
      return Number(frac[0]);
    }
  };
  
  this.getUnit = function(input) {
    let split = input.search(/[a-zA-Z]/);
    let unit = input.slice(split);
    if (Object.keys(this.spellOut).includes(unit)) {
      return unit;
    } else {
      throw new Error("invalid unit");
    }
  };
  
  this.getReturnUnit = function(initUnit) {
    return this.conversion[initUnit][0];
  };

  this.spellOutUnit = function(unit) {
    return this.spellOut[unit];
  };
  
  this.convert = function(initNum, initUnit) {
    let num = initNum * this.conversion[initUnit][1];
    return Number(num.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {  
    return initNum.toString() + " " + this.spellOutUnit(initUnit) + " converts to "
      + returnNum.toString() + " " + this.spellOutUnit(returnUnit);
  };
  
}

module.exports = ConvertHandler;
