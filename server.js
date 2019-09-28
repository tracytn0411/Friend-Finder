//-------  SERVER-SIDE Javascript ------//

// Your `server.js` file should contain two routes:
//    * A GET route with the url `/api/friends`. This will be used to display all friends from the friends table in json
//    * A POST routes `/api/friends`. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.

//Dependencies
require('dotenv').config()
const express = require('express')
const app = express();
const path = require('path');
const PORT = process.env.PORT || 5000
const mysql = require('mysql'); //to connect to MySQL
const bodyParser = require('body-parser') //to be able to use POST

// Integrate body-parser with express
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

//Serving static files in directory "public"
app.use(express.static(path.join(__dirname, 'public')))

// Create a connection to MySQL via JawsDB (Heroku addon)
const connection = mysql.createConnection(process.env.JAWSDB_MAROON_URL);
connection.connect();

// For testing purpose
  //? Status: Working: Data from table friends display on homepage
app.get('/friends.json', function (req, res) {
  connection.query('SELECT * FROM friends', function (error, results, fields) {
    if (error) res.send(error)
    else res.json(results);
  })
})

//Connect to `questions` table in MySQL for ajax call in app.js
app.get('/survey-questions', (req, res) =>
  connection.query('SELECT * FROM questions', (error, results, fields) => {
    if (error) res.send(error)
    else res.send(results);
  }))


// Express function to insert user input in MySQL
  //2 middleware functions below for the same path '/user-input'
    //Usually only get res from the 1st one
    //=> invoke 2nd function by calling next()

var friendTestID; // !Testing: pass data (auto_increment id) from first middleware to 2nd middleware

// First middleware function
  //? Status: Working: one ? symbol for each values -> (?,?)
app.post('/user-input', function (req, res, next) {
  connection.query('INSERT INTO friends (friend_name, picture_link) VALUES (?, ?)', [req.body.friend_name, req.body.picture_link], function (error, results, fields) {
    if (error) res.send(error)
    else {
      friendTestID = results.insertId // retrieve AUTO_INCREMENT PRIMARY KEY
      console.log(friendTestID)
      next(); //Invoke 2nd middleware
    }
  })
});

// 2nd middleware function fore same path
app.post('/user-input', function (req, res) {
  let score1 = req.body.question1
  let score2 = req.body.question2
  let score3 = req.body.question3
  let score4 = req.body.question4
  let score5 = req.body.question5
  let friendid = friendTestID //? Status: WORKING !! so happy :)
  let inputscore = [
    [1, friendid, score1],
    [2, friendid, score2],
    [3, friendid, score3],
    [4, friendid, score4],
    [5, friendid, score5]
  ]
  let sql = 'INSERT INTO scores (question_id, friend_id, scores) VALUES ?'

  connection.query(sql, [inputscore], function (error, results, fields) {
    if (error) res.send(error)
    else res.redirect('/'); //redirect to homepage 
  })
})

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