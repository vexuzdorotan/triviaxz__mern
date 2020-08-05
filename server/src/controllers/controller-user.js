const User = require('../models/model-user');

const createUser = async (req, res, next) => {
  const { email } = req.body;
  let emailExisted;

  try {
    emailExisted = await User.findOne({ email });
  } catch (error) {
    res.status(400).send(error);
  }

  if (emailExisted) {
    res.status(400).send({ message: 'Email already existed.' });
  }

  const user = new User(req.body);

  try {
    await user.save();

    res.status(201).send(user);
  } catch (e) {
    res.status(400).send(e);
  }
};

const readUsers = async (req, res, next) => {
  try {
    const users = await User.find({});

    res.status(201).send(users);
  } catch (e) {
    res.status(400).send(e);
  }
};

exports.createUser = createUser;
exports.readUsers = readUsers;
