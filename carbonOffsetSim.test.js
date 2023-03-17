const carbonOffsetSim = require("./carbonOffsetSim");

const data = {
  basic: {
    problem: {
      annualCO2: 1000,
      purchases: [{ month: 0, year: 2024, trees: 1 }],
    },
    answer: {
      graphData: [
        { date: 1704067200000, cost: 12000, offset: 0.04 },
        { date: 1706745600000, cost: 13200, offset: 0.04 },
        { date: 1709251200000, cost: 14400, offset: 0.05 },
        { date: 1711929600000, cost: 15600, offset: 0.05 },
        { date: 1714521600000, cost: 16800, offset: 0.05 },
        { date: 1717200000000, cost: 18000, offset: 0.06 },
        { date: 1719792000000, cost: 19200, offset: 0.06 },
        { date: 1722470400000, cost: 20400, offset: 0.06 },
        { date: 1725148800000, cost: 21600, offset: 0.07 },
        { date: 1727740800000, cost: 22800, offset: 0.07 },
        { date: 1730419200000, cost: 24000, offset: 0.08 },
        { date: 1733011200000, cost: 25200, offset: 0.08 },
        { date: 1735689600000, cost: 26400, offset: 0.09 },
        { date: 1738368000000, cost: 27600, offset: 0.1 },
        { date: 1740787200000, cost: 28800, offset: 0.1 },
        { date: 1743465600000, cost: 30000, offset: 0.11 },
        { date: 1746057600000, cost: 31200, offset: 0.12 },
        { date: 1748736000000, cost: 32400, offset: 0.13 },
        { date: 1751328000000, cost: 33600, offset: 0.14 },
        { date: 1754006400000, cost: 34800, offset: 0.15 },
        { date: 1756684800000, cost: 36000, offset: 0.16 },
        { date: 1759276800000, cost: 37200, offset: 0.17 },
        { date: 1761955200000, cost: 38400, offset: 0.18 },
        { date: 1764547200000, cost: 39600, offset: 0.19 },
        { date: 1767225600000, cost: 40800, offset: 0.2 },
        { date: 1769904000000, cost: 42000, offset: 0.22 },
        { date: 1772323200000, cost: 43200, offset: 0.23 },
        { date: 1775001600000, cost: 44400, offset: 0.25 },
        { date: 1777593600000, cost: 45600, offset: 0.27 },
        { date: 1780272000000, cost: 46800, offset: 0.29 },
        { date: 1782864000000, cost: 48000, offset: 0.31 },
        { date: 1785542400000, cost: 49200, offset: 0.33 },
        { date: 1788220800000, cost: 50400, offset: 0.35 },
        { date: 1790812800000, cost: 51600, offset: 0.38 },
        { date: 1793491200000, cost: 52800, offset: 0.4 },
        { date: 1796083200000, cost: 54000, offset: 0.43 },
        { date: 1798761600000, cost: 55200, offset: 0.46 },
        { date: 1801440000000, cost: 56400, offset: 0.5 },
        { date: 1803859200000, cost: 57600, offset: 0.53 },
        { date: 1806537600000, cost: 58800, offset: 0.57 },
        { date: 1809129600000, cost: 60000, offset: 0.61 },
        { date: 1811808000000, cost: 61200, offset: 0.65 },
        { date: 1814400000000, cost: 62400, offset: 0.7 },
        { date: 1817078400000, cost: 63600, offset: 0.75 },
        { date: 1819756800000, cost: 64800, offset: 0.8 },
        { date: 1822348800000, cost: 66000, offset: 0.86 },
        { date: 1825027200000, cost: 67200, offset: 0.92 },
        { date: 1827619200000, cost: 68400, offset: 0.98 },
        { date: 1830297600000, cost: 69600, offset: 1.05 },
        { date: 1832976000000, cost: 70800, offset: 1.12 },
        { date: 1835481600000, cost: 72000, offset: 1.2 },
        { date: 1838160000000, cost: 73200, offset: 1.29 },
        { date: 1840752000000, cost: 74400, offset: 1.38 },
        { date: 1843430400000, cost: 75600, offset: 1.48 },
        { date: 1846022400000, cost: 76800, offset: 1.58 },
        { date: 1848700800000, cost: 78000, offset: 1.69 },
        { date: 1851379200000, cost: 79200, offset: 1.81 },
        { date: 1853971200000, cost: 80400, offset: 1.94 },
        { date: 1856649600000, cost: 81600, offset: 2.08 },
        { date: 1859241600000, cost: 82800, offset: 2.22 },
        { date: 1861920000000, cost: 84000, offset: 2.38 },
      ],
      totalTime: { years: 5, months: 1 },
      totalTrees: 1,
      costs: { initial: 12000, upkeep: 72000, ongoingUpkeep: 1200 },
      monthlyCO2Offset: 2,
      monthlyCO2emmissions: 83,
      carbonNeutralDate: null,
      treesNeeded: 35,
    },
  },
  typo: {
    problem: {
      annualCO2: "5500",
      purchases: [
        { month: 0, year: 2024, trees: 23 }, //month 0, trees 33
        { month: 3, year: 2024, trees: 21 }, //month 3, trees 22
        { month: 5, year: 2025, trees: 10 }, //
        { month: 8, year: 2025, trees: 32 },
        { month: 0, year: 2026, trees: 55 },
        { month: 0, year: 2927, trees: 21 },
        { month: 6, year: 2027, trees: 21 },
        { month: 0, year: 2028, trees: 55 },
      ],
    },
    answer: {
      errors: {
        annualCO2: "Annual CO2 emmissions must be a number above 0.",
        purchases: [
          {
            index: 5,
            year: `Year must be a number and be between 2023 and 2073.`,
          },
        ],
      },
    },
  },
};

test("basic data", () => {
  expect(carbonOffsetSim(data.basic.problem)).toEqual(data.basic.answer);
});

test("typos", () => {
  expect(carbonOffsetSim(data.typo.problem)).toEqual(data.typo.answer);
});
