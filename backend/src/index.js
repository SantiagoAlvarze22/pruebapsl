const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

//base de datos
require('./database');

const app = express();

app.set('Port', 4000);
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors({ origin: '*' }));

//endpoint para conectar rutas
app.use('/user', require('./routes/user.routes'));
app.use('/note', require('./routes/note.routes'));

app.listen(app.get('Port'), () => {
  console.log('Servidor escuchando por el puerto', app.get('Port'));
});
 