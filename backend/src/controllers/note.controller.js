const noteCtrl = {};

const noteModel = require('../models/note.model');

// noteCtrl.listAllNotes = async (req, res) => {
//   try {
//     //populate es el join para que cuando se haga la consulta se pueda visualizar el objeto completo del usuario que creo la nota
//     //se oculta password con password:0
//     const notes = await noteModel.find().populate('user', { password: 0 });
//     res.json({
//       ok: true,
//       notes,
//     });
//   } catch (err) {
//     res.status(500).json({
//       ok: false,
//       message: err.msg,
//     });
//   }
// };

//listarnota por el id

noteCtrl.listNoteById = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await noteModel
      .findById({ _id: id })
      .populate('user', { password: 0 });
    if (!note) {
      return res.status(404).json({
        ok: false,
        message: 'Note does not exist',
      });
    }
    res.json({
      ok: true,
      note,
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: err.msg,
    });
  }
};

//crear note

noteCtrl.addNote = async (req, res) => {
  try {
    const { title, description, date, user, priority } = req.body;
    const newNote = new noteModel({
      title,
      description,
      date,
      priority,
      user,
    });
    await newNote.save();
    res.status(201).json({
      ok: true,
      message: 'Saved Note',
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: err.msg,
    });
  }
};

//eliminar una nota
noteCtrl.deleteNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await noteModel.findById({ _id: id });
    if (!note) {
      return res.status(404).json({
        ok: false,
        message: 'The note does not exist',
      });
    }
    await note.deleteOne();
    res.json({
      ok: true,
      message: 'Deleted note',
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: err.msg,
    });
  }
};

//actualizar nota
noteCtrl.updateNote = async (req, res) => {
  try {
    const { id } = req.params;
    const note = await noteModel.findById({ _id: id });
    if (!note) {
      return res.status(404).json({
        ok: false,
        message: 'The note does not exist',
      });
    }
    const title = req.body.title || note.title;
    const description = req.body.description || note.description;
    const date = req.body.date || note.date;
    const priority = req.body.priority || note.priority;
    const user = req.body.user || note.user;
    const newNote = { title, description, date, user, priority };
    await note.updateOne(newNote);

    note && (await note.updateOne({ $addToSet: { newNote } }));

    res.json({
      ok: true,
      message: 'Updated note',
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: err.msg,
    });
  }
};

noteCtrl.noteUser = async (req, res) => {
  try {
    //El id viene desde el Payload
    const id = req.userid;
    const userNotes = await noteModel
      .find({ user: id })
      .populate('user', { password: 0 });
    res.json({
      ok: true,
      userNotes,
    });
  } catch (err) {
    res.status(500).json({
      ok: false,
      message: err.msg,
    });
  }
};

module.exports = noteCtrl;
