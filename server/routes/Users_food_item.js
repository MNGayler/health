/* 
This module contains the Api routes for USER food items, the items created by individual users for themselves.

This module uses the user_food_item model for database operations. This database table is 
populated only by users.

This module contains the following routes:

GET    /userfooditems: Retrieves a list of all global food items.
POST   /userfooditems: Creates a new global food item.
GET    /userfooditems/byId/:id: Retrieves a global food item by ID.
PUT    /userfooditems/byId/:id: Updates a global food item by ID.
DELETE /userfooditems/byId/:id: Deletes a global food item by ID

*/


const express = require("express");
const router = express.Router();
const { users_food_item } = require("../models");

// GET ALL user Items

router.get("/", async (req, res) => {
  try {
    const listOfUserItems = await users_food_item.findAll();
    res.json(listOfUserItems);
  } catch (error) {
    // Handle the error appropriately
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// ADD item to the table

router.post("/", async (req, res) => {
  try {
    const userItem = req.body;
    await users_food_item.create(userItem);
    res.json(userItem);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// GET(byID) get individual by using the primary key, id, from the url
router.get("/byId/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const item = await users_food_item.findByPk(id);
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// UPDATE a record, using the primary key, id, from the url.
router.put("/byId/:id", async (req, res) => {
  const id = req.params.id;
  const updatedData = req.body;

  try {
    //Find the item by id
    const item = await users_food_item.findByPk(id);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    //Update the found item
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
    //find record by id
    const item = await users_food_item.findByPk(id);

    if (!item) {
      return res.status(404).json({ error: "Item not found" });
    }
    // delete found item
    await item.destroy();

    res.json({ message: "Item deleted successfully" });
  } catch (error) {
    console.error("Error deleting item:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

module.exports = router;
