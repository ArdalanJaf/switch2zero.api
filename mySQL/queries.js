const queries = {
  getConfig: function (row = false) {
    return `SELECT ${row || "*"}
                  FROM config
                      WHERE id = 0`;
  },

  resetConfig: function (obj) {
    return `UPDATE config  
                 SET 
                  initial_cost=DEFAULT, 
                  upkeep_cost=DEFAULT, 
                  annual_offset=DEFAULT, 
                  growth_tiem=DEFAULT,
                  max_annual_purchase=DEFAULT,
                  useFractionalExponential=DEFAULT,
                  applyInterestToUpkeep=DEFAULT
                        WHERE id = 0;
  `;
  },

  updateConfig: function (obj) {
    const createSetStr = (config) => {
      let result = [];
      Object.keys(config).forEach((c) => {
        result.push(c + "=" + config[c]);
      });
      return result.join(",");
    };

    return `UPDATE config  
                  SET 
                  ${createSetStr()} 
                      WHERE id=0;
      `;
  },
};

module.exports = queries;
