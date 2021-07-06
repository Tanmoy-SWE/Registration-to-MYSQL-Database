var mysql = require("mysql");
var express = require("express");
const { append } = require("vary");
const { connect } = require("http2");
var cors = require('cors')
var app = express();
var bodyParser = require('body-parser')

app.use(cors())
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
 
// parse application/json
app.use(bodyParser.json())

const database = "GameTime";

var connection = mysql.createConnection({
    //properties :

    host : 'localhost',
    user : 'root',
    port : '3306',
    password :  '',
});

connection.connect(function(err) {
    if (err) {
      console.error('error connecting: ' + err.stack);
      return;
    }
    console.log('connected as id ' + connection.threadId);
});

// connection.connect(function(error){
//      if(error){
//          console.log('Error Connecting DataBase!');
//      }
//      else{
//          console.log('Database is connected!');
//      }
// });

console.log('1');

app.get('/createDB', function(req, resp){
     // About MySQL
     console.log('2');
     connection.query("CREATE DATABASE "+database, function(error){
         if(error){
             console.log("Error in Query.");
         }
         else{
             console.log("Database is created successfully.");
         }
     });
});

app.get('/createUser', (req, res) => {
    let sql = "CREATE TABLE "+database+".User(id INT AUTO_INCREMENT, first_name VARCHAR(300),last_name VARCHAR(300), email VARCHAR(300),password VARCHAR(300), DOB date, PRIMARY KEY(id))"
    connection.query(sql, err => {
        if (err) {
            throw err
        }
        res.send("User Table Created.")
    })
});

app.post('/insertUser', (req, res) => {
    console.log(req.body);
    let { first_name, last_name, password, email, DOB } = {...req.body};
    let post = { first_name, last_name, password, email, DOB  };

    let sql = 'INSERT INTO '+database+'.User SET ?'
    let query = connection.query(sql, post, err => {
        if (err) {
            throw err
        }
        res.send('User added')
    })
})

/*
connection.connect(function(err) {
    if (err) console.log(2);
    console.log("Connected!");
    con.query("CREATE DATABASE GameTime", function (err, result) {
      if (err) throw err;
      console.log("Database created");
    });
  });
*/


console.log('1');
app.listen('3005', ()=>{
    
    console.log('Server Started on port 3005');
})
console.log('1');
