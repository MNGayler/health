const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('meal_component', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    food: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users_food_item',
        key: 'id'
      }
    },
    meal: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'meal',
        key: 'meal_id'
      }
    },
    quantity: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    is_global: {
      type: DataTypes.TINYINT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'meal_component',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "id" },
        ]
      },
      {
        name: "meal_component_meal_idx",
        using: "BTREE",
        fields: [
          { name: "meal" },
        ]
      },
      {
        name: "meal_comp_food_global_idx",
        using: "BTREE",
        fields: [
          { name: "food" },
        ]
      },
    ]
  });
};
