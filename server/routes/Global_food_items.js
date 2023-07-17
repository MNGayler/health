/* 
This module contains the Api routes for Global food items, the items shared by all users.

This module uses the global_food_item model for database operations. This database table is 
populated only by Admin Users.

This module contains the following routes:

GET    /global_food_items: Retrieves a list of all global food items.
GET    /global_food_items/byId/:id: Retrieves a global food item by ID.
POST   /global_food_items: Creates a new global food item.
PUT    /global_food_items/byId/:id: Updates a global food item by ID.
DELETE /global_food_items/byId/:id: Deletes a global food item by ID

*/







const express = require("express");
const router = express.Router();
const { global_food_item } = require("../models");
//get all
router.get("/", async (req, res) => {
  const listOfGlobalItems = await global_food_item.findAll();
  res.json(listOfGlobalItems);
});

//get individual using primary key, id.
router.get("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const item = await global_food_item.findByPk(id);
  res.json(item);
});

router.post("/", async (req, res) => {
  const globalItem = req.body;
  //using sequelizes' "create" - post globalItem into the global_food_item table
  await global_food_item.create(globalItem);
  res.json(globalItem);
});

// UPDATE ROUTE - update a row, using the primary key, id, from the url.
router.put("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  try {
    // Find the item by ID
    const item = await global_food_item.findByPk(id);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    // Update the item with the new data
    await item.update(updatedData);

    res.json({ message: "Item updated successfully" });
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// DELETE ROUTE - delete a row, using the primary key, id, from the url.

router.delete("/byId/:id", async (req, res) => {
  const id = req.params.id;

  try {
    // Find the item by ID
    const item = await global_food_item.findByPk(id);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }

    // Delete the item
    await item.destroy();

    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});


module.exports = router;
