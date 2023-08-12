const express = require("express");
const router = express.Router();
const {
  water_tracking,
  weight_tracking,
  nutrient_tracking,
} = require("../models");

// get last 7 days of Water consumption for user
/**
 * @api {get} /water Get Recent Water Intakes
 * @apiName GetWaterIntakes
 * @apiGroup charts
 *
 * @apiHeader {Number} userId User's unique ID obtained from authentication.
 *
 * @apiSuccess {Object[]} intakes List of recent water intake records.
 * @apiSuccess {Number} intakes.id Intake ID.
 * @apiSuccess {Number} intakes.user User ID of the user who recorded the intake.
 * @apiSuccess {Number} intakes.intake Amount of water intake (in milliliters).
 * @apiSuccess {Date} intakes.date Date and time of the intake.
 *
 * @apiSuccessExample {json} Success Response
 * HTTP/1.1 200 OK
 * [
 *   [
	{
		"id": 34,
		"user": 22,
		"date": "2023-08-11",
		"weight": 65,
		"BMI": 24.2215,
		"RMR": 1586.52,
		"age": 45
	},
	{
		"id": 16,
		"user": 22,
		"date": "2023-07-31",
		"weight": 70,
		"BMI": 24.2215,
		"RMR": 1586.52,
		"age": 22
	},
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
 * @apiDescription This endpoint retrieves the most recent weight records for a user.
 * The user's unique ID is obtained from the request header. The endpoint returns an array
 * of weight records, including the record ID, user ID, weight, and date.
 * The records are ordered by date in descending order, and a maximum of 7 records are returned.
 */

router.get("/water", async (req, res) => {
  try {
    //get user from header
    const userId = req.header("userId");
    console.log("userId:", userId);
    //fetch the last seven intakes
    const sevenIntakes = await water_tracking.findAll({
      where: {
        user: userId,
      },
      order: [["date", "DESC"]],
      limit: 7,
    });
    res.json(sevenIntakes);
  } catch (error) {
    console.error("Error while fetching water consumptions:", error);
    res.status(500).send("Internal Server Error");
  }
});

//  get last 7 days of Weight measurements for user
/**
 * @api {get} /weight Get Recent Weight Measurements
 * @apiName GetWeightMeasurements
 * @apiGroup charts
 *
 * @apiHeader {Number} userId User's unique ID obtained from authentication.
 *
 * @apiSuccess {Object[]} measurements List of recent weight measurement records.
 * @apiSuccess {Number} measurements.id Measurement ID.
 * @apiSuccess {Number} measurements.user User ID of the user who recorded the measurement.
 * @apiSuccess {Date} measurements.date Date of the measurement.
 * @apiSuccess {Number} measurements.weight Weight measurement in kilograms.
 * @apiSuccess {Number} measurements.BMI Body Mass Index (BMI) calculated from the weight and height.
 * @apiSuccess {Number} measurements.RMR Resting Metabolic Rate (RMR) calculated based on gender, weight, height, and age.
 * @apiSuccess {Number} measurements.age Age of the user at the time of measurement.
 *
 * @apiSuccessExample {json} Success Response
 * HTTP/1.1 200 OK
 * [
 *   {
 *     "id": 34,
 *     "user": 22,
 *     "date": "2023-08-11",
 *     "weight": 65,
 *     "BMI": 24.2215,
 *     "RMR": 1586.52,
 *     "age": 45
 *   },
 *   {
 *     "id": 16,
 *     "user": 22,
 *     "date": "2023-07-31",
 *     "weight": 70,
 *     "BMI": 24.2215,
 *     "RMR": 1586.52,
 *     "age": 22
 *   },
 *   // ...
 * ]
 *
 * @apiErrorExample {json} Error Response
 * HTTP/1.1 500 Internal Server Error
 * {
 *   "error": "Internal Server Error"
 * }
 *
 * @apiDescription This endpoint retrieves the most recent weight measurement records for a user.
 * The user's unique ID is obtained from the request header. The endpoint returns an array
 * of weight measurement records, including the measurement ID, user ID, date, weight,
 * Body Mass Index (BMI), Resting Metabolic Rate (RMR), and age. The records are ordered by
 * date in descending order, and a maximum of 7 records are returned.
 */


router.get("/weight", async (req, res) => {
  try {
    //get user from header
    const userId = req.header("userId");
    console.log("userId:", userId);
    //fetch the last seven intakes
    const sevenIntakes = await weight_tracking.findAll({
      where: {
        user: userId,
      },
      order: [["date", "DESC"]],
      limit: 7,
    });
    res.json(sevenIntakes);
  } catch (error) {
    console.error("Error while fetching weight measurements:", error);
    res.status(500).send("Internal Server Error");
  }
});

//  get last 7 days of nutrient calculations for a user
// these rows include calore intake and all nutrients intakes
/**
 * @api {get} /nutrients Get Recent nutrient Intakes
 * @apiName GetNutrientIntakes
 * @apiGroup charts
 *
 * @apiHeader {Number} userId User's unique ID obtained from authentication.
 *
 * @apiSuccess {Object[]} nutrients List of recent water intake records.
 * @apiSuccess {Number} nutrients.id Intake ID.
 * @apiSuccess {Number} nutrients.user User ID of the user who recorded the intake.
 * @apiSuccess {Date} nutrients.date Date and time of the intake.
 *
 * @apiSuccessExample {json} Success Response
 * HTTP/1.1 200 OK
 * [
 *   [
	{
		"id": 21,
		"user": 22,
		"date": "2023-08-11",
		"energy": 2.76,
		"protien": 0.46,
		"fibre": 0.46
	},
	{
		"id": 14,
		"user": 22,
		"date": "2023-07-26",
		"energy": 2699,
		"protien": 85,
		"fibre": 15
	},
  //...
 * ]
 *
 * @apiErrorExample {json} Error Response
 * HTTP/1.1 500 Internal Server Error
 * {
 *   "error": "Internal Server Error"
 * }
 *
 * @apiDescription This endpoint retrieves the most nutrient intake records for a user.
 * The user's unique ID is obtained from the request header. The endpoint returns an array
 * of nutrient intake records, including the intake ID, user ID, energy intake, fibre intake,
 * protien intake and date.
 * The records are ordered by date in descending order, and a maximum of 7 records are returned.
 */

router.get("/nutrients", async (req, res) => {
  try {
    //get user from header
    const userId = req.header("userId");
    console.log("userId:", userId);

    sevenNutrientRows = await nutrient_tracking.findAll({
      where: {
        user: userId,
      },
      order: [["date", "DESC"]],
      limit: 7,
    });
    res.json(sevenNutrientRows);
  } catch (error) {
    console.error("Error while fetching nutrient info:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
