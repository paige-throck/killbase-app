
let targetId = [];
let clientId = [];

exports.seed = function(knex, Promise) {
return knex('contracts').del()

  .then(function() {
    return knex('contracts').insert([
      {
        target_id:targetId[0],
        client_id:clientId[0],
        budget: 40
      },

      {
        target_id:targetId[1],
        client_id:clientId[1],
        budget: 70
      },

      {
        target_id:targetId[2],
        client_id:clientId[2],
        budget: 35
      },

      {
        target_id:targetId[3],
        client_id:clientId[3],
        budget: 25
      },

      {
        target_id:targetId[4],
        client_id:clientId[4],
        budget: 10
      }
    ]);
  })
};
