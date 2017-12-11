let targetsArr = [];
let clientsArr = [];

exports.seed = function(knex, Promise) {
return knex('contracts').del()

  // .then(function() {
  //   return knex('targets')
  //   .select('target_id').then(function(target_id) {
  //     target_id.forEach(function(id) {
  //       console.log(typeof id);
  //       // targetsArr.push(parseInt(Object.values(id)));
  //     })
  //   })
  // })
  // .then(function() {
  //   console.log(targetsArr);
  //   return knex('clients')
  //   .select('client_id').then(function(client_id) {
  //     client_id.forEach(function(id) {
  //       console.log(typeof id);
  //       // clientsArr.push(parseInt(id));
  //
  //     })
  //   })
  // })
  .then(function() {
    return knex('contracts').insert([{
        contract_id: 1,
        target_id:1,
        client_id:1,
        budget: 40
      },

      {
        contract_id: 2,
        target_id:2,
        client_id:2,
        budget: 70
      },

      {
        contract_id: 3,
        target_id:3,
        client_id:3,
        budget: 35
      },

      {
        contract_id: 4,
        target_id:4,
        client_id:4,
        budget: 25
      },

      {
        contract_id: 5,
        target_id:5,
        client_id:5,
        budget: 10
      }
    ]);
  })
};
