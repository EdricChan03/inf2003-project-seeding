import createKnex from 'knex';

export const knex = createKnex({
  client: 'mysql2',
  connection: {
    host: '127.0.0.1',
    port: 5006,
    user: 'root',
    password: 'inf2003mariadb_root',
    database: 'schools_db',
  },
});
