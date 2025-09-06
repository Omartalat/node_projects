const noteRouter = require('./routes/noteRoutes');

const app = require('express')();

app.use('/notes', noteRouter);
app.use('/users');

module.exports = app;
