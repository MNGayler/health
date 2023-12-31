const express = require("express");
const app = express();
const cors = require("cors");


const db = require("./models");
app.use(express.json());
app.use(cors());

app.use("/api-docs", express.static("doc"));
//ROUTERS
const globalFoodItemsRouter = require("./routes/Global_food_items");
app.use("/globalfooditems", globalFoodItemsRouter);
const userFoodItemsRouter = require("./routes/Users_food_item");
app.use("/userfooditems", userFoodItemsRouter);
const usersRouter = require("./routes/Users");
app.use("/auth", usersRouter);
const adminRouter = require("./routes/Admin");
app.use("/authadmin", adminRouter);
const itemConsumptionRouter = require("./routes/ItemComsumption");
app.use("/itemConsumption", itemConsumptionRouter);
const weightRouter = require("./routes/Weight");
app.use("/weight", weightRouter);
const waterRouter = require("./routes/Water");
app.use("/water", waterRouter);
const nutrientRouter = require("./routes/Nutrient");
app.use("/nutrient", nutrientRouter)
const chartRouter = require("./routes/Charts");
app.use("/charts", chartRouter);



//create database tables if they dont exist and start server
db.sequelize.sync().then(() => {
  app.listen(6001, () => {
    console.log("Server running on 6001");
  });
});
