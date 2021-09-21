const mongoose = require('mongoose');
const URI = 'mongodb://localhost/psl';

mongoose
  .connect(URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // useCreateIndex: true,
    // useFindAndModify: false,
  })
  .then((db) => console.log('base de datos conectada', db.connection.name))
  .catch((error) => console.log(error));
