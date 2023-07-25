const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('global_item_intake', {
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
        model: 'global_food_item',
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
    tableName: 'global_item_intake',
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
        name: "global_intake_item_user_idx",
        using: "BTREE",
        fields: [
          { name: "user" },
        ]
      },
      {
        name: "global_intake_item_food_idx",
        using: "BTREE",
        fields: [
          { name: "food" },
        ]
      },
    ]
  });
};
