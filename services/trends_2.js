var oracledb = require('oracledb');
var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();
// app.set('view engine', 'ejs');
router.use(bodyParser.urlencoded({ extended: true }))
let area
let crime
var array;
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
    await new Promise(resolve => setTimeout(resolve, 25000))
    res.render('../views/chart.ejs', { area: array, crime: crime, one: JSON.stringify(one), two: JSON.stringify(two), three: JSON.stringify(three), four: JSON.stringify(four), five: JSON.stringify(five), six: JSON.stringify(six), seven: JSON.stringify(seven), eight: JSON.stringify(eight), nine: JSON.stringify(nine), ten: JSON.stringify(ten) });
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
    
    if(typeof(area)==='string')
    {
     array={key1:area};
     array=Object.values(array);
     
    }
    else
     array = Object.values(area);
    
    handleOperation(req, res, function (request, response, connection) {
        for (let element of array) {
            var selectStatement1 = "SELECT COUNT(*) FROM ((SELECT reports.dr_no FROM location,reports where location.coordinates=reports.coordinates  and reports.crime_code IN ( SELECT crime_code FROM crime WHERE  description LIKE '%'||:c||'%' ) and location.area_name=:a) INTERSECT ( SELECT dr_no  FROM incident WHERE date_occurred LIKE '_______10'))";
            var selectStatement2 = "SELECT COUNT(*) FROM ((SELECT reports.dr_no FROM location,reports where location.coordinates=reports.coordinates  and reports.crime_code IN ( SELECT crime_code FROM crime WHERE  description LIKE '%'||:c||'%' ) and location.area_name=:a) INTERSECT ( SELECT dr_no  FROM incident WHERE date_occurred LIKE '_______11'))";
            var selectStatement3 = "SELECT COUNT(*) FROM ((SELECT reports.dr_no FROM location,reports where location.coordinates=reports.coordinates  and reports.crime_code IN ( SELECT crime_code FROM crime WHERE  description LIKE '%'||:c||'%' ) and location.area_name=:a) INTERSECT ( SELECT dr_no  FROM incident WHERE date_occurred LIKE '_______12'))";
            var selectStatement4 = "SELECT COUNT(*) FROM ((SELECT reports.dr_no FROM location,reports where location.coordinates=reports.coordinates  and reports.crime_code IN ( SELECT crime_code FROM crime WHERE  description LIKE '%'||:c||'%' ) and location.area_name=:a) INTERSECT ( SELECT dr_no  FROM incident WHERE date_occurred LIKE '_______13'))";
            var selectStatement5 = "SELECT COUNT(*) FROM ((SELECT reports.dr_no FROM location,reports where location.coordinates=reports.coordinates  and reports.crime_code IN ( SELECT crime_code FROM crime WHERE  description LIKE '%'||:c||'%' ) and location.area_name=:a) INTERSECT ( SELECT dr_no  FROM incident WHERE date_occurred LIKE '_______14'))";
            var selectStatement6 = "SELECT COUNT(*) FROM ((SELECT reports.dr_no FROM location,reports where location.coordinates=reports.coordinates  and reports.crime_code IN ( SELECT crime_code FROM crime WHERE  description LIKE '%'||:c||'%' ) and location.area_name=:a) INTERSECT ( SELECT dr_no  FROM incident WHERE date_occurred LIKE '_______15'))";
            var selectStatement7 = "SELECT COUNT(*) FROM ((SELECT reports.dr_no FROM location,reports where location.coordinates=reports.coordinates  and reports.crime_code IN ( SELECT crime_code FROM crime WHERE  description LIKE '%'||:c||'%' ) and location.area_name=:a) INTERSECT ( SELECT dr_no  FROM incident WHERE date_occurred LIKE '_______16'))";
            var selectStatement8 = "SELECT COUNT(*) FROM ((SELECT reports.dr_no FROM location,reports where location.coordinates=reports.coordinates  and reports.crime_code IN ( SELECT crime_code FROM crime WHERE  description LIKE '%'||:c||'%' ) and location.area_name=:a) INTERSECT ( SELECT dr_no  FROM incident WHERE date_occurred LIKE '_______17'))";
            var selectStatement9 = "SELECT COUNT(*) FROM ((SELECT reports.dr_no FROM location,reports where location.coordinates=reports.coordinates  and reports.crime_code IN ( SELECT crime_code FROM crime WHERE  description LIKE '%'||:c||'%' ) and location.area_name=:a) INTERSECT ( SELECT dr_no  FROM incident WHERE date_occurred LIKE '_______18'))";
            var selectStatement10 = "SELECT COUNT(*) FROM ((SELECT reports.dr_no FROM location,reports where location.coordinates=reports.coordinates  and reports.crime_code IN ( SELECT crime_code FROM crime WHERE  description LIKE '%'||:c||'%' ) and location.area_name=:a) INTERSECT ( SELECT dr_no  FROM incident WHERE date_occurred LIKE '_______19'))";

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
