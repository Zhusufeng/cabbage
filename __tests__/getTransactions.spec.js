const httpMocks = require("node-mocks-http");
const database = require("../db");
const { getTransaction } = require("../transaction");

const db = database.getDatabase();

jest.mock("../db", () => {
  const mockDb = {
    prepare: jest.fn(),
  };
  return {
    getDatabase: () => {
      return mockDb;
    },
  };
});

describe("getTransaction", () => {
  it("should get a transaction", () => {
    const req = httpMocks.createRequest({
      method: "GET",
      url: "/transactions",
      query: {
        id: "abcd-efgh-ijkl-id",
      },
    });
    const res = httpMocks.createResponse();

    const result = {
      id: "abcd-efgh-ijkl-id",
      budtenderId: "abcd-efgh-ijkl-tender",
      locationId: "abcd-efgh-ijkl-location",
      basketSize: 9.99,
      timestamp: "2023-08-26T22:44:00.000+00:00",
    };

    const mockPrepareResult = {
      getAsObject: values => {
        expect(values).toEqual({ ":idVal": "abcd-efgh-ijkl-id" });
        return result;
      },
      free: jest.fn(),
    };

    db.prepare.mockImplementationOnce(query => {
      const testQuery = "SELECT * FROM transactions WHERE id=:idVal";
      expect(query).toEqual(testQuery);
      return mockPrepareResult;
    });

    getTransaction(req, res);
    expect(res.statusCode).toEqual(200);
    const data = res._getData();
    expect(data).toEqual(result);
  });
});
