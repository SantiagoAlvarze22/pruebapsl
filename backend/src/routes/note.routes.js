const { Router } = require('express');
const route = Router();
const noteCtrl = require('../controllers/note.controller');
const verifyToken = require('../middlewares/verifyjwt');

// route.get('/', verifyToken, noteCtrl.listAllNotes);
route.get('/user', verifyToken, noteCtrl.noteUser);
route.get('/:id', verifyToken, noteCtrl.listNoteById);
route.post('/addNote', verifyToken, noteCtrl.addNote);
route.delete('/delete/:id', verifyToken, noteCtrl.deleteNote);
route.put('/update/:id', verifyToken, noteCtrl.updateNote);

module.exports = route;
