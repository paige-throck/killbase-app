exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('people').del()
    .then(function() {
      // Inserts seed entries
      return knex('people').insert([{
          full_name: 'Alexander Duggan'
        },
        {
          full_name: 'Anton Chigurh'
        },
        {
          full_name: 'Unknown'
        },
        {
          full_name: 'Jason Bourne'
        },
        {
          full_name: 'John Wick'
        },
        {
          full_name: 'Jules Winnfield'
        },
        {
          full_name: 'Leon'
        },
        {
          full_name: 'Nikita Mears'
        },
        {
          full_name: 'Pickle Rick'
        },
        {
          full_name: 'Butch Coolidge'
        },
        {
          full_name: 'The Jaguar'
        },
        {
          full_name: 'Norman Stansfield'
        },
        {
          full_name: 'Santino D\'Antonio'
        },
        {
          full_name: 'Sonny Valerio'
        },
        {
          full_name: 'Marcellus Wallace'
        },
        {
          full_name: 'Concerto'
        },
        {
          full_name: 'Mathilda'
        },
        {
          full_name: 'Winston'
        },
        {
          full_name: 'Ray Vargo'
        }
      ])
    })
}
