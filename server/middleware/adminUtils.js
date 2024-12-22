const User = require('../models/user');

const isAdminPassword = async (userId) => {
  try {
    const user = await User.findById(userId);
    const password = user.password

    const admiPassword = '211470257s!$';

    if (password === admiPassword) {
      return true; // הסיסמא מתאימה לסיסמת המנהל
    }
    return false;

  } catch (error) {
    console.error('Error authenticating admin:', error);
    throw error;
  }
};

module.exports = {
  isAdminPassword
};