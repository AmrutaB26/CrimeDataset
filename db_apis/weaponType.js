const database = require('../services/database.js');
 
const baseQuery = 

  `SELECT ROW_NUMBER() OVER (ORDER BY Count(*) DESC ) AS Rank, COUNT(*) AS Count, Weapon.Description AS Weapon 
  FROM Reports
  JOIN Usedin on Reports.Dr_no=Usedin.Dr_no 
  JOIN Weapon on Usedin.Weapon_used_code=Weapon.Weapon_used_code 
  WHERE Crime_code IN (SELECT Crime_code 
                          FROM Crime
                          WHERE Description like '%'||:type||'%')
      AND Weapon.Description NOT like '%UNKNOWN%' 
  GROUP BY Weapon.Description
  ORDER BY COUNT(*) `;
 
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