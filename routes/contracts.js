'use strict';

const express = require('express');
const Router = express.Router();
const config = require('knexfile')['development'];
const knex = require('knex')(config);


module.exports = Router;
