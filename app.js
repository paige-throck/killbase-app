'use strict';

const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;
const methodOverride = require('method-override');
const config = require('./knexfile.js')['development'];
const = require('pg');
const knex = require('knex')(config);
const assassins = require('./routes/assassins');
const contracts = require('./routes/contracts');

app.use(express.static(path.join('public')));
app.set('views', './views');
app.set('view engine', 'ejs');
app.disable('x-powered-by');
app.use(morgan('short'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));



app.use(methodOverride('_method'))
app.use('/assassins', assassins);
app.use('/contracts', contracts);

app.get('/', function(req, res) {
  res.render('index.ejs')
});

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

app.get('/db', function (request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
    client.query('SELECT * FROM test_table', function(err, result) {
      done();
      if (err)
       { console.error(err); response.send("Error " + err); }
      else
       { response.render('pages/db', {results: result.rows} ); }
    });
  });
});

module.exports = app;
