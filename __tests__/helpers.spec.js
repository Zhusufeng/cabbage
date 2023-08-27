const GoodPOSTransaction = require("../sources/GoodPOS");
const {
  createTransaction,
  transformCSVToTransactionArray,
  createInsertStatement,
} = require("../helpers");

describe("createTransaction", () => {
  test("should create a new transaction instance given a source", () => {
    const source = "good_pos";
    const actual = createTransaction(source);
    const expected = new GoodPOSTransaction();
    expect(actual).toEqual(expected);
  });
});

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
