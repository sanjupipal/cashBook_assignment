const { Sequelize } = require("sequelize");
(() => {
  // connect Db
  // const db = new Sequelize(process.env.CONNECTION_STRING);
  const db = new Sequelize({
    database: process.env.POSTGRES_DB,
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    host: process.env.POSTGRES_HOST,
    port: process.env.POSTGRES_PORT,
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
  //verify connection
  db.authenticate()
    .then(() => {
      console.log("Connection has been established successfully.");
    })
    .catch((error) => {
      console.error("Unable to connect to the database:", error);
    });

  let syncConfig = { alter: { alter: true, drop: false }, force: false };

  db.sync(syncConfig)
    .then((value) => {
      console.log("Sync Complete");
    })
    .catch((error) => {
      console.log("Sync Error", error);
    });
  app.sequelize = db;
})();
