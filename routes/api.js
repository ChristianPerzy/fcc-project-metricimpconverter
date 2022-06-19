'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert').get((req, res) => {
    let input = req.query.input;

    let numError = false;
    let unitError = false;

    let num = 1;
    let unit = "";

    try {
      num = convertHandler.getNum(input);
    } catch(err) {
      numError = true;
    }

    try {
      unit = convertHandler.getUnit(input);
    } catch(err) {
      unitError = true;
    }

    if (numError && unitError) {
      res.send("invalid number and unit");
    } else if (numError) {
      res.send("invalid number");
    } else if (unitError) {
      res.send("invalid unit");
    } else {
      let returnNum = convertHandler.convert(num,unit);
      let returnUnit = convertHandler.getReturnUnit(unit);
      let string = convertHandler.getString(num,unit,returnNum,returnUnit);
      res.json({
        initNum: num,
        initUnit: unit,
        returnNum,
        returnUnit,
        string
      });
    }
  });

};
