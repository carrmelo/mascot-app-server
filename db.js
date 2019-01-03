const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/mascotapp');

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error')); // eslint-disable-line no-console
db.once('open', () => console.log('DB connected')); // eslint-disable-line no-console
