const express = require("express");
const multer = require("multer");
const createDatabase = require("./db");
const {
  transformCSVToTransactionArray,
  createInsertStatement,
} = require("./helpers");

const upload = multer();
const app = express();
const port = 8080;

async function main() {
  app.use(express.json());

  const db = await createDatabase();

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
    const query = createInsertStatement(body);
    db.run(query);
    res.status(201).send();
  });

  // worker thread?
  app.post("/transactions/bulk", upload.single("csvFile"), async (req, res) => {
    const { source } = req.body;
    const csv = req.file.buffer.toString("utf8");
    const transactions = transformCSVToTransactionArray(csv, source);
    transactions.forEach(transaction => {
      const query = createInsertStatement(transaction._transaction);
      db.run(query);
    });

    res.status(201).send();
  });

  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });
}

main();
