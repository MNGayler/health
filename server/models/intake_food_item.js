const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('intake_food_item', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    user: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'user_id'
      }
    },
    food: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users_food_item',
        key: 'id'
      }
    },
    date: {
      type: DataTypes.DATE,
      allowNull: false
    },
    is_global: {
      type: DataTypes.TINYINT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'intake_food_item',
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
        name: "item_intake_user_item_idx",
        using: "BTREE",
        fields: [
          { name: "food" },
        ]
      },
      {
        name: "intake_item_user_id_idx",
        using: "BTREE",
        fields: [
          { name: "user" },
        ]
      },
    ]
  });
};
