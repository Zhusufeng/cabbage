const express = require("express");
const app = express();
const port = 8080;
const initSqlJs = require("sql.js");

async function main() {
  const SQL = await initSqlJs();
  const db = new SQL.Database();
  console.log("Database created.");
  /**
   * I am using SQLite for an in-memory database,
   * and it has only a few datatypes.
   * https://www.sqlite.org/datatype3.html
   */
  let sqlstr = `
    CREATE TABLE transactions (
      id TEXT,
      budtender_id TEXT,
      location_id TEXT,
      basket_size REAL,
      timestamp_ TEXT
    );
    INSERT INTO transactions VALUES (
      "46c0917b-e62f-41fd-b111-f09b575ef2c3",
      "6908f98f-da5b-4566-8f8f-49f83b3806ed",
      "3e3d99b2-d2e9-4142-b6ba-da9592e92b51",
      29.39,
      "2023-08-09T22:44:00.000+00:00"
    );
  `;
  db.run(sqlstr);
  console.log("transactions table created.");

  app.get("/", (req, res) => {
    res.send("Hello World!");
  });

  app.get("/transactions", (req, res) => {
    const { query } = req;
    const stmt = db.prepare("SELECT * FROM transactions WHERE id=:idVal");
    const result = stmt.getAsObject({ ":idVal": query.id });
    stmt.free();
    res.status(200).send(result);
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

main();
