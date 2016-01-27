// Global Variables
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password : ' ',
  database : 'zoo_db'
});
 

connection.connect(function (err) {
  if (err) {
    console.error('err connection ' + err.stack);
  } else {
    console.log("No Error here");
    return
  }
});



var prompt = require('prompt');
// Start the prompt
prompt.start();
prompt.message = " "

