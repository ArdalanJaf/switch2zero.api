const cOSUtil = require("./util/carbonOffsetSimUtil");

/* 
    GUIDE
    1. Validate user data, if it fails, return errors.
    2. Calculate number of months (monthIndexes) between first purchase and final purchase (+ months for final purchased trees to fully grow). 
    3. Create tracker that will store each purchase's start month index and track respective costs, offset and months grown. 
    4. Iterate through total of months. On each iteration: 
        I. if monthIndex (m) coincides with purchase tracker's startMonthIndex, activate purchase tracker (active = true)
        II. a monthly graph data object (mGraphData) is created, containing date represented by monthIndex and will store total cumulative costs + offset for all active purchase trackers.
        III. if inflation rate included, every 10 years update 
        IV. parse through active purchase trackers: (a) increment their cost, offset and months grown. (b) add cost and offset to mGraphData
        V. add mGraphData to graphData array
    5. Assemble and return result's object, including graphData and calculated stats. 
  */

const carbonOffsetSim = (data, config) => {
  try {
    const { purchases, annualCO2, inflationRate } = data;
    const {
      initial_cost,
      upkeep_cost,
      annual_offset,
      growth_time,
      max_annual_purchase,
      useFractionalExponential,
      applyInflationToUpkeep,
    } = config;

    // VALIDATION (defensive check)
    let validatedData = cOSUtil.validateData(data, max_annual_purchase); // returns true or object of errors
    if (validatedData !== true) return { errors: validatedData };

    // PREPARE purchases for iterations.
    cOSUtil.sortPurchases(purchases);
    cOSUtil.findAndMergeSameDatePs(purchases);

    // CONTROLS
    let costs = { initial: initial_cost, upkeep: upkeep_cost }; // cents. in object to be able to change in util scope (for inflation rate)
    const monthlyTreeCO2Offset = cOSUtil.decimalFix(
      annual_offset / 12 / 1000,
      2
    ); // annual CO2 offset in KG (stored in database as g so needs /1000)
    const monthsToFullyGrow = growth_time;

    // CREATE TRACKERS
    // Tracks each purchase's start month index and respective cumulative costs, offsets and monthsGrown (up to fully grown).
    const purchasesTracker = cOSUtil.buildPurchasesTracker(purchases);
    let dateTracker = cOSUtil.getPurchaseDate(purchases[0]); // start at first purchase, will increment by 1 month every iteration

    const totalMonths =
      purchasesTracker[purchasesTracker.length - 1].startMonthIndex +
      monthsToFullyGrow; // maximum number of months needed
    const graphData = [];

    // iterate through each month...
    for (let m = 0; m <= totalMonths; m++) {
      // create this month's graph data object, including month's time stamp (which increases by 1 month on each iteration)
      let mGraphData = {
        date: cOSUtil.getUnixDate(dateTracker, m),
        cost: 0,
        offset: 0,
      };

      // check for purchase that starts this month and if found, activates it.
      cOSUtil.checkForNewPurchase(m, purchasesTracker);

      // if user included inflation rate, update initial cost (make "applyToUpkeep" true to also update upkeep cost)
      if (inflationRate)
        cOSUtil.checkForInflation(
          m,
          inflationRate,
          costs,
          applyInflationToUpkeep
        );

      // for each active purchase tracker: update values of cost, offset and months grown. Add values to mGraphData.
      cOSUtil.processActivePurchases(
        mGraphData,
        purchasesTracker,
        costs,
        monthsToFullyGrow,
        monthlyTreeCO2Offset,
        useFractionalExponential
      );

      // add month's data to graphData arr.
      graphData.push(mGraphData);
    }

    return cOSUtil.assembleResultsObj(
      graphData,
      purchasesTracker,
      costs,
      annualCO2,
      monthlyTreeCO2Offset
    );
  } catch (error) {
    console.log(error);
    return { error };
  }
};

module.exports = carbonOffsetSim;
