exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('code_names', function(table) {
    table.integer('ass_id').references('assassins.ass_id').onDelete('cascade');
    table.string('code_name').defaultTo('Unknown');
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('code_names');
};
