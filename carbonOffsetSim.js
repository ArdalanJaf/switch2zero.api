const cOSUtil = require("./util/carbonOffsetSimUtil");

const carbonOffsetSim = (data) => {
  try {
    const { purchases, annualCO2 } = data;

    // 1. validate data
    let validatedData = COSUtil.validateData(data);
    if (validatedData !== true) return { errors: validatedData };

    // 2.

    const monthlyCO2Output = 5.55; // metric tons
    const initialCost = 120;
    const upkeepCost = 12; //monthly
    const treeCO2Offset = 28.5 / 12; //monthly
    // whilst growing offset = treeCO2Offset / 30 * age (months) of tree
    const treeGrowthTime = 30; //months

    return true;
  } catch (error) {
    console.log(error);
    return error;
  }
};

module.exports = carbonOffsetSim;
