'use strict';

const express = require('express');
const router = express.Router();
const config = require('../knexfile.js')['development'];
const knex = require('knex')(config);



//GET All Assassins
router.get('/', (req, res, next) => {
  console.log('working');
  knex('assassins')
    .select('people.full_name', 'code_names.code_name', 'assassins.contact_info', 'assassins.weapon', 'assassins.age', 'assassins.price', 'assassins.rating', 'assassins.kills')
    .leftJoin('people', 'people.people_id', 'assassins.person_id')
    .leftJoin('code_names', 'code_names.ass_id', 'assassins.ass_id')
    .then(function(assassinsArr) {
      console.log(assassinsArr);

      res.render('assassins', {
        assassins: assassinsArr
      });
    })
    .catch(function(error) {
      console.log(error);
      res.sendStatus(500);
    });

})



//GET Single Assassin
router.get('/assassins/:id', (req, res, next) => {
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


//Update Single Assasssin

router.patch('/assassins/:id', (req, res, next) => {

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
    .then(function(results) {
      let [assassin, code_name_id] = results;
      console.log('Our assassin', assassin[0].person_id);
      return knex('people').update(person).where('people_id', assassin[0].person_id);
    })
    .then(function() {
      res.sendStatus(200);
    })
    .catch(function(error) {
      console.log(error);
      res.sendStatus(500);
    });


})


// Create New Assassin
router.post('/', (req, res, next) => {

  knex('people')
    .insert({
      full_name: req.body.full_name
    })
    .returning('people_id')
    .then(function(people_id) {
      console.log(people_id)
      let ids = [];
      people_id.forEach(function(element) {
        ids.push(element);
        console.log(element)
      })
      return ids;
      knex('assassins')
        .insert({
          person_id: ids[0],
          contact_info: req.body.contact_info,
          weapon: req.body.weapon,
          age: req.body.age,
          price: req.body.price,
          rating: req.body.rating,
          kills: req.body.kills
        })
        .returning('ass_id')

    })
    .then(function(ass_id) {
      let assIds = [];
      ass_id.forEach(function(element) {
        assIds.push(element);
        console.log(element)
      })
      return assIds;
      knex('code_names')
        .insert({
          ass_id: assIds[0],
          code_name: req.body.code_name
        })
      })
    .then(function() {
      res.sendStatus(200);
    })
    .catch(function(error) {
      console.log(error);
      res.sendStatus(500);
    });
})


//Delete Assassin

router.delete('/assassins/:id', (req, res, next) => {
  knex('assassins')
    .del()
    .where('assassins.ass_id', req.params.id)
    .then(function(results) {
      // res.send(results);
      res.sendStatus(200);
    })
    .catch(function(error) {
      console.log(error);
      res.sendStatus(500);
    });
})


//Get Active Contracts for Assassin

router.get('/assassins/:id/contracts', (req, res, next) => {
  knex('assigned_contracts')
    .innerJoin('contracts', 'contracts.contract_id', 'assigned_contracts.contract_id')
    .innerJoin('targets', 'targets.target_id', 'contracts.target_id')
    .innerJoin('people as target_people', 'target_people.people_id', 'targets.person_id')
    .innerJoin('clients', 'clients.client_id', 'contracts.client_id')
    .innerJoin('people as client_people', 'client_people.people_id', 'clients.person_id')
    .select({
      target: 'target_people.full_name'
    }, {
      client: 'client_people.full_name'
    }, 'targets.location', 'targets.sec_level')
    .where('assigned_contracts.ass_id', req.params.id)
    .then(function(results) {
      console.log(results);
      res.send(results);
    })
    .catch(function(error) {
      console.log(error);
      res.sendStatus(500);
    });

})


module.exports = router;
