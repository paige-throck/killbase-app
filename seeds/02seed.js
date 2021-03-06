let ids = [];
let ass = [];
exports.seed = function(knex, Promise) {

  // Deletes ALL existing entries
  return knex('assassins').del()
    .then(function() {
      return knex('code_names').del()
    })
    .then(function() {
      return knex('targets').del()
    })
    .then(function() {
      return knex('clients').del()
    })

    .then(function() {
      return knex.select('people_id').from('people')
    })
    .then(function(people_id) {
      people_id.forEach(function(element) {
        let index = 0;
        let key = Object.keys(element)[index];
        val = element[key];
        ids.push(val);
      })
      return knex('assassins').insert([{
          person_id: ids[0],
          weapon: 'Sniper Rifle',
          contact_info: 'jackal@gmail.com',
          age: 31,
          price: 45,
          rating: 7.5,
          kills: 28
        },
        {
          person_id: ids[1],
          weapon: 'Pneumatic Bolt Gun',
          contact_info: 'pneujackcity@gmail.com',
          age: 52,
          price: 40,
          rating: 9,
          kills: 72
        },
        {
          person_id: ids[2],
          weapon: 'Pistol',
          contact_info: 'ghostdog@gmail.com',
          age: 28,
          price: 20,
          rating: 6.5,
          kills: 35
        },
        {
          person_id: ids[3],
          weapon: 'Parkour',
          contact_info: 'jb@gmail.com',
          age: 27,
          price: 25,
          rating: 7,
          kills: 48
        },
        {
          person_id: ids[4],
          weapon: 'Lots of guns',
          contact_info: 'babayaga@gmail.com	',
          age: 35,
          price: 50,
          rating: 9.5,
          kills: 433
        },
        {
          person_id: ids[5],
          weapon: 'Pistol',
          contact_info: 'bmf@gmail.com',
          age: 26,
          price: 15,
          rating: 6.5,
          kills: 13
        },
        {
          person_id: ids[6],
          weapon: 'Everything',
          contact_info: 'leon@gmail.com',
          age: 41,
          price: 30,
          rating: 8.5,
          kills: 87
        },
        {
          person_id: ids[7],
          weapon: 'Silenced pistols',
          contact_info: 'nikita@gmail.com',
          age: 28,
          price: 30,
          rating: 7,
          kills: 32
        },
        {
          person_id: ids[8],
          weapon: 'Lasers and Office Supplies',
          contact_info: 'rsanchez@gmail.com',
          age: 60,
          price: 0,
          rating: 8,
          kills: 24
        }
      ])
    })
    .then(function() {
      return knex('targets').insert([{
          person_id: ids[9],
          location: 'Los Angeles',
          photo: 'https://goo.gl/LCquZj',
          sec_level: 3
        },
        {
          person_id: ids[10],
          location: 'Russian Embassy',
          photo: 'https://goo.gl/6JWsiv',
          sec_level: 9
        },
        {
          person_id: ids[11],
          location: 'Manhattan',
          photo: 'https://i.imgur.com/mdIk33E.jpg',
          sec_level: 7
        },
        {
          person_id: ids[12],
          location: 'Contintental Hotel',
          photo: 'https://goo.gl/fUPkYy',
          sec_level: 10
        },
        {
          person_id: ids[13],
          location: 'Queens',
          photo: 'https://goo.gl/8DHYUS',
          sec_level: 4
        }
      ]);
    }).then(function() {
      return knex('clients').insert([{
          person_id: ids[14],
        },
        {
          person_id: ids[15],
        },
        {
          person_id: ids[16],
        },
        {
          person_id: ids[17],
        },
        {
          person_id: ids[18],
        }
      ])
    })
};
