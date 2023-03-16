const cOSUtil = require("./util/carbonOffsetSimUtil");
const { validateData } = cOSUtil;

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
  invalid4: {
    annualCO2: 5.55,
    purchases: [
      { month: 0, year: 2024, trees: 33 },
      { month: 3, year: 2024, trees: 22 },
      { month: 5, year: 2025, trees: 14 },
      { month: 8, year: 2025, trees: 32 },
      { month: 0, year: 2026, trees: 15 },
      { month: 0, year: 2027, trees: 21 },
      { month: 6, year: 2027, trees: 21 },
      { month: 11, year: 2527, trees: 13 },
    ],
  },
  invalid5: {
    annualCO2: 5.55,
    purchases: [
      { month: 0, year: 2024, trees: 33 },
      { month: 3, year: 2024, trees: 22 },
      { month: 5, year: 2025, trees: 14 },
      { month: 8, year: 2025, trees: 32 },
      { month: 0, year: "2026", trees: 15 },
      { month: 0, year: 2027, trees: 21 },
      { month: 6, year: 2027, trees: 21 },
      { month: 11, year: 2028, trees: 13 },
    ],
  },
  invalid6: {
    annualCO2: 5.55,
    purchases: [
      { month: 0, year: 2024, trees: 33 },
      { month: 3, year: 2024, trees: 22 },
      { month: 5, year: 2025, trees: 14 },
      { month: 8, year: 2025, trees: 32 },
      { month: "0", year: 2026, trees: 15 },
      { month: 0, year: 2027, trees: 21 },
      { month: 6, year: 2027, trees: 21 },
      { month: 11, year: 2028, trees: 13 },
    ],
  },
  invalid7: {
    annualCO2: 0, //
    purchases: [
      { month: 0, year: 2024, trees: 33 }, // trees
      { month: 3, year: 2024, trees: 52 }, // trees
      { month: 5, year: 2025, trees: 14 },
      { month: 8, year: 2025, trees: 32 },
      { month: 12, year: "2026", trees: 65 }, //year+month+
      { month: 0, year: 2027, trees: 21 }, //trees
      { month: "6", year: 2027, trees: 51 }, //trees, year
      { month: 11, year: 2928, trees: 13 }, //year
    ],
  },
};

test("valid data", () => {
  expect(validateData(data.valid)).toBe(true);
});

test("annualCO2 = string", () => {
  expect(validateData(data.invalid1)).toEqual({
    annualCO2: "Annual CO2 output must be a number above 0.",
  });
});

test("annualCO2 = 0", () => {
  expect(validateData(data.invalid2)).toEqual({
    annualCO2: "Annual CO2 output must be a number above 0.",
  });
});

test("more than 55 in one year", () => {
  expect(validateData(data.invalid3)).toEqual({
    purchases: [
      {
        index: 2,
        trees:
          "Trees must be a number and can only purchase a maximum of 55 trees in 1 year.",
      },
      {
        index: 3,
        trees:
          "Trees must be a number and can only purchase a maximum of 55 trees in 1 year.",
      },
    ],
  });
});

test("year too long in future", () => {
  expect(validateData(data.invalid4)).toEqual({
    purchases: [
      {
        index: 7,
        year: `Year must be a number and be between 2023 and 2073.`,
      },
    ],
  });
});

test("year not number", () => {
  expect(validateData(data.invalid5)).toEqual({
    purchases: [
      {
        index: 4,
        year: `Year must be a number and be between 2023 and 2073.`,
      },
    ],
  });
});

test("month not number", () => {
  expect(validateData(data.invalid6)).toEqual({
    purchases: [
      {
        index: 4,
        month: "Month must be a number between 0 and 11.",
      },
    ],
  });
});

test("combo", () => {
  expect(validateData(data.invalid7)).toEqual({
    annualCO2: "Annual CO2 output must be a number above 0.",
    purchases: [
      {
        index: 0,
        trees:
          "Trees must be a number and can only purchase a maximum of 55 trees in 1 year.",
      },
      {
        index: 1,
        trees:
          "Trees must be a number and can only purchase a maximum of 55 trees in 1 year.",
      },
      {
        index: 4,
        month: "Month must be a number between 0 and 11.",
        year: `Year must be a number and be between 2023 and 2073.`,
        trees:
          "Trees must be a number and can only purchase a maximum of 55 trees in 1 year.",
      },
      {
        index: 5,
        trees:
          "Trees must be a number and can only purchase a maximum of 55 trees in 1 year.",
      },
      {
        index: 6,
        month: "Month must be a number between 0 and 11.",
        trees:
          "Trees must be a number and can only purchase a maximum of 55 trees in 1 year.",
      },
      {
        index: 7,
        year: `Year must be a number and be between 2023 and 2073.`,
      },
    ],
  });
});
