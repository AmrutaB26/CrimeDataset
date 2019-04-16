const database = require('../services/database.js');
 
const selectQuery = 

  `SELECT ROW_NUMBER() OVER (ORDER BY Count(*) `;

const baseQuery =
  
  ` ) AS Rank, COUNT(*) AS Count, Descent.Description
  FROM Reports
  JOIN Victim ON Victim.Victim_id = Reports.Victim_id
  JOIN Descent ON Descent.Descent_code = Victim.Descent
  WHERE Crime_code IN (SELECT Crime_code
                          FROM Crime
                          WHERE Description like '%THEFT%')
  GROUP BY Descent.Description
  ORDER BY Count(*) `;
 
async function find(context) {
  let query = selectQuery;
  const binds = {};
 
  if (context.type) {
    binds.type = context.type;
    if(context.ordering == "DESC"){
        query = query + 'DESC' + baseQuery + 'DESC \nOFFSET 0 ROWS \nFETCH NEXT 10 ROWS ONLY';
      }else{
        query = query + 'ASC' + baseQuery + 'ASC \nOFFSET 0 ROWS \nFETCH NEXT 10 ROWS ONLY';
      }
      console.log(query);
  }
 
  const result = await database.simpleExecute(query, binds);
 
  return result.rows;
}
 
module.exports.find = find;