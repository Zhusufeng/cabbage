const httpMocks = require("node-mocks-http");
const database = require("../db");
const { createBulkTransactions } = require("../transaction");
const fs = require("fs");

const db = database.getDatabase();

jest.mock("../db", () => {
  const mockDb = {
    run: jest.fn(),
  };
  return {
    getDatabase: () => {
      return mockDb;
    },
  };
});

describe("createBulkTransactions", () => {
  it("should take in a CSV and insert the data into the database", () => {
    const myCSV = fs.readFileSync("__tests__/mock_good_pos.csv");
    const req = httpMocks.createRequest({
      method: "POST",
      url: "/transactions/bulk",
      file: {
        fieldname: "csvFile",
        originalname: "mock_good_pos.csv",
        encoding: "7bit",
        mimetype: "text/csv",
        buffer: myCSV,
      },
      body: {
        source: "good_pos",
      },
    });
    const res = httpMocks.createResponse();

    db.run.mockImplementationOnce(query => {
      // indentation must match
      const insertStmt = `
    INSERT INTO transactions VALUES (
      "abcd-efgh-ijkl-id",
      "abcd-efgh-ijkl-tender",
      "abcd-efgh-ijkl-location",
      9.99,
      "2023-08-10T18:05:33.000Z"
    )
  `;
      expect(query).toEqual(insertStmt);
    });

    createBulkTransactions(req, res);
    expect(res.statusCode).toEqual(201);
  });
});
