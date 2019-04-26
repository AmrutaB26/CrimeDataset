const database = require('../services/database.js');
 
const baseQuery = 

  `SELECT ROW_NUMBER() OVER (ORDER BY Count(*) DESC ) AS Rank, Area_name, COUNT(*) AS Count
  FROM Reports
  JOIN Location ON Reports.Coordinates=Location.Coordinates
  JOIN Area ON Area.Area_ID = Location.Area_ID
  WHERE Crime_code IN (SELECT Crime_code
                          FROM Crime
                          WHERE Description like '%'||:type||'%')
  GROUP BY Area_name
  ORDER BY Count(*) `;
 
async function find(context) {
  let query = baseQuery;
  const binds = {};
 
  if (context.type) {
    binds.type = context.type;
    if(context.ordering == "DESC"){
      query += 'DESC \nOFFSET 0 ROWS \nFETCH NEXT 10 ROWS ONLY';
    }else{
      query += 'ASC \nOFFSET 0 ROWS \nFETCH NEXT 10 ROWS ONLY';
    }
  }
  const result = await database.simpleExecute(query, binds);
 
  return result.rows;
}
 
module.exports.find = find;