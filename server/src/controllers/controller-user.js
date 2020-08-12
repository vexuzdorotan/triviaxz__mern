const User = require('../models/model-user');

const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email }, 'email name password image');

    if (!user || password !== user.password)
      return res.status(404).send({ error: 'Incorrect email or password.' });

    res.send({
      message: 'Logged in!',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        image: user.image,
      },
    });
  } catch (error) {
    res.status(401).send(error);
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
    res.status(201).send();
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

exports.loginUser = loginUser;
exports.createUser = createUser;
exports.readUsers = readUsers;
