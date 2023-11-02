const { DataTypes } = require('sequelize');
const sequelize = require('../config/Config');

const Order = sequelize.define('Order', {
  orderNumber: DataTypes.STRING,
  status: DataTypes.STRING,
  // Adicione outros campos conforme necessário
});

module.exports = Order;