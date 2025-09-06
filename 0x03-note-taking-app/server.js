const mongoose = require('mongoose');
const app = require('./app');
const dotenv = require('dotenv').config();

mongoose.connect(process.env.DB).then(() => console.log('DB connected.'));

app.listen(3000, '127.0.0.1', () => console.log('app connected successfully.'));
