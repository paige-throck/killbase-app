let peopleId = [];
exports.seed = function(knex, Promise) {
  return knex('assassins').del()
    .then(function() {
      return knex('code_names').del()
    })
    .then(function() {
      return knex('clients').del()
    })
    .then(function() {
      return knex('assassins').insert([{
          person_id: peopleId[0],
          contact_info: 'jackal@gmail.com',
          weapon: 'Sniper',
          age: 31,
          price: 45,
          rating: 7.5,
          kills: 28
        },

        {
          person_id: peopleId[1],
          contact_info: 'pneujackcity@gmail.com',
          weapon: 'Bolt Gun',
          age: 52,
          price: 40,
          rating: 9,
          kills: 72
        },

        {
          person_id: peopleId[2],
          contact_info: 'ghostdog@gmail.com',
          weapon: 'Pistol',
          age: 28,
          price: 20,
          rating: 6.5,
          kills: 35
        },

        {
          person_id: peopleId[3],
          contact_info: 'jb@gmail.com',
          weapon: 'Parkour',
          age: 27,
          price: 25,
          rating: 7,
          kills: 48
        },

        {
          person_id: peopleId[4],
          contact_info: 'babayaga@gmail.com',
          weapon: 'Lots of Guns',
          age: 35,
          price: 50,
          rating: 9.5,
          kills: 433
        },

        {
          person_id: peopleId[5],
          contact_info: 'bmf@gmail.com',
          weapon: 'Pistol',
          age: 26,
          price: 15,
          rating: 6.5,
          kills: 13
        },

        {
          person_id: peopleId[6],
          contact_info: 'leon@gmail.com',
          weapon: 'Everything',
          age: 41,
          price: 30,
          kills: 87
        },

        {
          person_id: peopleId[7],
          contact_info: 'nikita@gmail.com',
          weapon: 'Silenced Pistols',
          age: 28,
          price: 30,
          rating: 7,
          kills: 32
        },

        {
          person_id: peopleId[8],
          contact_info: 'rsanchez@gmail.com',
          weapon: 'Lasers and office supplies',
          age: 60,
          price: 0,
          rating: 8,
          kills: 24
        },

        {
          person_id: peopleId[9],
          contact_info: 'archer@gmail.com',
          weapon: 'Whiskey Bottle',
          age: 31,
          price: 50,
          rating: 8.5,
          kills: 70
        }
      ]).returning(['ass_id'])
    })
    .then(function(id) {
      let assId = [];
      return knex('code_names').insert([{
          ass_id: assId[0],
          code_name: 'The Jackal'
        },

        {
          ass_id: assId[1],
          code_name: 'Old Man'
        },

        {
          ass_id: assId[2],
          code_name: 'Ghost Dog'
        },

        {
          ass_id: assId[3],
          code_name: 'Unknown'
        },

        {
          ass_id: assId[4],
          code_name: 'Baba Yaga'
        },

        {
          ass_id: assId[5],
          code_name: 'Unknown'
        },

        {
          ass_id: assId[6],
          code_name: 'The Professional'
        },

        {
          ass_id: assId[7],
          code_name: 'Nikita'
        },

        {
          ass_id: assId[7],
          code_name: 'La Femme Nikita'
        },

        {
          ass_id: assId[8],
          code_name: 'Solenya'
        },

        {
          ass_id: assId[9],
          code_name: 'Bob Belcher'
        }]);
    })
    .then(function() {
      return knex('targets').del()
        .then(function() {
          return knex('targets').insert([

            {
              person_id: peopleId[10],
              location: 'Los Angeles',
              photo: 'https://goo.gl/LCquZj',
              sec_level: 3
            },

            {
              person_id: peopleId[11],
              location: 'Russian Embassy',
              photo: 'https://goo.gl/6JWsiv',
              sec_level: 9
            },

            {
              person_id: peopleId[12],
              location: 'Manhattan',
              photo: 'https://i.imgur.com/mdIk33E.jpg',
              sec_level: 7
            },

            {
              person_id: peopleId[13],
              location: 'Continental Hotel',
              photo: 'https://goo.gl/fUPkYy',
              sec_level: 10
            },

            {
              person_id: peopleId[14],
              location: 'Queens',
              photo: 'https://goo.gl/8DHYUS',
              sec_level: 4
            }
          ]);
        })
        .then(function() {
          return knex('clients').insert([

            {
              person_id: peopleId[15]
            },

            {
              person_id: peopleId[16]
            },

            {
              person_id: peopleId[17]
            },

            {
              person_id: peopleId[18]
            },

            {
              person_id: peopleId[19]
            }
          ]);
        })
    })
};
