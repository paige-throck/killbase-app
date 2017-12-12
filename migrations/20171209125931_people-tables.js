
exports.up = function(knex, Promise) {
  return knex.schema.createTableIfNotExists('assassins', function(table){
    table.increments('ass_id').primary();
    table.integer('person_id').references('people.people_id').notNull().onDelete('cascade');
    table.string('contact_info').notNullable().defaultTo('Unknown');
    table.string('weapon').notNullable().defaultTo('Bare Hands');
    table.integer('age').notNullable();
    table.integer('price').notNullable().defaultTo(10);
    table.float('rating').notNullable().defaultTo(0.0);
    table.integer('kills').notNullable();
  })
  .then(function(){
    return knex.schema.createTableIfNotExists('targets', function (table){
      table.increments('target_id').primary();
      table.integer('person_id').references('people.people_id').notNull().onDelete('cascade');
      table.string('location').notNullable().defaultTo('Unknown');
      table.string('photo').notNullable().defaultTo('No Image Provided');
      table.integer('sec_level').notNullable();
    })
  })
  .then(function(){
    return knex.schema.createTableIfNotExists('clients', function (table){
      table.integer('person_id').references('people.people_id').notNull().onDelete('cascade');
    })
  })
  .then(function(){
    return knex.schema.createTableIfNotExists('roles', function(table){
      table.integer('person_id').references('people.people_id').notNull().onDelete('cascade');
      table.boolean('assassin');
      table.boolean('target');
      table.boolean('client');
    })
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('assassins')
  .then(function(){
    return knex.schema.dropTableIfExists('targets')
  }).then(function(){
    return knex.schema.dropTableIfExists('clients')
  }).then(function(){
    return knex.schema.dropTableIfExists('roles');
  })
};