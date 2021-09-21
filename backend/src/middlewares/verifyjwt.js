//Verificar si el usuario está loggeeado ya que van haber diferentes rutas que son privadas, solo si el user esta loggeado
const jwt = require('jsonwebtoken');
const userModel = require('../models/user.model');

const verifyToken = async (req, res, next) => {
  if (!req.headers.authorization) {
    return res.status(401).json({
      ok: false,
      message: 'You are not Authorized1',
    });
  }
  //Enviar token con Bearer asdasfsdfasfasdffad [bearer, assasdfasfasf(se toma este valor que es el token)]
  const token = req.headers.authorization.split(' ')[1];
  if (token === null) {
    return res.status(401).json({
      ok: false,
      message: 'You are not Authorized2',
    });
  }

  jwt.verify(token, 'abc123', async (error, payload) => {
    if (error) {
      return res.status(401).json({
        ok: false,
        message: 'you are not Authorized3',
      });
    }
    //si el usuario existe
    const { _id } = payload;
    const user = await userModel.findById({ _id });
    if (!user) {
      return res.status(401).json({
        ok: false,
        message: 'you are not Authorized4',
      });
    }
    //se crea parametro que queda de manera global
    req.userid = payload._id;
    next();
  });
};

module.exports = verifyToken;
