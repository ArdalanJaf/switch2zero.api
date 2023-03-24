const cOSUtil = {
  validateData: (data, maxTrees) => {
    // validates annualCO2 and purchases, returns true or object of errors
    let aCO2Error = cOSUtil.annualCO2ErrCheck(data.annualCO2); // return null if no errors, or array of errors
    let pErrors = cOSUtil.purchasesErrCheck(data.purchases, maxTrees); // return null if no error, or true
    let iRateErrors = data.inflationRate
      ? cOSUtil.inflationRateErrCheck(data.inflationRate)
      : null;
    let errors = {};
    if (aCO2Error !== null) errors.annualCO2 = aCO2Error;
    if (pErrors !== null) errors.purchases = pErrors;
    if (iRateErrors !== null) errors.inflationRate = iRateErrors;
    return Object.keys(errors).length > 0 ? errors : true; // true = no errors
  },
  annualCO2ErrCheck: (annualCO2) => {
    // check if annualCO2 is number and above 0, if not return error message.
    return typeof annualCO2 === "number" && annualCO2 > 0
      ? null
      : "Annual CO2 emmissions must be a number above 0.";
  },
  purchasesErrCheck: (purchases, maxTrees) => {
    // validates purchases are correct data type and in correct range, checks max Max trees a year is purchased.
    const errors = [];

    // << Could add check that purchases is array of objects with trees, months, years.>>
    // << Could add check that all dates are not in the past >>

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

    const checkMaxTreesPerYear = (year, purchases, maxTrees) => {
      // << With more time would make more efficient check (rather than filtering through all purchases on each iteration) >>
      let totalTrees = 0;
      purchases
        .filter((p) => p.year === year)
        .forEach((p) => (totalTrees += p.trees));
      return totalTrees > maxTrees && totalTrees ? false : true; // false = failed test - more than Max trees in one year
    };

    purchases.map((p, i) => {
      let pError = {};

      // check month
      if (!numAndRangeCheck(p.month, 0, 11))
        pError.month = "Month must be a number between 0 and 11.";

      // check year
      if (!numAndRangeCheck(p.year, currentYear, finalYear))
        pError.year = `Year must be a number and be between ${currentYear} and ${finalYear}.`;

      // check trees
      if (
        typeof p.trees !== "number" ||
        p.trees < 0 ||
        !checkMaxTreesPerYear(p.year, purchases, maxTrees)
      )
        pError.trees = `Trees must be a number and can only purchase a maximum of ${maxTrees} trees in 1 year.`;

      // if any errors, add index and erroneous fields to errors arr. With more time could add specific error messages.
      if (Object.keys(pError).length > 0) {
        pError.index = i;
        errors.push(pError);
      }
    });

    // if errors, return errors arr, else return null.
    return errors.length > 0 ? errors : null;
  },
  inflationRateErrCheck: (inflationRate) => {
    if (!inflationRate) return null;
    return typeof inflationRate === "number"
      ? null
      : "Inflation rate must be a number or empty (for no rate).";
  },
  sortPurchases: (purchases) => {
    // sorts purchases chronologically
    purchases.sort((tp1, tp2) => {
      if (tp1.year < tp2.year) {
        return -1;
      } else if (tp1.year > tp2.year) {
        return 1;
      } else if (tp1.month < tp2.month) {
        return -1;
      } else if (tp1.month > tp2.month) {
        return 1;
      } else {
        return 0;
      }
    });
  },
  findAndMergeSameDatePs: (purchases) => {
    // recursive function to merge purchases with same date
    let sameIndex = purchases.findIndex((p, i) => {
      return (
        i < purchases.length - 1 &&
        p.year === purchases[i + 1].year &&
        p.month === purchases[i + 1].month
      );
    });

    if (sameIndex >= 0) {
      purchases[sameIndex].trees += purchases[sameIndex + 1].trees;
      purchases.splice(sameIndex + 1, 1);
      cOSUtil.findAndMergeSameDatePs(purchases);
    } else {
      return purchases;
    }
  },
  getPurchaseDate: (purchase, unix = false) => {
    // return purchase date obj or unix time
    let date = new Date(purchase.year, purchase.month, 1);
    return unix === "unix" ? date.getTime() : date;
  },
  calcNumOfMonths: (p1, p2) => {
    // calculates  of months between 2 purchases' month+year.
    return 12 - p1.month + (p2.year - (p1.year + 1)) * 12 + p2.month;
  },
  buildPurchasesTracker: (purchases) => {
    // for each purchase: calculates and stores start month index, stores trees, stores offset + cost + monthsGrown for tracking
    let psTracker = [];
    purchases.map((p) => {
      psTracker.push({
        startMonthIndex: cOSUtil.calcNumOfMonths(purchases[0], p),
        trees: p.trees,
        offset: 0,
        cost: 0,
        monthsGrown: 0,
      });
    });
    return psTracker;
  },
  checkForNewPurchase: (currentMonthIndex, psTracker) => {
    // checks if purchase starts this month, if so: activates it.
    let newPurchaseIndex = psTracker.findIndex(
      (p) => p.startMonthIndex === currentMonthIndex
    );
    if (newPurchaseIndex >= 0)
      return (psTracker[newPurchaseIndex].active = true);
  },
  checkForInflation: (
    m,
    inflationRate,
    costs,
    applyInflationToUpkeep = false
  ) => {
    // every year add inflation rate to initial cost (and upkeep if enabled)
    if (m > 0 && m % 12 === 0) {
      costs.initial = cOSUtil.decimalFix(
        (costs.initial * (inflationRate + 100)) / 100,
        0
      );
      if (applyInflationToUpkeep) {
        costs.upkeep = cOSUtil.decimalFix(
          (costs.upkeep * (inflationRate + 100)) / 100,
          0
        );
      }
      return costs;
      /* Could put 10 year check in higher level fn to avoid calling this fn unncessarilly, but clearer this way. */
    }
  },
  decimalFix: (num, dPlaces = 2) => {
    return Number(num.toFixed(dPlaces));
  },
  getUnixDate: (date, m) => {
    if (m > 0) date.setUTCMonth(date.getUTCMonth() + 1);
    return date.getTime();
  },
  processActivePurchases: (
    mGraphData,
    psTracker,
    costs,
    monthsToFullyGrow,
    monthlyTreeCO2Offset,
    useFractionalExponential
  ) => {
    // calculates and updates 1 month incremental increase for EACH purchase's offset, costs, offset and months grown, then adds costs + offsets to months total (mGraphData)
    return psTracker.forEach((pt, i) => {
      if (pt.active) {
        // update cost of purchase tracker
        pt.cost += cOSUtil.caclCost(pt.trees, costs, pt.monthsGrown);

        // update offset (true = use fractional exponential growth)
        pt.offset = cOSUtil.calcOffset(
          pt.trees,
          monthlyTreeCO2Offset,
          pt.monthsGrown,
          monthsToFullyGrow,
          (exponential = useFractionalExponential ? true : false)
        );

        // update monthsGrown if not fully grown yet
        if (pt.monthsGrown < monthsToFullyGrow) {
          pt.monthsGrown++;
        }

        // add to mResult
        mGraphData.cost += pt.cost;
        mGraphData.offset = cOSUtil.decimalFix(
          mGraphData.offset + pt.offset,
          2
        );
      }
    });
  },
  caclCost: (trees, costs, monthsGrown) => {
    return trees * (monthsGrown > 0 ? costs.upkeep : costs.initial);
  },
  calcOffset: (
    trees,
    monthlyTreeCO2Offset,
    monthsGrown,
    monthsToFullyGrow,
    exponential = false
  ) => {
    // calculates offset. If not fully grown, percentage of ammount grown is applied to monthly offset.
    let result;
    let maxOffset = trees * monthlyTreeCO2Offset;
    if (monthsGrown === monthsToFullyGrow) {
      result = maxOffset;
    } else {
      const evenGrowth = (monthsGrown / monthsToFullyGrow) * 100;
      const fractionalExponential =
        (Math.pow(monthsToFullyGrow, monthsGrown / monthsToFullyGrow) /
          monthsToFullyGrow) *
        100;

      let growthPercentage = !exponential ? evenGrowth : fractionalExponential;
      result = (growthPercentage * maxOffset) / 100;

      /* << Using fractional exponential seems too small untill 90% growth, but used anyway to 
      compensate for trees increasing their CO2 offset as they keep growing beyond "fully grown", 
      based on this paper https://www.nature.com/articles/nature12914 >> */
    }
    return cOSUtil.decimalFix(result, 2);
    // << Can be further optimised by not assigning pt.cost once fully grown, done this way for clarity >>
  },
  assembleResultsObj: (
    graphData,
    psTracker,
    costs,
    annualCO2,
    monthlyTreeCO2Offset
  ) => {
    // assemble results obj with graphData and calculate relevant stats.
    // << Would be more efficient to incorporate most of these into For-Loop, however performance increase is negligible and this is clearer. >>

    const getTotalTrees = (psTracker) => {
      // if no neutrality is reached, take total trees planted as a whole
      let total = 0;

      psTracker.forEach((pt) => (total += pt.trees));

      return total;
    };

    const calcFinalCosts = (
      totalTrees,
      costs,
      neutralMonthObj,
      finalTotalCost
    ) => {
      //if there is carbon neutrality is achieved, use those stats instead.

      let initial = totalTrees * costs.initial;
      return {
        initial,
        upkeep:
          ((neutralMonthObj && neutralMonthObj.costs) || finalTotalCost) -
          initial,
        ongoingUpkeep: totalTrees * costs.upkeep,
      };
    };

    const getNeutralDate = (neutralMonthObj) => {
      // find date when carbon neutrality is achieved
      return neutralMonthObj !== undefined ? neutralMonthObj.date : null;
    };

    const calcTreesNeeded = (totalTrees, monthlyCO2, monthlyTreeCO2Offset) => {
      // calc trees needed for carbon neutrality (negative number indicates extra)
      return Math.ceil(monthlyCO2 / monthlyTreeCO2Offset) - totalTrees;
    };

    let totalTrees = getTotalTrees(psTracker);
    let monthlyCO2 = cOSUtil.decimalFix(annualCO2 / 12, 2);
    let neutralMonthIndex = graphData.findIndex((m) => m.offset >= monthlyCO2);
    let neutralMonthObj =
      neutralMonthIndex >= 0 ? graphData[neutralMonthIndex] : undefined;

    return {
      graphData,
      totalTime: {
        years: Math.round(graphData.length / 12),
        months: graphData.length % 12,
      },
      totalTrees,

      monthlyCO2Offset: graphData[graphData.length - 1].offset,
      monthlyCO2Emmissions: monthlyCO2,
      carbonNeutralDate: getNeutralDate(neutralMonthObj),
      costs: calcFinalCosts(
        totalTrees,
        costs,
        neutralMonthObj,
        graphData[graphData.length - 1].cost
      ),
      treesNeeded: calcTreesNeeded(
        totalTrees,
        monthlyCO2,
        monthlyTreeCO2Offset
      ),
    };
  },
};

module.exports = cOSUtil;
