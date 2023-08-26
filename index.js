const express = require("express");
const app = express();
const port = 8080;
const initSqlJs = require("sql.js");
const multer = require("multer");
const upload = multer();

async function main() {
  // Middleware
  app.use(express.json());

  // Database
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

  app.post("/transactions", (req, res) => {
    const { body } = req;
    const { id, basketSize, budtenderId, locationId, timestamp } = body;
    const sqlstr = `
      INSERT INTO transactions VALUES (
        "${id}",
        "${budtenderId}",
        "${locationId}",
        ${basketSize},
        "${timestamp}"
      )
    `;
    db.run(sqlstr);
    res.status(201).send();
  });

  function transformCSVToTransactionArray(csvString) {
    const parsed = csvString.split("\n");
    const [firstRow, ...rows] = parsed;
    const headers = firstRow.split(",");
    const transactions = rows
      .filter(row => row.length)
      .map(row => {
        const cells = row.split(",");
        const rowObj = headers.reduce((acc, header, idx) => {
          return cells.length ? { ...acc, [header]: cells[idx] } : acc;
        }, {});
        return rowObj;
      });
    return transactions;
  }

  function createInsertStatement(transaction) {
    const { id, budtenderId, locationId, basketSize, timestamp } = transaction;
    const insertStmt = `
      INSERT INTO transactions VALUES (
        "${id}",
        "${budtenderId}",
        "${locationId}",
        ${basketSize},
        "${timestamp}"
      )
    `;
    return insertStmt;
  }

  // function runInserts() {}

  // worker thread?

  app.post("/transactions/bulk", upload.single("csvFile"), async (req, res) => {
    console.log("req.body.source", req.body.source);
    const csv = req.file.buffer.toString("utf8");
    const transactions = transformCSVToTransactionArray(csv);
    transactions.forEach((transaction, i) => {
      const query = createInsertStatement(transaction);
      db.run(query);
    });

    res.status(201).send();
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

main();
