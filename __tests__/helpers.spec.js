const {
  createTransaction,
  transformCSVToTransactionArray,
  createInsertStatement,
} = require("../helpers");

describe("createInsertStatement", () => {
  test("should create an insert statement", () => {
    const transaction = {
      id: "abcd-efgh-ijkl-id",
      budtenderId: "abcd-efgh-ijkl-tender",
      locationId: "abcd-efgh-ijkl-location",
      basketSize: 9.99,
      timestamp: "2023-08-26T22:44:00.000+00:00",
    };
    const actual = createInsertStatement(transaction);
    const expected = `
    INSERT INTO transactions VALUES (
      "abcd-efgh-ijkl-id",
      "abcd-efgh-ijkl-tender",
      "abcd-efgh-ijkl-location",
      9.99,
      "2023-08-26T22:44:00.000+00:00"
    )
  `;
    expect(actual).toEqual(expected);
  });
});
