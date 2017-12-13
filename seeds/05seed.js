
exports.seed = function(knex, Promise) {
      return knex('code_names').del()
    .then(function () {
      // Inserts seed entries
      return knex('code_names').insert([
        {ass_id:1, code_name:'The Jackal'},

        {ass_id:2, code_name:'Old Man'},

        {ass_id:3, code_name:'Ghost Dog'},

        {ass_id:4, code_name:'Unknown'},

        {ass_id:5, code_name:'Baba Yaga'},

        {ass_id:6, code_name:'Unknown'},

        {ass_id:7, code_name:'The Professional'},

        {ass_id:8, code_name:'Nikita'},

        {ass_id:8, code_name:'La Femme Nikita'},

        {ass_id:9, code_name:'Solenya'},

        {ass_id:10, code_name:'Bob Belcher'}
      ]);
    });
};
