
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('people', function(table){
  table.increments('people_id').primary();
  table.string('full_name').notNullable().defaultTo('Unknown');
  table.boolean('deceased');
})

};


  exports.down = function(knex, Promise) {
    return knex.schema.dropTableIfExists('people');
  };
