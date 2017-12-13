'use strict';

const express = require('express');
const router = express.Router();
const config = require('../knexfile.js')['development'];
const knex = require('knex')(config);


//GET All Assassins
router.get('/', (req, res, next) => {
  knex('assassins')
    .select('people.full_name', 'code_names.code_name', 'assassins.contact_info', 'assassins.weapon', 'assassins.age', 'assassins.price', 'assassins.rating', 'assassins.kills')
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



//GET Single Assassin
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




//Update-Edit Single Assasssin

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


//Create New Assassin

// router.post('/', (req, res, next) => {
//
//
//     .then(function() {
//       res.sendStatus(200);
//     })
//     .catch(function(error) {
//       console.log(error);
//       res.sendStatus(500);
//     });
//
//
// })


//Delete Assassin

// router.delete('/:id', (req, res, next) => {
//   let artist;
//
//   knex('assassins')
//     .where('assassins.ass_id', req.params.id)
//     .first()
//     .then((row) => {
//       if (!row) {
//         return next();
//       }
//
//       assassin = row;
//
//       return knex('assassins')
//         .del()
//         .where('assassins.ass_id', req.params.id);
//     })
//     .then(() => {
//       delete assassin.id;
//       res.send(assassin);
//     });
//     .catch((err) => {
//       next(err);
//     });
// });



router.delete('/:id', (req, res, next) => {
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

router.get('/:id/contracts', (req, res, next) => {
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
