'use strict';

const express = require('express');
const router = express.Router();
const config = require('../knexfile.js')['development'];
const knex = require('knex')(config);


//GET All Assassins
router.get('/', (req, res, next) => {
  knex.select('people.full_name', 'code_names.code_name', 'assassins.contact_info', 'assassins.weapon', 'assassins.age', 'assassins.price', 'assassins.rating', 'assassins.kills').from('assassins')
    .leftJoin('people', 'people.people_id', 'assassins.person_id')
    .leftJoin('code_names', 'code_names.ass_id', 'assassins.ass_id')
    .returning('people.full_name', 'code_names.code_name', 'assassins.contact_info', 'assassins.weapon', 'assassins.age', 'assassins.price', 'assassins.rating', 'assassins.kills')
    .then(function(results) {
      res.send(results);
    })
    .catch(function(error) {
      console.log(error);
      res.sendStatus(500);
    });
})

// SQL: select people.full_name, assassins.contact_info, assassins.weapon, assassins.age, assassins.price, assassins.rating, assassins.kills
// from assassins left join people on people.people_id = assassins.person_id;


//GET Sinlge Assassin
router.get('/:id', (req, res, next) => {
  knex('assassins')
  .select('people.full_name', 'code_names.code_name', 'assassins.contact_info', 'assassins.weapon', 'assassins.age', 'assassins.price', 'assassins.rating', 'assassins.kills')
  .leftJoin('people', 'people.people_id', 'assassins.person_id')
  .leftJoin('code_names', 'code_names.ass_id', 'assassins.ass_id')
  .where('assassins.ass_id', req.params.id)
  .then(function(results) {
    res.send(results);
  })
  .catch(function(error) {
    console.log(error);
    res.sendStatus(500);
  });
})

//Get Assigned Contracts for Single Assassin

// router.get('/:id', (req, res, next) => {
//   knex.select('contracts.contract_id').where('contracts.contract_id', 'assigned_contracts.contract_id')
//     .then(function('contracts.contract_id') {
//       knex.select('contracts.target_id', 'contracts.client_id')
//     })
//     .then(function('contracts.target_id'){
//       knex.select('')
//     })
// })

//join assassins to assigned_contracts
//assigned_contracts to Contracts
//contracts to targets to people
//contracts to clients to people

//Update Single Assasssin

router.patch('/:id', (req, res, next) => {

  let person = {};
  person.full_name = req.body.name;
  delete req.body.name;

  let codeName = {};
  codeName.ass_id = req.params.id;
  codeName.code_name = req.body.code_name;
  delete req.body.code_name;

  return Promise.all([
    knex('assassins').update(req.body).where('ass_id', req.params.id).returning('*'),
    knex('code_names').update(codeName).where('ass_id', req.params.id)
  ])
  .then(function (results) {
    let [assassin, code_name_id] = results;
    console.log('Our assassin', assassin[0].person_id);
    return knex('people').update(person).where('people_id', assassin[0].person_id);
  })
  .then(function () {
    res.sendStatus(200);
  })
  .catch(function (error) {
    console.log(error);
    res.sendStatus(500);
  });


  })


//Create New Assassin

router.post('/new', (req, res, next) => {
  knex('people')
    .insert({
      full_name: req.body.full_name,
    })
    .returning('full_name')

    .then(function() {
      knex('code_names')
        .insert({
          code_name: req.body.code_name
        })
        .returning('code_name')
    })

    .then(function() {
      knex('assassins')
        .insert({
          contact_info: req.body.contact_info,
          weapon: req.body.weapon,
          age: req.body.age,
          price: req.body.price,
          rating: req.body.rating,
          kills: req.body.kills
        })
        .returning('contact_info', 'weapon', 'age', 'price', 'rating', 'kills')
    })

    .then(function(results) {
      res.send(results);
    })
    .catch(function(error) {
      console.log(error);
      res.sendStatus(500);
    });

})

//Delete Assassin




module.exports = router;
