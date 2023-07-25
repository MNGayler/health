const Sequelize = require('sequelize');
module.exports = function(sequelize, DataTypes) {
  return sequelize.define('nutrient_tracking', {
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
    date: {
      type: DataTypes.DATEONLY,
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
    tableName: 'nutrient_tracking',
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
        name: "nutrient_tracking_user",
        using: "BTREE",
        fields: [
          { name: "user" },
        ]
      },
    ]
  });
};
