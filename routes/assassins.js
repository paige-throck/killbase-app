'use strict';

const express = require('express');
const router = express.Router();
const config = require('../knexfile.js')['development'];
const knex = require('knex')(config);

router.get('/new', (req, res, next)=>{
  console.log("nvhjkbfnerilk,bfnrehlkjvb")
  res.render('assassins-new')
})

//GET All Assassins
router.get('/', (req, res, next) => {
  console.log('working');
  knex('assassins')
    .select('assassins.ass_id','people.full_name', 'code_names.code_name', 'assassins.contact_info', 'assassins.weapon', 'assassins.age', 'assassins.price', 'assassins.rating', 'assassins.kills')
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
router.get('/:id', (req, res, next) => {
  knex('assassins')
    .select('assassins.ass_id', 'people.full_name', 'code_names.code_name', 'assassins.contact_info', 'assassins.weapon', 'assassins.age', 'assassins.price', 'assassins.rating', 'assassins.kills')
    .leftJoin('people', 'people.people_id', 'assassins.person_id')
    .leftJoin('code_names', 'code_names.ass_id', 'assassins.ass_id')
    .where('assassins.ass_id', req.params.id)
    .then(function(assassinObj) {
      console.log(assassinObj)
      res.render('assassin-single', {
        assassin: assassinObj
      });
    })
    .catch(function(error) {
      console.log(error);
      res.sendStatus(500);
    })
    .then(function(){
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
    })
      .then(function(activeCon) {
        console.log(activeCon);
        res.render('assassin-single', {
          assassin: activeCon
        });
      })
      .catch(function(error) {
        console.log(error);
        res.sendStatus(500);
      });
})

//Get Active Contracts for Assassin

// router.get('/:id', (req, res, next) => {
//   knex('assigned_contracts')
//     .innerJoin('contracts', 'contracts.contract_id', 'assigned_contracts.contract_id')
//     .innerJoin('targets', 'targets.target_id', 'contracts.target_id')
//     .innerJoin('people as target_people', 'target_people.people_id', 'targets.person_id')
//     .innerJoin('clients', 'clients.client_id', 'contracts.client_id')
//     .innerJoin('people as client_people', 'client_people.people_id', 'clients.person_id')
//     .select({
//       target: 'target_people.full_name'
//     }, {
//       client: 'client_people.full_name'
//     }, 'targets.location', 'targets.sec_level')
//     .where('assigned_contracts.ass_id', req.params.id)
//     .then(function(activeCon) {
//       console.log(activeCon);
//       res.render('assassin-single', {
//         assassin: activeCon
//       });
//     })
//     .catch(function(error) {
//       console.log(error);
//       res.sendStatus(500);
//     });
//
// })


//Update Single Assasssin

router.get('/:id/edit', (req, res, next)=>{
  res.render('assassins-update')
})

router.put('/:id', (req, res, next) => {

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
    .then(function(updateAss) {
      res.render('assassins-update', {update: updateAss});
    })
    .catch(function(error) {
      console.log(error);
      res.sendStatus(500);
    });

})


//Create Assassin



router.post('/', (req, res, next) => {
  const newPeople = {
    full_name: req.body.full_name,
    };
  const newAssassin = {
    contact_info: req.body.contact_info,
    weapon: req.body.weapon,
    age: parseInt(req.body.age),
    price: parseInt(req.body.price),
    rating: parseFloat(req.body.rating),
    kills: parseInt(req.body.kills)
  };
  const newAssassinCodeName = {
    code_name: req.body.code_name
  };

 knex('people').insert(newPeople).returning('*')
  .then( (people) => {
    newAssassin.person_id = people[0].people_id;
    return knex('assassins').insert(newAssassin).returning('*')
  })
  .then((assassins) => {
    newAssassinCodeName.ass_id = assassins[0].ass_id;
    return knex('code_names').insert(newAssassinCodeName)
  })
  .then(function(newAss) {
    res.render('assassins-new', {new: newAss});
  })
  .catch(function (error) {
    console.log(error);
    res.sendStatus(500);
  });
});


//Delete Assassin

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


module.exports = router;
