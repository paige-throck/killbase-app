'use strict';

const express = require('express');
const path = require('path');
const port = process.env.PORT || 8000;

const config = require('./knexfile.js')['development'];
const knex = require('knex')(config);

const morgan = require('morgan');
const bodyParser = require('body-parser');

const assassins = require('./routes/assassins');
const contracts = require('./routes/contracts');

const app = express();


app.disable('x-powered-by');

app.use(morgan('short'));
app.use(bodyParser.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join('public')));

app.use('/assassins', assassins);
app.use('/contracts', contracts);

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

console.log('problem with app');
module.exports = app;
