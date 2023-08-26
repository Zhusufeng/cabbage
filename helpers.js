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

module.exports = {
  transformCSVToTransactionArray,
  createInsertStatement,
};
