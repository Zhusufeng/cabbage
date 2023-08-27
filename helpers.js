const GoodPOSTransaction = require("./sources/GoodPOS");
const OkPOSTransaction = require("./sources/OkPOS");

function createTransaction(source) {
  let transaction;
  switch (source) {
    case "good_pos":
      transaction = new GoodPOSTransaction();
      break;
    case "ok_pos":
      transaction = new OkPOSTransaction();
      break;
    // case "wonky_pos":
    //   break;
  }
  return transaction;
}

function transformCSVToTransactionArray(csvString, source) {
  const parsed = csvString.split("\n");
  const [_firstRow, ...rows] = parsed;
  const trimmedRows = rows.filter(row => row.length);
  const transactions = trimmedRows.map(row => {
    const transaction = createTransaction(source);
    transaction.set(row);
    return transaction;
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

module.exports = {
  transformCSVToTransactionArray,
  createInsertStatement,
};
