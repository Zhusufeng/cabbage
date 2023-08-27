const { getDatabase } = require("./db");
const {
  transformCSVToTransactionArray,
  createInsertStatement,
} = require("./helpers");

function getTransaction(req, res) {
  const { query } = req;
  const db = getDatabase();
  const stmt = db.prepare("SELECT * FROM transactions WHERE id=:idVal");
  const result = stmt.getAsObject({ ":idVal": query.id });
  stmt.free();
  res.status(200).send(result);
}

function createTransaction(req, res) {
  const { body } = req;
  const db = getDatabase();
  const query = createInsertStatement(body);
  db.run(query);
  res.status(201).send(body);
}

function createBulkTransactions(req, res) {
  const { source } = req.body;
  const db = getDatabase();
  const csv = req.file.buffer.toString("utf8");
  const transactions = transformCSVToTransactionArray(csv, source);
  const transactionIds = transactions.map(transaction => {
    const { id } = transaction._transaction;
    const query = createInsertStatement(transaction._transaction);
    db.run(query);
    return id;
  });
  res.status(201).send(transactionIds);
}

module.exports = {
  getTransaction,
  createTransaction,
  createBulkTransactions,
};
