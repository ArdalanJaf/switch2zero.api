const queries = {
  getConfig: function (colsStr = false) {
    // colsStr allows only specific cols to be retrieved. eg: "initial_cost, upkeep_cost"
    return `SELECT ${
      colsStr ||
      `initial_cost, 
      upkeep_cost, 
      annual_offset, 
      growth_time, 
      max_annual_purchase, 
      useFractionalExponential, 
      applyInflationToUpkeep`
    }
                  FROM config
                      WHERE id = 1;`;
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
                  ${createSetStr(obj)} 
                      WHERE id = 1;
      `;
  },
  resetConfig: function (obj) {
    return `UPDATE config  
                 SET 
                  initial_cost=DEFAULT, 
                  upkeep_cost=DEFAULT, 
                  annual_offset=DEFAULT, 
                  growth_time=DEFAULT,
                  max_annual_purchase=DEFAULT,
                  useFractionalExponential=DEFAULT,
                  applyInflationToUpkeep=DEFAULT
                        WHERE id = 1;
  `;
  },
  checkUserAndPassword: function (username, password) {
    return `SELECT count(*) AS count, id AS userId FROM login 
                WHERE username = "${username}" 
                  AND password = "${password}";`;
  },
  setToken: function (userId, token) {
    return `INSERT INTO tokens (user_id, token) VALUES ("${userId}", "${token}");`;
  },
  checkUserToken: function (token) {
    return `SELECT user_id AS userId FROM tokens WHERE token = "${token}";`;
  },
  deleteTokenById: function (userId) {
    return `DELETE from tokens WHERE user_id = ${userId};`;
  },
};

module.exports = queries;
