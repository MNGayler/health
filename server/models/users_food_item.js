const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('users_food_item', {
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
    food_name: {
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
    tableName: 'users_food_item',
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
        name: "user_food_item_user_idx",
        using: "BTREE",
        fields: [
          { name: "user" },
        ]
      },
    ]
  });
};
