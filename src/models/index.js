const User = require('./user');
const Item = require('./shop')

// Здесь можно определить ассоциации между моделями, если они есть
// Например:
// User.hasMany(Order);
// Order.belongsTo(User);

module.exports = { User, Item };
