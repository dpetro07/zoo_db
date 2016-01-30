// Global Variables
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password : '',
  database : 'zoo_db'
});
 

connection.connect(function (err) {
  if (err) {
    console.error('err connection ' + err.stack);
  } else {
    console.log("No Error here; Continue");
    return
  }
});



var prompt = require('prompt');
// Start the prompt
prompt.start();
prompt.message = ""

//Part 2 Start

var zoo = {
  welcome: function(){
    console.log("Welcome to the Zoo and Friends App~!");
    return;
  } 

}

