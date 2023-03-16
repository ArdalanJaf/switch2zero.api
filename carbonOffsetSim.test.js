const carbonOffsetSim = require("./carbonOffsetSim");

const data = {
  valid: {
    annualCO2: 5.55,
    purchases: [
      { month: 0, year: 2024, trees: 33 },
      { month: 3, year: 2024, trees: 22 },
      { month: 5, year: 2025, trees: 10 },
      { month: 8, year: 2025, trees: 32 },
      { month: 0, year: 2026, trees: 55 },
      { month: 0, year: 2027, trees: 21 },
      { month: 6, year: 2027, trees: 21 },
      { month: 11, year: 2027, trees: 13 },
    ],
  },
  invalid1: {
    annualCO2: "5.55",
    purchases: [
      { month: 0, year: 2024, trees: 33 },
      { month: 3, year: 2024, trees: 22 },
    ],
  },
  invalid2: {
    annualCO2: 0,
    purchases: [
      { month: 0, year: 2024, trees: 33 },
      { month: 3, year: 2024, trees: 22 },
    ],
  },
  invalid3: {
    annualCO2: 5.55,
    purchases: [
      { month: 0, year: 2024, trees: 33 },
      { month: 3, year: 2024, trees: 22 },
      { month: 5, year: 2025, trees: 54 },
      { month: 8, year: 2025, trees: 32 },
      { month: 0, year: 2026, trees: 55 },
      { month: 0, year: 2027, trees: 21 },
      { month: 6, year: 2027, trees: 21 },
      { month: 11, year: 2027, trees: 13 },
    ],
  },
};

test("valid data", () => {
  expect(carbonOffsetSim(data.valid)).toBe(true);
});
