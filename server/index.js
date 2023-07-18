const express = require("express");
const app = express();
const cors = require("cors");

const db = require("./models");
app.use(express.json());
app.use(cors());

//ROUTERS
const globalFoodItemsRouter = require("./routes/Global_food_items");
app.use("/globalfooditems", globalFoodItemsRouter);
const userFoodItemsRouter = require("./routes/Users_food_item");
app.use("/userfooditems", userFoodItemsRouter);
const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);

//create database tables if they dont exist and start server
db.sequelize.sync().then(() => {
  app.listen(6001, () => {
    console.log("Server running on 6001");
  });
});
