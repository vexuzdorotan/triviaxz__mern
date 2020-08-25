const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const User = require('../models/model-user');

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne(
      { email },
      'email name password image tokens'
    );

    const isMatchPassword = await bcrypt.compare(password, user.password);

    if (!user || !isMatchPassword)
      return res.status(404).send({ error: 'Incorrect email or password.' });

    const token = await user.generateAuthToken();
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    res.send({
      message: 'Logged in!',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
        token,
        exp: decoded.exp,
      },
    });
  } catch (error) {
    res.status(401).send({ error: "User doesn't exist." });
  }
};

const logoutUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id);
    user.tokens = [];

    await user.save();
    res.status(200).send({ message: 'Logout successfully.' });
  } catch (error) {
    res.status(400).send({ error });
  }
};

const createUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;
    const emailExisted = await User.findOne({ email });

    if (emailExisted) {
      return res.status(400).send({ error: 'Email already existed.' });
    }

    const user = new User({
      name,
      email,
      password,
      image: req.file.path,
    });
    await user.save();
    const token = await user.generateAuthToken();
    res.status(201).send({ user, token });
  } catch (error) {
    res.status(400).send(error);
  }
};

const readUsers = async (req, res, next) => {
  try {
    const users = await User.find();

    res.status(201).send(users);
  } catch (error) {
    res.status(400).send(error);
  }
};

const deleteUser = async (req, res, next) => {
  try {
    await req.user.remove();
    res.send(req.user);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.loginUser = loginUser;
exports.logoutUser = logoutUser;
exports.createUser = createUser;
exports.readUsers = readUsers;
exports.deleteUser = deleteUser;
