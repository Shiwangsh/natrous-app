const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });
const app = require('./app');

process.on('uncaughtException', (err) => {
  console.log('UNCAUGHT EXCEPTION');
  process.exit(1);
});

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => console.log('Database connection sucessful!✅'));

// console.log(this)

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log('App running on port..' + port);
});

process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION❌❗');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
