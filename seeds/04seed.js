exports.seed = function(knex, Promise) {

  return knex('targets').del()
    .then(function () {

      return knex('targets').insert([

        {target_id:1, person_id:10, location:'Los Angeles', photo:'https://goo.gl/LCquZj', sec_level:3},

        {target_id:2, person_id:12, location:'Russian Embassy', photo:'https://goo.gl/6JWsiv', sec_level:9},

        {target_id:3, person_id:14, location:'Manhattan', photo:'https://i.imgur.com/mdIk33E.jpg', sec_level:7},

        {target_id:4, person_id:16, location:'Continental Hotel', photo:'https://goo.gl/fUPkYy', sec_level:10},

        {target_id:5, person_id:17, location:'Queens', photo:'https://goo.gl/8DHYUS', sec_level:4}

      ]);
    });
  };
