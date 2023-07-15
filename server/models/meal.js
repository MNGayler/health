const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('meal', {
    meal_id: {
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
    meal_name: {
      type: DataTypes.STRING(45),
      allowNull: false
    },
    energy: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    protien: {
      type: DataTypes.FLOAT,
      allowNull: false
    },
    fibre: {
      type: DataTypes.FLOAT,
      allowNull: false
    }
  }, {
    sequelize,
    tableName: 'meal',
    timestamps: false,
    indexes: [
      {
        name: "PRIMARY",
        unique: true,
        using: "BTREE",
        fields: [
          { name: "meal_id" },
        ]
      },
      {
        name: "meal_user_idx",
        using: "BTREE",
        fields: [
          { name: "user" },
        ]
      },
    ]
  });
};
