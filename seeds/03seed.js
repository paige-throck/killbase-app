exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('clients').del()
    .then(function () {
      // Inserts seed entries
      return knex('clients').insert([

        {person_id:11, client_id:1},

        {person_id:13, client_id:2},

        {person_id:15, client_id:3},

        {person_id:18, client_id:4},

        {person_id:19, client_id:5}
      ]);
    });
  };
