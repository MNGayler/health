
const express = require("express");
const router = express.Router();
const { global_food_item } = require("../models");
const { requireAdmin } = require("../middlewares/RequireAdmin");

/**
 * @api {get} /global-items Get All Global Food Items
 * @apiName GetAllGlobalFoodItems
 * @apiGroup Global_food_Items
 *
 * @apiSuccess {Object[]} items List of global food items.
 * @apiSuccess {Number} items.id Item ID.
 * @apiSuccess {String} items.name Name of the food item.
 * @apiSuccess {Number} items.calories Calories in the food item.
 * @apiSuccess {Number} items.protien protein in the food item
 * @apiSuccess {Number} items.fibre fibre in the food item
 * @apiSuccess {String} items.image Name of the image.
 *
 * @apiSuccessExample {json} Success Response
 * HTTP/1.1 200 OK
 * [
 *   {
		"id": 1,
		"food_name": "test update",
		"energy": 100,
		"protien": 15.6,
		"fibre": 62.3,
		"image": "grape"
	},
	{
		"id": 2,
		"food_name": "test 2",
		"energy": 31.4,
		"protien": 15.6,
		"fibre": 6.3,
		"image": "blueberry"
	},
 *   // ...
 * ]
 *
 * @apiErrorExample {json} Error Response
 * HTTP/1.1 500 Internal Server Error
 * {
 *   "error": "Internal Server Error"
 * }
 *
 * @apiDescription This endpoint retrieves a list of all global food items.
 */

//get all
router.get("/", async (req, res) => {
  const listOfGlobalItems = await global_food_item.findAll();
  res.json(listOfGlobalItems);
});


/**
 * @api {get} /global-items/byId/:id Get Global Food Item by ID
 * @apiName GetGlobalFoodItemById
 * @apiGroup Global_food_items
 *
 * @apiParam {Number} id Item's unique ID.
 *
 * @apiSuccess {Number} id Item ID.
 * @apiSuccess {String} name Name of the food item.
 * @apiSuccess {Number} calories Calories in the food item.
 * @apiSuccess {Number} items.protien protien in the food item
 * @apiSuccess {Number} items.fibre fibre in the food item
 * @apiSuccess {String} items.image Name of the image.
 *
 * @apiSuccessExample {json} Success Response
 * HTTP/1.1 200 OK
 * {
		"id": 2,
		"food_name": "test 2",
		"energy": 31.4,
		"protien": 15.6,
		"fibre": 6.3,
		"image": "blueberry"
	}
 *
 * @apiErrorExample {json} Error Response
 * HTTP/1.1 404 Not Found
 * {
 *   "error": "Item not found"
 * }
 * @apiErrorExample {json} Error Response
 * HTTP/1.1 500 Internal Server Error
 * {
 *   "error": "Internal Server Error"
 * }
 *
 * @apiDescription This endpoint retrieves a specific global food item by its ID.
 */
//get individual using primary key, id.
router.get("/byId/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const item = await global_food_item.findByPk(id);
    res.json(item);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Add a row (global item) to the table
router.post("/", requireAdmin, async (req, res) => {
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
