var express = require('express');
var oracledb = require('oracledb');
//const path = require("path");
var router = express.Router();
//var ejs = require('ejs');
const bodyParser = require("body-parser");
var chart = require("chart.js")

router.use(bodyParser.urlencoded({ extended: true }));
router.get("/", function(request, res, next) {
  //res.sendFile(path.join(__dirname + "/compareChart.html"));
  res.render('../views/compareForm.ejs',{data: ""});
});

/* GET users listing. */
router.post("/", function(request, res) {

  var compareBasedOn = request.body.basedon;
  var resultCount = [];
  var data = {
    year: request.body.year,
    area: request.body.area,
    age: request.body.age,
    timeframe: request.body.timeframe
  };

  oracledb.getConnection(
    {
      user          : "aj3",
      password      : "Database1",
      connectString : "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=oracle.cise.ufl.edu)(PORT=1521))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=orcl)))"
    },
    function(err, connection)
    {
      if (err) { console.error(err); return; }
      

      if (compareBasedOn == 'time'){
        console.log('yes');
      }

      if(data.year == ""){
        var yearstartdate = '01-Jan-2010'
        var yearenddate = '31-Dec-2019'
      }
      else{
        var yearstartdate = '01-Jan-' + request.body.year;
        var yearenddate = '31-Dec-' + request.body.year;
      }

      if(data.area == ''){
        var areaName = '%';
      }
      else{
        var areaName = data.area;
      }
      timeSlot = data.timeframe.split(' ');
      startTime = Number(timeSlot[0]);
      endTime = Number(timeSlot[2]);
      ageGroup = data.age.split('-');

      var compareQuery = "select count(*) from (select * from incident where time_occurred between :1 and :2 and date_occurred between :3 and :4) inc join reports on inc.dr_no = reports.dr_no where victim_id in (select victim_id from victim where age between :5 and :6) and coordinates in (select coordinates from location where area_id in (select area_id from area where area_name like :7)) ";

      var locationQuery = "select count(*) from (select * from incident where time_occurred between :1 and :2 and date_occurred between :3 and :4) inc join reports on inc.dr_no = reports.dr_no where victim_id in (select victim_id from victim where age between :5 and :6) and coordinates in (select coordinates from location where area_id = :7)";
    
      //time frame graph
      if(compareBasedOn == 'time'){
        startTime = 0000;
        endTime = 0200;
          for(var i = 0;i< 12; i++){
            connection.execute(
                compareQuery, [ startTime, endTime, yearstartdate, yearenddate, ageGroup[0], ageGroup[1], areaName],
              function(err, result)
              {
                if (err) { console.error(err); return; }
                resultCount.push(result.rows);
              });  
              startTime += 100;
              endTime += 100;          
          }
          
          connection.execute(
            compareQuery, [ startTime, endTime, yearstartdate, yearenddate, ageGroup[0], ageGroup[1], areaName],
          function(err, result)
          {
            if (err) { console.error(err); return; }
            console.log(resultCount);
            res.render('../views/compareForm.ejs', {data: resultCount, gtype: 'Time'})
          });
        }
        else if(compareBasedOn == 'location'){
          var areaId = 1;
          for(var i=0;i<21;i++){
            connection.execute(
              locationQuery, [ startTime, endTime, yearstartdate, yearenddate, ageGroup[0], ageGroup[1], areaId],
              function(err, result)
                {
                  if (err) { console.error(err); return; }
                  resultCount.push(result.rows);
                });         
                areaId += 1;
          }
          connection.execute(
            locationQuery, [ startTime, endTime, yearstartdate, yearenddate, ageGroup[0], ageGroup[1], areaId],
          function(err, result)
          {
            if (err) { console.error(err); return; }
            console.log(resultCount);
            res.render('../views/compareForm.ejs', {data: resultCount, gtype: 'Location'});
            
          });
        //  res.render('../views/compareForm.ejs', {data: "location"});
        }
        else{
          var startAge = 0;
          var endAge = 20;
          for(var i = 0;i< 5; i++){
            startAge += 20;
            endAge += 20;
          
              connection.execute(
                  compareQuery, [ startTime, endTime, yearstartdate, yearenddate, startAge, endAge, areaName],
                function(err, result)
                {
                  if (err) { console.error(err); return; }
                  resultCount.push(result.rows);
                });            
            }
            
            connection.execute(
              compareQuery, [ startTime, endTime, yearstartdate, yearenddate, ageGroup[0], ageGroup[1], areaName],
            function(err, result)
            {
              if (err) { console.error(err); return; }
              console.log(resultCount);
              res.render('../views/compareForm.ejs', {data: resultCount, gtype: 'Age'})
            });
        //  res.render('../views/compareForm.ejs', {data: "age"});
        }
        console.log(resultCount);
      //  res.render('compare', {data: resultCount})
  });
});

module.exports = router;
