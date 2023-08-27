const httpMocks = require("node-mocks-http");
const database = require("../db");
const { createTransaction } = require("../transaction");

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

describe("createTransaction", () => {
  it("should add a transaction to the database", () => {
    const req = httpMocks.createRequest({
      method: "POST",
      url: "/transactions",
      body: {
        id: "abcd-efgh-ijkl-id",
        budtenderId: "abcd-efgh-ijkl-tender",
        locationId: "abcd-efgh-ijkl-location",
        basketSize: 9.99,
        timestamp: "2023-08-26T22:44:00.000+00:00",
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
      "2023-08-26T22:44:00.000+00:00"
    )
  `;
      expect(query).toEqual(insertStmt);
    });

    createTransaction(req, res);
    expect(res.statusCode).toEqual(201);
  });
});
