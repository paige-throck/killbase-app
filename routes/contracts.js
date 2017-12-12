'use strict';

const express = require('express');
const router = express.Router();
const config = require('../knexfile.js')['development'];
const knex = require('knex')(config);


console.log('problem with contracts');

module.exports = router;
