'use strict';

const express = require('express');
const router = express.Router();
const config = require('../knexfile.js')['development'];
const knex = require('knex')(config);



//GET Contracts

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


//Update Contract




//Create Contract




//Delete Contract



//GET Assassins Assigned to Contract

router.get('/:id/assassins', (req, res, next) => {
  knex('assigned_contracts')
    .innerJoin('assassins', 'assigned_contracts.ass_id', 'assassins.ass_id')
    .innerJoin('people', 'assassins.person_id', 'people.people_id')
    .leftJoin('code_names', 'assassins.ass_id', 'code_names.ass_id')
    .select('people.full_name', 'code_names.code_name', 'assassins.rating')
    .where('assigned_contracts.contract_id', req.params.id)
    .then(function(results) {
      console.log(results);
      res.send(results);
    })
    .catch(function(error) {
      console.log(error);
      res.sendStatus(500);
    });

})



//Assign Assassin to Contract






//Delete Assassin from Contract











module.exports = router;
