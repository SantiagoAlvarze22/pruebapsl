const userCtrl = {};
const userModel = require('../models/user.model');
const auth = require('../helpers/Auth.helpers');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

//listar usuarios
// userCtrl.listUsers = async (req, res) => {
//   try {
//     const users = await userModel.find({}, { password: 0 });
//     res.json({
//       ok: true,
//       users,
//     });
//   } catch (err) {
//     res.status(500).json({
//       ok: false,
//       message: err.message,
//     });
//   }
// };

//registrar usuario
userCtrl.registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    //buscar usuario por correo, en el campo email buscarlo con el email que quedó, para no registrarlo de nuevo
    const user = await userModel.findOne({ email: email });
    if (user) {
      return res.status(409).json({
        ok: false,
        message: 'User already exists',
      });
    }

    //sino existe el usuario
    const newUser = new userModel({
      name,
      email,
      password: auth.encryptPassword(password),
    });

    await newUser.save();

    //responderle al usuario
    res.status(201).json({
      ok: true,
      message: 'Welcome',
      _id: newUser._id,
      name: newUser.name,
      email: newUser.email,
      token: jwt.sign({ _id: newUser._id, name: newUser.name }, 'abc123'),
    });

    //otra forma de crear el nuevo usuario
    // const newUser = { name, email, password };
    // await userModel.create({ newUser });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: err.message,
    });
  }
};

//funcion de logeo
userCtrl.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(500).json({
        ok: false,
        message: 'email/password wrong',
      });
    }
    const resp = bcrypt.compareSync(password, user.password);
    if (resp) {
      return res.json({
        ok: true,
        message: 'Welcome',
        _id: user._id,
        name: user.name,
        email: user.email,
        token: jwt.sign({ _id: user._id, name: user.name }, 'abc123'),
      });
    }
    res.json({
      ok: false,
      message: 'email/password wrong',
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: err.message,
    });
  }
};

module.exports = userCtrl;
