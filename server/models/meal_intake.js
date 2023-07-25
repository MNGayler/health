const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('meal_intake', {
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
    meal: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'meal',
        key: 'meal_id'
      }
    },
    date: {
      type: DataTypes.DATEONLY,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'meal_intake',
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
        name: "meal_intake_user_idx",
        using: "BTREE",
        fields: [
          { name: "user" },
        ]
      },
      {
        name: "meal_intake_meal_idx",
        using: "BTREE",
        fields: [
          { name: "meal" },
        ]
      },
    ]
  });
};
