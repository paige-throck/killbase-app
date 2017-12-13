
exports.seed = function(knex, Promise) {
      return knex('assassins').del()
    .then(function () {
      // Inserts seed entries
      return knex('assassins').insert([
        {ass_id:1, person_id:1, contact_info:'jackal@gmail.com', weapon:'Sniper', age:31, price:45, rating:7.5, kills:28},

        {ass_id:2, person_id:2, contact_info:'pneujackcity@gmail.com', weapon:'Bolt Gun', age:52, price:40, rating:9, kills:72},

        {ass_id:3, person_id:3, contact_info:'ghostdog@gmail.com', weapon:'Pistol', age:28, price:20, rating:6.5, kills:35},

        {ass_id:4, person_id:4, contact_info:'jb@gmail.com', weapon:'Parkour', age:27, price:25, rating:7, kills:48},

        {ass_id:5, person_id:5, contact_info:'babayaga@gmail.com', weapon:'Lots of Guns', age:35, price:50, rating:9.5, kills:433},

        {ass_id:6, person_id:6, contact_info:'bmf@gmail.com', weapon:'Pistol', age:26, price:15, rating:6.5, kills:13},

        {ass_id:7, person_id:7, contact_info:'leon@gmail.com', weapon:'Everything', age:41, price:30, rating:8.5, kills:87},

        {ass_id:8, person_id:8, contact_info:'nikita@gmail.com', weapon:'Silenced Pistols', age:28, price:30, rating:7, kills:32},

        {ass_id:9, person_id:9, contact_info:'rsanchez@gmail.com', weapon:'Lasers and office supplies', age:60, price:0, rating:8, kills:24},

        {ass_id:10, person_id:20, contact_info:'archer@gmail.com', weapon:'Whiskey Bottle', age:31, price:50, rating:8.5, kills:70}
      ]);
    });
};
