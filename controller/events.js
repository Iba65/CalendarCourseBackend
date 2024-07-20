const { response } = require("express");
const Event = require("../models/EventModel");
const bcrypt = require("bcryptjs");
const { generateJWT } = require("../helpers/jwt");

const getEvents = async (req, res = response) => {
  const eventos = await Event.find().populate("user", "name"); // para varios valores mandar como segundo parametro los valores separados por espacio. Ej. "name paswword"
  res.json({
    ok: true,
    msg: eventos,
  });
};

const newEvent = async (req, res = response) => {
  console.log("nuevo evento");
  const evento = new Event(req.body);
  try {
    evento.user = req.uid;
    const response = await evento.save();
    res.status(201).json({
      ok: true,
      msg: response,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      ok: false,
      msg: "Se produjo el error " + error,
    });
  }
  //res.json({
  //  ok: true,
  //  msg: "newEvent",
  //});
};

const updateEvent = async (req, res = response) => {
  const { id } = req.params;
  const { uid } = req;

  try {
    const evento = await Event.findById(id);
    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "El evento no exite por el id " + id,
      });
    }
    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene privilegios para editar este evento",
      });
    }
    const newEvent = {
      ...req.body,
      user: uid,
    };
    const updatEvent = await Event.findByIdAndUpdate(id, newEvent, {
      new: true,
    }); // el tercer parametro
    //se usa para indicar que queremos que el objeto que devuelva la respuesta sea al nuevo actualizado.
    //De no especificar, se actualizara en la base de datos pero se devolvera los valores antiguos en la respuesta.
    res.json({
      ok: true,
      evento: updatEvent,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

const delEvent = async (req, res = response) => {
  const { id } = req.params;
  const { uid } = req;

  try {
    const evento = await Event.findById(id);
    if (!evento) {
      return res.status(404).json({
        ok: false,
        msg: "El evento no exite por el id " + id,
      });
    }
    if (evento.user.toString() !== uid) {
      return res.status(401).json({
        ok: false,
        msg: "No tiene privilegios para eliminar este evento",
      });
    }
    await Event.findByIdAndDelete(id);

    res.json({
      ok: true,
      evento: "evento " + id + " eliminado",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      msg: "Hable con el administrador",
    });
  }
};

module.exports = {
  getEvents,
  newEvent,
  updateEvent,
  delEvent,
};
