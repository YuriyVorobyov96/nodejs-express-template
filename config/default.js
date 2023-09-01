module.exports = {
  app: {
    port: '3000',
  },
  typeorm: {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'a2seven',
    password: 'a2seven',
    database: 'a2seven',
    synchronize: false,
    logging: false,
  },
  jwt: {
    secret: 'myappwuthsecret',
  },
  password: {
    salt_round: 10,
  },
};
