const { createToken } = require('../auth/jwtFunctions');

const { User } = require('../models');

const createUser = async ({ username, password }) => {
  const user = await User.create({ username, password });
  const { password: _password, ...userWithoutPassword } = user.dataValues;
  const token = createToken(userWithoutPassword);
  return { user: userWithoutPassword, token };
};

const getUsers = () => User.findAll();

const getByUsername = (username) => User.findOne({ where: { username } });

const getByUserId = (userId) => User.findByPk(userId);

module.exports = {
  createUser,
  getUsers,
  getByUsername,
  getByUserId,
};
