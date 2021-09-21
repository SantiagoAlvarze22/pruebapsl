const bcrypt = require('bcrypt');
const auth = {};

//funcion para encriptar la contraseña
auth.encryptPassword = (password) => {
  try {
    const salt = bcrypt.genSaltSync(10); //cantidad de vueltas para encriptar el password
    const hash = bcrypt.hashSync(password, salt); //password encriptado
    return hash;
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: err.message,
    });
  }
};

module.exports = auth;
 