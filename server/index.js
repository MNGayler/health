const express = require("express");
const app = express();

const db = require("./models");

//ROUTERS
const globalFoodItemsRouter = require("./routes/Global_food_items")
app.use("/globalfooditems", globalFoodItemsRouter)

//create database tables if they dont exist and start server
db.sequelize.sync().then(() => {
  app.listen(6001, () => {
    console.log("Server running on 6001");
  });
});
