import { Sequelize } from "sequelize";

const db = new Sequelize("farmasysdb", "root", "mysql", {
  host: "localhost",
  dialect: "mysql",
  timezone: "-03:00",
});
export default db;
