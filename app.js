'use strict'

const fs = require('fs');
const path = require('path');
const petsPath = path.join(__dirname, 'pets.json');

const express = require('express');
const router = express.Router();
const app = express();
const port = process.env.PORT || 8000;
const bodyParser = require('body-parser');

const assassinsRoute = require('./routes/assassins');
const assignedContractsRoute = require('./routes/assignedContracts');
const contractsRoute = require('./routes/contracts');
const codeNamesRoute = require('./routes/codeNames');



app.disable('x-powered-by');
app.use(bodyParser.json());

app.use('/assassins', assassinsRoute);

module.exports = app;
