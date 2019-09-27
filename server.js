//-------  SERVER-SIDE Javascript ------//

//Dependencies
require('dotenv').config()
const express = require('express')
const app = express();
const path = require('path');
const PORT = process.env.PORT || 5000
const mysql = require('mysql');
const cool = require('cool-ascii-faces')

//Serving static files in directory "public"
app.use(express.static(path.join(__dirname, 'public')))
app.get('/cool', (req, res) => res.send(cool()))

// Create a connection to MySQL via JawsDB (Heroku addon)
var connection = mysql.createConnection(process.env.JAWSDB_MAROON_URL);

connection.connect();

// For testing purpose
//? Status: working: Data from table friends display on homepage
app.get('/friends.json', function (req, res) {
  connection.query('SELECT * FROM friends', function (error, results, fields) {
    if (error) res.send(error)
    else res.json(results);
  })
})

//Connect to questions table
app.get('/survey-questions', (req, res) =>
  connection.query('SELECT * FROM questions', (error, results, fields) => {
    if (error) res.send(error)
    else res.send(results);
  }))


// Express function to insert user input in MySQL
//Status: working: one ? symbol for each values -> (?,?)
app.get('/user-input', function (req, res) {
  connection.query('INSERT INTO friends (friend_name, picture_link) VALUES (?, ?)', [req.query.friend_name, req.query.picture_link], function (error, results, fields) {
    if (error) res.send(error)
    else res.redirect('/');
  });
});

//This won't work after use express.static("public")
// app.get('/', function (req, res) {
//   connection.query('SELECT * FROM questions', function (error, results, fields) {
//     if (error) res.send(error)
//     else res.json(results);
//   })
// })

// Redirect to homepage if user hits a route that does not exist
// app.get('*', function(req, res){
// 	res.redirect('/')
// });

// localhost port connection for Heroku app
app.listen(PORT, () => console.log(`listening on ${ PORT }`))


//connection.end();