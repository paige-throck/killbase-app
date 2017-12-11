'use strict'

const express = require('express');
const path = require('path');
const port = process.env.PORT || 8000;

const bodyParser = require('body-parser');
const morgan = require('morgan');

const app = express();

const assassinsRoute = require('./routes/assassins');
const contractsRoute = require('./routes/contracts');

app.disable('x-powered-by');
app.use(bodyParser.json());

app.use('/assassins', assassinsRoute);
app.use('/contracts', contractsRoute);

app.use((_req, res) => {
  res.sendStatus(404);
});

app.use((err, _req, res, _next) => {
  if (err.status) {
    return res
      .status(err.status)
      .set('Content-Type', 'text/plain')
      .send(err.message);
  }

  console.error(err.stack);
  res.sendStatus(500);
});

app.listen(port, () => {
  console.log('Listening on port', port);
});

module.exports = app;
