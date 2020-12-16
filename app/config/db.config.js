module.exports = {
  HOST: "localhost",
  USER: "pguser",
  PASSWORD: "123qweASD",
  DB: "testdb",
  dialect: "postgres",
  omitNull: true,
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
