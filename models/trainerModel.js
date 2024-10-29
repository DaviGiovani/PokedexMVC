
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Trainer = sequelize.define('Trainer', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  team: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  height: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  weight: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  party: {
    type: DataTypes.JSON, 
    allowNull: true,
    validate: {
        len(value) {
          if (value.length > 6) {
            throw new Error('Um treinador pode ter no máximo 6 Pokémons.');
          }
        },
      },
  },
}, {
  tableName: 'trainers',
});

module.exports = Trainer;
