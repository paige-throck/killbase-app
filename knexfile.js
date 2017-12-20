// Update with your config settings.

module.exports = {

  development: {
    client: 'pg',
    connection: {
      host: 'localhost',
      database:'killbase_app',
      user: 'paigethrockmorton',
      password: ''
    },
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    }
  },

  production: {
    client: 'pg',
    connection: {
      host: 'ec2-184-72-228-128.compute-1.amazonaws.com',
      database:'d36j6suc27t9pa',
      user: 'vibrabcqibkfey',
      password: '33e8e63bf5bed22ea2b74318388ac75d78fa1bd5dd20c4ba87c81b616a4b6e38'

    },
    migrations: {
      directory: './migrations'
    },
    seeds: {
      directory: './seeds'
    }
  },

};
