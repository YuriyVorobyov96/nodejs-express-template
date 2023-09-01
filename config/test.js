module.exports = {
  app: {
    port: '3000',
  },
  typeorm: {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'a2seven',
    password: 'q1q1',
    database: 'a2seven',
    synchronize: false,
    logging: false,
  },
  jwt: {
    secret: 'test',
  },
  password: {
    salt_round: 3,
  },
};
