const { Sequelize } = require("sequelize");
const postgresURL = process.env.DATABASE_URL;
let sequelize = new Sequelize();
if (postgresURL != null) {
  let databaseHost = process.env.DATABASE_HOST;
  sequelize = new Sequelize(`${postgresURL}`, {
    host: `${databaseHost}`,
    dialect: "postgres",
    protocol: "postgres",
    logging: true,
    define: {
      timestamps: false,
    },
  });
} else {
  sequelize = new Sequelize("postgres", "postgres", "password", {
    host: "localhost",
    dialect: "postgres",
    define: {
      timestamps: false,
    } /* one of 'mysql' | 'mariadb' | 'postgres' | 'mssql' */,
  });
}

const init = async () => {
  try {
    await sequelize.authenticate();
    console.log("Database Connection has been established successfully");
  } catch (err) {
    console.error("Unable to connect to the database ", err);
  }
};
module.exports = {
  sequelize,
  init,
};
