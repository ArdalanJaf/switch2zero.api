const cOSUtil = {
  sortPurchases: (purchases) => {
    // sorts purchases chronologically
    purchases.sort((tp1, tp2) => {
      if (Number(tp1.year) < Number(tp2.year)) {
        return -1;
      } else if (Number(tp1.year) > Number(tp2.year)) {
        return 1;
      } else if (Number(tp1.month) < Number(tp2.month)) {
        return -1;
      } else if (Number(tp1.month) > Number(tp2.month)) {
        return 1;
      } else return 0;
    });
  },
  purchasesErrCheck: (purchases) => {
    // validates purchases are correct data type and in correct range, checks max 55 trees a year is purchased.
    const errors = [];

    // <could add check that purchases is array of objects with trees, months, years.>
    // <could add check that all dates are not in the past.>

    const numAndRangeCheck = (value, min, max) => {
      return typeof value === "number" && value >= min && value <= max;
    };

    const getYear = (yearsToAdd = 0) => {
      let date = new Date();
      if (yearsToAdd > 0) date.setUTCFullYear(date.getUTCFullYear() + 50);
      return date.getUTCFullYear();
    };
    const currentYear = getYear();
    const finalYear = getYear(50);

    const check55TreesPerYear = (year, purchases) => {
      // <with more time would make more efficient check (rather than filtering through all purchases on each iteration)>
      let totalTrees = 0;
      purchases
        .filter((p) => p.year === year)
        .forEach((p) => (totalTrees += p.trees));
      return totalTrees > 55 && totalTrees ? false : true; // false = failed test - more than 55 trees in one year
    };

    purchases.map((p, i) => {
      let pError = {};

      //check month
      if (!numAndRangeCheck(p.month, 0, 11))
        pError.month = "Month must be a number between 0 and 11.";

      //check year
      if (!numAndRangeCheck(p.year, currentYear, finalYear))
        pError.year = `Year must be a number and be between ${currentYear} and ${finalYear}.`;

      // check trees
      if (
        typeof p.trees !== "number" ||
        p.trees < 0 ||
        !check55TreesPerYear(p.year, purchases)
      )
        pError.trees =
          "Trees must be a number and can only purchase a maximum of 55 trees in 1 year.";

      // if any errors, add index and erroneous fields to errors arr. With more time could add specific error messages.
      if (Object.keys(pError).length > 0) {
        pError.index = i;
        errors.push(pError);
      }
    });

    // if errors, return errors arr, else return null.
    return errors.length > 0 ? errors : null;
  },
  annualCO2ErrCheck: (annualCO2) => {
    // check if annualCO2 is number and above 0, if not return error message.
    return typeof annualCO2 === "number" && annualCO2 > 0
      ? null
      : "Annual CO2 output must be a number above 0.";
  },
  validateData: (data) => {
    // validates annualCO2 and purchases, returns true or object of errors
    let aCO2Error = cOSUtil.annualCO2ErrCheck(data.annualCO2); // return null if no errors, or array of errors
    let pErrors = cOSUtil.purchasesErrCheck(data.purchases); // return null if no error, or true
    let errors = {};
    if (aCO2Error !== null) errors.annualCO2 = aCO2Error;
    if (pErrors !== null) errors.purchases = pErrors;
    return Object.keys(errors).length > 0 ? errors : true; // true = no errors
  },
  getPurchaseDate: (purchase, unix = false) => {
    // return purchase date obj or unix time
    let date = new Date(purchase.year, purchase.month, 1);
    return unix === "unix" ? date.getTime() : date;
  },
  getFinalMonthIndex: (firstP, lastP, treeGrowthMonths) => {
    // calculates number of months between earliest and latest date, then adds months for last planted tree to fully grow.
    return (
      12 -
      Number(firstP.month) +
      (Number(lastP.year) - (Number(firstP.year) + 1)) * 12 +
      Number(lastP.month) +
      treeGrowthMonths
    );
  },
};

module.exports = cOSUtil;
