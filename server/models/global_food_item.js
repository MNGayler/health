const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('global_food_item', {
    id: {
      autoIncrement: true,
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true
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
    },
    image: {
      type: DataTypes.STRING(255),
      allowNull: true
    },
  }, {
    sequelize,
    tableName: 'global_food_item',
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
    ]
  });
};
