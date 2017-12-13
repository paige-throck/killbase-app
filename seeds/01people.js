
exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('people').del()
    .then(function () {
      // Inserts seed entries
      return knex('people').insert([
        {people_id:1, full_name:'Alexander Duggan', deceased:false},
        {people_id:2, full_name:'Anton Chigurh', deceased:false},
        {people_id:3, full_name:'Unknown', deceased:false},
        {people_id:4, full_name:'Jason Bourne', deceased:false},
        {people_id:5, full_name:'John Wick', deceased:false},
        {people_id:6, full_name:'Jules Winnfield', deceased:false},
        {people_id:7, full_name:'Leon', deceased:false},
        {people_id:8, full_name:'Nikita Mears', deceased:false},
        {people_id:9, full_name:'Pickle Rick', deceased:false},
        {people_id:10, full_name:'Butch Coolidge', deceased:false},
        {people_id:11, full_name:'Marcellus Wallace', deceased:false},
        {people_id:12, full_name:'The Jaguar', deceased:false},
        {people_id:13, full_name:'Concerto', deceased:false},
        {people_id:14, full_name:'Norman Stansfield', deceased:false},
        {people_id:15, full_name:'Mathilda', deceased:false},
        {people_id:16, full_name:'Santino DAntonio', deceased:false},
        {people_id:17, full_name:'Sonny Valerio', deceased:false},
        {people_id:18, full_name:'Winston', deceased:false},
        {people_id:19, full_name:'Ray Vargo', deceased:false},
        {people_id:20, full_name:'Sterling Archer', deceased:false}
      ]);
    });
  };
