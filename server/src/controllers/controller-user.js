const User = require('../models/model-user');

const createUser = async (req, res, next) => {
  try {
    const { email } = req.body;
    const emailExisted = await User.findOne({ email });

    if (emailExisted) {
      return res.status(400).send({ error: 'Email already existed.' });
    }

    const user = new User(req.body);
    await user.save();
    res.status(201).send(user);
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

exports.createUser = createUser;
exports.readUsers = readUsers;
