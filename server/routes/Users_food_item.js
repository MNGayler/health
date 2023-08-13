

const express = require("express");
const router = express.Router();
const { users_food_item, global_food_item } = require("../models");
const { validateToken } = require("../middlewares/AuthMiddleware");

// GET ALL user Items

router.get("/", async (req, res) => {
  try {
    const userId = req.header("userId");
    const listOfUserItems = await users_food_item.findAll({
      where: {
        user: userId,
      },
    });
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

// GET(byID) get individual item, by using the primary key, id, from the url
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

//GET BOTH USER and GLOBAL items  
// Each user will receive their personal user items and all global food items


router.get("/all", async (req, res) => {
  try {
    const userId = req.header("userId");

    // Fetch the user's personal items
    const userItems = await users_food_item.findAll({
      where: {
        user: userId,
      },
    });

    // Fetch all the global items
    const globalItems = await global_food_item.findAll();

    // Combine the userItems and globalItems arrays
    const allItems = [...userItems, ...globalItems];

    res.json(allItems);
  } catch (error) {
    // Handle the error appropriately
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});




module.exports = router;
