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
  },
  view: function(){
    var currentScope = input_scope;
    console.log("Please choose what you'd like to visit!");
    prompt.get(['-->', 'visit'], function (err, result){
      if (result.visit == "Q"){
        currentScope.menu();
      } else if (result.visit == "O"){
        currentScope.type(input_scope);
      } else if (result.type == "I"){
        currentScope.type(input_scope);
      } else if (result.animId == "N"){
        currentScope.name(input_scope);
      } else if (result.name == "A"){
        currentScope.all(input_scope);
      } else if (result.all == "C"){
        currentScope.care(input_scope);
      } else {
        console.log("Sorry didn't get that, come again?");
        currentScope.visit();
        currentScope.view(currentScope);
      }
    });
  },
  type: function(input_scope){
    var currentScope = input_scope;
    console.log("Enter animal type to find how many animals we have of those type.");
    prompt.get(['-->', 'animal_type'], function (err, result){
      connection.query.length();
      currentScope.menu();
      currentScope.promptUser();
    });
  },
  care: function(input_scope){
    var currentScope = input_scope;
    console.log("Enter city name: NY or SF");
    prompt.get(['-->', 'city_name'], function (err, result){
      connection.query(); //Need to call the function with a string in the form of a MySQL to selecr the # of animals that all the caretakers from the specific user inputed city.
       currentScope.visit();
       currentScope.view(currentScope);
    });
  },
  animId: function(input_scope){
    var currentScope = input_scope;
    console.log("Enter the ID of the animal you want to visit.");
    prompt.get(['-->', 'animal_id'], function (err, result){
      connection.query(); //Get the data for the particular animal of that ID that the user typed in.
      currentScope.visit();
      currentScope.view(currentScope);
    });
  },
  name: function(input_scope){
    var currentScope = input_scope;
    console.log("Enter the name of the animal you want to visit.");
    prompt.get(['-->', 'name'], function (err, result){
      connection.query(); //Get the data for the particular animal of that animal name that the user typed in.
      currentScope.visit();
      currentScope.view(currentScope);
    });
  }

}

