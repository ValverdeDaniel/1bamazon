
// List a set of menu options:
// View Products for Sale
// View Low Inventory
// Add to Inventory
// Add New Product
//a. If a manager selects View Products for Sale, the app should list every available item: the item IDs, names, prices, and quantities.
//b. If a manager selects View Low Inventory, then it should list all items with an inventory count lower than five.
//c. If a manager selects Add to Inventory, your app should display a prompt that will let the manager "add more" of any item currently in the store.
//d. If a manager selects Add New Product, it should allow the manager to add a completely new product to the store.


//a.
//select product_id, product_name, price, stock_quantity
 //from product;

//b. select product_id, product_name, stock_quantity 
//   from products;

//c should first give the user a list of products to choose to update from and then based on the selection the user should decide what they want to update the quantity to.
//c. update 

//d. INSERT INTO products (product_name, department_name, price, stock_quantity)
// VALUES ("guitar", "instruments", 100, 10);



var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "44Mooses",
    database: "bamazonDB"
});

connection.connect(function(err){
    if (err) throw err;
    runSearch();
});

function runSearch() {
    inquirer
    .prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View Products for Sale",
        "View Low Inventory",
        "Add to Inventory",
        "Add New Product"
        ]
    })
    .then(function(answer) {
        switch (answer.action) {
            case "View Products for Sale":
            viewProducts();
            break;

            case "View Low Inventory":
            lowInventory();
            break;

            case "Add to Inventory":
            addInventory();
            break;

            case "Add New Product":
            insertProduct();
            break;
            
        }
    });
}
//function viewProducts
function viewProducts() {
    require("console.table");
   console.log("Selecting all products...\n");
   connection.query("SELECT * from products", function(err, res) {
       if (err) throw err;
       console.table(res);
       connection.end();
       runSearch();
   })
}

//function LowInventory
    // select product_id, product_name, stock_quantity 
    //   from products;



function lowInventory() {
    require("console.table");
    console.log("selecting products with stock_quantity < 5\n");
    connection.query("Select product_name, department_name, stock_quantity from products where stock_quantity <5", function(err, res) {
        if(err) throw err;
        console.table(res);
        connection.end();
        runSearch();
    })
}



//function AddInventory
        //c. 
function addInventory() {
    require("console.table");
    connection.query("Select * from products", function (err, results){
        if (err) throw err;
        console.table(results);
        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "list",
                    choices: function() {
                        var choiceArray = [];
                        for(var i = 0; i < results.length; i+=1) {
                            choiceArray.push(results[i].product_name);
                        }
                        return choiceArray;
                    },
                    message: "Which product would you like to update their inventory?"
                },
                {
                    name: "stock_quantity",
                    type: "input",
                    message: "What is the current quantity of the product you selected"
                }
            ])
            .then(function(answer) {
                connection.query(
                    "update products set ? Where?",
                    [
                        {
                            stock_quantity: chosenItem.stock_quantity
                        },
                        {
                            item_id: chosenItem.item_id
                        }
                    ],
                    function(error) {
                        if (error) throw err;
                        console.log("Your stock quantity has been updated");
                        runSearch();
                    })
            });
        
            
    });

}
        
//function InsertProduct

    //d. 

function insertProduct() {
    inquirer.prompt([
        {
            name: "product_name",
            type: "input",
            message: "What is the product you would like to submit?"
        },
        {
            name:"department_name",
            type: "input",
            message: "What department would you like to put your product in"
        },
        {
            name: "price",
            type: "input",
            message: "What price would you like to list this product at?"
        },
        {
           name: "stock_quantity",
           type: "input",
           message: "What quantity of this item do you have available for sale?",
           validate: function(value) {
               if (isNaN(value) === false){
                   return true;
               }
               return false;
           }
        }
    ])
    .then(function(answer) {
        connection.query(
            "Insert INTO products Set?",
            {
                product_name: answer.product_name,
                department_name: answer.department_name,
                price: answer.price,
                stock_quantity: answer.stock_quantity
            },
            function(err) {
                if (err) throw err;
                console.log("your product was successfully added");
//is it correct to end connection at the end of each function?
                connection.end();
                runSearch();
            }
        )
    });
}