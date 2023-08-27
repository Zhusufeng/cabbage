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

describe("transformCSVToTransactionArray", () => {
  test("should transform a CSV as a string into an array of transaction instances", () => {
    const csvString =
      "id,basketSize,budtenderId,locationId,timestamp,budtendenderName\n8783e0a4-b67b-4c20-b14a-719458af4a47,92.20,f6ea146d-8af6-4e19-9367-d60a9a5477de,c5eb530d-35ee-451b-8f08-48fa7a20f118,1691690733,simple_pig\n\n";
    const source = "good_pos";
    const actual = transformCSVToTransactionArray(csvString, source);
    const transaction = new GoodPOSTransaction();
    transaction.set(
      "8783e0a4-b67b-4c20-b14a-719458af4a47,92.20,f6ea146d-8af6-4e19-9367-d60a9a5477de,c5eb530d-35ee-451b-8f08-48fa7a20f118,1691690733,simple_pig"
    );
    const expected = [transaction];

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
