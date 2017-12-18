'use strict';

const express = require('express');
const app = express();
const path = require('path');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const port = process.env.PORT || 8000;
const methodOverride = require('method-override')


const config = require('./knexfile.js')['development'];
const knex = require('knex')(config);


const assassins = require('./routes/assassins');
const contracts = require('./routes/contracts');



app.use(express.static(path.join('public')));

app.set('views', './views');
app.set('view engine', 'ejs');



app.disable('x-powered-by');

app.use(morgan('short'));
app.use(bodyParser.json());



app.use('/assassins', assassins);
app.use('/contracts', contracts);

app.get('/', function (req, res) {
  res.render('index.ejs')
});

app.use(bodyParser.urlencoded())
app.use(methodOverride(function (req, res) {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    var method = req.body._method
    delete req.body._method
    return method
  }
}))

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
