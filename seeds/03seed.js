targetIds = [];
clientIds = [];
assIds = [];
let ass = [];


exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('contracts').del()
    .then(function() {
      return knex('targets')
        .select('target_id')
        .then(function(target_id) {
          target_id.forEach(function(element) {
            let index = 0;
            let key = Object.keys(element)[index];
            val = element[key];
            targetIds.push(val);
          })
        })
    })
    .then(function() {
      return knex('clients')
        .select('client_id')
        .then(function(client_id) {
          client_id.forEach(function(element) {
            let index = 0;
            let key = Object.keys(element)[index];
            val = element[key];
            clientIds.push(val);
          })
        })
    })
    .then(function() {
      return knex('assassins')
        .select('ass_id')
        .then(function(ass_id) {
          ass_id.forEach(function(element) {
            let index = 0;
            let key = Object.keys(element)[index];
            val = element[key];
            assIds.push(val);
          })
        })
    })
    .then(function() {
      return knex('contracts').insert([{
          target_id: targetIds[0],
          client_id: clientIds[0],
          budget: 40
        },
        {
          target_id: targetIds[1],
          client_id: clientIds[1],
          budget: 70
        },
        {
          target_id: targetIds[2],
          client_id: clientIds[2],
          budget: 35
        },
        {
          target_id: targetIds[3],
          client_id: clientIds[3],
          budget: 25
        },
        {
          target_id: targetIds[4],
          client_id: clientIds[4],
          budget: 10
        }
      ]);
    })
    .then(function() {
      return knex.select('ass_id').from('assassins')
    })
    .then(function(ass_id) {

      ass_id.forEach(function(element) {
        let index = 0;
        let key = Object.keys(element)[index];
        val = element[key];
        ass.push(val);
      })
      return knex('code_names').insert([{
          ass_id: ass[0],
          code_name: 'The Jackal'
        },
        {
          ass_id: ass[1],
          code_name: 'Old Man'
        },
        {
          ass_id: ass[2],
          code_name: 'Ghost Dog'
        },
        {
          ass_id: ass[3],
          code_name: 'Unknown'
        },
        {
          ass_id: ass[4],
          code_name: 'Baba Yaga'
        },
        {
          ass_id: ass[5],
          code_name: 'Unknown'
        },
        {
          ass_id: ass[6],
          code_name: 'The Professional'
        },
        {
          ass_id: ass[7],
          code_name: 'Nikita'
        },
        {
          ass_id: ass[7],
          code_name: 'La Femme Nikita'
        },
        {
          ass_id: ass[8],
          code_name: 'Solenya'
        }
      ])
    });
}
