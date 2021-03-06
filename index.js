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
    return;
  }
});



var prompt = require('prompt');
// Start the prompt
prompt.start();
prompt.message = ""

//Zoo object Start
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
        currentScope.promptUser();
      } else if (result.visit == "O"){
        currentScope.type(input_scope);
      } else if (result.visit == "I"){
        currentScope.animId(input_scope);
      } else if (result.visit == "N"){
        currentScope.name(input_scope);
      } else if (result.visit == "A"){
        currentScope.all(input_scope);
      } else if (result.visit == "C"){
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
      connection.query("SELECT COUNT(type) FROM animals WHERE type=?", result.animal_type, function (err, results, fields){
        if (err) throw err;
        console.log();
      });
      currentScope.menu();
      currentScope.promptUser();
    });
  },
  care: function(input_scope){
    var currentScope = input_scope;
    console.log("Enter city name: NY or SF");
    prompt.get(['-->', 'city_name'], function (err, result){
      connection.query("SELECT COUNT(*) AS total FROM animals, caretakers WHERE animals.caretaker_id = caretakers.id AND caretakers.city = ?", [result.city_name], function(err, results, fields){
        if (err) throw err;
        console.log("Total animals in " + result.city_name +"=" + results[0].total);
      });
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
    prompt.get(['-->', 'animal_name'], function (err, result){
      connection.query("SELECT * FROM animals WHERE name = ?", result.animal_name, function(err, results, fields){
        if (err) throw err;
        else {
          console.log("Animal Type: " + results[0].type);
          console.log("Animal ID: " + results[0].id);
          console.log("Caretaker ID: " + results[0].caretaker_id);
          console.log("Name: " + results[0].name);
          console.log("Age: " + results[0].age);
        }
      });
      currentScope.visit();
      currentScope.view(currentScope);
    });
  },
  all: function(input_scope){
    var currentScope = input_scope;
    connection.query("SELECT COUNT(DISTINCT id) FROM animals", function (err, results, fields){
      if (err) throw err;
      console.log("There are " + results[0] ["COUNT(DISTINCT id)"] + " animals at the zoo!");
    }); 
    currentScope.menu();
    currentScope.promptUser();
  },

  update: function(input_scope){
    var currentScope = input_scope;
    prompt.get(['-->', 'animal_id', 'new_name', 'new_age', 'new_type', 'new_caretaker_id'], function (err, result){
      var update_animal = {name: result.new_name, age: result.new_age, type: result.new_type, caretaker_id: result.new_caretaker_id};
      var query = connection.query("UPDATE animals SET ? WHERE id=?", [update_animal, result.animal_id], function (err, results, fields){
        if (err) throw err;
        console.log("You've updated: "+result.animal_id+" with the following information: ");
        console.log("Animal Name: " + result.new_name);
        console.log("Animal Age: " + result.new_age);
        console.log("Animal Type: " + result.new_type);
        console.log("Caretaker Id " + result.new_caretaker_id);
      });
      currentScope.menu();
      currentScope.promptUser();
    });
  },

  adopt: function(input_scope){
    var currentScope = input_scope;
    prompt.get(['animal_id'], function (err, result){
      connection.query("DELETE FROM animals WHERE id=?", result.animal_id ,function(err,results,fields){
        if (err) throw err; 
        console.log("You've just adopted!");
      });
      currentScope.visit();
      currentScope.view(currentScope); 
    });
  },

  promptUser : function(){
    var self = this;
    prompt.get('input', function (err, result){
      if (result.input === "Q"){
        self.exit();
      }else if (result.input ==="A"){
        self.add(self);
      }else if(result.input === "V"){
        self.visit();
        self.view(self);
      }else if(result.input === "D"){
        self.adopt(self);
      }else if(result.input === "U"){
        self.update(self);
      }else{
        console.log("Sorry I did not get that, come again?");
      }
    })
  },

  exit: function(){
    console.log("Thank you for visiting us, goodbye~!");
    process.exit();
  },

  open: function(){
    this.welcome();
    this.menu();
    this.promptUser();
  }

} // End of zoo object

zoo.open();