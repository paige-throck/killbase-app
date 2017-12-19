'use strict';

const express = require('express');
const router = express.Router();
const config = require('../knexfile.js')['development'];
const knex = require('knex')(config);

//Get request for new contracts
router.get('/new', (req, res, next) => {
  res.render('contracts-new')
})

//GET Contracts

router.get('/', (req, res, next) => {
  knex('contracts')
    .innerJoin('targets', 'targets.target_id', 'contracts.target_id')
    .innerJoin('people as target_people', 'target_people.people_id', 'targets.person_id')
    .innerJoin('clients', 'clients.client_id', 'contracts.client_id')
    .innerJoin('people as client_people', 'client_people.people_id', 'clients.person_id')
    .leftJoin('assassins', 'contracts.completed_by', 'assassins.ass_id')
    .leftJoin('people as assassin_people', 'assassin_people.people_id', 'assassins.person_id')
    .select({
        target: 'target_people.full_name'
      }, {
        client: 'client_people.full_name'
      },
      'contracts.contract_id',
      'contracts.budget', 'targets.location', 'targets.sec_level', {
        assassin: 'assassin_people.full_name'
      })
    .then(function(contractsArr) {
      console.log(contractsArr);
      res.render('contracts', {
        contracts: contractsArr
      });
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
    .select({
        target: 'target_people.full_name'
      }, {
        client: 'client_people.full_name'
      },

      'contracts.contract_id',
      'contracts.budget',
      'targets.target_id',
      'targets.location',
      'targets.sec_level', {
        assassin: 'assassin_people.full_name'
      })
    .where('contracts.contract_id', req.params.id)
    .then(function(contractObj) {
      res.render('contract-single', {
        contract: contractObj
      });
    })
    .catch(function(error) {
      console.log(error);
      res.sendStatus(500);
    });

})


//GET Assassins Assigned to Contract

router.get('/:id', (req, res, next) => {
  knex('assigned_contracts')
    .innerJoin('assassins', 'assigned_contracts.ass_id', 'assassins.ass_id')
    .innerJoin('people', 'assassins.person_id', 'people.people_id')
    .leftJoin('code_names', 'assassins.ass_id', 'code_names.ass_id')
    .select('people.full_name', 'code_names.code_name', 'assassins.rating')
    .where('assigned_contracts.contract_id', req.params.id)
    .then(function(assCon) {
      console.log(results);
      res.render('contract-single', {
        contract: assCon
      });
    })
    .catch(function(error) {
      console.log(error);
      res.sendStatus(500);
    });

})

//Create Contract
router.post('/', function(req, res) {
  const newContract = req.body;

  let targetName = {
    full_name: newContract.target_name
  }
  let clientName = {
    full_name: newContract.client_name
  }

  let newTarget = {
    photo: newContract.photo,
    location: newContract.location,
    sec_level: Number(newContract.sec_level),
  }
  let newClients = {};

  let newCont = {
    budget: Number(newContract.budget)
  }

  knex('people')
    .insert(targetName).as('target_name')
    .returning('*')
    .then(function(targetid) {
      newTarget.person_id = targetid[0].people_id;
    })
    .then(function() {
      return knex('people')
        .insert(clientName).as('client_name')
        .returning('*')
    })
    .then(function(people) {
      newClients.person_id = people[0].people_id;
      return knex('targets')
        .insert(newTarget)
        .returning('*')
    }).then(function(targets) {
      newCont.target_id = targets[0].target_id;

    })
    .then(function() {
      return knex('clients')
        .insert(newClients)
        .returning('*')
    })
    .then(function(con) {
      console.log(con[0]);
      newCont.client_id = Number(con[con.length - 1].client_id);
      return knex.insert(newCont).into('contracts')
    })
    .then(function() {
      res.redirect('/contracts')

    })
    .catch(error => {
      console.log(error);
      res.redirect('/contracts')
    });
})

//Update Contract

router.get('/:id/edit', (req, res, next) => {
  knex('contracts')
    .innerJoin('targets', 'targets.target_id', 'contracts.target_id')
    .innerJoin('people as target_people', 'target_people.people_id', 'targets.person_id')
    .innerJoin('clients', 'clients.client_id', 'contracts.client_id')
    .innerJoin('people as client_people', 'client_people.people_id', 'clients.person_id')
    .leftJoin('assassins', 'contracts.completed_by', 'assassins.ass_id')
    .leftJoin('people as assassin_people', 'assassin_people.people_id', 'assassins.person_id')
    .select({
        target: 'target_people.full_name'
      }, {
        client: 'client_people.full_name'
      },

      'contracts.contract_id',
      'contracts.budget',
      'targets.target_id',
      'targets.location',
      'targets.sec_level', {
        assassin: 'assassin_people.full_name'
      })
    .where('contracts.contract_id', req.params.id)
    .then(function(contractObj) {
      res.render('contracts-update', {
        contract: contractObj
      })
    })
    .catch(function(error) {
      console.log(error);
      res.sendStatus(500);
    })
})

router.put('/:id', function(req, res) {
  let ids = [];
  const id = req.params.id;
  const up = req.body


  const targetName = {
    full_name: up.target_name,
  };

  const clientName = {
    full_name: up.client_name,
  };

  const target = {
    location: up.location,
    photo: up.photo,
    sec_level: parseInt(up.sec_level)
  };

  const contract = {
    budget: parseInt(up.budget)
  };

  return knex('contracts')
    .where('contract_id', id)
    .update(contract)
    .returning('client_id')
    .then(function(client_id) {
      console.log(client_id);
      return knex('clients')
        .select('person_id')
        .where('client_id', client_id[0])
        .returning('*')
    })
    .then(function(data) {
      console.log(data);
      data.forEach(function(element) {
        let index = 0;
        let key = Object.keys(element)[index];
        let val = element[key];
        ids.push(val);
        console.log(ids);
      })
      console.log(ids[0]);
      return knex('people')
        .where('people_id', ids[0])
        .update(clientName)

    })
    .then(function() {
      return knex('targets')
        .where('target_id', id)
        .update(target)
        .returning('person_id')
    })
    .then(function(person_id) {
      console.log(person_id);
      return knex('people')
        .where('people_id', person_id)
        .update(targetName)
        .returning('person_id')
    })
    .then(function() {
      res.redirect('/contracts')
    })
    .catch(function(error) {
      console.log(error);
      res.redirect('/contracts')
    })
})


//Delete Contract

router.delete('/:id', (req, res, next) => {
  knex('contracts')
    .del()
    .where('contracts.contract_id', req.params.id)
    .then(function(results) {
      console.log(results);
      res.sendStatus(200);
    })
    .catch(function(error) {
      console.log(error);
      res.sendStatus(500);
    });
})


//Delete Assassin from Contract
router.delete('/:id', (req, res, next) => {
  knex('assigned_contracts')
    .del()
    .where('assigned_contracts.ass_id', req.params.id)
    .then(function(results) {
      // res.send(results);
      res.sendStatus(200);
    })
    .catch(function(error) {
      console.log(error);
      res.sendStatus(500);
    });
})

//Assign Assassin to Contract

router.patch('/:id', (req, res, next) => {
  knex('contracts')
})

//Complete Contract

router.put('/:id', (req, res, next) => {
  knex('contracts')
})

module.exports = router;
