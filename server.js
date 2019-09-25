//-------  SERVER-SIDE Javascript ------//

//Dependencies
require('dotenv').config()
const express = require('express')
const app = express();
const path = require('path');
const mysql = require('mysql');

//Create a connection to MySQL
const connection = mysql.createConnection({
  host     : process.env.DB_HOST,
  user     : process.env.DB_USER,
  password : process.env.DB_PASSWORD,
  database : process.env.DB_DATABASE
});

//Serving static files in directory "public"
app.use(express.static("public"));


connection.connect(); //connect to db

// For testing purpose
  //? Status: working: Data from table friends display on homepage
app.get('/friends.json', function(req, res){
  connection.query('SELECT * FROM friends', function (error, results, fields){
    if (error) res.send(error)
    else res.json(results);
  })
})

// Express function to insert user input in MySQL
  //? Status: not working! 
  //TODO Fix this
app.get('/user-input', function(req, res){
  connection.query('INSERT INTO friends (friend_name, picture_link) VALUES ?',[req.query.friend_name, req.query.picture_link], function (error, results, fields) {
    if (error) res.send(error)
    else res.json({
      message: 'success'
    });
  });
});
 
//This won't work after use express.static("public")
app.get('/', function (req, res) {
  connection.query('SELECT * FROM questions', function (error, results, fields) {
    if (error) res.send(error)
    else res.json(results);
  })
})

// Redirect to homepage if user hits a route that does not exist
app.get('*', function(req, res){
	res.redirect('/')
});
 
app.listen(3003, function(){
  console.log('listening on 3003')
})

//connection.end();