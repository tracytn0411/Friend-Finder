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
const mysql = require('mysql'); 
const bodyParser = require('body-parser') //required to use POST

app.use(express.static('public')) //serve static files
app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())

//Route to set home.html as homepage (default is index.html)
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/home.html'))
})
app.get('/survey', (req, res) => {
  res.sendFile(path.join(__dirname, 'public/survey.html'))
})

// Create a connection to MySQL via JawsDB (Heroku addon)
const connection = mysql.createConnection(process.env.JAWSDB_MAROON_URL);
connection.connect();

// GET route to table questions and display all question on survey page
app.get('/questions.json', (req, res) =>
  connection.query('SELECT * FROM questions', (error, results, fields) => {
    if (error) res.send(error)
    else res.send(results);
  }))

//    * A GET route with the url `/api/friends`. This will be used to display all friends from the friends table in json
app.get('/api/friends', function (req, res) {
  connection.query('SELECT * FROM friends', function (error, results, fields) {
    if (error) res.send(error)
    else res.json(results);
  })
})

//    * A POST routes `/api/friends`. This will be used to handle incoming survey results. This route will also be used to handle the compatibility logic.
app.post('/api/friends', function (req, res) {
  connection.query('INSERT INTO friends (friend_name, picture_link) VALUES (?, ?)', [req.body.friend_name, req.body.picture_link], function (error, results, fields) {
    if (error) res.send(error)
    else {
      var friendInsertID = results.insertId // retrieve AUTO_INCREMENT PRIMARY KEY
      // console.log(friendInsertID)
      var newScores = JSON.parse(req.body.scores); //convert scores back to object
      // console.log(newScores)
      var newSum = 0 //Sum of all scores in the newScores array
      for (var i=0; i <8; i++) {
        newSum += newScores[i]
        console.log(newSum)
        connection.query('INSERT INTO scores (question_id, friend_id, scores) VALUES (?, ?, ?)', [i+1, friendInsertID, newScores[i]], function (error, results, fields) {
          if (error) res.send(error)
        })
      }

    // ! Subqueries:
      // t1: Take the sum of all scores (as total_scores) group by friend_id in table scores 
      // t2: Add a new column (friend_diff) that takes ABS difference of each total_scores compared to new total_scores (var NewSum) then LEFT JOIN with table friends to get names and photo links.
        // ! Parent Query: Exclude new user row from the result from subqueries, arrange it following the order of friend-diff (to place the smallest value on top), then take data of first row (in case there's more than 1 match, we'll go with the first one)
      connection.query('SELECT * FROM (SELECT t1.friend_id AS friend_id, t1.total_scores AS friend_scores, abs(t1.total_scores - ?) AS friend_diff, friends.friend_name AS friend_name, friends.picture_link AS link FROM (SELECT friend_id, SUM(scores) AS total_scores FROM scores GROUP BY friend_id) AS t1 LEFT JOIN friends ON t1.friend_id = friends.id) AS t2 WHERE friend_id <> ? ORDER BY friend_diff LIMIT 1', [newSum, friendInsertID], function (error, results, fields) {
        if (error) res.send(error)
        else {
        console.log(results)
        res.json(results)
        }
      })
    }
  })
});

app.listen(PORT, () => console.log(`listening on ${ PORT }`))
