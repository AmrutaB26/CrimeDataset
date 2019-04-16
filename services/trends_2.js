var oracledb = require('oracledb');
var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
// app.set('view engine', 'ejs');
router.use(bodyParser.urlencoded({ extended: true }))
let area
let crime
var one = [];
var two = [];
var three = [];
var four = [];
var five = [];
var six = [];
var seven = [];
var eight = [];
var nine = [];
var ten = [];

// app.use(bodyParser.urlencoded({ extended: true }))

router.get('/', function (req, res) {

    res.render('../views/see.ejs');

});

router.post('/', async function (req, res) {
    settonull();
    handleaction(req, res);
    await new Promise(resolve => setTimeout(resolve, 15000))
    res.render('../views/chart.ejs', { area: area, crime: crime, one: JSON.stringify(one), two: JSON.stringify(two), three: JSON.stringify(three), four: JSON.stringify(four), five: JSON.stringify(five), six: JSON.stringify(six), seven: JSON.stringify(seven), eight: JSON.stringify(eight), nine: JSON.stringify(nine), ten: JSON.stringify(ten) });
});

function settonull(){
    one=[];two=[];three=[];four=[];five=[];six=[];seven=[];eight=[];nine=[];ten=[];
}
//handleOperation start
function handleOperation(request, response, callback) {

    response.setHeader('Access-Control-Allow-Origin', '*');
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    response.setHeader('Access-Control-Allow-Credentials', true);


    var connectString = "localhost/orcl";

    oracledb.getConnection(
        {
            user: process.env.DB_USER || "aj3",
            password: process.env.DB_PASSWORD || "Database1",
            connectString:  "(DESCRIPTION=(ADDRESS=(PROTOCOL=TCP)(HOST=oracle.cise.ufl.edu)(PORT=1521))(CONNECT_DATA=(SERVER=DEDICATED)(SERVICE_NAME=orcl)))"
            
           },
        function (err, connection) {

            if (err) {
            }
            callback(request, response, connection);

        });
}//handleOperation end

//handleaction start
function handleaction(req, res) {
    area = req.body.area
    crime = req.body.crime
    var array = Object.values(area);
    handleOperation(req, res, function (request, response, connection) {
        for (let element of array) {


            var selectStatement1 = "select count(*) from ( (select DR_NO from REPORTS where crime_code in (select crime_code from CRIME where description like '%'||:c||'%')) INTERSECT ( SELECT DR_NO from INCIDENT where date_occurred like '_______10' and area_id in (select area_id from area where area_name=:a)))";
            var selectStatement2 = "select count(*) from ( (select DR_NO from REPORTS where crime_code in (select crime_code from CRIME where description like '%'||:c||'%')) INTERSECT ( SELECT DR_NO from INCIDENT where date_occurred like '_______11' and area_id in (select area_id from area where area_name=:a)))";
            var selectStatement3 = "select count(*) from ( (select DR_NO from REPORTS where crime_code in (select crime_code from CRIME where description like '%'||:c||'%')) INTERSECT ( SELECT DR_NO from INCIDENT where date_occurred like '_______12' and area_id in (select area_id from area where area_name=:a)))";
            var selectStatement4 = "select count(*) from ( (select DR_NO from REPORTS where crime_code in (select crime_code from CRIME where description like '%'||:c||'%')) INTERSECT ( SELECT DR_NO from INCIDENT where date_occurred like '_______13' and area_id in (select area_id from area where area_name=:a)))";
            var selectStatement5 = "select count(*) from ( (select DR_NO from REPORTS where crime_code in (select crime_code from CRIME where description like '%'||:c||'%')) INTERSECT ( SELECT DR_NO from INCIDENT where date_occurred like '_______14' and area_id in (select area_id from area where area_name=:a)))";
            var selectStatement6 = "select count(*) from ( (select DR_NO from REPORTS where crime_code in (select crime_code from CRIME where description like '%'||:c||'%')) INTERSECT ( SELECT DR_NO from INCIDENT where date_occurred like '_______15' and area_id in (select area_id from area where area_name=:a)))";
            var selectStatement7 = "select count(*) from ( (select DR_NO from REPORTS where crime_code in (select crime_code from CRIME where description like '%'||:c||'%')) INTERSECT ( SELECT DR_NO from INCIDENT where date_occurred like '_______16' and area_id in (select area_id from area where area_name=:a)))";
            var selectStatement8 = "select count(*) from ( (select DR_NO from REPORTS where crime_code in (select crime_code from CRIME where description like '%'||:c||'%')) INTERSECT ( SELECT DR_NO from INCIDENT where date_occurred like '_______17' and area_id in (select area_id from area where area_name=:a)))";
            var selectStatement9 = "select count(*) from ( (select DR_NO from REPORTS where crime_code in (select crime_code from CRIME where description like '%'||:c||'%')) INTERSECT ( SELECT DR_NO from INCIDENT where date_occurred like '_______18' and area_id in (select area_id from area where area_name=:a)))";
            var selectStatement10 = "select count(*) from ( (select DR_NO from REPORTS where crime_code in (select crime_code from CRIME where description like '%'||:c||'%')) INTERSECT ( SELECT DR_NO from INCIDENT where date_occurred like '_______19' and area_id in (select area_id from area where area_name=:a)))";


            connection.execute(selectStatement1,

                { c: crime, a: element },
               function (err, result) {
                    if (err) { }
                    else {
                        var ans = JSON.stringify(result.rows);
                        ans = ans.replace("]", "")
                        ans = ans.replace("]", "")
                        ans = ans.replace("[", "")
                        ans = ans.replace("[", "")
                        ans = parseInt(ans, 10);
                        ans = parseInt(ans, 10);
                        one.push(ans);
                       // console.log('2010 ' + element + ans);
                    }

                })//execute

            connection.execute(selectStatement2,

                { c: crime, a: element },
                function (err, result) {
                    if (err) { }
                    else {
                        var ans = JSON.stringify(result.rows);
                        ans = ans.replace("]", "")
                        ans = ans.replace("]", "")
                        ans = ans.replace("[", "")
                        ans = ans.replace("[", "")
                        ans = parseInt(ans, 10);
                        ans = parseInt(ans, 10);

                        two.push(ans);
                        console.log('2011 ' + element + ans);
                    }
               })//execute

            connection.execute(selectStatement3,

                { c: crime, a: element },
             function (err, result) {
                    if (err) { }
                    else {
                        var ans = JSON.stringify(result.rows);
                        ans = ans.replace("]", "")
                        ans = ans.replace("]", "")
                        ans = ans.replace("[", "")
                        ans = ans.replace("[", "")
                        ans = parseInt(ans, 10);
                        ans = parseInt(ans, 10);

                        three.push(ans);
                        console.log('2012 ' + element + ans);
                   }
                 })//execute

            connection.execute(selectStatement4,

                { c: crime, a: element },
               
                function (err, result) {
                    if (err) { }
                    else {
                        var ans = JSON.stringify(result.rows);
                        ans = ans.replace("]", "")
                        ans = ans.replace("]", "")
                        ans = ans.replace("[", "")
                        ans = ans.replace("[", "")
                        ans = parseInt(ans, 10);
                        ans = parseInt(ans, 10);

                        four.push(ans);
                        console.log('2013 ' + element + ans);


                    }

                })//execute

         

            connection.execute(selectStatement5,

                { c: crime, a: element },
                function (err, result) {
                    if (err) { }
                    else {
                        var ans = JSON.stringify(result.rows);
                        ans = ans.replace("]", "")
                        ans = ans.replace("]", "")
                        ans = ans.replace("[", "")
                        ans = ans.replace("[", "")
                        ans = parseInt(ans, 10);
                        ans = parseInt(ans, 10);

                        five.push(ans);
                        console.log('2014' + element + ans);

                    }

                })//execute

               connection.execute(selectStatement6,

                { c: crime, a: element },
               function (err, result) {
                    if (err) { }
                    else {
                        var ans = JSON.stringify(result.rows);
                        ans = ans.replace("]", "")
                        ans = ans.replace("]", "")
                        ans = ans.replace("[", "")
                        ans = ans.replace("[", "")
                        ans = parseInt(ans, 10);
                        ans = parseInt(ans, 10);

                        six.push(ans);
                        console.log('2015 ' + element + ans);

                    }

                })//execute

            connection.execute(selectStatement7,

                { c: crime, a: element },
                // {outFormat: oracledb.OBJECT}, // Return the result as Object
                function (err, result) {
                    if (err) { }
                    else {
                        var ans = JSON.stringify(result.rows);
                        ans = ans.replace("]", "")
                        ans = ans.replace("]", "")
                        ans = ans.replace("[", "")
                        ans = ans.replace("[", "")
                        ans = parseInt(ans, 10);
                        ans = parseInt(ans, 10);

                        seven.push(ans);
                        console.log('2016' + element + ans);

                    }

                })//execute

            connection.execute(selectStatement8,

                { c: crime, a: element },
                // {outFormat: oracledb.OBJECT}, // Return the result as Object
                function (err, result) {
                    if (err) { }
                    else {
                        var ans = JSON.stringify(result.rows);
                        ans = ans.replace("]", "")
                        ans = ans.replace("]", "")
                        ans = ans.replace("[", "")
                        ans = ans.replace("[", "")
                        ans = parseInt(ans, 10);
                        ans = parseInt(ans, 10);

                        eight.push(ans);
                        console.log('2017 ' + element + ans);

                    }

                })//execute


            connection.execute(selectStatement9,

                { c: crime, a: element },
                
                function (err, result) {
                    if (err) { }
                    else {
                        var ans = JSON.stringify(result.rows);
                        ans = ans.replace("]", "")
                        ans = ans.replace("]", "")
                        ans = ans.replace("[", "")
                        ans = ans.replace("[", "")
                        ans = parseInt(ans, 10);
                        ans = parseInt(ans, 10);

                        nine.push(ans);
                        console.log('2018' + element + ans);

                    }

                })//execute

         
            connection.execute(selectStatement10,

                { c: crime, a: element },
               
                function (err, result) {
                    if (err) { }
                    else {
                        var ans = JSON.stringify(result.rows);
                        ans = ans.replace("]", "")
                        ans = ans.replace("]", "")
                        ans = ans.replace("[", "")
                        ans = ans.replace("[", "")
                        ans = parseInt(ans, 10);
                        ans = parseInt(ans, 10);

                        ten.push(ans);
                        console.log('2019 ' + element + ans);
                     

                    }

                })//execute
           }//FOR
        }//function
    );
}

function doRelease(connection) {
    connection.release(
        function (err) {
            if (err) {
                console.error(err.message);
            }
        });
};  

module.exports = router;

// app.listen(3002, function () {
//     console.log('server started on port 3002');
// });
