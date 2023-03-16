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

    purchases.map((p, i) => {
      let pError = {};

      // to check years
      let date = new Date();
      let datePlus50Years = new Date();
      datePlus50Years.setUTCFullYear(date.getUTCFullYear() + 50);
      let currentYear = date.getUTCFullYear();
      let finalYear = datePlus50Years.getUTCFullYear();

      const numAndRangeCheck = (value, min, max) => {
        return typeof value === "number" && value >= min && value <= max;
      };

      const check55TreesPerYear = (year, purchases) => {
        // with more time would make more efficient check (rather than filtering through all purchases every time)
        const sameYearPurchases = purchases.filter((p) => p.year === year);
        let totalTrees = 0;
        sameYearPurchases.map((p) => (totalTrees += p.trees));

        return totalTrees <= 55 ? true : false;
      };

      //check month
      if (!numAndRangeCheck(p.month, 0, 11))
        pError.month = "Month must be a number between 0 and 11.";

      //check year
      if (!numAndRangeCheck(p.year, currentYear, finalYear))
        pError.year = `Year must be a number and be between ${currentYear} and ${finalYear}.`;

      // check trees
      if (
        typeof p.trees !== "number" &&
        check55TreesPerYear(p.month, purchases)
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
    return errors.length > 1 ? errors : true;
  },
  annualCO2ErrCheck: (annualCO2) => {
    // check if annualCO2 is number and above 0, if not return error message.
    return typeof data.annualCO2 === "number" && data.annualCO2 > 0
      ? null
      : "Annual CO2 output must be a number above 0.";
  },
  validateData: (data) => {
    let aCO2Error = annualCO2ErrCheck(data.annualCO2); // return null if no errors, or array of errors
    let pErrors = purchasesErrCheck(data.purchases); // return null if no error, or true
    let errors = {};
    if (aCO2Error !== null) errors.annualCO2 = aCO2Error;
    if (pErrors !== null) errors.purchases = pErrors;
    return Object.keys(errors) > 0 ? errors : true; // true = no errors
  },
};

module.exports = cOSUtil;
