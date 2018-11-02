var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 3306,

  // Your username
  user: "root",

  // Your password
  password: "44Mooses",
  database: "bamazonDB"
});

connection.connect(function(err) {
  if (err) throw err;
  console.log("connected to mysql")
  customerStart();
});


function customerStart() {
    // query the database for all items being auctioned
    require("console.table");
    connection.query("SELECT * FROM products", function(err, results) {
      if (err) throw err;
      console.table(results);
      // once you have the items, prompt the user for which they'd like to bid on
      inquirer
        .prompt([
          {
            name: "choice",
            type: "rawlist",
            choices: function() {
              var choiceArray = [];
              for (var i = 0; i < results.length; i++) {
                choiceArray.push(results[i].product_name);
                
              }
  
              // [ "hamburgers", "hot dogs" ]
              return choiceArray;
            },
            message: "What product would you like to buy?"
          },
          {
            name: "stock_quantity",
            type: "input",
            message: "How many would you like to buy?"
          }
        ])
        .then(function(answer) {
          // get the information of the chosen item
          var chosenItem;
          for (var i = 0; i < results.length; i++) {
            if (results[i].product_name === answer.choice) {
              chosenItem = results[i];
            }
 
          }
  
          // determine if quantity is enough
          if (chosenItem.stock_quantity >= parseInt(answer.stock_quantity)) {
            // stock_quantity was high enough, so update db, let the user know, and start over
            connection.query(
              "UPDATE products SET ? WHERE ?",
              [
                {
                  stock_quantity: chosenItem.stock_quantity - answer.stock_quantity
                },
                {
                  item_id: chosenItem.item_id
                }
              ],
              function(error) {
                if (error) throw err;
                console.log("Booom! your purchase has just been completed! I hope you enjoy your " + chosenItem.product_name + "! :)" + " Please shop with us again!");
                customerStart();
              }
            );
          }
          else {
            // bid wasn't high enough, so apologize and start over
            console.log("What are you doing fool you gotta buy less who you think we are, Walmart");
            customerStart();
          }
        });
    });
  }
  