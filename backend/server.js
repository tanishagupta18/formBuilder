const mongoose = require('mongoose');
const dotenv = require('dotenv');
process.on('uncaughtException', (err) => {
  console.log(err.name, err.message);
  console.log('UNCAUGHT EXCEPTION  💥 shutting down');
  process.exit(1);
});

dotenv.config();
const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    // useCreateIndex: true,
    // useFindAndModify: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log('DB is successfully connected'));

// const testTour = new Tour({
//   name: 'The Forest Hiker',
//   price: 597,
//   rating: 4.7,
// });
// testTour
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .then((err) => console.log('Error', err));
// mongoose
//   .connect(process.env.DATABASE_LOCAL, {
//     useNewUrlParser: true,
//     useCreateIndex: true,
//     useFindAndModify: true,
//   })
//   .then(() => console.log('DB is successfully connected'));
const port = process.env.port || 3000;
const server = app.listen(port, () => {
  console.log('Application is running on port 3000');
});

process.on('unhandledRejection', (err) => {
  console.log(err.name, err.message);
  console.log('UNHANDLED REJECTION  💥 shutting down');
  server.close(() => {
    process.exit(1);
  });
});

//For heroku
// process.on('SIGTERM', () => {
//   console.log('SIGTERM recieved. Shut down system gracefully');

//   server.close(() => {
//     console.log('💥 Process terminated');
//   });
// });
