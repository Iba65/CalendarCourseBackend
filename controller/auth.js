// cargamos el metodo response de express y luego a res = response, solo para tener la ayuda del codigo
// no es necesario hacerlo si no se desea.
const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/UserModel");
const { generateJWT } = require("../helpers/jwt");

const getAuths = async (req, res = response) => {
  const users = await User.find();
  res.json({
    ok: true,
    msg: users,
  });
};

const createAuth = async (req, res = response) => {
  const { name, email, password } = req.body;
  try {
    let user = await User.findOne({ email: email });
    if (user) {
      return res.status(400).json({
        ok: false,
        msg: "El correo introducido ya pertenece a otro usuario.",
      });
    }

    user = new User(req.body);

    //Encriptación de password
    const salt = bcrypt.genSaltSync();
    user.password = bcrypt.hashSync(password, salt);

    await user.save();

    // Generar el JWT
    const token = await generateJWT(user.id, user.name).then().catch();

    res.status(201).json({
      user: {
        ok: true,
        uid: user.id,
        name: user.name,
        token,
      },
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error al crear el usuario. Hable con el administrador de la base de datos, o intentelo de nuevo mas tarde.",
    });
  }
};

const LoginAuth = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        ok: false,
        msg: "El usuario introducido no existe o el email no es el correcto.",
      });
    }

    // confirmar la contraseña
    const isValid = bcrypt.compareSync(password, user.password);
    if (!isValid) {
      return res.status(400).json({
        ok: false,
        msg: "La contraseña introducida no es correcta.",
      });
    }

    // generar el JWT
    const token = await generateJWT(user.id, user.name);

    res.json({
      ok: true,
      uid: user.id,
      name: user.name,
      token,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Error del servidor en loguin. Hable con el administrador de la base de datos, o intentelo de nuevo mas tarde.",
    });
  }
};

const revalToken = async (req, res = response) => {
  const { uid, name } = req;

  // generar un nuevo token
  const token = await generateJWT(uid, name);

  res.json({
    ok: true,
    token,
  });
};

module.exports = {
  getAuths,
  revalToken,
  createAuth,
  LoginAuth,
};
