var DataTypes = require("sequelize").DataTypes;
var _global_food_item = require("./global_food_item");
var _global_item_intake = require("./global_item_intake");
var _meal = require("./meal");
var _meal_component = require("./meal_component");
var _meal_intake = require("./meal_intake");
var _nutrient_tracking = require("./nutrient_tracking");
var _personal_info = require("./personal_info");
var _user_item_intake = require("./user_item_intake");
var _users = require("./users");
var _users_food_item = require("./users_food_item");
var _water_tracking = require("./water_tracking");
var _weight_tracking = require("./weight_tracking");

function initModels(sequelize) {
  var global_food_item = _global_food_item(sequelize, DataTypes);
  var global_item_intake = _global_item_intake(sequelize, DataTypes);
  var meal = _meal(sequelize, DataTypes);
  var meal_component = _meal_component(sequelize, DataTypes);
  var meal_intake = _meal_intake(sequelize, DataTypes);
  var nutrient_tracking = _nutrient_tracking(sequelize, DataTypes);
  var personal_info = _personal_info(sequelize, DataTypes);
  var user_item_intake = _user_item_intake(sequelize, DataTypes);
  var users = _users(sequelize, DataTypes);
  var users_food_item = _users_food_item(sequelize, DataTypes);
  var water_tracking = _water_tracking(sequelize, DataTypes);
  var weight_tracking = _weight_tracking(sequelize, DataTypes);

  global_item_intake.belongsTo(global_food_item, { as: "food_global_food_item", foreignKey: "food"});
  global_food_item.hasMany(global_item_intake, { as: "global_item_intakes", foreignKey: "food"});
  meal_component.belongsTo(meal, { as: "meal_meal", foreignKey: "meal"});
  meal.hasMany(meal_component, { as: "meal_components", foreignKey: "meal"});
  meal_intake.belongsTo(meal, { as: "meal_meal", foreignKey: "meal"});
  meal.hasMany(meal_intake, { as: "meal_intakes", foreignKey: "meal"});
  global_item_intake.belongsTo(users, { as: "user_user", foreignKey: "user"});
  users.hasMany(global_item_intake, { as: "global_item_intakes", foreignKey: "user"});
  meal.belongsTo(users, { as: "user_user", foreignKey: "user"});
  users.hasMany(meal, { as: "meals", foreignKey: "user"});
  meal_intake.belongsTo(users, { as: "user_user", foreignKey: "user"});
  users.hasMany(meal_intake, { as: "meal_intakes", foreignKey: "user"});
  nutrient_tracking.belongsTo(users, { as: "user_user", foreignKey: "user"});
  users.hasMany(nutrient_tracking, { as: "nutrient_trackings", foreignKey: "user"});
  personal_info.belongsTo(users, { as: "user_user", foreignKey: "user"});
  users.hasMany(personal_info, { as: "personal_infos", foreignKey: "user"});
  user_item_intake.belongsTo(users, { as: "user_user", foreignKey: "user"});
  users.hasMany(user_item_intake, { as: "user_item_intakes", foreignKey: "user"});
  users_food_item.belongsTo(users, { as: "user_user", foreignKey: "user"});
  users.hasMany(users_food_item, { as: "users_food_items", foreignKey: "user"});
  water_tracking.belongsTo(users, { as: "id_user", foreignKey: "id"});
  users.hasOne(water_tracking, { as: "water_tracking", foreignKey: "id"});
  weight_tracking.belongsTo(users, { as: "user_user", foreignKey: "user"});
  users.hasMany(weight_tracking, { as: "weight_trackings", foreignKey: "user"});
  meal_component.belongsTo(users_food_item, { as: "food_users_food_item", foreignKey: "food"});
  users_food_item.hasMany(meal_component, { as: "meal_components", foreignKey: "food"});
  user_item_intake.belongsTo(users_food_item, { as: "food_users_food_item", foreignKey: "food"});
  users_food_item.hasMany(user_item_intake, { as: "user_item_intakes", foreignKey: "food"});

  return {
    global_food_item,
    global_item_intake,
    meal,
    meal_component,
    meal_intake,
    nutrient_tracking,
    personal_info,
    user_item_intake,
    users,
    users_food_item,
    water_tracking,
    weight_tracking,
  };
}
module.exports = initModels;
module.exports.initModels = initModels;
module.exports.default = initModels;
