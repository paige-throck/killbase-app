'use strict';

const express = require('express');
const router = express.Router();
const config = require('../knexfile.js')['development'];
const knex = require('knex')(config);

/All Assassins
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


/Sinlge Assassin
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



/Create Assassin






// router.post('/assassins', (req, res, next) => {
//   knex('assassins')
//     .insert({ name: req.body.name }, '*')
//     .then((artists) => {
//       res.send(artists[0]);
//     })
//     .catch((err) => {
//       next(err);
//     });
// });
//






// router.patch('/assassins/:id', (req, res, next) => {
//   knex('assassins')
//     .where('id', req.params.id)
//     .first()
//     .then((artist) => {
//       if (!artist) {
//         return next();
//       }
//
//       return knex('assassins')
//         .update({ name: req.body.name }, '*')
//         .where('id', req.params.id);
//     })
//     .then((artists) => {
//       res.send(artists[0]);
//     })
//     .catch((err) => {
//       next(err);
//     });
// });
//
// router.delete('/assassins/:id', (req, res, next) => {
//   let artist;
//
//   knex('assassins')
//     .where('id', req.params.id)
//     .first()
//     .then((row) => {
//       if (!row) {
//         return next();
//       }
//
//       artist = row;
//
//       return knex('assassins')
//         .del()
//         .where('id', req.params.id);
//     })
//     .then(() => {
//       delete artist.id;
//       res.send(artist);
//     });
//     .catch((err) => {
//       next(err);
//     });
// });
//
// router.get('/assassins/:id/contracts', (req, res, next) => {
//   knex('contracts')
//     .where('artist_id', req.params.id)
//     .orderBy('id')
//     .then((track) => {
//       res.send(track);
//     })
//     .catch((err) => {
//       next(err);
//     });
// });


///////////////ASSIGNED CONTRACTS/////////////////////

module.exports = router;
