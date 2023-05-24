const mongoose = require('mongoose');

const app = require('./app');

const DB_HOST = "mongodb+srv://ybelebekha:55XB2Hi65Z8XXYfP@cluster0.qm59hnr.mongodb.net/db_contacts?retryWrites=true&w=majority";

mongoose.set('strictQuery', true);

mongoose.connect(DB_HOST)
  .then(() => {
    app.listen(3000);
  })
  .catch(error => {
    console.log(error.message);
    process.exit(1);
  });