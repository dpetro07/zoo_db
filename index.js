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
  },
  add: function(input_scope){
    var currentScope = input_scope;
    console.log("To add an animal to the zoo please fill out the following form for us!");
    prompt.get(['-->', 'name', 'type', 'age'], function (err, result) {
      connection.query();
      currentScope.menu();
      currentScope.promptUser();
    });
  },
  visit: function(){
    console.log("Enter (I): ------> do you know the animal by it's id? We will visit that animal!");
    console.log();
    console.log("Enter (N): ------> do you know the animal by it's name? We will visit that animal");
    console.log();
    console.log("Enter (A): ------> here's the count for all the animals in all locations!");
    console.log();
    console.log("Enter (C): ------> here's the count for all the animals in this one city!");
    console.log();
    console.log("Enter (O): ------> here's the count for all the animals in all locations by the type you specified!");
    console.log();
    console.log("Enter (Q): ------> quits to the main menu!");
      currentScope.visit();
      currentScope.view(currentScope);
  }
}

