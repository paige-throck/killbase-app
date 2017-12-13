'use strict';

const express = require('express');
const router = express.Router();
const config = require('../knexfile.js')['development'];
const knex = require('knex')(config);



//GET contracts

router.get('/', (req, res, next) => {
  knex('contracts')
    .innerJoin('targets', 'targets.target_id', 'contracts.target_id')
    .innerJoin('people as target_people', 'target_people.people_id', 'targets.person_id')
    .innerJoin('clients', 'clients.client_id', 'contracts.client_id')
    .innerJoin('people as client_people', 'client_people.people_id', 'clients.person_id')
    .leftJoin('assassins', 'contracts.completed_by', 'assassins.ass_id')
    .leftJoin('people as assassin_people', 'assassin_people.people_id', 'assassins.person_id')
    .select({target:'target_people.full_name'}, {client:'client_people.full_name'}, 'contracts.budget', 'targets.location', 'targets.sec_level', {assassin: 'assassin_people.full_name'})
    .then(function(results) {
      res.send(results);
    })
    .catch(function(error) {
      console.log(error);
      res.sendStatus(500);
    });

})



//GET Single Contract

router.get('/:id', (req, res, next) => {
  knex('contracts')
    .innerJoin('targets', 'targets.target_id', 'contracts.target_id')
    .innerJoin('people as target_people', 'target_people.people_id', 'targets.person_id')
    .innerJoin('clients', 'clients.client_id', 'contracts.client_id')
    .innerJoin('people as client_people', 'client_people.people_id', 'clients.person_id')
    .leftJoin('assassins', 'contracts.completed_by', 'assassins.ass_id')
    .leftJoin('people as assassin_people', 'assassin_people.people_id', 'assassins.person_id')
    .select({target:'target_people.full_name'}, {client:'client_people.full_name'}, 'contracts.budget', 'targets.location', 'targets.sec_level', {assassin: 'assassin_people.full_name'})
    .where('contracts.contract_id', req.params.id)
    .then(function(results) {
      res.send(results);
    })
    .catch(function(error) {
      console.log(error);
      res.sendStatus(500);
    });

})


//GET Assasins Assigned to Contract


// Assign Assassin to Contracts


//Update Contracts

//Create Contracts

//Delete Contract





module.exports = router;
