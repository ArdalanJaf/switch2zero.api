const decimalFix = (num, dPlaces = 2) => {
  return Number(num.toFixed(dPlaces));
};

module.exports = decimalFix;
