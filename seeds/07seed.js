
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('assigned_contracts').del()
    .then(function () {
      // Inserts seed entries
      return knex('assigned_contracts').insert([
        {ass_id: 1, contract_id:1},
        {ass_id: 2, contract_id:2},
        {ass_id: 3, contract_id:3},
        {ass_id: 4, contract_id:4},
        {ass_id: 5, contract_id:5},
        {ass_id: 6, contract_id:1},
        {ass_id: 7, contract_id:2},
        {ass_id: 8, contract_id:3},
        {ass_id: 9, contract_id:4}
      ]);
    });
};
