'use strict';

const express = require('express');
const router = express.Router();
const config = require('../knexfile.js')['development'];
const knex = require('knex')(config);

//All Assassins
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


//Sinlge Assassin
router.get('/:id', (req, res, next) => {
  knex.select('people.full_name', 'code_names.code_name', 'assassins.contact_info', 'assassins.weapon', 'assassins.age', 'assassins.price', 'assassins.rating', 'assassins.kills').from('assassins')
  .leftJoin('people', 'people.people_id', 'assassins.person_id')
  .leftJoin('code_names', 'code_names.ass_id', 'assassins.ass_id')
  .where('assassins.ass_id', req.params.id)
  .then(function(results){
    res.send(results);
  })
  .catch(function(error){
    console.log(error);
    res.sendStatus(500);
  });
})

//Update Single Assasssin

router.patch('/:id', (req, res, next)=> {
  knex.select('people.full_name', 'code_names.code_name', 'assassins.contact_info', 'assassins.weapon', 'assassins.age', 'assassins.price', 'assassins.rating', 'assassins.kills').from('assassins')
  .leftJoin('people', 'people.people_id', 'assassins.person_id')
  .leftJoin('code_names', 'code_names.ass_id', 'assassins.ass_id')
  .where('assassins.ass_id', req.params.id)

  .then(function(){
    knex('people')
    .update({full_name: req.body.full_name,})
    .returning('full_name')

    .then(function(){
      knex('code_names')
      .update({code_name: req.body.code_name})
      .returning('code_name')
    })

    .then(function(){
      knex('assassins')
      .update({contact_info: req.body.contact_info,  weapon: req.body.weapon, age: req.body.age, price: req.body.price, rating: req.body.rating, kills: req.body.kills})
      .returning('contact_info', 'weapon', 'age', 'price', 'rating', 'kills')
    })
  })
})

//Get Assigned Contracts for single Assassin


//Create New Assassin

router.post('/', (req, res, next)=> {
  knex('people')
  .insert({full_name: req.body.full_name,})
  .returning('full_name')

  .then(function(){
    knex('code_names')
    .insert({code_name: req.body.code_name})
    .returning('code_name')
  })

  .then(function(){
    knex('assassins')
    .insert({contact_info: req.body.contact_info,  weapon: req.body.weapon, age: req.body.age, price: req.body.price, rating: req.body.rating, kills: req.body.kills})
    .returning('contact_info', 'weapon', 'age', 'price', 'rating', 'kills')
  })

  .then(function(results){
    res.send(results);
  })
  .catch(function(error){
    console.log(error);
    res.sendStatus(500);
  });

})

//Delete Assassin




module.exports = router;
