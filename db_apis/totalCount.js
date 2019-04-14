const database = require('../services/database.js');
 
const baseQuery = 

  `SELECT COUNT(*) AS COUNT FROM Reports
    WHERE Crime_code IN (SELECT Crime_code 
    FROM Crime
    WHERE Description like '%'||:type||'%')`;
 
async function find(context) {
  let query = baseQuery;
  const binds = {}; 
  binds.type = context.type;
  const result = await database.simpleExecute(query, binds);
 
  return result.rows;
}
 
module.exports.find = find;