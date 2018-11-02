
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