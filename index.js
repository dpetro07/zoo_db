// Global Variables
var connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'me',
  password : ' ',
  database : 'zoo_db'
});
 

var mysql      = require('mysql');
var prompt = require('prompt');
  prompt.start();
  prompt.message(" ");


connection.connect(function (err) {
  if (err){
    console.error('err connection ' + err.stack);
    return;
  } else{
    console.log("No Error here");
  }
});





