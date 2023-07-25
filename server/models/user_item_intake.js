const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('user_item_intake', {
    intake_id: {
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
      type: DataTypes.DATEONLY,
      allowNull: false
    },
    weight: {
      type: DataTypes.FLOAT,
      allowNull: true
    }

  }, {
    sequelize,
    tableName: 'user_item_intake',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "intake_id" },
        ]
      },
      {
        name: "user_item_intake_user_idx",
        using: "BTREE",
        fields: [
          { name: "user" },
        ]
      },
      {
        name: "user_item_intake_food_idx",
        using: "BTREE",
        fields: [
          { name: "food" },
        ]
      },
    ]
  });
};
