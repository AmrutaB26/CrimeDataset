const express = require("express");
const app = express();
const path = require("path");
const router = express.Router();
const bodyParser = require("body-parser");
var oracledb = require("oracledb");
const exphbs = require("express-handlebars");

router.use(bodyParser.urlencoded({ extended: true }));

// Register Handlebars view engine

//  app.use("/", router);
// app.listen(process.env.port || 3000);
router.get("/", function(request, res, next) {
  // console.log("Hello world");
  res.render("tempdisplay.handlebars");
  // res.sendFile(path.join(__dirname + "/view.html"));

  //__dirname : It will resolve to your project folder.
});

/*
exports.report = function(request, res, next) {
  // console.log("Hello world");
  res.render("tempdisplay.handlebars");
  // res.sendFile(path.join(__dirname + "/view.html"));

  //__dirname : It will resolve to your project folder.
}; */

/* router.get('/about', function (req, res) {
  res.sendFile(path.join(__dirname + '/about.html'));
}); */

router.post("/", function(request, res) {
  array = request.body.date.split("-");
  getmonth = array[1];
  mapMonth = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  array[1] = mapMonth[getmonth - 1];
  updated_date = array[2] + "-" + array[1] + "-" + array[0];

  var data = {
    area: request.body.area,
    date: updated_date,
    starttime: request.body.starttime,
    endtime: request.body.endtime
  };

  var form_query =
    "SELECT I.dr_no, c.description, time_occurred,  DATE_REPORTED, v.age, v.sex, ds.description, cs.description as STATUS FROM incident I JOIN REPORTS R ON I.DR_NO = R.DR_NO JOIN CASE_STATUS CS ON CS.STATUS_CODE = I.STATUS_CODE JOIN VICTIM V ON V.VICTIM_ID = R.VICTIM_ID JOIN CRIME C ON c.crime_code = r.crime_code JOIN LOCATION L ON r.coordinates = l.coordinates JOIN DESCENT ds ON v.descent = ds.descent_code WHERE date_occurred = :1 AND time_occurred BETWEEN :2 AND :3 AND AREA_NAME = :4";
  // console.log(form_query);

  oracledb.getConnection(
    {
      user: "aj3",
      password: "Database1",
      connectString:
        "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=oracle.cise.ufl.edu)(PORT=1521))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=orcl)))"
    },
    function(err, connection) {
      if (err) {
        console.error(err);
        return;
      }
      connection.execute(
        form_query,
        [updated_date, data.starttime, data.endtime, data.area],
        function(err, result) {
          if (err) {
            console.error(err);
            return;
          } /*{
          res.write("<table>");
          res.write("<tr>");
          for (var column in result[0]) {
            res.write("<td><label>" + column + "</label></td>");
          }
          res.write("</tr>");
          for (var row in result) {
            res.write("<tr>");
            for (var column in result[row]) {
              res.write("<td><label>" + result[row][column] + "</label></td>");
            }
            res.write("</tr>");
          }
          res.write("</table>");
        } */ else {
            if (result.rows.length == 0) {
              res.render("tempdisplay.handlebars", {
                NOCRIME: "No crimes committed"
              });
            } else {
              for (var i = 0; i < result.rows.length; i++) {
                // used to parse date object
                result.rows[i][3] = result.rows[i][3]
                  .toString()
                  .substring(0, 15);
              }
              res.render("tempdisplay.handlebars", { data: result.rows });
              console.log(result.rows.length);
              // console.log(result.rows);
            }
          }
        }
      );
    }
  );
});

// app.use("/", router);
console.log("Running at Port 3000");
module.exports = router;
