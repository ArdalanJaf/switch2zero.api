const cOSUtil = require("./util/carbonOffsetSimUtil");

const carbonOffsetSim = (data) => {
  try {
    const { purchases, annualCO2 } = data;

    // 1. validate data (defensive check)
    let validatedData = cOSUtil.validateData(data); // returns true or object of errors
    if (validatedData !== true) return { errors: validatedData };
    return true;
    // 2. sort purchases (should already be sorted, but just to make sure)
    //   cOSUtil.sortPurchases(purchases);

    // 3.

    // Calculate number of months between first purchase and last purchased + time for last planted trees to fully grow.
    // let totalMonths = cOSUtil.getFinalMonthIndex(
    //   purchases[0],
    //   purchases[purchases.length - 1],
    //   treeGrowthMonths
    // );

    // const monthlyCO2Output = 5.55; // metric tons
    // const initialCost = 120;
    // const upkeepCost = 12; //monthly
    // const treeCO2Offset = 28.5 / 12; //monthly
    // // whilst growing offset = treeCO2Offset / 30 * age (months) of tree
    // const treeGrowthMonths = 30; // months for tree to fully grow
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = carbonOffsetSim;
