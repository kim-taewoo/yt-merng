const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { UserInputError } = require('apollo-server');

const { SECRET_KEY } = require('../../config');
const User = require('../../models/User');
module.exports = {
  Mutation: {
    async register(
      _,
      { registerInput: { username, email, password, confirmPassword } },
    ) {
      // TODO: validate user data
      // TODO: Make sure user doesn't already exist
      // TODO: hash password and create an auth token
      const user = await User.findOne({ username });
      if (user) {
        throw new UserInputError('User name is already taken', {
          errors: {
            username: 'This username is taken',
          },
        });
      }
      password = await bcrypt.hash(password, 12);

      const newUser = new User({
        email,
        username,
        password,
        createdAt: new Date().toISOString(),
      });

      const res = await newUser.save();

      const token = jwt.sign(
        {
          id: res.id,
          email: res.email,
          username: res.username,
        },
        SECRET_KEY,
        { expiresIn: '1h' }
      );

      return {
        ...res.doc,
        id: res._id,
        token,
      };
    },
  },
};
