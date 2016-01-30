// Global Variables
var mysql = require('mysql');
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password : '',
  database : 'zoo_db'
});
//var this; 
 

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
  },
  menu: function(){
    console.log("Enter (A): -------> to Add a new animal to the Zoo!");
    console.log();
    console.log("Enter (U): -------> to Update info on a new animal to the Zoo!");
    console.log();
    console.log("Enter (V): -------> to Visit the animals in the Zoo!");
    console.log();
    console.log("Enter (D): -------> to Adopt an animal from the Zoo!");
    console.log();
    console.log("Enter (Q): -------> to Quit and exit the Zoo!");
    return;
  }
}

